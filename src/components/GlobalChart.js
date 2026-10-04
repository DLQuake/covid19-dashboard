import HistoryMetricChart from './HistoryMetricChart';

const metrics = [
    { key: 'cases', title: 'Cases over time', color: 'rgba(75, 192, 192, 1)' },
    { key: 'deaths', title: 'Deaths over time', color: 'rgba(255, 99, 132, 1)' },
    { key: 'recovered', title: 'Recovered over time', color: 'rgba(72, 199, 142, 1)' },
];

export default function GlobalChart({ history }) {
    if (!history) {
        return <p className="notification is-warning" role="alert">Nie udało się pobrać danych historycznych.</p>;
    }

    const dates = Object.keys(history.cases ?? {}).sort((left, right) => {
        const [leftMonth, leftDay, leftYear] = left.split('/').map(Number);
        const [rightMonth, rightDay, rightYear] = right.split('/').map(Number);
        return new Date(2000 + leftYear, leftMonth - 1, leftDay)
            - new Date(2000 + rightYear, rightMonth - 1, rightDay);
    });
    const dateRange = dates.length ? `${dates[0]} – ${dates.at(-1)}` : '';
    const recoveredValues = dates.map((date) => Number(history.recovered?.[date] ?? 0));
    const lastRecoveredIndex = recoveredValues.reduce(
        (lastIndex, value, index) => value > 0 ? index : lastIndex,
        -1,
    );
    const recoveredDataEnd = lastRecoveredIndex >= 0 ? dates[lastRecoveredIndex] : null;
    const recoveredNote = recoveredDataEnd
        ? `Źródło zwraca zera po ${recoveredDataEnd}; pokazano dane tylko do ostatniego poprawnego punktu.`
        : 'Źródło nie udostępnia poprawnych historycznych danych o ozdrowieniach.';

    return (
        <section aria-labelledby="global-trends-heading">
            <h2 id="global-trends-heading" className="subtitle has-text-centered">
                Global COVID-19 trends {dateRange && `(${dateRange})`}
            </h2>
            <p className="help has-text-centered mb-4">
                Historia API kończy się {dates.at(-1) ?? 'brakiem dostępnych dat'}.
            </p>
            {metrics.map(({ key, title, color }) => (
                <HistoryMetricChart
                    key={key}
                    title={title}
                    labels={dates}
                    values={key === 'recovered'
                        ? recoveredValues.map((value, index) => index <= lastRecoveredIndex ? value : null)
                        : dates.map((date) => history[key]?.[date] ?? null)}
                    color={color}
                    note={key === 'recovered' ? recoveredNote : undefined}
                />
            ))}
        </section>
    );
}
