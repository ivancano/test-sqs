require('dotenv').config()
var AWS = require('aws-sdk');
const webhook = require("webhook-discord");
const Hook = new webhook.Webhook(process.env.DISCORD_WEBHOOK);

module.exports.receiveMsg = async (event, context, callback) => {

  const eventQueue = () => {
    return new Promise((resolve, reject) => {
      var sqs = new AWS.SQS();
      var params = {
        AttributeNames: [
          "SentTimestamp"
        ],
        MessageAttributeNames: [
          "All"
        ],
        VisibilityTimeout: 5,
        WaitTimeSeconds: 0,
        QueueUrl: process.env.SQS_URL
      };

      sqs.receiveMessage(params, (err, data) => {
        if (err) {
          context.done({
            statusCode: 500,
            body: JSON.stringify({
              status: 'FAIL',
              message: err
            })
          })
        } else {
          if(data.Messages){
            const message = data.Messages[0].MessageAttributes.message.StringValue;
            var deleteParams = {
              QueueUrl: process.env.SQS_URL,
              ReceiptHandle: data.Messages[0].ReceiptHandle
            };
            sqs.deleteMessage(deleteParams, function(err, dataDelete) {
              if (err) {
                context.done({
                  statusCode: 500,
                  body: JSON.stringify({
                    status: 'FAIL',
                    message: err
                  })
                })
              } else {
                Hook.success("test", message);
                resolve({
                  statusCode: 200,
                  body: JSON.stringify({
                    status: 'SUCCESS',
                    data: message
                  })
                })
              }
            });
          }
          else {
            context.done(null, {
              statusCode: 500,
              body: JSON.stringify({
                status: 'FAIL',
                message: 'Message not found'
              })
            })
          }
        }
      });
    })
  }

  return await eventQueue();
  
};
