import {
  BarChart3,
  BellRing,
  Calculator,
  Download,
  Megaphone,
  Plus,
  Send,
  ShieldCheck,
  Sparkles,
  WalletCards,
} from "lucide-react";
import {
  announcements,
  auditLog,
  campaign,
  fundBreakdown,
  prayerTimes,
} from "../data/mockData";
import { currency, percent } from "../utils/format";
import { Badge, Card, EmptyState, LoadingSkeleton, ProgressBar, SectionHeader, StatCard, TrustStrip } from "../components/ui";

const quickActions = [
  { label: "Create Announcement", icon: Megaphone },
  { label: "Add Donation", icon: Plus },
  { label: "Export Report", icon: Download },
  { label: "Send Notification", icon: BellRing },
  { label: "Calculate Zakat", icon: Calculator },
];

export function DashboardPage() {
  const nextPrayer = prayerTimes.find((prayer) => prayer.isNext) ?? prayerTimes[0];
  const campaignPercent = Math.round((campaign.raised / campaign.goal) * 100);

  return (
    <div className="page-stack">
      <div className="hero-row">
        <div>
          <span className="eyebrow">Phase 1 control center</span>
          <h1>Run Phase 1 masjid operations from one calm workspace.</h1>
        </div>
        <button className="primary-button" type="button">
          <Sparkles size={18} />
          Generate board summary
        </button>
      </div>

      <div className="stats-grid four">
        <StatCard title="Total Donations" value={currency(18340)} change="+24% this month" icon={WalletCards} />
        <StatCard title="Zakat Fund" value={currency(7240)} change="+18% this month" icon={ShieldCheck} tone="gold" />
        <StatCard title="Sadaqah Fund" value={currency(4180)} change="+9% this month" icon={WalletCards} />
        <StatCard title="Recurring Donors" value="156" change="+12 donors" icon={BarChart3} tone="blue" />
      </div>

      <div className="dashboard-grid">
        <Card>
          <SectionHeader title="Fund Breakdown" eyebrow="Live allocation" />
          <div className="fund-list">
            {fundBreakdown.map((fund) => (
              <div className="fund-row" key={fund.fund}>
                <div>
                  <strong>{fund.fund} Fund</strong>
                  <span>{currency(fund.amount)}</span>
                </div>
                <div className="fund-progress">
                  <span>{percent(fund.percentage)}</span>
                  <ProgressBar value={fund.percentage} color={fund.color} label={`${fund.fund} progress`} />
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="campaign-card">
          <SectionHeader title={campaign.name} eyebrow="Donation Goal" />
          <div className="campaign-amount">
            <strong>{currency(campaign.raised)}</strong>
            <span>raised of {currency(campaign.goal)}</span>
          </div>
          <ProgressBar value={campaignPercent} label="Campaign progress" />
          <div className="campaign-footer">
            <Badge tone="gold">{campaignPercent}% complete</Badge>
            <span>{campaign.dueDate}</span>
          </div>
          <button className="secondary-button" type="button">View Campaign</button>
        </Card>
      </div>

      <div className="dashboard-grid three">
        <Card>
          <SectionHeader title="Quick Actions" eyebrow="Common tasks" />
          <div className="quick-actions">
            {quickActions.map((action) => (
              <button type="button" key={action.label}>
                <action.icon size={18} />
                {action.label}
              </button>
            ))}
          </div>
        </Card>

        <Card>
          <SectionHeader title="Next Prayer" eyebrow="Prayer Times" />
          <div className="next-prayer-card">
            <span>{nextPrayer.name}</span>
            <strong>02:18:45</strong>
            <p>Iqamah at {nextPrayer.iqamah}</p>
          </div>
          <div className="mini-prayer-list">
            {prayerTimes.map((prayer) => (
              <div className={prayer.isNext ? "mini-prayer next" : "mini-prayer"} key={prayer.name}>
                <span>{prayer.name}</span>
                <strong>{prayer.adhan}</strong>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <SectionHeader title="AI Smart Insight" eyebrow="Donation signal" />
          <div className="insight-box">
            <Sparkles size={20} />
            <div>
              <strong>Donations are 15% below forecast.</strong>
              <p>Suggested response: start a Friday campaign focused on recurring Sadaqah.</p>
            </div>
          </div>
          <button className="secondary-button" type="button">View Details</button>
        </Card>
      </div>

      <div className="dashboard-grid">
        <Card>
          <SectionHeader title="Recent Announcements" action={<button className="text-button" type="button">View all</button>} />
          <div className="announcement-list">
            {announcements.map((announcement) => (
              <div className="announcement-item" key={announcement.id}>
                <div>
                  <strong>{announcement.title}</strong>
                  <p>{announcement.excerpt}</p>
                </div>
                <Badge tone={announcement.status === "Published" ? "green" : announcement.status === "Scheduled" ? "blue" : "neutral"}>
                  {announcement.status}
                </Badge>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <SectionHeader title="Activity Log" eyebrow="Audit trail" />
          <div className="activity-list">
            {auditLog.map((entry) => (
              <div className="activity-item" key={entry.id}>
                <span>{entry.time}</span>
                <div>
                  <strong>{entry.action}</strong>
                  <p>{entry.user}</p>
                </div>
                <Badge tone={entry.status === "Success" ? "green" : "gold"}>{entry.status}</Badge>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div className="dashboard-grid">
        <TrustStrip />
        <Card>
          <SectionHeader title="State Coverage" eyebrow="UI readiness" />
          <div className="state-grid">
            <LoadingSkeleton rows={2} />
            <EmptyState title="No donations yet" description="When a new masjid starts, first donation records appear here." />
          </div>
        </Card>
      </div>
    </div>
  );
}
