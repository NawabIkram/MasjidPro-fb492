import { Download, FileText, TrendingUp } from "lucide-react";
import { Badge, Card, EmptyState, LoadingSkeleton, ProgressBar, SectionHeader } from "../components/ui";
import { donors, fundBreakdown, monthlyDonations, recurringTrend, reportMetrics } from "../data/mockData";
import { currency } from "../utils/format";

const maxMonthly = Math.max(...monthlyDonations.map((item) => item.amount));
const maxRecurring = Math.max(...recurringTrend.map((item) => item.donors));

export function ReportsPage() {
  return (
    <div className="page-stack">
      <div className="page-title-row">
        <div>
          <span className="eyebrow">Reports</span>
          <h1>Monthly giving, fund distribution, top donors, and recurring donation trends.</h1>
        </div>
        <div className="button-row">
          <button className="secondary-button" type="button">
            <Download size={18} />
            Export CSV
          </button>
          <button className="primary-button" type="button">
            <FileText size={18} />
            Export PDF
          </button>
        </div>
      </div>

      <div className="stats-grid four">
        {reportMetrics.map((metric) => (
          <Card className="metric-card" key={metric.label}>
            <span>{metric.label}</span>
            <strong>{metric.label.includes("Donor Retention") ? `${metric.value}%` : currency(metric.value)}</strong>
            <Badge tone="green">+{metric.change}%</Badge>
          </Card>
        ))}
      </div>

      <div className="report-grid">
        <Card>
          <SectionHeader title="Monthly Donations Chart" eyebrow="Last 6 months" />
          <div className="bar-chart">
            {monthlyDonations.map((item) => (
              <div className="bar-column" key={item.month}>
                <span style={{ height: `${(item.amount / maxMonthly) * 100}%` }} />
                <strong>{item.month}</strong>
                <small>{currency(item.amount)}</small>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <SectionHeader title="Fund Distribution" eyebrow="By category" />
          <div className="fund-list">
            {fundBreakdown.map((fund) => (
              <div className="fund-row" key={fund.fund}>
                <div>
                  <strong>{fund.fund}</strong>
                  <span>{currency(fund.amount)}</span>
                </div>
                <ProgressBar value={fund.percentage} color={fund.color} />
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div className="report-grid">
        <Card>
          <SectionHeader title="Top Donors" eyebrow="This month" />
          <div className="top-donor-list">
            {donors.map((donor, index) => (
              <div className="top-donor" key={donor.id}>
                <span>{index + 1}</span>
                <div>
                  <strong>{donor.name}</strong>
                  <p>{donor.fundPreference} preference</p>
                </div>
                <strong>{currency(donor.lifetimeDonations)}</strong>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <SectionHeader title="Recurring Donations Trend" eyebrow="Active donors" />
          <div className="line-chart">
            {recurringTrend.map((item) => (
              <div className="trend-point" key={item.month}>
                <span style={{ height: `${(item.donors / maxRecurring) * 100}%` }} />
                <small>{item.month}</small>
                <strong>{item.donors}</strong>
              </div>
            ))}
          </div>
          <div className="info-box">
            <TrendingUp size={20} />
            <p>Recurring donors increased steadily across the last six months.</p>
          </div>
        </Card>
      </div>

      <div className="dashboard-grid">
        <Card>
          <SectionHeader title="No Reports Yet" eyebrow="Empty state" />
          <EmptyState title="No reports yet" description="New masjids will see generated reports here after donation data arrives." />
        </Card>
        <Card>
          <SectionHeader title="Loading Reports" eyebrow="Loading state" />
          <LoadingSkeleton rows={4} />
        </Card>
      </div>
    </div>
  );
}
