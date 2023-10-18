import { DataTypes, Model } from "sequelize";
import {db} from '../config'

export interface CampaignAttributes {
  id: string;
  name: string;
  impressions: number;
  clicks:number;
  conversions: number;
  spend: number;
 
}

export class CampaignInstance extends Model<CampaignAttributes> {}

CampaignInstance.init({
    id: {
        type: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      impressions: {
        type: DataTypes.NUMBER,
        allowNull: true,
      },
      clicks: {
          type:DataTypes.NUMBER,
          allowNull:false,
      },
      conversions:{
          type:DataTypes.NUMBER,
          allowNull:true
      },
      
      spend:{
          type:DataTypes.NUMBER,
          allowNull:true
      },
     
},

{
    sequelize:db,
    tableName:'campaign'
});