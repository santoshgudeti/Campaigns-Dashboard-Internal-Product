import { useSearchParams } from 'react-router-dom';
import { useCallback } from 'react';
import { useCampaigns, useNiches } from '../hooks/useCampaigns';
import Navbar from '../components/Navbar/Navbar';
import SearchBar from '../components/SearchBar/SearchBar';
import Filters from '../components/Filters/Filters';
import CampaignCard from '../components/CampaignCard/CampaignCard';
import Pagination from '../components/Pagination/Pagination';
import { SkeletonGrid, EmptyState, ErrorState } from '../components/UI/States';
import { CampaignFilters } from '../types/campaign';

export default function CampaignsPage() {
    const [searchParams, setSearchParams] = useSearchParams();

    // Read filters from URL
    const filters: CampaignFilters = {
        search: searchParams.get('search') || '',
        niche: searchParams.get('niche') || '',
        sort: searchParams.get('sort') || 'newest',
        page: parseInt(searchParams.get('page') || '1', 10),
    };

    // Update URL params
    const updateFilters = useCallback(
        (updates: Partial<CampaignFilters>) => {
            const newParams = new URLSearchParams(searchParams);
            Object.entries(updates).forEach(([key, value]) => {
                if (value && value !== '' && value !== 'newest' && value !== 1) {
                    newParams.set(key, String(value));
                } else {
                    newParams.delete(key);
                }
            });
            // Reset to page 1 when filters change (except when changing page directly)
            if (!('page' in updates)) {
                newParams.delete('page');
            }
            setSearchParams(newParams, { replace: true });
        },
        [searchParams, setSearchParams]
    );

    const clearFilters = useCallback(() => {
        setSearchParams({}, { replace: true });
    }, [setSearchParams]);

    // Queries
    const { data, isLoading, isError, refetch, isFetching } = useCampaigns(filters);
    const { data: niches = [] } = useNiches();

    const campaigns = data?.data || [];
    const meta = data?.meta;

    return (
        <div className="min-h-screen bg-surface-50">
            <Navbar activeTab="Campaigns" onTabChange={() => { }} />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Page Header */}
                <div className="mb-8">
                    <h1 className="text-2xl sm:text-3xl font-bold text-surface-900 mb-1">
                        Campaigns
                    </h1>
                    <p className="text-surface-500 text-sm">
                        {meta ? `${meta.total} campaign${meta.total !== 1 ? 's' : ''} total` : 'Loading campaigns...'}
                    </p>
                </div>

                {/* Toolbar — Search + Filters */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mb-8">
                    <SearchBar
                        value={filters.search}
                        onChange={(search) => updateFilters({ search })}
                        disabled={isLoading}
                    />
                    <Filters
                        niche={filters.niche}
                        sort={filters.sort}
                        niches={niches}
                        onNicheChange={(niche) => updateFilters({ niche })}
                        onSortChange={(sort) => updateFilters({ sort })}
                        disabled={isLoading}
                    />
                </div>

                {/* Content */}
                <div className="relative">
                    {/* Fetching overlay */}
                    {isFetching && !isLoading && (
                        <div className="absolute inset-0 bg-white/50 z-10 rounded-2xl backdrop-blur-[1px]" />
                    )}

                    {isLoading ? (
                        <SkeletonGrid />
                    ) : isError ? (
                        <ErrorState onRetry={() => refetch()} />
                    ) : campaigns.length === 0 ? (
                        <EmptyState onClearFilters={clearFilters} />
                    ) : (
                        <>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {campaigns.map((campaign) => (
                                    <CampaignCard key={campaign.id} campaign={campaign} />
                                ))}
                            </div>

                            {meta && (
                                <Pagination
                                    page={meta.page}
                                    totalPages={meta.totalPages}
                                    onPageChange={(page) => updateFilters({ page })}
                                />
                            )}
                        </>
                    )}
                </div>
            </main>

            {/* Footer */}
            <footer className="border-t border-surface-200/60 py-6 mt-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <p className="text-center text-xs text-surface-400">
                        © 2026 CampaignHub. Built with React, TypeScript & Express.
                    </p>
                </div>
            </footer>
        </div>
    );
}
