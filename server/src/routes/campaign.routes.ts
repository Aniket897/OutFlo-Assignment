import { NextFunction, Request, Response, Router } from "express";
import campaignModel from "../models/campaign.model";

const routes = Router();

/**
 * GET / - Fetch all campaigns excluding deleted ones
 */

routes.get("/", async (req: Request, resp: Response, next: NextFunction) => {
  try {
    const campaigns = await campaignModel.find({
      status: {
        $ne: "deleted",
      },
    });

    resp.status(200).json({
      campaigns,
    });
  } catch (error) {
    console.log(error);
    resp.status(500).json({
      message: "Internal server error",
    });
  }
});

/**
 * POST / - Create a new campaign
 */

routes.post("/", async (req: Request, resp: Response, next: NextFunction) => {
  try {
    const { name, description, leads, accountIDs } = req.body;

    if (!name) {
      resp.status(401).json({
        message: "name is required to create a campaign",
      });
      return;
    }

    if (!description) {
      resp.status(401).json({
        message: "name is required to create a campaign",
      });
      return;
    }

    if (!leads.length) {
      resp.status(401).json({
        message: "at least one lead is required to create a campaign",
      });
      return;
    }

    const campaign = await campaignModel.create({
      name,
      description,
      leads,
      accountIDs,
    });

    resp.status(200).json({
      campaign,
    });
  } catch (error) {
    console.log(error);
    resp.status(500).json({
      message: "Internal server error",
    });
  }
});

/**
 * GET /:campaignId - Fetch a specific campaign by ID
 */

routes.get(
  "/:campaignId",
  async (req: Request, resp: Response, next: NextFunction) => {
    try {
      const { campaignId } = req.params;

      const campaign = await campaignModel.findById(campaignId);

      if (!campaign) {
        resp.status(400).json({
          message: "Campaign not found",
        });
        return;
      }

      if (campaign?.status == "deleted") {
        resp.status(400).json({
          message: "Campaign not found",
        });
        return;
      }

      resp.status(200).json({
        campaign,
      });
    } catch (error) {
      console.log(error);
      resp.status(500).json({
        message: "Internal server error",
      });
    }
  }
);

/**
 * PATCH /:campaignId - Update campaign details
 */

routes.patch(
  "/:campaignId",
  async (req: Request, resp: Response, next: NextFunction) => {
    try {
      const { name, description, status } = req.body;
      const { campaignId } = req.params;

      const campaign = await campaignModel.findByIdAndUpdate(
        campaignId,
        {
          name,
          description,
          status,
        },
        {
          new: true,
        }
      );

      resp.status(200).json({
        campaign,
      });
    } catch (error) {
      console.log(error);
      resp.status(500).json({
        message: "Internal server error",
      });
    }
  }
);

/**
 * DELETE /:campaignId - Soft delete a campaign by updating its status to 'deleted'
 */
routes.delete(
  "/:campaignId",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { campaignId } = req.params;

      const deletedCampaign = await campaignModel.findByIdAndUpdate(
        campaignId,
        { status: "deleted" },
        { new: true }
      );

      if (!deletedCampaign) {
        res.status(404).json({ message: "Campaign not found" });
        return;
      }

      res.status(200).json({
        message: "Campaign deleted successfully",
        campaign: deletedCampaign,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
);

export default routes;
