import { useMemo, useState } from "react";
import {
  CalendarDays,
  CheckCircle2,
  Clock,
  Download,
  MapPin,
  Plus,
  Search,
  Users,
  X,
  BookOpen,
  Building2,
  Repeat2,
  TicketCheck,
} from "lucide-react";
import { masjidEvents, roomBookings, venues } from "../data/mockData";
import type { EventCategory, EventStatus, BookingStatus, MasjidEvent } from "../types";
import { Badge, Card, EmptyState, ProgressBar, SectionHeader, StatCard, Toast } from "../components/ui";
import { useLanguage } from "../i18n/i18n";
import { downloadTextFile } from "../utils/downloads";

// Helpers

const CATEGORY_COLORS: Record<EventCategory, string> = {
  Religious: "#0f766e",
  Educational: "#2563eb",
  Social: "#16a34a",
  Fundraiser: "#c0842e",
  Youth: "#9333ea",
  Administrative: "#64748b",
};

function eventStatusTone(status: EventStatus): "green" | "blue" | "neutral" | "red" {
  if (status === "Upcoming") return "blue";
  if (status === "Ongoing") return "green";
  if (status === "Completed") return "neutral";
  return "red";
}

function bookingStatusTone(status: BookingStatus): "green" | "gold" | "red" {
  if (status === "Confirmed") return "green";
  if (status === "Pending") return "gold";
  return "red";
}

// Create event modal

const EVENT_CATEGORIES: EventCategory[] = ["Religious", "Educational", "Social", "Fundraiser", "Youth", "Administrative"];

function CreateEventModal({ onClose, onCreate }: { onClose: () => void; onCreate: (event: MasjidEvent) => void }) {
  const { t } = useLanguage();
  const [title, setTitle] = useState("Community Program");
  const [category, setCategory] = useState<EventCategory>("Religious");
  const [venue, setVenue] = useState(venues[0].name);
  const [date, setDate] = useState("2026-07-10");
  const [capacity, setCapacity] = useState(100);
  const [startTime, setStartTime] = useState("18:00");
  const [endTime, setEndTime] = useState("20:00");
  const [description, setDescription] = useState("Community event organized through MasjidPro.");

  function handleCreate() {
    onCreate({
      id: `event-${Date.now()}`,
      title,
      description,
      category,
      date,
      startTime,
      endTime,
      venue,
      capacity,
      rsvpCount: 0,
      organizer: "Admin Team",
      status: "Upcoming",
      isRecurring: false,
    });
    onClose();
  }

  return (
    <div className="modal-backdrop" onClick={onClose} role="dialog" aria-modal="true" aria-label={t("events_createEvent")}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div>
            <span className="eyebrow">{t("events_allEvents")}</span>
            <h2>{t("events_createEvent")}</h2>
          </div>
          <button className="icon-button" type="button" onClick={onClose} aria-label={t("close")}>
            <X size={20} />
          </button>
        </div>
        <div className="form-grid two">
          <label style={{ gridColumn: "1 / -1" }}>
            <span>Event Title</span>
            <input value={title} onChange={(event) => setTitle(event.target.value)} placeholder="e.g. Jumuah Prayer, Youth Workshop" />
          </label>
          <label>
            <span>{t("events_category")}</span>
            <select value={category} onChange={(event) => setCategory(event.target.value as EventCategory)}>
              {EVENT_CATEGORIES.map((item) => <option key={item} value={item}>{item}</option>)}
            </select>
          </label>
          <label>
            <span>{t("events_venue")}</span>
            <select value={venue} onChange={(event) => setVenue(event.target.value)}>
              {venues.map((item) => <option key={item.id} value={item.name}>{item.name}</option>)}
            </select>
          </label>
          <label>
            <span>{t("events_date")}</span>
            <input type="date" value={date} onChange={(event) => setDate(event.target.value)} />
          </label>
          <label>
            <span>{t("events_capacity")}</span>
            <input type="number" value={capacity} onChange={(event) => setCapacity(Number(event.target.value))} placeholder="Maximum attendees" />
          </label>
          <label>
            <span>Start Time</span>
            <input type="time" value={startTime} onChange={(event) => setStartTime(event.target.value)} />
          </label>
          <label>
            <span>End Time</span>
            <input type="time" value={endTime} onChange={(event) => setEndTime(event.target.value)} />
          </label>
          <label style={{ gridColumn: "1 / -1" }}>
            <span>Description</span>
            <textarea rows={3} value={description} onChange={(event) => setDescription(event.target.value)} placeholder="Describe the event..." />
          </label>
        </div>
        <div className="button-row end">
          <button className="secondary-button" type="button" onClick={onClose}>{t("cancel")}</button>
          <button className="primary-button" type="button" onClick={handleCreate}>{t("confirm")}</button>
        </div>
      </div>
    </div>
  );
}

// Page

export function EventsPage() {
  const { t } = useLanguage();
  const [events, setEvents] = useState(masjidEvents);
  const [bookings, setBookings] = useState(roomBookings);
  const [venueRecords] = useState(venues);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<EventCategory | "All">("All");
  const [statusFilter, setStatusFilter] = useState<EventStatus | "All">("All");
  const [activeTab, setActiveTab] = useState<"events" | "bookings" | "venues">("events");
  const [showModal, setShowModal] = useState(false);
  const [toast, setToast] = useState("");

  const totalRsvps = events.reduce((sum, e) => sum + e.rsvpCount, 0);
  const upcomingCount = events.filter((e) => e.status === "Upcoming").length;
  const availableVenueCount = venueRecords.filter((v) => v.available).length;
  const pendingBookings = bookings.filter((b) => b.status === "Pending").length;

  const filteredEvents = useMemo(
    () =>
      events.filter((ev) => {
        const matchCat = categoryFilter === "All" || ev.category === categoryFilter;
        const matchStatus = statusFilter === "All" || ev.status === statusFilter;
        const matchSearch =
          ev.title.toLowerCase().includes(search.toLowerCase()) ||
          ev.organizer.toLowerCase().includes(search.toLowerCase());
        return matchCat && matchStatus && matchSearch;
      }),
    [events, search, categoryFilter, statusFilter],
  );

  function handleExport() {
    const rows = [
      "Title,Category,Date,Start,End,Venue,Capacity,RSVPs,Status,Organizer",
      ...events.map(
        (e) => `${e.title},${e.category},${e.date},${e.startTime},${e.endTime},${e.venue},${e.capacity},${e.rsvpCount},${e.status},${e.organizer}`,
      ),
    ];
    downloadTextFile("masjidpro-events-report.csv", rows.join("\n"));
    setToast("Events report exported.");
  }

  function updateBookingStatus(id: string, status: BookingStatus) {
    setBookings((current) => current.map((booking) => (booking.id === id ? { ...booking, status } : booking)));
    setToast(status === "Confirmed" ? "Booking approved." : "Booking rejected.");
  }

  function createEvent(event: MasjidEvent) {
    setEvents((current) => [event, ...current]);
    setToast("Event created and added to the calendar.");
  }

  return (
    <div className="page-stack">
      {/* Header */}
      <div className="page-title-row">
        <div>
          <span className="eyebrow">{t("nav_events")}</span>
          <h1>{t("events_subtitle")}</h1>
        </div>
        <div className="button-row">
          <button className="secondary-button" type="button" onClick={handleExport}>
            <Download size={16} />
            {t("export")}
          </button>
          <button className="primary-button" type="button" onClick={() => setShowModal(true)}>
            <Plus size={16} />
            {t("events_createEvent")}
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="stats-grid four">
        <StatCard title={t("events_total")} value={String(events.length)} change={`${upcomingCount} upcoming`} icon={CalendarDays} />
        <StatCard title={t("events_rsvpTotal")} value={String(totalRsvps)} change="confirmed attendees" icon={TicketCheck} tone="blue" />
        <StatCard title={t("events_availableVenues")} value={String(availableVenueCount)} change={`of ${venueRecords.length} venues`} icon={Building2} tone="gold" />
        <StatCard title="Pending Bookings" value={String(pendingBookings)} change="awaiting review" icon={BookOpen} />
      </div>

      {/* Tab Nav */}
      <div className="tab-nav">
        <button className={activeTab === "events" ? "tab-btn active" : "tab-btn"} type="button" onClick={() => setActiveTab("events")}>
          <CalendarDays size={16} />
          {t("events_allEvents")}
        </button>
        <button className={activeTab === "bookings" ? "tab-btn active" : "tab-btn"} type="button" onClick={() => setActiveTab("bookings")}>
          <BookOpen size={16} />
          {t("events_bookings")}
        </button>
        <button className={activeTab === "venues" ? "tab-btn active" : "tab-btn"} type="button" onClick={() => setActiveTab("venues")}>
          <Building2 size={16} />
          {t("events_venues")}
        </button>
      </div>

      {/* Events Tab */}
      {activeTab === "events" && (
        <Card>
          <SectionHeader title={t("events_allEvents")} eyebrow={t("nav_events")} />
          {/* Filters */}
          <div className="filter-row">
            <div className="search-field">
              <Search size={16} />
              <input
                placeholder={t("events_searchPlaceholder")}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div className="filter-chips">
              <button type="button" className={categoryFilter === "All" ? "filter-chip active" : "filter-chip"} onClick={() => setCategoryFilter("All")}>
                All Categories
              </button>
              {(["Religious", "Educational", "Social", "Fundraiser", "Youth", "Administrative"] as EventCategory[]).map((c) => (
                <button key={c} type="button" className={categoryFilter === c ? "filter-chip active" : "filter-chip"} onClick={() => setCategoryFilter(c)}>
                  {c}
                </button>
              ))}
            </div>
            <div className="filter-chips">
              {(["All", "Upcoming", "Ongoing", "Completed", "Cancelled"] as const).map((s) => (
                <button key={s} type="button" className={statusFilter === s ? "filter-chip active" : "filter-chip"} onClick={() => setStatusFilter(s as EventStatus | "All")}>
                  {s}
                </button>
              ))}
            </div>
          </div>

          {filteredEvents.length === 0 ? (
            <EmptyState title={t("events_noEvents")} description={t("events_noEventsDesc")} />
          ) : (
            <div className="events-grid">
              {filteredEvents.map((ev) => {
                const rsvpPct = Math.round((ev.rsvpCount / ev.capacity) * 100);
                return (
                  <article className="event-card" key={ev.id}>
                    <div className="event-card-top">
                      <div className="event-category-dot" style={{ background: CATEGORY_COLORS[ev.category] }} />
                      <span className="event-category-label" style={{ color: CATEGORY_COLORS[ev.category] }}>
                        {ev.category}
                      </span>
                      {ev.isRecurring && (
                        <span className="event-recurring-badge">
                          <Repeat2 size={12} />
                          Recurring
                        </span>
                      )}
                      <Badge tone={eventStatusTone(ev.status)}>{ev.status}</Badge>
                    </div>
                    <h3>{ev.title}</h3>
                    <p className="event-description">{ev.description}</p>
                    <div className="event-meta">
                      <div>
                        <CalendarDays size={14} />
                        <span>{ev.date}</span>
                      </div>
                      <div>
                        <Clock size={14} />
                        <span>{ev.startTime} - {ev.endTime}</span>
                      </div>
                      <div>
                        <MapPin size={14} />
                        <span>{ev.venue}</span>
                      </div>
                      <div>
                        <Users size={14} />
                        <span>{ev.organizer}</span>
                      </div>
                    </div>
                    <div className="event-rsvp">
                      <div className="event-rsvp-label">
                        <span>{t("events_rsvp")}</span>
                        <span>
                          <strong>{ev.rsvpCount}</strong> / {ev.capacity}
                        </span>
                      </div>
                      <ProgressBar
                        value={rsvpPct}
                        color={rsvpPct >= 90 ? "#c0842e" : CATEGORY_COLORS[ev.category]}
                        label={`${ev.title} RSVP progress`}
                      />
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </Card>
      )}

      {/* Bookings Tab */}
      {activeTab === "bookings" && (
        <div className="dashboard-grid">
          <Card>
            <SectionHeader title={t("events_pendingRequests")} eyebrow={t("events_bookings")} />
            <div className="table-wrap">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>{t("events_requester")}</th>
                    <th>{t("events_venue")}</th>
                    <th>{t("events_date")}</th>
                    <th>{t("events_time")}</th>
                    <th>{t("events_purpose")}</th>
                    <th>{t("events_status")}</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {bookings.map((booking) => (
                    <tr key={booking.id}>
                      <td>
                        <div>
                          <strong>{booking.requesterName}</strong>
                          <p style={{ margin: 0, fontSize: "0.75rem", color: "#64748b" }}>{booking.requesterEmail}</p>
                        </div>
                      </td>
                      <td>{booking.venue}</td>
                      <td>{booking.date}</td>
                      <td>{booking.startTime} - {booking.endTime}</td>
                      <td>{booking.purpose}</td>
                      <td>
                        <Badge tone={bookingStatusTone(booking.status)}>{booking.status}</Badge>
                      </td>
                      <td>
                        {booking.status === "Pending" && (
                          <div className="action-buttons">
                            <button className="action-btn approve" type="button" onClick={() => updateBookingStatus(booking.id, "Confirmed")}>
                              <CheckCircle2 size={14} />
                              Approve
                            </button>
                            <button className="action-btn reject" type="button" onClick={() => updateBookingStatus(booking.id, "Rejected")}>
                              <X size={14} />
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mobile-list">
              {bookings.map((booking) => (
                <div className="mobile-record" key={booking.id}>
                  <div>
                    <strong>{booking.requesterName}</strong>
                    <span>{booking.requesterEmail}</span>
                  </div>
                  <Badge tone={bookingStatusTone(booking.status)}>{booking.status}</Badge>
                  <dl>
                    <div><dt>{t("events_venue")}</dt><dd>{booking.venue}</dd></div>
                    <div><dt>{t("events_date")}</dt><dd>{booking.date}</dd></div>
                    <div><dt>{t("events_time")}</dt><dd>{booking.startTime} - {booking.endTime}</dd></div>
                    <div><dt>{t("events_purpose")}</dt><dd>{booking.purpose}</dd></div>
                  </dl>
                  {booking.status === "Pending" && (
                    <div className="action-buttons">
                      <button className="action-btn approve" type="button" onClick={() => updateBookingStatus(booking.id, "Confirmed")}>
                        <CheckCircle2 size={14} />
                        Approve
                      </button>
                      <button className="action-btn reject" type="button" onClick={() => updateBookingStatus(booking.id, "Rejected")}>
                        <X size={14} />
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </Card>
        </div>
      )}

      {/* Venues Tab */}
      {activeTab === "venues" && (
        <Card>
          <SectionHeader title={t("events_venueAvailability")} eyebrow={t("events_venues")} />
          <div className="venues-grid">
            {venueRecords.map((venue) => (
              <article className={`venue-card ${venue.available ? "available" : "booked"}`} key={venue.id}>
                <div className="venue-card-header">
                  <Building2 size={20} />
                  <div>
                    <strong>{venue.name}</strong>
                    <span>
                      <Users size={12} />
                      Capacity: {venue.capacity}
                    </span>
                  </div>
                  <Badge tone={venue.available ? "green" : "red"}>
                    {venue.available ? "Available" : "Booked"}
                  </Badge>
                </div>
                <div className="venue-amenities">
                  {venue.amenities.map((a) => (
                    <span key={a} className="amenity-chip">
                      <CheckCircle2 size={11} />
                      {a}
                    </span>
                  ))}
                </div>
                <button
                  className="secondary-button full"
                  type="button"
                  disabled={!venue.available}
                  onClick={() => {
                    setActiveTab("bookings");
                    setToast(`${venue.name} booking request started.`);
                  }}
                >
                  {venue.available ? t("events_bookRoom") : "Currently Booked"}
                </button>
              </article>
            ))}
          </div>
        </Card>
      )}

      {showModal && <CreateEventModal onClose={() => setShowModal(false)} onCreate={createEvent} />}
      {toast ? <Toast message={toast} onClose={() => setToast("")} /> : null}
    </div>
  );
}
