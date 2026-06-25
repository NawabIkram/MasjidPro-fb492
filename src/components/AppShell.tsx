import { useMemo, useState } from "react";
import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import {
  BarChart3,
  Bell,
  Bot,
  Calculator,
  ChevronDown,
  LayoutDashboard,
  LogOut,
  Megaphone,
  Menu,
  Moon,
  PanelLeftClose,
  PanelLeftOpen,
  Search,
  Settings,
  ShieldCheck,
  ReceiptText,
  Repeat2,
  HandCoins,
  UserRound,
  UsersRound,
  WalletCards,
} from "lucide-react";
import { masjids } from "../data/mockData";
import type { Masjid, UserRole } from "../types";
import { AiAssistant } from "./AiAssistant";

const adminNavItems = [
  { to: "/dashboard", label: "Dashboard", mobileLabel: "Home", icon: LayoutDashboard },
  { to: "/donations", label: "Donations", mobileLabel: "Giving", icon: WalletCards },
  { to: "/zakat", label: "Zakat", mobileLabel: "Zakat", icon: Calculator },
  { to: "/prayer-times", label: "Prayer Times", mobileLabel: "Prayer", icon: Moon },
  { to: "/announcements", label: "Announcements", mobileLabel: "News", icon: Megaphone },
  { to: "/reports", label: "Reports", mobileLabel: "Reports", icon: BarChart3 },
  { to: "/donors", label: "Donors", mobileLabel: "Donors", icon: UsersRound },
  { to: "/settings", label: "Settings", mobileLabel: "Settings", icon: Settings },
];

const donorNavItems = [
  { to: "/donor-portal", label: "Donor Dashboard", mobileLabel: "Home", icon: LayoutDashboard },
  { to: "/donate", label: "Donate", mobileLabel: "Donate", icon: HandCoins },
  { to: "/my-donations", label: "My Donations", mobileLabel: "History", icon: WalletCards },
  { to: "/receipts", label: "Receipts", mobileLabel: "Receipts", icon: ReceiptText },
  { to: "/recurring", label: "Recurring Donations", mobileLabel: "Recurring", icon: Repeat2 },
  { to: "/prayer-times", label: "Prayer Times", mobileLabel: "Prayer", icon: Moon },
  { to: "/announcements", label: "Announcements", mobileLabel: "News", icon: Megaphone },
  { to: "/profile", label: "Profile", mobileLabel: "Profile", icon: UserRound },
];

function pageTitle(pathname: string) {
  const active = [...adminNavItems, ...donorNavItems].find((item) => item.to === pathname);
  return active?.label ?? "Dashboard";
}

export function AppShell() {
  const location = useLocation();
  const navigate = useNavigate();
  const startsAsDonor = ["/donor-portal", "/donate", "/my-donations", "/receipts", "/recurring", "/profile"].includes(
    location.pathname,
  );
  const [collapsed, setCollapsed] = useState(false);
  const [activeRole, setActiveRole] = useState<UserRole>(startsAsDonor ? "donor" : "admin");
  const [activeMasjid, setActiveMasjid] = useState<Masjid>(masjids[0]);
  const navItems = activeRole === "admin" ? adminNavItems : donorNavItems;
  const title = useMemo(() => pageTitle(location.pathname), [location.pathname]);

  return (
    <div className="app-layout">
      <aside className={collapsed ? "sidebar collapsed" : "sidebar"}>
        <div className="brand">
          <div className="brand-mark">M</div>
          <div className="brand-copy">
            <strong>MasjidPro</strong>
            <span>{activeRole === "admin" ? "Admin suite" : "Donor portal"}</span>
          </div>
        </div>
        <nav className="side-nav" aria-label="Primary navigation">
          {navItems.map((item) => (
            <NavLink key={item.to} to={item.to}>
              <item.icon size={20} />
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>
        <div className="sidebar-footer">
          <div className="secure-note">
            <ShieldCheck size={18} />
            <span>Privacy ready</span>
          </div>
          <NavLink to="/login" className="logout-link">
            <LogOut size={18} />
            <span>Sign out</span>
          </NavLink>
        </div>
      </aside>

      <div className="main-frame">
        <header className="topbar">
          <button
            className="icon-button desktop-only"
            type="button"
            onClick={() => setCollapsed((value) => !value)}
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {collapsed ? <PanelLeftOpen size={20} /> : <PanelLeftClose size={20} />}
          </button>
          <button className="icon-button mobile-only" type="button" aria-label="Open menu">
            <Menu size={20} />
          </button>
          <div className="page-heading">
            <span className="eyebrow">Active dashboard</span>
            <h1>{title}</h1>
          </div>
          <label className="masjid-selector">
            <span>Masjid</span>
            <select
              value={activeMasjid.id}
              onChange={(event) => {
                const next = masjids.find((masjid) => masjid.id === event.target.value);
                if (next) setActiveMasjid(next);
              }}
            >
              {masjids.map((masjid) => (
                <option key={masjid.id} value={masjid.id}>
                  {masjid.name}
                </option>
              ))}
            </select>
            <ChevronDown size={16} />
          </label>
          <label className="role-selector">
            <span>Role</span>
            <select
              value={activeRole}
              onChange={(event) => {
                const nextRole = event.target.value as UserRole;
                setActiveRole(nextRole);
                navigate(nextRole === "admin" ? "/dashboard" : "/donor-portal");
              }}
            >
              <option value="admin">Masjid Admin</option>
              <option value="donor">Donor</option>
            </select>
            <ChevronDown size={16} />
          </label>
          <div className="topbar-actions">
            <button className="search-button" type="button">
              <Search size={18} />
              <span>Search</span>
            </button>
            <button className="icon-button" type="button" aria-label="Notifications">
              <Bell size={20} />
            </button>
            <div className="avatar">IA</div>
          </div>
        </header>

        <div className="active-masjid-strip">
          <strong>{activeMasjid.name}</strong>
          <span>{activeMasjid.location}</span>
          <span>{activeMasjid.method}</span>
        </div>

        <main className="content">
          <Outlet context={{ activeMasjid, activeRole }} />
        </main>
      </div>

      <nav className="mobile-nav" aria-label="Mobile navigation">
        {navItems.slice(0, 5).map((item) => (
          <NavLink key={item.to} to={item.to}>
            <item.icon size={20} />
            <span>{item.mobileLabel}</span>
          </NavLink>
        ))}
        <NavLink to={activeRole === "admin" ? "/reports" : "/profile"}>
          <Bot size={20} />
          <span>More</span>
        </NavLink>
      </nav>

      <AiAssistant />
    </div>
  );
}
