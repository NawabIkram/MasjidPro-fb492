import { Mail, Phone, Repeat2, UserRound } from "lucide-react";
import { Badge, Card, EmptyState, SectionHeader } from "../components/ui";
import { donors } from "../data/mockData";
import { currency } from "../utils/format";

export function DonorsPage() {
  const activeDonor = donors[0];

  return (
    <div className="page-stack">
      <div className="page-title-row">
        <div>
          <span className="eyebrow">Donor CRM</span>
          <h1>Understand giving patterns and keep donor relationships organized.</h1>
        </div>
        <button className="primary-button" type="button">
          <UserRound size={18} />
          Add Donor
        </button>
      </div>

      <div className="donor-layout">
        <Card>
          <SectionHeader title="Donor Profiles" eyebrow="Community CRM" />
          <div className="donor-list">
            {donors.map((donor) => (
              <div className={donor.id === activeDonor.id ? "donor-row active" : "donor-row"} key={donor.id}>
                <div className="avatar small">{donor.name.slice(0, 2).toUpperCase()}</div>
                <div>
                  <strong>{donor.name}</strong>
                  <span>{donor.email}</span>
                </div>
                {donor.recurring ? <Badge tone="green">Recurring</Badge> : <Badge>One-time</Badge>}
              </div>
            ))}
          </div>
        </Card>

        <Card className="donor-profile">
          <SectionHeader title={activeDonor.name} eyebrow="Profile card" />
          <div className="profile-grid">
            <div><span>Lifetime donations</span><strong>{currency(activeDonor.lifetimeDonations)}</strong></div>
            <div><span>Last donation</span><strong>{activeDonor.lastDonation}</strong></div>
            <div><span>Fund preference</span><strong>{activeDonor.fundPreference}</strong></div>
            <div><span>Recurring status</span><strong>{activeDonor.recurring ? "Active" : "Inactive"}</strong></div>
          </div>
          <div className="contact-list">
            <span><Mail size={16} /> {activeDonor.email}</span>
            <span><Phone size={16} /> {activeDonor.phone}</span>
            <span><Repeat2 size={16} /> Monthly recurring donor</span>
          </div>
        </Card>
      </div>

      <Card>
        <SectionHeader title="Donation History" eyebrow="Selected donor" />
        {activeDonor.history.length === 0 ? (
          <EmptyState title="No donations yet" description="This donor has not made a recorded donation." />
        ) : (
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Donation ID</th>
                  <th>Fund</th>
                  <th>Amount</th>
                  <th>Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {activeDonor.history.map((donation) => (
                  <tr key={donation.id}>
                    <td>{donation.id}</td>
                    <td>{donation.fund}</td>
                    <td>{currency(donation.amount)}</td>
                    <td>{donation.date}</td>
                    <td><Badge tone="green">{donation.status}</Badge></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </div>
  );
}
