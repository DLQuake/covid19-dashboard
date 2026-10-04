import { fetchCountriesData, fetchGlobalData, fetchGlobalHistoricalData } from '@/lib/covidApi';
import CountriesTable from '@/components/CountriesTable';
import GlobalChart from '@/components/GlobalChart';
import GlobalStats from '@/components/GlobalStats';
import ThemeSwitcher from '@/components/ThemeSwitcher';

export const dynamic = 'force-dynamic';

export default async function HomePage() {
	const [countriesResult, globalResult, historyResult] = await Promise.allSettled([
		fetchCountriesData(),
		fetchGlobalData(),
		fetchGlobalHistoricalData(),
	]);
	const countries = countriesResult.status === 'fulfilled' ? countriesResult.value : null;
	const globalData = globalResult.status === 'fulfilled' ? globalResult.value : null;
	const historicalData = historyResult.status === 'fulfilled' ? historyResult.value : null;

	if (!countries) console.error('Error fetching countries data:', countriesResult.reason);
	if (!globalData) console.error('Error fetching global data:', globalResult.reason);
	if (!historicalData) console.error('Error fetching historical data:', historyResult.reason);

	return (
		<main className="hero">
			<div className="hero-body">
				<h1 className="title has-text-centered mb-6">COVID-19 Dashboard</h1>
				<ThemeSwitcher />

				<h2 className="subtitle has-text-centered">Global data </h2>

				<GlobalStats data={globalData} />

				<div className='columns'>
					<div className="column is-three-fifths">
						<GlobalChart history={historicalData} />
					</div>
					<div className="column">
						<h2 className="subtitle has-text-centered">COVID-19 data by Country</h2>
						<div className='box'>
							{!countries ? (
								<p role="alert">Nie udało się pobrać danych państw. Spróbuj ponownie później.</p>
							) : (
								<CountriesTable countries={countries} />
							)}
						</div>
					</div>
				</div>


			</div>
		</main>
	);
}
