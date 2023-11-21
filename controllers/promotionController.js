import Promotion from "../models/promotionModel.js";

class promotionController {
    static async getPromotions(req,res){
        try{
        const getpromotions = await Promotion.findAll()
        res.status(200).json(getpromotions)
        }catch(error){
            res.status(500).json({error: error.message})
        }
    }
    static async createPromotion(req,res){
        try{
        const createPromotion = await Promotion.create(req.body)
        res.status(200).json(createPromotion)
        }catch(error){
            res.status(500).json({error: error.message})
        }
    }
}

export default promotionController