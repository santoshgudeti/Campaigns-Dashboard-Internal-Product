export function SkeletonCard() {
    return (
        <div className="bg-white rounded-2xl border border-surface-200/60 shadow-card overflow-hidden">
            <div className="p-5 pb-3">
                <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="skeleton h-5 w-3/4 rounded-lg" />
                    <div className="skeleton h-6 w-16 rounded-lg" />
                </div>
                <div className="skeleton h-6 w-20 rounded-lg" />
            </div>
            <div className="px-5 py-3 grid grid-cols-3 gap-3 border-t border-surface-100">
                {[1, 2, 3].map((i) => (
                    <div key={i}>
                        <div className="skeleton h-3 w-14 rounded mb-1.5" />
                        <div className="skeleton h-4 w-10 rounded" />
                    </div>
                ))}
            </div>
            <div className="px-5 pb-5 pt-3">
                <div className="mb-4">
                    <div className="flex justify-between mb-1.5">
                        <div className="skeleton h-3 w-14 rounded" />
                        <div className="skeleton h-3 w-8 rounded" />
                    </div>
                    <div className="skeleton h-2 w-full rounded-full" />
                </div>
                <div className="skeleton h-10 w-full rounded-xl" />
            </div>
        </div>
    );
}

export function SkeletonGrid() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 9 }).map((_, i) => (
                <SkeletonCard key={i} />
            ))}
        </div>
    );
}

export function EmptyState({ onClearFilters }: { onClearFilters: () => void }) {
    return (
        <div className="flex flex-col items-center justify-center py-20 animate-fade-in">
            <div className="w-20 h-20 rounded-2xl bg-surface-100 flex items-center justify-center mb-6">
                <svg className="w-10 h-10 text-surface-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            </div>
            <h3 className="text-lg font-semibold text-surface-800 mb-2">No campaigns found</h3>
            <p className="text-sm text-surface-500 mb-6 text-center max-w-sm">
                We couldn't find any campaigns matching your filters. Try adjusting your search or filters.
            </p>
            <button
                id="clear-filters-btn"
                onClick={onClearFilters}
                className="px-5 py-2.5 bg-gradient-to-r from-primary-500 to-primary-600 text-white text-sm font-semibold rounded-xl 
          hover:from-primary-600 hover:to-primary-700 shadow-sm hover:shadow-md transition-all duration-200 active:scale-[0.98]"
            >
                Clear All Filters
            </button>
        </div>
    );
}

export function ErrorState({ onRetry }: { onRetry: () => void }) {
    return (
        <div className="flex flex-col items-center justify-center py-20 animate-fade-in">
            <div className="w-20 h-20 rounded-2xl bg-red-50 flex items-center justify-center mb-6">
                <svg className="w-10 h-10 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4.5c-.77-.833-2.694-.833-3.464 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
            </div>
            <h3 className="text-lg font-semibold text-surface-800 mb-2">Something went wrong</h3>
            <p className="text-sm text-surface-500 mb-6 text-center max-w-sm">
                We couldn't load the campaigns. Please check your connection and try again.
            </p>
            <button
                id="retry-btn"
                onClick={onRetry}
                className="px-5 py-2.5 bg-gradient-to-r from-primary-500 to-primary-600 text-white text-sm font-semibold rounded-xl 
          hover:from-primary-600 hover:to-primary-700 shadow-sm hover:shadow-md transition-all duration-200 active:scale-[0.98]"
            >
                Try Again
            </button>
        </div>
    );
}
