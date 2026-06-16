import { useMemo, useState } from "react";
import { Download, FileText, Filter, MoreHorizontal, Plus, Search, ShieldCheck } from "lucide-react";
import { Badge, Card, EmptyState, Modal, ProgressBar, SectionHeader, StatCard, Toast, TrustStrip } from "../components/ui";
import { donations, fundBreakdown } from "../data/mockData";
import type { Donation, DonationStatus, FundType } from "../types";
import { currency } from "../utils/format";

const funds: Array<FundType | "All"> = ["All", "Zakat", "Sadaqah", "General", "Building"];
const statuses: Array<DonationStatus | "All"> = ["All", "Completed", "Pending", "Refunded"];

function statusTone(status: DonationStatus): "green" | "gold" | "red" {
  if (status === "Completed") return "green";
  if (status === "Pending") return "gold";
  return "red";
}

export function DonationsPage() {
  const [search, setSearch] = useState("");
  const [fund, setFund] = useState<FundType | "All">("All");
  const [status, setStatus] = useState<DonationStatus | "All">("All");
  const [dateRange, setDateRange] = useState("Last 30 days");
  const [method, setMethod] = useState("All");
  const [showAddModal, setShowAddModal] = useState(false);
  const [toast, setToast] = useState("");

  const visibleDonations = useMemo(() => {
    return donations.filter((donation) => {
      const matchesSearch =
        donation.donorName.toLowerCase().includes(search.toLowerCase()) ||
        donation.donorEmail.toLowerCase().includes(search.toLowerCase());
      const matchesFund = fund === "All" || donation.fund === fund;
      const matchesStatus = status === "All" || donation.status === status;
      const matchesMethod = method === "All" || donation.method === method;
      return matchesSearch && matchesFund && matchesStatus && matchesMethod;
    });
  }, [fund, method, search, status]);

  return (
    <div className="page-stack">
      <div className="page-title-row">
        <div>
          <span className="eyebrow">Donations</span>
          <h1>Track every contribution with clear status and refund visibility.</h1>
        </div>
        <div className="button-row">
          <button className="secondary-button" type="button">
            <Download size={18} />
            Export CSV
          </button>
          <button className="secondary-button" type="button">
            <FileText size={18} />
            Export PDF
          </button>
          <button className="primary-button" type="button" onClick={() => setShowAddModal(true)}>
            <Plus size={18} />
            Add Donation
          </button>
        </div>
      </div>

      <div className="stats-grid">
        <StatCard title="Total Donations" value={currency(142580)} change="+12% vs last month" icon={ShieldCheck} />
        <StatCard title="Zakat Fund" value={currency(48230)} change="+8% vs last month" icon={ShieldCheck} tone="gold" />
        <StatCard title="General Fund" value={currency(62200)} change="+6% vs last month" icon={ShieldCheck} tone="blue" />
      </div>

      <Card>
        <SectionHeader title="Filters" eyebrow="Search and segment" />
        <div className="filters-grid">
          <label className="search-field">
            <Search size={18} />
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search donor name or email"
            />
          </label>
          <label>
            <span>Date range</span>
            <select value={dateRange} onChange={(event) => setDateRange(event.target.value)}>
              <option>Last 7 days</option>
              <option>Last 30 days</option>
              <option>Ramadan campaign</option>
              <option>Custom range</option>
            </select>
          </label>
          <label>
            <span>Fund type</span>
            <select value={fund} onChange={(event) => setFund(event.target.value as FundType | "All")}>
              {funds.map((item) => <option key={item}>{item}</option>)}
            </select>
          </label>
          <label>
            <span>Payment method</span>
            <select value={method} onChange={(event) => setMethod(event.target.value)}>
              <option>All</option>
              <option>Card</option>
              <option>Bank Transfer</option>
              <option>Cash</option>
            </select>
          </label>
          <label>
            <span>Status</span>
            <select value={status} onChange={(event) => setStatus(event.target.value as DonationStatus | "All")}>
              {statuses.map((item) => <option key={item}>{item}</option>)}
            </select>
          </label>
        </div>
      </Card>

      <Card>
        <SectionHeader
          title="All Donations"
          action={
            <button className="secondary-button compact" type="button">
              <Filter size={16} />
              Saved view
            </button>
          }
        />
        {visibleDonations.length === 0 ? (
          <EmptyState title="No donations yet" description="Try a different filter or add the first donation record." />
        ) : (
          <>
            <div className="table-wrap">
              <table>
                <thead>
                  <tr>
                    <th>Donor</th>
                    <th>Email</th>
                    <th>Fund</th>
                    <th>Amount</th>
                    <th>Method</th>
                    <th>Date</th>
                    <th>Status</th>
                    <th>Receipt</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {visibleDonations.map((donation) => (
                    <DonationRow donation={donation} key={donation.id} />
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mobile-list">
              {visibleDonations.map((donation) => (
                <div className="mobile-record" key={donation.id}>
                  <div>
                    <strong>{donation.donorName}</strong>
                    <span>{donation.donorEmail}</span>
                  </div>
                  <Badge tone={statusTone(donation.status)}>{donation.status}</Badge>
                  <dl>
                    <div><dt>Fund</dt><dd>{donation.fund}</dd></div>
                    <div><dt>Amount</dt><dd>{currency(donation.amount)}</dd></div>
                    <div><dt>Method</dt><dd>{donation.method}</dd></div>
                    <div><dt>Receipt</dt><dd>{donation.receiptId}</dd></div>
                  </dl>
                </div>
              ))}
            </div>
          </>
        )}
      </Card>

      <div className="dashboard-grid">
        <Card>
          <SectionHeader title="Fund Allocation" eyebrow="Current month" />
          <div className="fund-list">
            {fundBreakdown.map((item) => (
              <div className="fund-row" key={item.fund}>
                <div>
                  <strong>{item.fund}</strong>
                  <span>{currency(item.amount)}</span>
                </div>
                <ProgressBar value={item.percentage} color={item.color} />
              </div>
            ))}
          </div>
        </Card>
        <TrustStrip />
      </div>

      {showAddModal ? (
        <Modal
          title="Add Donation"
          description="Record a donation and generate a receipt confirmation."
          onClose={() => setShowAddModal(false)}
        >
          <div className="form-grid two">
            <label><span>Donor name</span><input defaultValue="New Donor" /></label>
            <label><span>Email</span><input defaultValue="donor@email.com" /></label>
            <label><span>Amount</span><input defaultValue="250" type="number" /></label>
            <label><span>Fund</span><select defaultValue="Zakat"><option>Zakat</option><option>Sadaqah</option><option>General</option><option>Building</option></select></label>
            <label><span>Method</span><select defaultValue="Card"><option>Card</option><option>Bank Transfer</option><option>Cash</option></select></label>
            <label><span>Status</span><select defaultValue="Completed"><option>Completed</option><option>Pending</option></select></label>
          </div>
          <div className="button-row end">
            <button className="secondary-button" type="button" onClick={() => setShowAddModal(false)}>Cancel</button>
            <button
              className="primary-button"
              type="button"
              onClick={() => {
                setShowAddModal(false);
                setToast("Donation recorded and receipt generated.");
              }}
            >
              Record Donation
            </button>
          </div>
        </Modal>
      ) : null}

      {toast ? <Toast message={toast} onClose={() => setToast("")} /> : null}
    </div>
  );
}

function DonationRow({ donation }: { donation: Donation }) {
  return (
    <tr>
      <td><strong>{donation.donorName}</strong></td>
      <td>{donation.donorEmail}</td>
      <td>{donation.fund}</td>
      <td>{currency(donation.amount)}</td>
      <td>{donation.method}</td>
      <td>{donation.date}</td>
      <td><Badge tone={statusTone(donation.status)}>{donation.status}</Badge></td>
      <td>{donation.receiptId}</td>
      <td><button className="icon-button compact-icon" type="button" aria-label="Donation actions"><MoreHorizontal size={16} /></button></td>
    </tr>
  );
}
