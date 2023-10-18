"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.option = exports.Schema = void 0;
const joi_1 = __importDefault(require("joi"));
// Define the request validation schema using Joi
exports.Schema = joi_1.default.object({
    name: joi_1.default.string().trim().required(),
    impressions: joi_1.default.number().min(0).required(),
    clicks: joi_1.default.number().min(0).required(),
    conversions: joi_1.default.number().min(0).required(),
    spend: joi_1.default.number().min(0).required(),
});
exports.option = {
    abortEarly: false,
    errors: {
        wrap: {
            label: ""
        }
    }
};
