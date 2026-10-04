import { formatNumber } from '@/lib/formatNumber';

export default function StatsTile({ title, value, colorClass }) {
    return (
        <div className={`notification has-text-centered ${colorClass}`}>
            <p className="subtitle">{title}</p>
            <p className="title">{formatNumber(value)}</p>
        </div>
    );
}
