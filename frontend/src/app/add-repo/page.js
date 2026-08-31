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
        <div className="top-row">
          <div>
            <p className="eyebrow">Step 1 of 2 · Connect your project</p>
            <h1>Add your GitHub project</h1>
          </div>
          <Link href="/" className="text-link">
            Back home
          </Link>
        </div>

        <form onSubmit={handleSubmit} className="form-box">
          <label>
            Your GitHub project link
            <input
              type="text"
              value={githubURL}
              onChange={(e) => setGithubURL(e.target.value)}
              placeholder="Example: https://github.com/your-name/project"
              required
            />
          </label>

          <label>
            Access token (only needed for private projects)
            <input
              type="text"
              value={githubToken}
              onChange={(e) => setGithubToken(e.target.value)}
              placeholder="Leave this blank if your project is public"
            />
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
          <div className="status-panel">
            <p className="status-message">{message}</p>
            <div className="button-row compact-row">
              <Link href="/add-repo/ask-question" className="primary-btn">
                Ask Question
              </Link>
            </div>
          </div>
        ) : null}
      </section>
    </main>
  );
}
