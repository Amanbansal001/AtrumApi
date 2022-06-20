var FCM = require('fcm-node')
//var serverKey = require('./solidaridad-e3e0b-firebase-adminsdk-pexmc-d16aa5592d') //put the generated private key path here    
var fcm = new FCM(serverKey);

const FCMController = {

    fcm_send(to, title, body, logger, type = 0, platform = 'ios') {

        logger.info("push to " + to);

        if (to == null) { return; }

        var message = { //this may vary according to the message type (single recipient, multicast, topic, et cetera)
            to: to,

            notification: {
                title: title,
                body: body,
                badge:"1"
            },

            // data: {  //you can send only notification or only data(or include both)
            //     my_key: 'my value',
            //     my_another_key: 'my another value'
            // }
        }

        // For Silent Push
        if (type == 1) {

            message = { //this may vary according to the message type (single recipient, multicast, topic, et cetera)
                to: to,
                data: {
                    //                title:  title,
                    body: body,
                    //type:type
                },

                // data: {  //you can send only notification or only data(or include both)
                //     my_key: 'my value',
                //     my_another_key: 'my another value'
                // }
            }

            if (platform == 'ios') {// For Silent Push
                message.notification = { title: title };
            }


        }

        logger.info(message);

        fcm.send(message, function (err, response) {
            if (err) {
                //console.log(err);
                logger.info("Something has gone wrong!")
            } else {
                logger.info("Successfully sent with response: ", response)
            }
        })
    }
}
module.exports = FCMController;
