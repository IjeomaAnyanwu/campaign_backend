import Joi from 'joi';

// Define the request validation schema using Joi
export const Schema = Joi.object({
    name: Joi.string().trim().required(), 
    impressions: Joi.number().min(0).required(),
    clicks: Joi.number().min(0).required(),
    conversions: Joi.number().min(0).required(),
    spend: Joi.number().min(0).required(),

});

export const option = {
    abortEarly:false,
    errors:{
        wrap:{
            label:""
        }
    }
}