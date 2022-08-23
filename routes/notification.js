const router = require('express').Router()
const { response } = require('express');
const FCM = require('fcm-node');
router.post('/fcm',async (req, res, next) => {
    try {
        let fcm = new FCM(process.env.SERVER_KEY)
        let message = {
            to:'/topics/'+req.body.topic,
            notification:{
                title:req.body.title,
                body:req.body.body,
                sound:'default',
                "click_action":"FCM_PLUGIN_ACTIVITY",
                "icon":"fcm_push_icon"
            }
        }
        fcm.send(message,(err,response)=>{
            if (err) {
                next(err)
            } else {
                res.json(response)
            }
        })
    } catch (error) {
        next(error)
    }
});


module.exports = router