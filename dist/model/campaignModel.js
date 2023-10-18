"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CampaignInstance = void 0;
const sequelize_1 = require("sequelize");
const config_1 = require("../config");
class CampaignInstance extends sequelize_1.Model {
}
exports.CampaignInstance = CampaignInstance;
CampaignInstance.init({
    id: {
        type: sequelize_1.DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    impressions: {
        type: sequelize_1.DataTypes.NUMBER,
        allowNull: true,
    },
    clicks: {
        type: sequelize_1.DataTypes.NUMBER,
        allowNull: false,
    },
    conversions: {
        type: sequelize_1.DataTypes.NUMBER,
        allowNull: true
    },
    spend: {
        type: sequelize_1.DataTypes.NUMBER,
        allowNull: true
    },
}, {
    sequelize: config_1.db,
    tableName: 'campaign'
});
