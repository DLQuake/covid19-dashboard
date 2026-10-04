export default function LoadingState({ title, description }) {
	return (
		<main className="route-loader" role="status" aria-live="polite" aria-busy="true">
			<span className="route-loader__spinner" aria-hidden="true" />
			<p className="title is-5">{title}</p>
			<p>{description}</p>
		</main>
	);
}