import axios from 'axios';
import { CampaignsResponse, CampaignFilters } from '../types/campaign';

const api = axios.create({
    baseURL: '/api',
    timeout: 10000,
});

export async function fetchCampaigns(filters: CampaignFilters): Promise<CampaignsResponse> {
    const params: Record<string, string | number> = {
        page: filters.page,
        limit: 9,
    };

    if (filters.search) params.search = filters.search;
    if (filters.niche) params.niche = filters.niche;
    if (filters.sort) params.sort = filters.sort;

    const { data } = await api.get<CampaignsResponse>('/campaigns', { params });
    return data;
}

export async function fetchNiches(): Promise<string[]> {
    const { data } = await api.get<{ data: string[] }>('/campaigns/niches');
    return data.data;
}
