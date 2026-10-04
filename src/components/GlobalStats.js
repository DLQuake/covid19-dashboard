import StatsTile from './StatsTile';

export default function GlobalStats({ data }) {
    if (!data) {
        return <p className="notification is-warning" role="alert">Nie udało się pobrać globalnych statystyk.</p>;
    }

    return (
        <div className="columns">
            <div className="column is-one-third">
                <StatsTile title="Cases" value={data.cases} colorClass="is-info" />
            </div>

            <div className="column is-one-third">
                <StatsTile title="Deaths" value={data.deaths} colorClass="is-danger" />
            </div>

            <div className="column is-one-third">
                <StatsTile title="Recovered" value={data.recovered} colorClass="is-success" />
            </div>
        </div>
    );
}
