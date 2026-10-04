import { formatNumber } from '@/lib/formatNumber';

const StatItem = ({ heading, value }) => {
    return (
        <div className="level-item has-text-centered">
            <div>
                <p className="heading">{heading}</p>
                <p className="title">{formatNumber(value)}</p>
            </div>
        </div>
    );
};

export default StatItem;
