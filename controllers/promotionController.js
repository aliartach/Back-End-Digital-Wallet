import Promotion from "../models/PromotionModel.js";

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
    static async getPromotion(req,res){
        const { id } = req.params;
        try{
        const getpromotion = await Promotion.findByPk(id)
        res.status(200).json(getpromotion)
        }catch(error){
            res.status(500).json({error: error.message})
        }
    }
    static async updatePromotion(req,res){
        const { id } = req.params;
        const { startDate, endDate, promoCode, description, percentage } = req.body;
        try{
            const promotion = await Promotion.findByPk(id);
            await promotion.update({
                        startDate,
                        endDate,
                        promoCode,
                        percentage,
                        description
                      });
        
        res.status(200).json(promotion)
        }catch(error){
            res.status(500).json({error: error.message})
        }
    }
    
    static async deletePromotion(req,res){
        const { id } = req.params;
        try {
            const promotion = await Promotion.findByPk(id);
        
            if (!promotion) {
              return res.status(404).json({ error: 'Promotion not found' });
            }
        
            // Delete the promotion
            await promotion.destroy();
        
            res.status(204).send(); // 204 No Content response
          } catch (error) {
            res.status(500).json({ error: error.message });
          }
    }
}

export default promotionController