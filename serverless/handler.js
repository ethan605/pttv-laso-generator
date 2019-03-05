'use strict'; // eslint-disable-line

module.exports.fetchReading = async (event, context) => ({
  statusCode: 200,
  body: JSON.stringify({
    message: 'Go Serverless v1.0! Your function executed successfully!',
    event,
    context,
  }),
});
