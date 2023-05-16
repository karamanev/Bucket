import AWS, { AWSError } from 'aws-sdk';
import { ListObjectsOutput } from 'aws-sdk/clients/s3';
import { ChangeEvent, useEffect, useState } from 'react';
import { CurrentFolder, FoldersList } from '../Components';
import mapFilesData from '../Helpers/MapFiles';
import { BucketData, FileOrFolder } from '../Interfaces';

// Credentials from the task
// const S3_BUCKET = 'interview-task-g-karamanev';
// const accessKeyId = 'AKIAZ5RCAHL6MI5DXKNY';
// const secretAccessKey = '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';

// Working credentials
// const S3_BUCKET = 'karamanev-test';
// const accessKeyId = 'AKIAR56MQRQJOYC3YGJL';
// const secretAccessKey = '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';

const REGION = 'eu-central-1';

type Props = {
  config: BucketData;
};

export const Bucket = (props: Props) => {
  const [progress, setProgress] = useState(0);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileNames, setFileNames] = useState<string[] | null>(null);
  const [list, setList] = useState<FileOrFolder[]>([]);
  const [folder, setFolder] = useState<Partial<FileOrFolder>[]>([]);

  useEffect(() => {
    const load = function (err: AWSError, data: ListObjectsOutput) {
      if (data.Contents) {
        const fileNames = data.Contents.map((data) => data.Key) as string[];
        setFileNames(fileNames);
        const result: FileOrFolder[] = mapFilesData(fileNames);
        setList(result);
      }
    };
    myBucket.listObjects(load);
  }, []);

  AWS.config.update({
    accessKeyId: props.config.accessKeyId,
    secretAccessKey: props.config.secretAccessKey
  });

  const myBucket = new AWS.S3({
    params: { Bucket: props.config.S3_BUCKET },
    region: REGION
  });

  const handleFileInput = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target?.files && e.target?.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const uploadFile = (file: File | null) => {
    if (file) {
      const params = {
        ACL: 'public-read',
        Body: file,
        Bucket: props.config.S3_BUCKET,
        Key: `new/new1/${file.name}`
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

  function openFolder(folder: FileOrFolder) {
    console.log(folder);
  }

  return (
    <div className="wrapper fadeInDown">
      <div className="content fadeIn second">
        <FoldersList data={list} show={(folder) => openFolder(folder)} />
      </div>
      <div className="content fadeIn third directory">
        <CurrentFolder data={list} />
        <div>File Upload Progress is {progress}%</div>
        <input type="file" onChange={handleFileInput} />
        <button onClick={() => uploadFile(selectedFile)}> Upload to S3</button>
      </div>
    </div>
  );
};
