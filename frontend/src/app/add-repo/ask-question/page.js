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
      <section className="card form-card question-card animated-card">
        <div className="question-header">
          <div className="brand-lockup">
            <div className="brand-mark" aria-hidden="true">
              <svg viewBox="0 0 24 24">
                <path d="m8.5 7-5 5 5 5M15.5 7l5 5-5 5M14 4l-4 16" />
              </svg>
            </div>
            <div>
              <strong>Repo Mate</strong>
              <span>Your AI-powered GitHub code companion</span>
            </div>
          </div>
          <div className="question-header-actions">
            <span className="ready-badge">
              <span className="pulse-dot" aria-hidden="true" /> AI ready
            </span>
            <Link href="/" className="text-link">
              <span aria-hidden="true">&#8592;</span> Back home
            </Link>
          </div>
        </div>

        <div className="question-heading">
          {/* <div className="question-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24">
              <path d="M12 3a8.5 8.5 0 0 0-8.5 8.5c0 2.03.71 3.9 1.9 5.37L4 21l4.34-1.43A8.5 8.5 0 1 0 12 3Zm-1.05 4.5h2.1v5.1h-2.1V7.5Zm0 6.65h2.1v2.1h-2.1v-2.1Z" />
            </svg>
          </div> */}
          <h1>Ask about your code</h1>
          {/* <p>
            Ask anything about your repository and get a clear explanation from
            Repo Mate&apos;s AI.
          </p> */}
        </div>

        <form onSubmit={handleSubmit} className="form-box question-form">
          <label className="question-label">
            <span className="label-row">
              <span>What would you like to understand?</span>
              <span className="optional-label">Ask anything</span>
            </span>
            <textarea
              value={userQuery}
              onChange={(e) => setUserQuery(e.target.value)}
              // placeholder="Where does a user log in?\nHow is authentication handled?\nWhere is data stored?"
              rows={6}
              required
            />
            <div className="question-meta">
              <span>Press send to search your repository</span>
              <span>{userQuery.length} characters</span>
            </div>
          </label>

          <div
            className="suggestion-row"
            aria-label="Helpful question suggestions"
          >
            <span className="suggestion-label">Try asking</span>
            {[
              "Explain the project architecture",
              "How does authentication work?",
              "Where is the database connected?",
              "Explain this repository",
            ].map((suggestion) => (
              <button
                key={suggestion}
                type="button"
                className="suggestion-chip"
                onClick={() => setUserQuery(suggestion)}
              >
                {suggestion}
              </button>
            ))}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="primary-btn full-width"
          >
            <span
              className={loading ? "button-spinner" : "spark-icon"}
              aria-hidden="true"
            >
              {loading ? "" : "\u2736"}
            </span>
            {loading
              ? "Looking through your project..."
              : "Get a simple answer"}
          </button>
        </form>

        {result ? (
          <div className="results-panel question-results">
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
              <div className="answer-title">
                <span className="answer-avatar" aria-hidden="true">
                  ✦
                </span>
                <div>
                  <h3>Repo Mate AI</h3>
                  <span>
                    {result.error
                      ? "Unable to complete analysis"
                      : "Analysis complete"}
                  </span>
                </div>
                <span className="answer-check" aria-hidden="true">
                  &#10003;
                </span>
              </div>
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
