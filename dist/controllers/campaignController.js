"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllCampaigns = exports.createCampaign = void 0;
const validation_1 = require("../utils/validation");
const campaignModel_1 = require("../model/campaignModel");
const uuid_1 = require("uuid");
const createCampaign = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, impressions, clicks, conversions, spend } = req.body;
        const uuidCampaign = (0, uuid_1.v4)();
        const validateResult = validation_1.Schema.validate(req.body, validation_1.option);
        if (validateResult.error) {
            return res.status(400).json({
                Error: validateResult.error.details[0].message,
            });
        }
        // check if the vendor exist
        const isExitingCampaign = (yield campaignModel_1.CampaignInstance.findOne({
            where: { name: name },
        }));
        if (isExitingCampaign) {
            return res.status(400).json({
                message: "Campaign already exist",
                status: false
            });
        }
        else {
            const output = {
                id: uuidCampaign,
                name,
                impressions,
                clicks,
                conversions,
                spend
            };
            const uniqueCampaign = new campaignModel_1.CampaignInstance(output);
            yield uniqueCampaign.save();
            res.status(200).json({
                message: "campaign successfully created",
                status: true
            });
        }
    }
    catch (err) {
        res.status(500).json({
            Error: "Internal server Error",
            route: "/create-campaign",
        });
    }
});
exports.createCampaign = createCampaign;
const getAllCampaigns = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const limit = req.query.limit;
        const campaign = yield campaignModel_1.CampaignInstance.findAndCountAll({
            limit: limit,
        });
        return res.status(200).json({
            message: "You have successfully retrieved all campaigns",
            Count: campaign.count,
            Campaign: campaign.rows,
        });
    }
    catch (err) {
        return res.status(500).json({
            Error: "Internal server Error",
            route: "/retrieve",
        });
    }
});
exports.getAllCampaigns = getAllCampaigns;
