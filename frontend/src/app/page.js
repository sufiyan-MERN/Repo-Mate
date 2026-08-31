import Link from "next/link";

const featureList = [
  "AI-powered repo understanding",
  "Instant answers from code context",
  "Private and public GitHub support",
];

export default function Home() {
  return (
    <main className="page-shell home-shell">
      <section className="hero-card">
        <div className="hero-copy">
          <p className="eyebrow">Repo Mate</p>
          <h1>Turn your GitHub repo into an instant knowledge partner.</h1>
          <p className="subtitle">
            Index your project, navigate the codebase faster, and ask technical
            questions without digging through files manually.
          </p>

          <div className="button-row">
            <Link href="/add-repo" className="primary-btn">
              Add Repository
            </Link>
          </div>

          <div className="feature-list" aria-label="Repo Mate benefits">
            {featureList.map((item) => (
              <span key={item} className="feature-pill">
                {item}
              </span>
            ))}
          </div>
        </div>

        <div className="hero-visual" aria-label="Repository overview preview">
          <div className="orb orb-one" />
          <div className="orb orb-two" />

          <div className="dashboard-card floating-card main-card">
            <div className="dashboard-topbar">
              <span className="dot dot-red" />
              <span className="dot dot-yellow" />
              <span className="dot dot-green" />
            </div>

            <img
              src="https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=900&q=80"
              alt="Developer workspace with code on a laptop"
              className="dashboard-image"
            />
          </div>

          <div className="floating-card side-card">
            <div className="mini-header">
              <span className="mini-label">Repo health</span>
              <span className="status-badge">Live</span>
            </div>
            <div className="metric-row">
              <strong>86%</strong>
              <span>understood</span>
            </div>
            <div className="progress-track">
              <span className="progress-fill" />
            </div>
          </div>

          <div className="floating-card insight-card">
            <span className="mini-label">AI insight</span>
            <h4 className="insight-card-question">where is Auth ?</h4>
            <p>
              “Authentication is handled in the middleware before the request
              reaches the controller.”
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
