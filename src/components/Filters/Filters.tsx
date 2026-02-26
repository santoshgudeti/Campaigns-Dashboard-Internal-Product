interface FiltersProps {
    niche: string;
    sort: string;
    niches: string[];
    onNicheChange: (niche: string) => void;
    onSortChange: (sort: string) => void;
    disabled?: boolean;
}

const sortOptions = [
    { value: 'newest', label: 'Newest First' },
    { value: 'oldest', label: 'Oldest First' },
    { value: 'highest', label: 'Highest Progress' },
    { value: 'lowest', label: 'Lowest Progress' },
];

export default function Filters({ niche, sort, niches, onNicheChange, onSortChange, disabled }: FiltersProps) {
    return (
        <div className="flex items-center gap-3">
            {/* Niche Filter */}
            <div className="relative">
                <select
                    id="filter-niche"
                    value={niche}
                    onChange={(e) => onNicheChange(e.target.value)}
                    disabled={disabled}
                    className="appearance-none pl-3.5 pr-9 py-2.5 bg-white border border-surface-200 rounded-xl text-sm text-surface-700 font-medium
            focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-400 
            disabled:opacity-50 disabled:cursor-not-allowed
            transition-all duration-200 shadow-sm hover:shadow-md cursor-pointer"
                    aria-label="Filter by niche"
                >
                    <option value="">All Niches</option>
                    {niches.map((n) => (
                        <option key={n} value={n}>{n}</option>
                    ))}
                </select>
                <div className="absolute inset-y-0 right-0 pr-2.5 flex items-center pointer-events-none">
                    <svg className="w-4 h-4 text-surface-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </div>
            </div>

            {/* Sort Filter */}
            <div className="relative">
                <select
                    id="filter-sort"
                    value={sort}
                    onChange={(e) => onSortChange(e.target.value)}
                    disabled={disabled}
                    className="appearance-none pl-3.5 pr-9 py-2.5 bg-white border border-surface-200 rounded-xl text-sm text-surface-700 font-medium
            focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-400 
            disabled:opacity-50 disabled:cursor-not-allowed
            transition-all duration-200 shadow-sm hover:shadow-md cursor-pointer"
                    aria-label="Sort campaigns"
                >
                    {sortOptions.map((opt) => (
                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                </select>
                <div className="absolute inset-y-0 right-0 pr-2.5 flex items-center pointer-events-none">
                    <svg className="w-4 h-4 text-surface-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </div>
            </div>
        </div>
    );
}
