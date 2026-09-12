"use client";

import { useState } from "react";
import Link from "next/link";

export default function AddRepo() {
  const [githubURL, setGithubURL] = useState("");
  const [githubToken, setGithubToken] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await fetch("http://localhost:8080/add-repo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ githubURL, githubToken }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.msg || "Failed to add repository");
      }

 

      setMessage(data.msg || "Repository indexed successfully.");
      setGithubURL("");
      setGithubToken("");
    } catch (error) {
      setMessage(error.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="page-shell">
      <section className="card form-card">
        <div className="form-header">
          <div className="step-meta">
            <div className="step-line">
              <span className="step-label">Step 1 of 2</span>
              <span className="step-context">Connect your project</span>
            </div>
            <div className="step-track" aria-label="50% complete">
              <span className="step-progress" />
            </div>
          </div>
          <Link href="/" className="text-link">
            <span aria-hidden="true">&#8592;</span> Back home
          </Link>
        </div>

        <div className="heading-block">
          <div className="heading-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24">
              <path d="M12 2.5a9.5 9.5 0 0 0-3 18.51c.48.09.65-.2.65-.46v-1.68c-2.66.58-3.22-1.28-3.22-1.28-.44-1.14-1.07-1.44-1.07-1.44-.87-.6.07-.59.07-.59.96.07 1.47.99 1.47.99.86 1.47 2.25 1.05 2.8.8.09-.62.34-1.05.61-1.29-2.13-.24-4.37-1.07-4.37-4.75 0-1.05.38-1.9 1-2.57-.1-.24-.43-1.22.1-2.54 0 0 .82-.26 2.62.98a9.1 9.1 0 0 1 4.77 0c1.8-1.24 2.62-.98 2.62-.98.53 1.32.2 2.3.1 2.54.62.67 1 1.52 1 2.57 0 3.69-2.25 4.5-4.39 4.74.35.3.65.88.65 1.78v2.64c0 .26.17.56.66.46A9.5 9.5 0 0 0 12 2.5Z" />
            </svg>
          </div>
          <h1>Add your GitHub project</h1>
          
        </div>

        <form onSubmit={handleSubmit} className="form-box">
          <label className="field-label">
            <span className="label-row">
              {/* <span className="required-label">Required</span> */}
            </span>
            <input
              type="text"
              value={githubURL}
              onChange={(e) => setGithubURL(e.target.value)}
              placeholder="Example: https://github.com/your-name/project"
              required
            />
          </label>

          <label className="field-label">
            <span className="label-row">
              <span className="label-with-icon">
                <span>Access token</span>
                <span className="optional-label">Optional</span>
              </span>
              <span className="lock-icon" aria-label="Secure field">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <rect x="5" y="10" width="14" height="11" rx="2" />
                  <path d="M8 10V7a4 4 0 0 1 8 0v3" />
                </svg>
              </span>
            </span>
            <input
              type="text"
              value={githubToken}
              onChange={(e) => setGithubToken(e.target.value)}
              placeholder="Leave this blank if your project is public"
            />
            <span className="field-hint">
              Needed only when your repository is private.
            </span>
          </label>

          <button
            type="submit"
            disabled={loading}
            className="primary-btn full-width"
          >
            {loading ? "Getting your project ready..." : "Read my project"}
          </button>
        </form>

        {message ? (
          <div className="status-panel" role="alert" aria-live="polite">
            <p className="status-message">{message}</p>
            <div className="button-row compact-row">
              <Link href="/add-repo/ask-question" className="primary-btn">
                 {loading ? " Ask Question ": " Try again "}
              </Link>
            </div>
          </div>
        ) : null}
      </section>
    </main>
  );
}
