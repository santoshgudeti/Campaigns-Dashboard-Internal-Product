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

export interface CampaignsResponse {
    data: Campaign[];
    meta: {
        total: number;
        page: number;
        totalPages: number;
        limit: number;
    };
}

export interface CampaignQueryParams {
    search?: string;
    niche?: string;
    sort?: string;
    page?: number;
    limit?: number;
}
