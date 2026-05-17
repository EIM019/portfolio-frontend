import { useEffect, useMemo, useRef, useState } from "react";

const starterPrompts = [
  "Summarize the requirements",
  "What problem does this app solve?",
  "What tech stack was used?",
  "What features can I test?"
];

function projectName(project) {
  return project?.title || "this app";
}

function formatList(items = []) {
  return items.length ? items.join(", ") : "details are being prepared";
}

function isGreeting(question) {
  return /^(hi|hello|hey|good morning|good afternoon|good evening|yo|sup)\b[!.\s]*$/i.test(question);
}

function isThanks(question) {
  return /\b(thanks|thank you|appreciate|great|nice|cool)\b/i.test(question);
}

function isHelpRequest(question) {
  return /\b(help|what can you do|what can i ask|options|questions)\b/i.test(question);
}

function projectIntro(project) {
  const name = projectName(project);
  if (!project) {
    return "I can help once an app is available in the portfolio. When a project is added, I can turn its details into an employer-friendly requirements brief.";
  }

  return `${name} is ${project.description} I can walk through the requirements, user problem, solution, tech stack, features, testing notes, and Eric's role in building it.`;
}

function answerForProject(project, question) {
  const trimmed = question.trim();
  const q = trimmed.toLowerCase();
  const name = projectName(project);

  if (isGreeting(trimmed)) {
    return project
      ? `Hi there. I can help you review ${name}. Ask me what it does, why it was built, what requirements it covers, how it works, or what to test first.`
      : "Hi there. I can help employers understand the uploaded apps once project details are available.";
  }

  if (isThanks(trimmed)) {
    return "You are welcome. I can also turn this into a short employer summary, a technical walkthrough, or a quick testing checklist.";
  }

  if (isHelpRequest(trimmed)) {
    return "You can ask things like: what problem does this app solve, what are the main requirements, what features should I test, what stack was used, what was Eric's role, or what makes this project useful for a business.";
  }

  if (!project) {
    return "I can answer once at least one uploaded app is available in the portfolio. Add project details and I will summarize requirements, stack, features, and testing notes.";
  }

  if (q.includes("tell me about") || q.includes("overview") || q === "what is this" || q === "what does it do") {
    return projectIntro(project);
  }

  if (q.includes("requirement") || q.includes("summar")) {
    return `${name} requirements: ${project.problem || "it addresses a clear user need"}. The solution: ${project.solution || project.description}. Core features include ${formatList(project.features)}. The build uses ${formatList(project.tech_stack)}.`;
  }

  if (q.includes("problem") || q.includes("solve") || q.includes("why")) {
    return project.problem
      ? `${name} solves this problem: ${project.problem}`
      : `${name} is designed to solve the workflow described in the project summary: ${project.description}`;
  }

  if (q.includes("solution") || q.includes("approach") || q.includes("build")) {
    return project.solution
      ? `The solution approach for ${name}: ${project.solution}`
      : `${name} was built as a practical software solution with a user-facing interface, backend logic, and structured project data.`;
  }

  if (q.includes("feature") || q.includes("test") || q.includes("demo")) {
    return `Features to review in ${name}: ${formatList(project.features)}. ${project.live_url ? `Live demo: ${project.live_url}` : "A live demo link will be added when available."}`;
  }

  if (q.includes("stack") || q.includes("tech") || q.includes("language") || q.includes("database")) {
    return `${name} uses ${formatList(project.tech_stack)}. This shows experience across frontend, backend, and data/database work.`;
  }

  if (q.includes("link") || q.includes("live") || q.includes("url")) {
    return project.live_url ? `You can open ${name} here: ${project.live_url}` : `A live link for ${name} has not been added yet.`;
  }

  if (q.includes("role") || q.includes("contribution") || q.includes("did you")) {
    return `Eric handled the software engineering work for ${name}: translating requirements into features, shaping the UI, building the backend/data flow where needed, and preparing the app for review.`;
  }

  if (q.includes("business") || q.includes("value") || q.includes("useful")) {
    return `${name} has business value because it turns a real workflow into a structured application: ${project.problem || project.description} It is useful for showing product thinking, implementation, and data-aware engineering.`;
  }

  return `I can answer that best if you point me toward one angle: requirements, features, stack, problem, solution, testing, business value, or Eric's role. Quick overview: ${projectIntro(project)}`;
}

export default function AppRequirementsChat({ projects = [] }) {
  const availableProjects = projects.length ? projects : [];
  const [selectedId, setSelectedId] = useState(availableProjects[0]?.id || "");
  const [input, setInput] = useState("");
  const chatBodyRef = useRef(null);
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      text: "Hi, I can brief employers on the apps in this portfolio. Choose an app, then ask about requirements, features, stack, or what to test."
    }
  ]);

  const selectedProject = useMemo(
    () => availableProjects.find((project) => String(project.id) === String(selectedId)) || availableProjects[0],
    [availableProjects, selectedId]
  );

  useEffect(() => {
    if (availableProjects.length && !availableProjects.some((project) => String(project.id) === String(selectedId))) {
      setSelectedId(availableProjects[0].id);
    }
  }, [availableProjects, selectedId]);

  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  }, [messages]);

  function ask(question) {
    const trimmed = question.trim();
    if (!trimmed) return;

    setMessages((current) => [
      ...current,
      { role: "user", text: trimmed },
      { role: "assistant", text: answerForProject(selectedProject, trimmed) }
    ]);
    setInput("");
  }

  return (
    <div className="app-chat card">
      <div className="app-chat-header">
        <div>
          <p className="eyebrow">Employer app brief</p>
          <h2>Ask About Uploaded Apps</h2>
        </div>
        <select
          aria-label="Choose app"
          value={selectedId}
          onChange={(event) => setSelectedId(event.target.value)}
          disabled={!availableProjects.length}
        >
          {availableProjects.length ? (
            availableProjects.map((project) => (
              <option value={project.id} key={project.id}>
                {project.title}
              </option>
            ))
          ) : (
            <option>No apps yet</option>
          )}
        </select>
      </div>

      <div className="app-chat-body" aria-live="polite" ref={chatBodyRef}>
        {messages.map((message, index) => (
          <div className={`chat-bubble ${message.role}`} key={`${message.role}-${index}`}>
            {message.text}
          </div>
        ))}
      </div>

      <div className="prompt-row">
        {starterPrompts.map((prompt) => (
          <button type="button" onClick={() => ask(prompt)} key={prompt}>
            {prompt}
          </button>
        ))}
      </div>

      <form
        className="chat-input-row"
        onSubmit={(event) => {
          event.preventDefault();
          ask(input);
        }}
      >
        <input
          aria-label="Ask about an uploaded app"
          placeholder="Ask about requirements, features, stack..."
          value={input}
          onChange={(event) => setInput(event.target.value)}
        />
        <button className="btn btn-primary" type="submit">
          Ask
        </button>
      </form>
    </div>
  );
}
