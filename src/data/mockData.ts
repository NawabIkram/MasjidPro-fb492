import type {
  Announcement,
  AuditLogEntry,
  Campaign,
  Donation,
  Donor,
  BetaClient,
  FundBreakdown,
  DemoScenario,
  LaunchMetric,
  Masjid,
  OutreachChannel,
  PrayerTime,
  PricingPlan,
  ReportMetric,
} from "../types";

export const masjids: Masjid[] = [
  {
    id: "furqan",
    name: "Masjid Al-Furqan",
    location: "Houston, TX",
    method: "ISNA, Hanafi Asr",
  },
  {
    id: "noor",
    name: "Masjid Al-Noor",
    location: "London, UK",
    method: "MWL, Standard Asr",
  },
  {
    id: "houston",
    name: "Islamic Center Houston",
    location: "Houston, TX",
    method: "ISNA, Standard Asr",
  },
];

export const donations: Donation[] = [
  {
    id: "don-1001",
    donorName: "Ahmed Khalil",
    donorEmail: "ahmed.k@email.com",
    fund: "Zakat",
    amount: 2500,
    method: "Card",
    date: "Jun 14, 2026",
    status: "Completed",
    refundStatus: "Eligible",
    receiptId: "RCP-24061",
  },
  {
    id: "don-1002",
    donorName: "Fatima Zahra",
    donorEmail: "fatima.z@provider.com",
    fund: "Sadaqah",
    amount: 150,
    method: "Bank Transfer",
    date: "Jun 13, 2026",
    status: "Completed",
    refundStatus: "Not requested",
    receiptId: "RCP-24062",
  },
  {
    id: "don-1003",
    donorName: "Omar Farooq",
    donorEmail: "omar.f@domain.org",
    fund: "General",
    amount: 500,
    method: "Cash",
    date: "Jun 12, 2026",
    status: "Pending",
    refundStatus: "Not requested",
    receiptId: "Pending",
  },
  {
    id: "don-1004",
    donorName: "Zubair Yusuf",
    donorEmail: "zubair.y@email.com",
    fund: "Building",
    amount: 1200,
    method: "Card",
    date: "Jun 11, 2026",
    status: "Completed",
    refundStatus: "Eligible",
    receiptId: "RCP-24064",
  },
  {
    id: "don-1005",
    donorName: "Aisha Rahman",
    donorEmail: "aisha.r@email.com",
    fund: "Zakat",
    amount: 725,
    method: "Card",
    date: "Jun 10, 2026",
    status: "Refunded",
    refundStatus: "Refunded",
    receiptId: "RCP-24065",
  },
];

export const fundBreakdown: FundBreakdown[] = [
  { fund: "Zakat", amount: 7240, percentage: 39, color: "#0F766E" },
  { fund: "Sadaqah", amount: 4180, percentage: 22, color: "#16A34A" },
  { fund: "General", amount: 3790, percentage: 21, color: "#2563EB" },
  { fund: "Building", amount: 3130, percentage: 18, color: "#C0842E" },
];

export const campaign: Campaign = {
  id: "camp-ramadan",
  name: "Ramadan Fundraiser",
  raised: 42850,
  goal: 65000,
  dueDate: "Ends Jun 30",
};

export const prayerTimes: PrayerTime[] = [
  { name: "Fajr", adhan: "04:52 AM", iqamah: "05:15 AM" },
  { name: "Dhuhr", adhan: "01:21 PM", iqamah: "01:45 PM" },
  { name: "Asr", adhan: "05:03 PM", iqamah: "05:25 PM", isNext: true },
  { name: "Maghrib", adhan: "08:28 PM", iqamah: "08:33 PM" },
  { name: "Isha", adhan: "09:52 PM", iqamah: "10:10 PM" },
];

export const announcements: Announcement[] = [
  {
    id: "ann-1",
    title: "Jumuah parking update",
    category: "Administrative",
    excerpt: "Please use the west entrance and follow volunteer guidance after second Jumuah.",
    status: "Published",
    date: "Today, 2:30 PM",
    channels: ["Email", "SMS", "Push", "Website"],
    reach: 1240,
  },
  {
    id: "ann-2",
    title: "Ramadan Fundraiser reminder",
    category: "Fundraiser",
    excerpt: "A short reminder encouraging recurring donations before the final ten nights.",
    status: "Scheduled",
    date: "Tomorrow, 9:00 AM",
    channels: ["Email", "Push"],
    reach: 0,
  },
  {
    id: "ann-3",
    title: "Weather advisory for evening prayer",
    category: "Prayer Alert",
    excerpt: "Community members are encouraged to arrive early due to heavy rain expected near Isha.",
    status: "Draft",
    date: "Draft",
    channels: ["Website"],
    reach: 0,
  },
];

export const donors: Donor[] = [
  {
    id: "donor-1",
    name: "Ahmed Khalil",
    email: "ahmed.k@email.com",
    phone: "+1 713 555 0198",
    lifetimeDonations: 18500,
    lastDonation: "Jun 14, 2026",
    recurring: true,
    fundPreference: "Zakat",
    history: donations.filter((donation) => donation.donorName === "Ahmed Khalil"),
  },
  {
    id: "donor-2",
    name: "Fatima Zahra",
    email: "fatima.z@provider.com",
    phone: "+1 832 555 0144",
    lifetimeDonations: 9250,
    lastDonation: "Jun 13, 2026",
    recurring: true,
    fundPreference: "Sadaqah",
    history: donations.filter((donation) => donation.donorName === "Fatima Zahra"),
  },
  {
    id: "donor-3",
    name: "Omar Farooq",
    email: "omar.f@domain.org",
    phone: "+1 281 555 0172",
    lifetimeDonations: 4100,
    lastDonation: "Jun 12, 2026",
    recurring: false,
    fundPreference: "General",
    history: donations.filter((donation) => donation.donorName === "Omar Farooq"),
  },
];

export const reportMetrics: ReportMetric[] = [
  { label: "Monthly Donations", value: 18340, change: 24 },
  { label: "Recurring Donations", value: 8940, change: 12 },
  { label: "Average Gift", value: 214, change: 8 },
  { label: "Donor Retention", value: 72, change: 5 },
];

export const monthlyDonations = [
  { month: "Jan", amount: 9200 },
  { month: "Feb", amount: 10400 },
  { month: "Mar", amount: 13800 },
  { month: "Apr", amount: 16800 },
  { month: "May", amount: 14600 },
  { month: "Jun", amount: 18340 },
];

export const recurringTrend = [
  { month: "Jan", donors: 92 },
  { month: "Feb", donors: 105 },
  { month: "Mar", donors: 118 },
  { month: "Apr", donors: 132 },
  { month: "May", donors: 148 },
  { month: "Jun", donors: 156 },
];

export const auditLog: AuditLogEntry[] = [
  {
    id: "log-1",
    time: "6 min ago",
    user: "Imam Abdullah",
    action: "Announcement published",
    status: "Success",
  },
  {
    id: "log-2",
    time: "18 min ago",
    user: "Admin Team",
    action: "Donation added",
    status: "Success",
  },
  {
    id: "log-3",
    time: "42 min ago",
    user: "Finance Admin",
    action: "Report exported",
    status: "Success",
  },
  {
    id: "log-4",
    time: "1h ago",
    user: "Imam Abdullah",
    action: "Settings updated",
    status: "Pending",
  },
];

export const pricingPlans: PricingPlan[] = [
  {
    id: "starter",
    name: "Starter",
    price: 49,
    description: "For small masjids moving from spreadsheets to a trusted digital workflow.",
    bestFor: "Small local masjids",
    features: [
      "Donations and receipts",
      "Prayer times",
      "Announcements",
      "Basic donor portal",
      "Email support",
    ],
  },
  {
    id: "growth",
    name: "Growth",
    price: 99,
    description: "The Phase 2 target plan for beta conversion and first paying clients.",
    bestFor: "Growing Islamic centers",
    features: [
      "Everything in Starter",
      "Recurring donations",
      "Reports and exports",
      "AI announcement writer",
      "Multi-admin dashboard",
      "Priority support",
    ],
    highlighted: true,
  },
  {
    id: "pro",
    name: "Pro",
    price: 199,
    description: "For large community centers that need stronger reporting and onboarding help.",
    bestFor: "Large masjids and centers",
    features: [
      "Everything in Growth",
      "Advanced reports",
      "White-glove onboarding",
      "Custom branding",
      "Dedicated success manager",
    ],
  },
];

export const launchMetrics: LaunchMetric[] = [
  { label: "Paying clients", value: "12", target: "20 by Month 4", progress: 60 },
  { label: "MRR", value: "$1,188", target: "$2,000 target", progress: 59 },
  { label: "Demos booked", value: "31", target: "40 target", progress: 78 },
  { label: "Beta conversions", value: "4", target: "6 target", progress: 67 },
];

export const betaClients: BetaClient[] = [
  {
    id: "client-1",
    masjidName: "Masjid Al-Furqan",
    country: "USA",
    contact: "Imam Abdullah",
    stage: "Paid",
    plan: "growth",
    monthlyValue: 99,
    lastContact: "Jun 15",
    nextAction: "Ask for testimonial and case study approval",
  },
  {
    id: "client-2",
    masjidName: "Masjid Al-Noor",
    country: "UK",
    contact: "Admin Yusuf",
    stage: "Trial",
    plan: "starter",
    monthlyValue: 49,
    lastContact: "Jun 14",
    nextAction: "Schedule conversion call with 50% first-month offer",
  },
  {
    id: "client-3",
    masjidName: "Islamic Center Houston",
    country: "USA",
    contact: "Sister Aisha",
    stage: "Beta",
    plan: "growth",
    monthlyValue: 99,
    lastContact: "Jun 12",
    nextAction: "Import donors and run donation report demo",
  },
  {
    id: "client-4",
    masjidName: "North London Islamic Centre",
    country: "UK",
    contact: "Trustee Board",
    stage: "At Risk",
    plan: "growth",
    monthlyValue: 99,
    lastContact: "Jun 10",
    nextAction: "Send recorded demo and address data privacy concern",
  },
];

export const outreachChannels: OutreachChannel[] = [
  { id: "email", name: "Cold Email", sent: 500, replies: 38, demosBooked: 14, conversionRate: 7.6 },
  { id: "linkedin", name: "LinkedIn", sent: 280, replies: 31, demosBooked: 9, conversionRate: 11.1 },
  { id: "facebook", name: "Facebook Groups", sent: 42, replies: 18, demosBooked: 5, conversionRate: 42.8 },
  { id: "referral", name: "Beta Referrals", sent: 16, replies: 10, demosBooked: 3, conversionRate: 62.5 },
];

export const demoScenarios: DemoScenario[] = [
  {
    id: "donations-demo",
    title: "Donation and receipt flow",
    audience: "Finance admin",
    outcome: "Show how a donation is recorded, categorized, and exported with receipt status.",
    steps: ["Open donations", "Filter by Zakat", "Add donation", "Show receipt ID", "Export CSV"],
  },
  {
    id: "jumuah-demo",
    title: "Jumuah announcement campaign",
    audience: "Imam or admin team",
    outcome: "Show AI-assisted message writing, preview, channel selection, and publish confirmation.",
    steps: ["Open announcements", "Improve with AI", "Preview", "Choose Email and Push", "Publish"],
  },
  {
    id: "board-demo",
    title: "Monthly board report",
    audience: "Masjid trustees",
    outcome: "Show MRR-style donation insights, fund breakdown, top donors, and export buttons.",
    steps: ["Open reports", "Review donation chart", "Show fund distribution", "Export PDF"],
  },
];
