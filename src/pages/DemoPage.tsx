import { ArrowRight, PlayCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { demoScenarios } from "../data/mockData";

export function DemoPage() {
  return (
    <main className="public-page">
      <nav className="public-nav">
        <Link className="public-brand" to="/">
          <span className="brand-mark">M</span>
          <strong>MasjidPro</strong>
        </Link>
        <div>
          <Link to="/pricing">Pricing</Link>
          <Link to="/login">Login</Link>
        </div>
      </nav>

      <section className="public-heading">
        <span className="eyebrow">Interactive product tour</span>
        <h1>Explore everyday workflows for masjid administrators.</h1>
        <p>No login required. Preview how donations, announcements, and reports work in MasjidPro.</p>
      </section>

      <section className="demo-grid">
        {demoScenarios.map((scenario) => (
          <article className="demo-card" key={scenario.id}>
            <PlayCircle size={24} />
            <span className="eyebrow">{scenario.audience}</span>
            <h2>{scenario.title}</h2>
            <p>{scenario.outcome}</p>
            <ol>
              {scenario.steps.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
            <Link className="secondary-button full" to={scenario.id === "donations-demo" ? "/donations" : scenario.id === "jumuah-demo" ? "/announcements" : "/reports"}>
              Run Demo
              <ArrowRight size={18} />
            </Link>
          </article>
        ))}
      </section>
    </main>
  );
}
