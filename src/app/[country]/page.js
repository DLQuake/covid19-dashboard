import { fetchCountryData } from '@/lib/covidApi';
import Link from 'next/link';
import CountryChart from '@/components/CountryChart';
import CountryStats from '@/components/CountryStats';
import ThemeSwitcher from '@/components/ThemeSwitcher';

export const dynamic = 'force-dynamic';

const CountryDetailsPage = async ({ params }) => {
    const { country } = await params;

    let countryData;

    try {
        countryData = await fetchCountryData(country);
    } catch (error) {
        console.error('Error fetching country data:', error);
        countryData = null;
    }

    if (!countryData) {
        return (
            <main className="container has-text-centered py-6">
                <h1 className="title">Country data not found</h1>
                <p className="mb-4">Nie udało się pobrać statystyk. Spróbuj ponownie później.</p>
                <Link href="/" className="button is-primary">Wróć do tabeli państw</Link>
            </main>
        );
    }

    return (
        <div className="hero">
            <div className="hero-body">
                <h1 className="title has-text-centered">Details of COVID-19 in the {countryData.country}</h1>
                <figure className="mb-5 flagimage">
                    {/* External flag URLs come from disease.sh; keep them out of Next image optimization. */}
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        className="image"
                        src={countryData.countryInfo.flag}
                        alt={`Flag of ${countryData.country}`}
                        loading="lazy"
                    />
                </figure>

                <ThemeSwitcher />
                <CountryStats
                    cases={countryData.cases}
                    deaths={countryData.deaths}
                    recovered={countryData.recovered}
                    population={countryData.population}
                    lastUpdated={new Date(countryData.updated).toLocaleString('pl-PL')}
                />

                <div className='box'>
                    <CountryChart
                        cases={countryData.cases}
                        deaths={countryData.deaths}
                        recovered={countryData.recovered}
                    />
                </div>

                <div className="has-text-centered mt-4">
                    <Link href="/" className="button is-primary is-medium">
                        Back to Home
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default CountryDetailsPage;
