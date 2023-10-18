import { Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import {
  
  option,
  Schema,
} from "../utils/validation";

import { CampaignAttributes, CampaignInstance } from "../model/campaignModel";

import { v4 as uuidv4 } from "uuid";


export const createCampaign = async (req: Request, res: Response) => {
    try {
      
      const { name, impressions, clicks, conversions, spend} = req.body
      const uuidCampaign = uuidv4();
      const validateResult = Schema.validate(req.body, option);
      if (validateResult.error) {
        return res.status(400).json({
          Error: validateResult.error.details[0].message,
        });
      }
  
  
      // check if the vendor exist
     const isExitingCampaign= (await CampaignInstance.findOne({
        where: { name :name},
      })) as unknown as CampaignAttributes;
  
      if (isExitingCampaign) {
       
          return res.status(400).json({
            message: "Campaign already exist",
            status: false
            
          });

        }else{
            const output = {
                id : uuidCampaign,
                name,
                impressions,
                clicks,
                conversions,
                spend

            }
            const uniqueCampaign = new CampaignInstance(output)
            await uniqueCampaign.save()
            res.status(200).json({
                message: "campaign successfully created",
                status: true
            })
        }
    } catch (err) {
      res.status(500).json({
        Error: "Internal server Error",
        route: "/create-campaign",
      });
    }
  };

  export const getAllCampaigns = async (req: Request, res: Response) => {
    try {
      const limit = req.query.limit as number | undefined;
      const campaign = await CampaignInstance.findAndCountAll({
        limit: limit,
      });
      return res.status(200).json({
        message: "You have successfully retrieved all campaigns",
        Count: campaign.count,
        Campaign: campaign.rows,
      });
    } catch (err) {
      return res.status(500).json({
        Error: "Internal server Error",
        route: "/retrieve",
      });
    }
  };

  export const deleteCampaigns = async (req: Request, res: Response) => {
    try {
      await CampaignInstance.destroy({
          where: {},
          truncate: true,
        });
    
        return res.status(200).send({
          message: 'All rows in the model have been deleted',
        });

    } catch (err) {
      res.status(500).json({
          error: "Could not retrieve all campaigns", err,
          route: "/retrieve"
      })
    }
  };