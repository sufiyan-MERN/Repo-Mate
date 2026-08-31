"use client";

import { useState } from "react";
import Link from "next/link";

export default function AskQuestionPage() {
  const [userQuery, setUserQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    try {
      const res = await fetch("/api/ask-question", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userQuery }),
      });

      const data = await res.json();
      console.log(data);
      if (!res.ok) {
        throw new Error(data?.msg || "Failed to get answer");
      }

      setResult({
        question: userQuery,
        answer: data.AI_summary || "No answer returned.",
        files: data.relaventFiles || [],
      });
      setUserQuery("");
    } catch (error) {
      setResult({
        question: userQuery,
        answer: error.message || "Something went wrong.",
        files: [],
        error: true,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="page-shell">
      <section className="card form-card animated-card">
        <div className="top-row">
          <div>
            <p className="eyebrow small">Code Intelligence</p>
            <h1>Ask about your code</h1>
          </div>
          <Link href="/" className="text-link">
            Back home
          </Link>
        </div>

        <form onSubmit={handleSubmit} className="form-box">
          <label>
            What would you like to understand?
            <textarea
              value={userQuery}
              onChange={(e) => setUserQuery(e.target.value)}
              placeholder="Example: Where does a user log in? Or: How does this project save data?"
              rows={6}
              required
            />
          </label>

          <button
            type="submit"
            disabled={loading}
            className="primary-btn full-width"
          >
            {loading ? "Looking through your project..." : "Get a simple answer"}
          </button>
        </form>

        {result ? (
          <div className="results-panel">
            <div className="result-header-box">
              <div>
                <span className="mini-label">Your query</span>
                <h3>{result.question}</h3>
              </div>
              <span className="relevance-badge">
                {result.files.length} relevant file
                {result.files.length === 1 ? "" : "s"}
              </span>
            </div>

            <div className={`answer-box ${result.error ? "error" : ""}`}>
              <h3>Answer</h3>
              <p>{result.answer}</p>
            </div>

            {result.files.length > 0 ? (
              <div className="files-panel">
                <div className="files-header">
                  <h3>Relevant files</h3>
                </div>

                <div className="file-grid">
                  {result.files.map((file, index) => (
                    <div
                      key={`${file.fileName}-${index}`}
                      className="file-card"
                    >
                      <div className="file-card-top">
                        <span className="file-tag">{file.fileName}</span>
                        <span className="score-pill">
                          {Math.round(file.similarityScore * 100)}%
                        </span>
                      </div>

                      <p className="file-summary">{file.fileSummary}</p>

                      {file.sourceCode ? (
                        <pre className="code-preview">
                          {String(file.sourceCode).slice(0, 180)}
                          {String(file.sourceCode).length > 180 ? "..." : ""}
                        </pre>
                      ) : null}
                    </div>
                  ))}
                </div>
              </div>
            ) : null}
          </div>
        ) : null}
      </section>
    </main>
  );
}
