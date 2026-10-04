import LoadingState from '@/components/LoadingState';

export default function CountryLoading() {
	return (
		<LoadingState
			title="Ładowanie szczegółów kraju…"
			description="Za chwilę pojawią się aktualne statystyki."
		/>
	);
}