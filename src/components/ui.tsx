import type { ReactNode } from "react";
import {
  ArrowUpRight,
  CheckCircle2,
  CheckCircle,
  Clock3,
  LoaderCircle,
  SearchX,
  ShieldCheck,
  X,
} from "lucide-react";

type CardProps = {
  children: ReactNode;
  className?: string;
};

export function Card({ children, className = "" }: CardProps) {
  return <section className={`card ${className}`}>{children}</section>;
}

export function SectionHeader({
  title,
  eyebrow,
  action,
}: {
  title: string;
  eyebrow?: string;
  action?: ReactNode;
}) {
  return (
    <div className="section-header">
      <div>
        {eyebrow ? <span className="eyebrow">{eyebrow}</span> : null}
        <h2>{title}</h2>
      </div>
      {action}
    </div>
  );
}

export function Badge({
  children,
  tone = "neutral",
}: {
  children: ReactNode;
  tone?: "green" | "blue" | "gold" | "red" | "neutral";
}) {
  return <span className={`badge badge-${tone}`}>{children}</span>;
}

export function ProgressBar({
  value,
  color,
  label,
}: {
  value: number;
  color?: string;
  label?: string;
}) {
  return (
    <div className="progress-wrap" aria-label={label}>
      <span
        className="progress-fill"
        style={{ width: `${Math.min(value, 100)}%`, background: color }}
      />
    </div>
  );
}

export function StatCard({
  title,
  value,
  change,
  icon: Icon,
  tone = "green",
}: {
  title: string;
  value: string;
  change: string;
  icon: React.ElementType;
  tone?: "green" | "gold" | "blue";
}) {
  return (
    <Card className="stat-card">
      <div className={`icon-pill icon-${tone}`}>
        <Icon size={20} />
      </div>
      <div>
        <p>{title}</p>
        <strong>{value}</strong>
        <span>
          <ArrowUpRight size={14} />
          {change}
        </span>
      </div>
    </Card>
  );
}

export function EmptyState({
  title,
  description,
  action,
}: {
  title: string;
  description: string;
  action?: ReactNode;
}) {
  return (
    <div className="empty-state">
      <SearchX size={34} />
      <h3>{title}</h3>
      <p>{description}</p>
      {action}
    </div>
  );
}

export function LoadingSkeleton({ rows = 3 }: { rows?: number }) {
  return (
    <div className="skeleton-stack" aria-label="Loading">
      {Array.from({ length: rows }).map((_, index) => (
        <div className="skeleton-row" key={index}>
          <LoaderCircle size={18} className="spin" />
          <span />
        </div>
      ))}
    </div>
  );
}

export function TrustStrip() {
  return (
    <Card className="trust-strip">
      <div>
        <ShieldCheck size={20} />
        <span>Stripe secured payments</span>
      </div>
      <div>
        <CheckCircle2 size={20} />
        <span>Receipts generated after every gift</span>
      </div>
      <div>
        <Clock3 size={20} />
        <span>Private donor records with audit history</span>
      </div>
    </Card>
  );
}

export function Toast({
  message,
  onClose,
}: {
  message: string;
  onClose: () => void;
}) {
  return (
    <div className="toast" role="status">
      <CheckCircle size={18} />
      <span>{message}</span>
      <button type="button" aria-label="Dismiss notification" onClick={onClose}>
        <X size={16} />
      </button>
    </div>
  );
}

export function Modal({
  title,
  description,
  children,
  onClose,
}: {
  title: string;
  description?: string;
  children: ReactNode;
  onClose: () => void;
}) {
  return (
    <div className="modal-backdrop" role="presentation">
      <section className="modal-card" role="dialog" aria-modal="true" aria-label={title}>
        <div className="modal-header">
          <div>
            <h2>{title}</h2>
            {description ? <p>{description}</p> : null}
          </div>
          <button type="button" className="icon-button" aria-label="Close modal" onClick={onClose}>
            <X size={18} />
          </button>
        </div>
        {children}
      </section>
    </div>
  );
}

export function ConfirmDialog({
  title,
  message,
  confirmLabel,
  onCancel,
  onConfirm,
}: {
  title: string;
  message: string;
  confirmLabel: string;
  onCancel: () => void;
  onConfirm: () => void;
}) {
  return (
    <Modal title={title} description={message} onClose={onCancel}>
      <div className="button-row end">
        <button className="secondary-button" type="button" onClick={onCancel}>
          Cancel
        </button>
        <button className="primary-button" type="button" onClick={onConfirm}>
          {confirmLabel}
        </button>
      </div>
    </Modal>
  );
}
