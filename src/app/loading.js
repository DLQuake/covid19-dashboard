import LoadingState from '@/components/LoadingState';

export default function HomeLoading() {
	return (
		<LoadingState
			title="Ładowanie dashboardu…"
			description="Pobieramy statystyki, historię wykresów i listę państw."
		/>
	);
}