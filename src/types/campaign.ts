export interface Campaign {
    id: number;
    title: string;
    niche: string;
    status: 'Active' | 'Completed';
    impressions: number;
    clicks: number;
    conversionRate: number;
    progress: number;
    tags: string[];
    createdAt: string;
}

export interface CampaignsMeta {
    total: number;
    page: number;
    totalPages: number;
    limit: number;
}

export interface CampaignsResponse {
    data: Campaign[];
    meta: CampaignsMeta;
}

export interface CampaignFilters {
    search: string;
    niche: string;
    sort: string;
    page: number;
}
