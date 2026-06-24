import { CalendarCheck, Mail, PhoneCall, Rocket, UsersRound } from "lucide-react";
import { Badge, Card, ProgressBar, SectionHeader, StatCard } from "../components/ui";
import { betaClients, launchMetrics, outreachChannels, pricingPlans } from "../data/mockData";
import { currency } from "../utils/format";

function stageTone(stage: string): "green" | "blue" | "gold" | "red" | "neutral" {
  if (stage === "Paid") return "green";
  if (stage === "Trial") return "blue";
  if (stage === "At Risk") return "red";
  if (stage === "Beta") return "gold";
  return "neutral";
}

export function LaunchPage() {
  const paidClients = betaClients.filter((client) => client.stage === "Paid").length;
  const projectedMrr = betaClients.reduce((sum, client) => sum + (client.stage === "Paid" ? client.monthlyValue : 0), 0);
  const growthPlan = pricingPlans.find((plan) => plan.id === "growth");

  return (
    <div className="page-stack">
      <div className="page-title-row">
        <div>
          <span className="eyebrow">Phase 2 Launch</span>
          <h1>Convert beta masjids into first paying SaaS clients.</h1>
        </div>
        <div className="button-row">
          <button className="secondary-button" type="button">
            <Mail size={18} />
            Send Outreach
          </button>
          <button className="primary-button" type="button">
            <PhoneCall size={18} />
            Book Demo Call
          </button>
        </div>
      </div>

      <div className="stats-grid four">
        <StatCard title="Paying Clients" value={`${paidClients}`} change="Target 10-20" icon={UsersRound} />
        <StatCard title="Current MRR" value={currency(projectedMrr)} change="Phase 2 active" icon={Rocket} tone="blue" />
        <StatCard title="Growth Plan" value={`$${growthPlan?.price ?? 99}/mo`} change="Primary offer" icon={CalendarCheck} tone="gold" />
        <StatCard title="Demos Booked" value="31" change="+9 this week" icon={PhoneCall} />
      </div>

      <div className="dashboard-grid">
        <Card>
          <SectionHeader title="Launch Targets" eyebrow="Month 3-4" />
          <div className="fund-list">
            {launchMetrics.map((metric) => (
              <div className="fund-row" key={metric.label}>
                <div>
                  <strong>{metric.label}</strong>
                  <span>{metric.value} / {metric.target}</span>
                </div>
                <ProgressBar value={metric.progress} />
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <SectionHeader title="Go-To-Market Checklist" eyebrow="Daily execution" />
          <div className="checklist launch-checklist">
            <span>Publish pricing page with Starter, Growth, and Pro plans</span>
            <span>Call every beta client with 50% first-month offer</span>
            <span>Send 500 cold emails to US and UK Islamic centers</span>
            <span>Post weekly helpful content in Muslim community groups</span>
            <span>Collect one beta case study and testimonial</span>
          </div>
        </Card>
      </div>

      <Card>
        <SectionHeader title="Beta Client Pipeline" eyebrow="Conversion board" />
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Masjid</th>
                <th>Country</th>
                <th>Contact</th>
                <th>Stage</th>
                <th>Plan</th>
                <th>MRR</th>
                <th>Next Action</th>
              </tr>
            </thead>
            <tbody>
              {betaClients.map((client) => (
                <tr key={client.id}>
                  <td><strong>{client.masjidName}</strong><span>Last contact {client.lastContact}</span></td>
                  <td>{client.country}</td>
                  <td>{client.contact}</td>
                  <td><Badge tone={stageTone(client.stage)}>{client.stage}</Badge></td>
                  <td>{client.plan}</td>
                  <td>{currency(client.monthlyValue)}</td>
                  <td>{client.nextAction}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <div className="dashboard-grid">
        {outreachChannels.map((channel) => (
          <Card key={channel.id}>
            <SectionHeader title={channel.name} eyebrow="Outreach channel" />
            <div className="outreach-grid">
              <div><span>Sent</span><strong>{channel.sent}</strong></div>
              <div><span>Replies</span><strong>{channel.replies}</strong></div>
              <div><span>Demos</span><strong>{channel.demosBooked}</strong></div>
              <div><span>Reply rate</span><strong>{channel.conversionRate}%</strong></div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
