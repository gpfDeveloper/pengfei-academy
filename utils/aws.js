import AWS from 'aws-sdk';

const awsConfig = {
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
  apiVersion: process.env.AWS_API_VERSION,
};

export const SES = new AWS.SES(awsConfig);
export const S3 = new AWS.S3(awsConfig);
