export type Masjid = {
  id: string;
  name: string;
  location: string;
  method: string;
};

export type UserRole = "admin" | "donor";

export type DonationStatus = "Completed" | "Pending" | "Refunded";
export type FundType = "Zakat" | "Sadaqah" | "General" | "Building";

export type Donation = {
  id: string;
  donorName: string;
  donorEmail: string;
  fund: FundType;
  amount: number;
  method: "Card" | "Bank Transfer" | "Cash";
  date: string;
  status: DonationStatus;
  refundStatus: "Not requested" | "Eligible" | "Refunded";
  receiptId: string;
};

export type FundBreakdown = {
  fund: FundType;
  amount: number;
  percentage: number;
  color: string;
};

export type Campaign = {
  id: string;
  name: string;
  raised: number;
  goal: number;
  dueDate: string;
};

export type PrayerTime = {
  name: "Fajr" | "Dhuhr" | "Asr" | "Maghrib" | "Isha";
  adhan: string;
  iqamah: string;
  isNext?: boolean;
};

export type AnnouncementStatus = "Draft" | "Scheduled" | "Published";

export type Announcement = {
  id: string;
  title: string;
  category: "Community" | "Fundraiser" | "Prayer Alert" | "Administrative";
  excerpt: string;
  status: AnnouncementStatus;
  date: string;
  channels: Array<"Email" | "SMS" | "Push" | "Website">;
  reach: number;
};

export type Donor = {
  id: string;
  name: string;
  email: string;
  phone: string;
  lifetimeDonations: number;
  lastDonation: string;
  recurring: boolean;
  fundPreference: FundType;
  history: Donation[];
};

export type ReportMetric = {
  label: string;
  value: number;
  change: number;
};

export type AuditLogEntry = {
  id: string;
  time: string;
  user: string;
  action: string;
  status: "Success" | "Pending" | "Failed";
};
