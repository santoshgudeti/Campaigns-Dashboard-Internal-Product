import { Request, Response } from 'express';
import { getCampaigns, getNiches } from '../services/campaigns.service';
import { CampaignQueryParams } from '../types/campaign';

export function handleGetCampaigns(req: Request, res: Response): void {
    try {
        const params: CampaignQueryParams = {
            search: req.query.search as string | undefined,
            niche: req.query.niche as string | undefined,
            sort: req.query.sort as string | undefined,
            page: req.query.page ? parseInt(req.query.page as string, 10) : undefined,
            limit: req.query.limit ? parseInt(req.query.limit as string, 10) : undefined,
        };

        // Validate page and limit are numbers
        if (params.page !== undefined && isNaN(params.page)) {
            params.page = 1;
        }
        if (params.limit !== undefined && isNaN(params.limit)) {
            params.limit = 9;
        }

        const result = getCampaigns(params);
        res.json(result);
    } catch (error) {
        res.status(500).json({
            error: 'Failed to fetch campaigns',
            message: error instanceof Error ? error.message : 'Unknown error',
        });
    }
}

export function handleGetNiches(_req: Request, res: Response): void {
    try {
        const niches = getNiches();
        res.json({ data: niches });
    } catch (error) {
        res.status(500).json({
            error: 'Failed to fetch niches',
            message: error instanceof Error ? error.message : 'Unknown error',
        });
    }
}
