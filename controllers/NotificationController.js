import Notification from "../models/NotificationModel.js";

class NotificationController {
    static async getNotification(req,res){
        const { id } = req.params;
        try{
            const getnotification =  await Notification.findByPk(id)
            res.status(200).json(getnotification)
        }catch(error){
            res.status(500).json({error: error.message})
        }
    }
    static async getNotifications(req,res){
        try{
            const getnotification =  await Notification.findAll()
            res.status(200).json(getnotification)
        }catch(error){
            res.status(500).json({error: error.message})
        }
    }
    static async createNotification(req,res){
        try{
        const createNotification = await Notification.create(req.body)
        res.status(200).json(createNotification)
        }catch(error){
            res.status(500).json({error: error.message})
        }
    }
    static async updateNotification(req,res){
        const { id } = req.params;
        const {status} = req.body;
        try{
            const notification = await Notification.findByPk(id);
            await notification.update({
                status
            });
            res.status(200).json(notification)
        }catch(error){
            res.status(500).json({error: error.message})
        }
    }

    static async deleteNotification(req,res){
        const { id } = req.params;
        const {status} = req.body;
        try{
            const notification = await Notification.findByPk(id);
            await notification.destroy({
                status
            });
            res.status(200).json(notification)
        }catch(error){
            res.status(500).json({error: error.message})
        }
    }


}

export default NotificationController 