import React, { useState } from 'react';
import AWS, { AWSError } from 'aws-sdk';
import { ListObjectsOutput } from 'aws-sdk/clients/s3';
import toast from 'react-hot-toast';
import { FileOrFolder } from '../Interfaces';
import { FolderComponent } from '../Components';

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
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileNames, setFileNames] = useState<string[] | null>(null);
  const [list, setList] = useState<FileOrFolder[]>([]);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target?.files && e.target?.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const uploadFile = (file: File | null) => {
    if (file) {
      const params = {
        ACL: 'public-read',
        Body: file,
        Bucket: S3_BUCKET,
        Key: `prefix/prefix/${file.name}`
      };

      myBucket
        .putObject(params)
        .on('httpUploadProgress', (evt) => {
          setProgress(Math.round((evt.loaded / evt.total) * 100));
        })
        .send((err) => {
          if (err) console.log(err);
        });
    }
  };

  function download() {
    toast('Downloading!');

    const a = function (err: AWSError, data: ListObjectsOutput) {
      console.log(err);
      console.log(data);
      if (data.Contents) {
        console.log(data.Contents);

        const a = data.Contents.map((a) => a.Key) as string[];

        const result: any = [];

        a.reduce(
          (r, path) => {
            path.split('/').reduce((o, name) => {
              let temp = (o.children = o.children || []).find(
                (q: any) => q.name === name
              );
              console.log(temp);

              if (!temp) o.children.push((temp = { name }));
              return temp;
            }, r);
            return r;
          },
          { children: result }
        );

        console.log(result as FileOrFolder[]);

        setFileNames(a);
        setList(result);
      }
    };

    myBucket.listObjects(a);

    downloadFile();
  }

  console.log(list);

  function downloadFile() {
    //     myBucket.deleteObject(params: {Key: 'object.txt'}, );
    //  /   myBucket.getObject()
  }

  return (
    <div>
      <div>File Upload Progress is {progress}%</div>
      <input type="file" onChange={handleFileInput} />
      <button onClick={() => uploadFile(selectedFile)}> Upload to S3</button>
      <button onClick={() => download()}> Download </button>;
      <div>{fileNames}</div>
      <FolderComponent data={list} />;
    </div>
  );
};
