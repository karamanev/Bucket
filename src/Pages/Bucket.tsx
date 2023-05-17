import AWS, { AWSError } from 'aws-sdk';
import { ListObjectsOutput } from 'aws-sdk/clients/s3';
import { useEffect, useState } from 'react';
import { CurrentFolder, FoldersList } from '../Components';
import mapFilesData from '../Helpers/MapFiles';
import { BucketData, FileOrFolder } from '../Interfaces';

const REGION = 'eu-central-1';

type Props = {
  config: BucketData;
};

export const Bucket = (props: Props) => {
  const [list, setList] = useState<FileOrFolder[] | null>(null);
  const [folder, setFolder] = useState<FileOrFolder | null>(null);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    const load = (err: AWSError, data: ListObjectsOutput) => {
      if (data.Contents) {
        const fileNames = data.Contents.map((data) => data.Key) as string[];
        const result: FileOrFolder[] = mapFilesData(fileNames);
        setList(result);
        setFolder({ children: result, name: '', isFolder: true, path: '' });
      }
    };
    bucket.listObjects(load);
  }, [reload]);

  AWS.config.update({
    accessKeyId: props.config.accessKeyId,
    secretAccessKey: props.config.secretAccessKey
  });

  const bucket = new AWS.S3({
    params: { Bucket: props.config.S3_BUCKET },
    region: REGION
  });

  return (
    <div className="wrapper fadeInDown">
      <div className="content fadeIn second">
        {list && folder && (
          <FoldersList
            data={list}
            selected={folder}
            show={(folder) => setFolder(folder)}
            reload={() => setReload(!reload)}
          />
        )}
      </div>
      <div className="content fadeIn third directory">
        {folder && (
          <CurrentFolder
            data={folder}
            bucket={bucket}
            name={props.config.S3_BUCKET}
            reload={() => setReload(!reload)}
          />
        )}
      </div>
    </div>
  );
};
