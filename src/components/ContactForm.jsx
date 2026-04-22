import { useState } from "react";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";

export default function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle");
  const [serverMessage, setServerMessage] = useState("");

  const validate = () => {
    const nextErrors = {};
    if (!form.name.trim()) nextErrors.name = "Name is required";
    if (!form.email.trim()) nextErrors.email = "Email is required";
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) nextErrors.email = "Enter a valid email";
    if (!form.message.trim()) nextErrors.message = "Message is required";
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validate()) return;
    setStatus("submitting");
    try {
      const response = await fetch(`${API_BASE}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });
      const payload = await response.json();
      if (!response.ok) throw new Error(payload.error || "Request failed");
      setStatus("success");
      setServerMessage(payload.message);
    } catch (error) {
      setStatus("error");
      setServerMessage(error.message);
    }
  };

  return (
    <div className="card contact-card">
      {status === "success" ? (
        <div className="contact-success reveal is-visible">
          <h3>Message sent successfully</h3>
          <p className="muted">{serverMessage || "Thanks for reaching out. I will get back soon."}</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="contact-form">
          <div>
            <label htmlFor="name">Name</label>
            <input
              id="name"
              value={form.name}
              onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
            />
            {errors.name ? <small>{errors.name}</small> : null}
          </div>
          <div>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              value={form.email}
              onChange={(e) => setForm((prev) => ({ ...prev, email: e.target.value }))}
            />
            {errors.email ? <small>{errors.email}</small> : null}
          </div>
          <div>
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              rows="4"
              value={form.message}
              onChange={(e) => setForm((prev) => ({ ...prev, message: e.target.value }))}
            />
            {errors.message ? <small>{errors.message}</small> : null}
          </div>
          <button className="btn btn-primary" type="submit" disabled={status === "submitting"}>
            {status === "submitting" ? "Sending..." : "Send Message"}
          </button>
          {status === "error" ? <p style={{ color: "#f87171" }}>{serverMessage}</p> : null}
        </form>
      )}
      <div className="social-row">
        <a href="https://linkedin.com" target="_blank" rel="noreferrer">
          LinkedIn
        </a>
        <a href="https://wa.me/1234567890" target="_blank" rel="noreferrer">
          WhatsApp
        </a>
        <a href="mailto:you@example.com">Email</a>
      </div>
    </div>
  );
}
