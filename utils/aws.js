import AWS from 'aws-sdk';

const awsConfig = {
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
  apiVersion: process.env.AWS_API_VERSION,
};

export const SES = new AWS.SES(awsConfig);
export const S3 = new AWS.S3(awsConfig);

const cfAccessKeyId = process.env.AWS_CF_ACCESS_KEY_ID;
const cfPrivateKey = process.env.AWS_CF_PRIVATE_KEY.replace(/\\n/g, '\n');
export const cloudFrontSigner = new AWS.CloudFront.Signer(
  cfAccessKeyId,
  cfPrivateKey
);

//How pre sign a cloudFront url
// const twoHours = 2 * 60 * 60 * 1000;
// const url =
//   'https://dbxiefh2buoba.cloudfront.net/4c2f8c2c-00b6-4c3f-811c-2c641016090a.mp4';
// const signedUrl = cloudFrontSigner.getSignedUrl({
//   url,
//   expires: Math.floor((Date.now() + twoHours) / 1000),
// });
// console.log(signedUrl);
