import { useQuery } from '@tanstack/react-query';
import { fetchCampaigns, fetchNiches } from '../services/campaigns.api';
import { CampaignFilters } from '../types/campaign';

export function useCampaigns(filters: CampaignFilters) {
    return useQuery({
        queryKey: ['campaigns', filters],
        queryFn: () => fetchCampaigns(filters),
        staleTime: 5 * 60 * 1000, // 5 minutes
        placeholderData: (previousData) => previousData,
    });
}

export function useNiches() {
    return useQuery({
        queryKey: ['niches'],
        queryFn: fetchNiches,
        staleTime: 30 * 60 * 1000, // 30 minutes — niches rarely change
    });
}
