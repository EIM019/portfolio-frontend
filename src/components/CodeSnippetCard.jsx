export default function CodeSnippetCard() {
  return (
    <div className="code-card card">
      <div className="code-header">
        <span className="dot red" />
        <span className="dot yellow" />
        <span className="dot green" />
      </div>
      <pre>
        <code>
          <span className="tok-key">const</span> <span className="tok-var">developer</span>{" "}
          <span className="tok-op">=</span> {"{"}
          {"\n  "}
          <span className="tok-prop">name</span>: <span className="tok-str">"Eric Mokgweetsi"</span>,
          {"\n  "}
          <span className="tok-prop">role</span>: <span className="tok-str">"Final-year CS Student @ BAC"</span>,
          {"\n  "}
          <span className="tok-prop">focus</span>: <span className="tok-str">"Scalable full-stack systems"</span>,
          {"\n  "}
          <span className="tok-prop">stack</span>: [<span className="tok-str">"React"</span>,{" "}
          <span className="tok-str">"Flask"</span>, <span className="tok-str">"SQLite"</span>]
          {"\n"}
          {"};"}
        </code>
      </pre>
    </div>
  );
}
