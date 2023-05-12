import React, { useState } from 'react';
import AWS, { AWSError } from 'aws-sdk';
import { ListObjectsOutput, Object as AA } from 'aws-sdk/clients/s3';

// Credentials from the task
// const S3_BUCKET = 'interview-task-g-karamanev';
// const accessKeyId = 'AKIAZ5RCAHL6MI5DXKNY';
// const secretAccessKey = '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';

// Working credentials
const S3_BUCKET = 'karamanev-test';
const accessKeyId = 'AKIAR56MQRQJOYC3YGJL';
const secretAccessKey = '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';

const REGION = 'eu-central-1';

AWS.config.update({
  accessKeyId,
  secretAccessKey
});

const myBucket = new AWS.S3({
  params: { Bucket: S3_BUCKET },
  region: REGION
});

export const Bucket = () => {
  const [progress, setProgress] = useState(0);
  const [selectedFile, setSelectedFile] = useState(null);
  const [files, setFiles] = useState<string[] | null>(null);

  const handleFileInput = (e: any) => {
    setSelectedFile(e.target.files[0]);
  };

  const uploadFile = (file: any) => {
    const params = {
      ACL: 'public-read',
      Body: file,
      Bucket: S3_BUCKET,
      Key: `prefix/${file.name}`
    };

    myBucket
      .putObject(params)
      .on('httpUploadProgress', (evt) => {
        setProgress(Math.round((evt.loaded / evt.total) * 100));
      })
      .send((err) => {
        if (err) console.log(err);
      });
  };

  function download() {
    // myBucket.getObject().send((a, err) => {
    //   console.log(a);
    //   if (err) console.log(err);
    // });

    // myBucket.listBuckets().send((a, err) => {
    //   console.log(a);
    //   if (err) console.log(err);
    // });

    // myBucket.listObjects().send((a, err) => {
    //   console.log(a);
    //   if (err) console.log(err);
    // });

    const a = function (err: AWSError, data: ListObjectsOutput) {
      console.log(err);
      console.log(data);
      if (data.Contents) {
        console.log(data.Contents);

        const a = data.Contents.map((a) => a.Key) as string[];

        setFiles(a);
      }
    };

    //    myBucket.listBuckets(a);

    myBucket.listObjects(a);
  }

  return (
    <div>
      <div>File Upload Progress is {progress}%</div>
      <input type="file" onChange={handleFileInput} />
      <button onClick={() => uploadFile(selectedFile)}>
        {' '}
                Upload to S3
      </button>
      <button onClick={() => download()}> Download </button>;
      <div>{files}</div>
    </div>
  );
};
