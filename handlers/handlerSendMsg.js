require('dotenv').config()
var AWS = require('aws-sdk');

module.exports.sendMsg = async (event, context, callback) => {

  const eventQueue = () => {
    return new Promise((resolve, reject) => {
      const data = JSON.parse(event.body);
      var sqs = new AWS.SQS();
      var params = {
        MessageAttributes: {
          "message": {
            DataType: "String",
            StringValue: data.message
          },
          "id": {
            DataType: "String",
            StringValue: data.id
          }
        },
        MessageBody: data.message,
        QueueUrl: process.env.SQS_URL
      };

      sqs.sendMessage(params, (err, data) => {
        if (err) {
          context.done({
            statusCode: 500,
            body: JSON.stringify({
              status: 'FAIL',
              message: err
            })
          })
        } else {
          resolve({
            statusCode: 200,
            body: JSON.stringify({
              status: 'SUCCESS',
              data: data.MessageId
            })
          })
        }
      });
    })
  }

  return await eventQueue();
  
};
