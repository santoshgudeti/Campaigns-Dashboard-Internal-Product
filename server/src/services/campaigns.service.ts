import { CampaignQueryParams, CampaignsResponse } from '../types/campaign';
import { campaigns } from '../data/seed';

export function getCampaigns(params: CampaignQueryParams): CampaignsResponse {
    let filtered = [...campaigns];

    // 1. Search filter — case-insensitive match on title + tags
    if (params.search && params.search.trim() !== '') {
        const searchTerm = params.search.toLowerCase().replace(/[^a-z0-9\s]/gi, '');
        filtered = filtered.filter(
            (c) =>
                c.title.toLowerCase().includes(searchTerm) ||
                c.tags.some((tag) => tag.toLowerCase().includes(searchTerm))
        );
    }

    // 2. Niche filter
    if (params.niche && params.niche.trim() !== '') {
        filtered = filtered.filter(
            (c) => c.niche.toLowerCase() === params.niche!.toLowerCase()
        );
    }

    // 3. Sorting
    const sort = params.sort || 'newest';
    switch (sort) {
        case 'oldest':
            filtered.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
            break;
        case 'highest':
            filtered.sort((a, b) => b.progress - a.progress);
            break;
        case 'lowest':
            filtered.sort((a, b) => a.progress - b.progress);
            break;
        case 'newest':
        default:
            filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
            break;
    }

    // 4. Pagination
    const page = Math.max(1, params.page || 1);
    const limit = Math.min(50, Math.max(1, params.limit || 9));
    const total = filtered.length;
    const totalPages = Math.ceil(total / limit);
    const startIndex = (page - 1) * limit;

    // Invalid page → empty array
    if (page > totalPages && totalPages > 0) {
        return {
            data: [],
            meta: { total, page, totalPages, limit },
        };
    }

    const data = filtered.slice(startIndex, startIndex + limit);

    return {
        data,
        meta: {
            total,
            page,
            totalPages,
            limit,
        },
    };
}

export function getNiches(): string[] {
    const niches = new Set(campaigns.map((c) => c.niche));
    return Array.from(niches).sort();
}
