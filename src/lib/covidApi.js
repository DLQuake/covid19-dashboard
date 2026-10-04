const BASE_URL = 'https://disease.sh/v3/covid-19';
const CACHE_SECONDS = 300;
const REQUEST_TIMEOUT_MS = 10_000;

async function fetchJson(url) {
    const response = await fetch(url, {
        next: { revalidate: CACHE_SECONDS },
        signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
    });

    if (!response.ok) {
        throw new Error(`COVID-19 API request failed with status ${response.status}`);
    }

    try {
        return await response.json();
    } catch (error) {
        throw new Error('COVID-19 API returned an invalid JSON response', { cause: error });
    }
}

/**
 * Downloads global COVID-19 statistics
 */
export async function fetchGlobalData() {
    const data = await fetchJson(`${BASE_URL}/all`);
    if (!data || typeof data.cases !== 'number' || typeof data.deaths !== 'number') {
        throw new Error('COVID-19 API returned invalid global statistics');
    }
    return data;
}

/**
 * Retrieves COVID-19 statistics for the selected country
 * @param {string} country - Country name e.g. 'Poland'
 */
export async function fetchCountryData(country) {
    const data = await fetchJson(`${BASE_URL}/countries/${encodeURIComponent(country)}`);
    if (!data || typeof data.country !== 'string' || !data.countryInfo) {
        throw new Error(`COVID-19 API returned invalid data for ${country}`);
    }
    return data;
}

/**
 * Downloads COVID-19 statistics for all countries
 */
export async function fetchCountriesData() {
    const countries = await fetchJson(`${BASE_URL}/countries`);
    if (!Array.isArray(countries)) {
        throw new Error('COVID-19 API returned an invalid countries response');
    }
    return countries;
}

/**
 * Downloads global historical COVID-19 statistics
 */
export async function fetchGlobalHistoricalData() {
    const history = await fetchJson(`${BASE_URL}/historical/all?lastdays=all`);
    if (!history || typeof history !== 'object' || typeof history.cases !== 'object' || !history.cases) {
        throw new Error('COVID-19 API returned invalid historical data');
    }
    return history;
}
