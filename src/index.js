const request = require('request-promise');
const aws = require('aws-sdk');
const moment = require('moment-timezone');

const token = process.env.NATURE_REMO_THERMO_HYGRO_LOGGER_TOKEN;
const dynamoTable = process.env.NATURE_REMO_THERMO_HYGRO_LOGGER_DYNAMO;
const dynamoRegion = process.env.NATURE_REMO_THERMO_HYGRO_LOGGER_DYNAMO_REGION;

const dynamo = new aws.DynamoDB.DocumentClient({
  region: dynamoRegion,
});

const NATURE_REMO_BASE_URI = 'https://api.nature.global/1';
const API_URL_DEVICES = '/devices';

exports.handler = (event, context, callback) => {
  // main.

  request({
    method: 'GET',
    uri: `${NATURE_REMO_BASE_URI}${API_URL_DEVICES}`,
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-type': 'application/json',
    },
  })
    .then((res) => {
      const resJson = JSON.parse(res);
      const item = {
        device: resJson[0].name,
        datetime: moment().tz('Asia/Tokyo').format('YYYY-MM-DD HH:mm:ss'),
        huDatetime: moment(resJson[0].newest_events.hu.created_at).tz('Asia/Tokyo').format('YYYY-MM-DD HH:mm:ss'),
        humidity: resJson[0].newest_events.hu.val,
        teDatetime: moment(resJson[0].newest_events.te.created_at).tz('Asia/Tokyo').format('YYYY-MM-DD HH:mm:ss'),
        temperature: resJson[0].newest_events.te.val,
      };
      console.log(item);

      return new Promise((resolve, reject) => {
        dynamo.put({
          TableName: dynamoTable,
          Item: item
        }, (error, data) => {
          if (error) {
            return reject(error);
          } else {
            return resolve(data);
          }
        });
      });
    })
    .catch(err => console.error(err));

    callback(null, 'Success.');
};
