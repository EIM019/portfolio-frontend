import { useEffect, useRef, useState } from "react";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";
const RECAPTCHA_V2_SITE_KEY = import.meta.env.VITE_RECAPTCHA_V2_SITE_KEY || "";
const RECAPTCHA_V3_SITE_KEY = import.meta.env.VITE_RECAPTCHA_V3_SITE_KEY || "";
const SESSION_KEY = "portfolio_access_session";

function loadScript(src, id) {
  if (document.getElementById(id)) return Promise.resolve();

  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.id = id;
    script.src = src;
    script.async = true;
    script.defer = true;
    script.onload = resolve;
    script.onerror = reject;
    document.head.appendChild(script);
  });
}

async function getRecaptchaV3Token(action) {
  if (!RECAPTCHA_V3_SITE_KEY) return "";

  await loadScript(`https://www.google.com/recaptcha/api.js?render=${RECAPTCHA_V3_SITE_KEY}`, "recaptcha-v3");
  return new Promise((resolve) => {
    window.grecaptcha.ready(() => {
      window.grecaptcha.execute(RECAPTCHA_V3_SITE_KEY, { action }).then(resolve);
    });
  });
}

function readStoredSession() {
  try {
    const session = JSON.parse(localStorage.getItem(SESSION_KEY) || "null");
    if (!session?.token || !session?.expiresAt) return null;
    if (new Date(session.expiresAt).getTime() <= Date.now()) {
      localStorage.removeItem(SESSION_KEY);
      return null;
    }
    return session;
  } catch {
    localStorage.removeItem(SESSION_KEY);
    return null;
  }
}

export default function AuthGate({ children }) {
  const [session, setSession] = useState(() => readStoredSession());
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState("email");
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [v2Token, setV2Token] = useState("");
  const v2ContainerRef = useRef(null);
  const v2WidgetRef = useRef(null);

  useEffect(() => {
    if (!session) return undefined;
    const timeout = window.setTimeout(() => {
      localStorage.removeItem(SESSION_KEY);
      setSession(null);
    }, Math.max(0, new Date(session.expiresAt).getTime() - Date.now()));

    return () => window.clearTimeout(timeout);
  }, [session]);

  useEffect(() => {
    if (step !== "otp" || !RECAPTCHA_V2_SITE_KEY || !v2ContainerRef.current || v2WidgetRef.current !== null) return;

    loadScript("https://www.google.com/recaptcha/api.js?render=explicit", "recaptcha-v2").then(() => {
      if (!window.grecaptcha || !v2ContainerRef.current || v2WidgetRef.current !== null) return;
      v2WidgetRef.current = window.grecaptcha.render(v2ContainerRef.current, {
        sitekey: RECAPTCHA_V2_SITE_KEY,
        callback: (token) => setV2Token(token),
        "expired-callback": () => setV2Token("")
      });
    });
  }, [step]);

  async function requestOtp(event) {
    event.preventDefault();
    setError("");
    setStatus("");
    setLoading(true);

    try {
      const recaptchaToken = await getRecaptchaV3Token("request_otp");
      const response = await fetch(`${API_BASE}/api/auth/request-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, recaptchaToken })
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Could not send access code.");
      setStep("otp");
      setStatus(
        data.email_sent
          ? data.message || "One-time password sent. It expires in 20 minutes."
          : data.debug_message || "The access code could not be emailed. Check backend SMTP settings."
      );
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setLoading(false);
    }
  }

  async function verifyOtp(event) {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch(`${API_BASE}/api/auth/verify-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp, recaptchaToken: v2Token })
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Access code verification failed.");

      const nextSession = { token: data.session_token, expiresAt: data.expires_at, email };
      localStorage.setItem(SESSION_KEY, JSON.stringify(nextSession));
      setSession(nextSession);
    } catch (verifyError) {
      setError(verifyError.message);
      if (window.grecaptcha && v2WidgetRef.current !== null) {
        window.grecaptcha.reset(v2WidgetRef.current);
        setV2Token("");
      }
    } finally {
      setLoading(false);
    }
  }

  if (session) {
    return children;
  }

  return (
    <main className="auth-page">
      <section className="auth-panel card">
        <p className="eyebrow">Protected portfolio</p>
        <h1>Request Access</h1>
        <p className="muted">
          Enter your email address and a one-time password will be sent to you. Each code expires after 20 minutes.
        </p>

        {step === "email" ? (
          <form className="auth-form" onSubmit={requestOtp}>
            <label htmlFor="access-email">Email address</label>
            <input
              id="access-email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="name@example.com"
              required
            />
            <button className="btn btn-primary" type="submit" disabled={loading}>
              {loading ? "Sending..." : "Send One-Time Password"}
            </button>
          </form>
        ) : (
          <form className="auth-form" onSubmit={verifyOtp}>
            <label htmlFor="access-otp">One-time password</label>
            <input
              id="access-otp"
              inputMode="numeric"
              maxLength="6"
              value={otp}
              onChange={(event) => setOtp(event.target.value.replace(/\D/g, ""))}
              placeholder="000000"
              required
            />
            {RECAPTCHA_V2_SITE_KEY && <div className="recaptcha-box" ref={v2ContainerRef} />}
            <button className="btn btn-primary" type="submit" disabled={loading || (RECAPTCHA_V2_SITE_KEY && !v2Token)}>
              {loading ? "Verifying..." : "Unlock Portfolio"}
            </button>
            <button className="btn btn-ghost" type="button" onClick={() => setStep("email")}>
              Use Different Email
            </button>
          </form>
        )}

        {status && <p className="auth-status">{status}</p>}
        {error && <p className="auth-error">{error}</p>}
      </section>
    </main>
  );
}
