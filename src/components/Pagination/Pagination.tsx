interface PaginationProps {
    page: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

export default function Pagination({ page, totalPages, onPageChange }: PaginationProps) {
    if (totalPages <= 1) return null;

    const getPageNumbers = (): (number | string)[] => {
        const pages: (number | string)[] = [];
        const delta = 2;

        for (let i = 1; i <= totalPages; i++) {
            if (i === 1 || i === totalPages || (i >= page - delta && i <= page + delta)) {
                pages.push(i);
            } else if (pages[pages.length - 1] !== '...') {
                pages.push('...');
            }
        }

        return pages;
    };

    return (
        <nav className="flex items-center justify-center gap-1.5 mt-8" aria-label="Pagination">
            {/* Previous */}
            <button
                id="pagination-prev"
                onClick={() => onPageChange(page - 1)}
                disabled={page <= 1}
                className="px-3 py-2 rounded-xl text-sm font-medium text-surface-600 bg-white border border-surface-200 
          hover:bg-surface-50 hover:border-surface-300 
          disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-white
          transition-all duration-200 shadow-sm"
                aria-label="Previous page"
            >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
            </button>

            {/* Page numbers */}
            {getPageNumbers().map((p, idx) =>
                p === '...' ? (
                    <span key={`dots-${idx}`} className="px-2 py-2 text-sm text-surface-400">
                        •••
                    </span>
                ) : (
                    <button
                        key={p}
                        id={`pagination-page-${p}`}
                        onClick={() => onPageChange(p as number)}
                        className={`min-w-[40px] py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${page === p
                                ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-md shadow-primary-200'
                                : 'text-surface-600 bg-white border border-surface-200 hover:bg-surface-50 hover:border-surface-300 shadow-sm'
                            }`}
                        aria-label={`Page ${p}`}
                        aria-current={page === p ? 'page' : undefined}
                    >
                        {p}
                    </button>
                )
            )}

            {/* Next */}
            <button
                id="pagination-next"
                onClick={() => onPageChange(page + 1)}
                disabled={page >= totalPages}
                className="px-3 py-2 rounded-xl text-sm font-medium text-surface-600 bg-white border border-surface-200 
          hover:bg-surface-50 hover:border-surface-300 
          disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-white
          transition-all duration-200 shadow-sm"
                aria-label="Next page"
            >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
            </button>
        </nav>
    );
}
