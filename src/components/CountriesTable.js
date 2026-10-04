"use client";
import { useMemo, useState } from 'react';
import Link from 'next/link';
import { formatNumber } from '@/lib/formatNumber';

export default function CountriesTable({ countries }) {
    const [filter, setFilter] = useState('');
    const [sortField, setSortField] = useState('country');
    const [sortOrder, setSortOrder] = useState('asc');

    const sortedCountries = useMemo(() => {
        const searchTerm = filter.trim().toLocaleLowerCase('pl-PL');
        return countries
            .filter(({ country }) => country.toLocaleLowerCase('pl-PL').includes(searchTerm))
            .sort((a, b) => {
                const aValue = a[sortField];
                const bValue = b[sortField];
                const comparison = typeof aValue === 'string'
                    ? aValue.localeCompare(String(bValue ?? ''), 'pl')
                    : Number(aValue ?? 0) - Number(bValue ?? 0);

                return sortOrder === 'asc' ? comparison : -comparison;
            });
    }, [countries, filter, sortField, sortOrder]);

    const handleSort = (field) => {
        if (sortField === field) {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        } else {
            setSortField(field);
            setSortOrder('asc');
        }
    };

    return (
        <div className="table-container">
            {/* Search input */}
            <div className="field sticky-search">
                    <label className="label" htmlFor="country-filter">Filter countries:</label>
                <div className="control">
                    <input
                        id="country-filter"
                        type="search"
                        className="input"
                        placeholder="Search by country name"
                        autoComplete="off"
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                    />
                </div>
            </div>

            {/* Wrapper for the table to enable horizontal scrolling */}
            <div className="table-wrapper">
                <table className="table is-fullwidth is-striped is-hoverable">
                    <thead>
                        <tr>
                            <th scope="col">Flag</th>
                            {['country', 'cases', 'deaths', 'recovered'].map((field) => (
                                <th key={field} scope="col" aria-sort={sortField === field ? (sortOrder === 'asc' ? 'ascending' : 'descending') : 'none'}>
                                    <button className="button is-ghost p-0" type="button" onClick={() => handleSort(field)}>
                                        {field[0].toUpperCase() + field.slice(1)} {sortField === field && (sortOrder === 'asc' ? '▲' : '▼')}
                                    </button>
                                </th>
                            ))}
                            <th scope="col">Details</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sortedCountries.map((country) => (
                            <tr key={country.countryInfo?._id || country.country}>
                                <td>
                                    <figure className="image is-48x48">
                                        {/* External flag URLs are supplied by disease.sh and aren't suitable for next/image optimization. */}
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img src={country.countryInfo?.flag} alt={`Flag of ${country.country}`} loading="lazy" />
                                    </figure>
                                </td>
                                <td>
                                    {country.country}
                                </td>
                                <td>{formatNumber(country.cases)}</td>
                                <td>{formatNumber(country.deaths)}</td>
                                <td>{formatNumber(country.recovered)}</td>
                                <td>
                                    <Link href={`/${encodeURIComponent(country.country)}`} className="button is-primary">
                                        View Details
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {sortedCountries.length === 0 && (
                    <p className="has-text-centered p-4" role="status">No countries match your search.</p>
                )}
            </div>
        </div>
    );
}
