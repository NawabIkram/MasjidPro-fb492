import { Navigate, Route, Routes } from "react-router-dom";
import { AppShell } from "./components/AppShell";
import { AnnouncementsPage } from "./pages/AnnouncementsPage";
import { DashboardPage } from "./pages/DashboardPage";
import { DonationsPage } from "./pages/DonationsPage";
import { DonorPortalPage } from "./pages/DonorPortalPage";
import { DonorsPage } from "./pages/DonorsPage";
import { LoginPage } from "./pages/LoginPage";
import { PrayerTimesPage } from "./pages/PrayerTimesPage";
import { ReportsPage } from "./pages/ReportsPage";
import { SettingsPage } from "./pages/SettingsPage";
import { ZakatPage } from "./pages/ZakatPage";

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route element={<AppShell />}>
        <Route index element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/donations" element={<DonationsPage />} />
        <Route path="/zakat" element={<ZakatPage />} />
        <Route path="/prayer-times" element={<PrayerTimesPage />} />
        <Route path="/announcements" element={<AnnouncementsPage />} />
        <Route path="/reports" element={<ReportsPage />} />
        <Route path="/donors" element={<DonorsPage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/donor-portal" element={<DonorPortalPage />} />
        <Route path="/donate" element={<DonorPortalPage view="donate" />} />
        <Route path="/my-donations" element={<DonorPortalPage view="donations" />} />
        <Route path="/receipts" element={<DonorPortalPage view="receipts" />} />
        <Route path="/recurring" element={<DonorPortalPage view="recurring" />} />
        <Route path="/profile" element={<DonorPortalPage view="profile" />} />
      </Route>
    </Routes>
  );
}
