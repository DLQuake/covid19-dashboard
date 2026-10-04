"use client";
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';

const options = {
	responsive: true,
	plugins: { legend: { position: 'top' } },
	interaction: { mode: 'index', intersect: false },
	scales: {
		y: {
			ticks: {
				callback: (value) => new Intl.NumberFormat('pl-PL').format(value),
			},
		},
	},
};

export default function HistoryMetricChart({ title, labels, values, color, note }) {
	return (
		<div className="box">
			<h3 className="title is-5 has-text-centered">{title}</h3>
			{note && <p className="help has-text-centered mb-3">{note}</p>}
			<Line
				data={{
					labels,
					datasets: [{
						label: title,
						data: values,
						borderColor: color,
						backgroundColor: color.replace(', 1)', ', 0.2)'),
						fill: true,
					}],
				}}
				options={options}
				aria-label={title}
			/>
		</div>
	);
}