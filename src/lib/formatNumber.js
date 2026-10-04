const numberFormatter = new Intl.NumberFormat('pl-PL');

export function formatNumber(value) {
	if (typeof value === 'number') {
		return numberFormatter.format(value);
	}

	return value ?? '—';
}