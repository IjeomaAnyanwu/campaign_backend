import express from "express"

import { createCampaign, deleteCampaigns, getAllCampaigns } from "../controllers/campaignController";

const router = express.Router();

router.post('/create-campaign',  createCampaign)
router.get('/retrieve', getAllCampaigns)
router.delete('/delete', deleteCampaigns)

export default router;