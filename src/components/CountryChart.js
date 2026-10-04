"use client";
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';

const numberFormatter = new Intl.NumberFormat('pl-PL');

const CountryChart = ({ cases, deaths, recovered }) => {
    const data = {
        labels: ['Cases', 'Deaths', 'Recovered'],
        datasets: [
            {
                label: 'COVID-19 Statistics',
                data: [cases, deaths, recovered],
                backgroundColor: ['rgba(75, 192, 192, 0.6)', 'rgba(255, 99, 132, 0.6)', 'rgba(72, 199, 142, 0.6)'],
                borderColor: ['rgba(75, 192, 192, 1)', 'rgba(255, 99, 132, 1)', 'rgba(72, 199, 142, 1)'],
                borderWidth: 1,
            },
        ],
    };

    const options = {
        responsive: true,
        scales: {
            y: {
                ticks: {
                    callback: (value) => numberFormatter.format(value),
                },
            },
        },
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'COVID-19 Statistics',
            },
        },
    };

    return <Bar data={data} options={options} aria-label="COVID-19 cases, deaths and recoveries" />;
};

export default CountryChart;
