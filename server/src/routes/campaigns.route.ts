import { Router } from 'express';
import { handleGetCampaigns, handleGetNiches } from '../controllers/campaigns.controller';

const router = Router();

router.get('/campaigns', handleGetCampaigns);
router.get('/campaigns/niches', handleGetNiches);

export default router;
