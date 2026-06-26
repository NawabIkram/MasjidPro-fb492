import { ArrowLeft, LayoutDashboard, SearchX } from "lucide-react";
import { Link } from "react-router-dom";

export function NotFoundPage() {
  return (
    <main className="not-found-page">
      <section className="not-found-card">
        <div className="icon-pill icon-green">
          <SearchX size={22} />
        </div>
        <span className="eyebrow">Page not found</span>
        <h1>This MasjidPro page is not available.</h1>
        <p>The route may have changed, or the section may not be part of the current frontend workspace.</p>
        <div className="button-row">
          <Link className="primary-button" to="/dashboard">
            <LayoutDashboard size={18} />
            Open Dashboard
          </Link>
          <Link className="secondary-button" to="/">
            <ArrowLeft size={18} />
            Back to Home
          </Link>
        </div>
      </section>
    </main>
  );
}
