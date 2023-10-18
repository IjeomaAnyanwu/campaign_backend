import {Sequelize} from "sequelize"

export const db = new Sequelize("app","","",{
    storage:".campaign.sqlite",
    dialect:"sqlite",
    logging:false
})