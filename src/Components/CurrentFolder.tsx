import { ChangeEvent, useRef, useState } from 'react';
import { AiFillDelete, AiFillFileText, AiFillFolder } from 'react-icons/ai';

import { AWSError } from 'aws-sdk';
import { GetObjectOutput } from 'aws-sdk/clients/s3';
import toast from 'react-hot-toast';
import { BsFillBackspaceFill } from 'react-icons/bs';
import { FileOrFolder } from '../Interfaces';

interface Props {
  data: FileOrFolder;
  bucket: AWS.S3;
  name: string;
  reload: () => void;
}

export const CurrentFolder = (props: Props) => {
  const [progress, setProgress] = useState<number>(0);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedFirstFile, setSelectedFirstFile] = useState<File | null>(null);
  const [newFolder, setNewFolder] = useState<string>('');
  const [fileContent, setFileContent] = useState<string | null>(null);

  const fileRef = useRef<HTMLInputElement>(null);
  const firstFileRef = useRef<HTMLInputElement>(null);

  const handleFileInput = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target?.files && e.target?.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleFirstFileInput = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target?.files && e.target?.files[0]) {
      setSelectedFirstFile(e.target.files[0]);
    }
  };

  const uploadFirstFile = (file: File | null) => {
    uploadFile(file, newFolder);
  };

  const deleteItem = (item: FileOrFolder) => {
    const params = {
      Bucket: props.name,
      Key: item.path
    };
    props.bucket.deleteObject(params, reload);
  };

  const reload = () => {
    setProgress(0);
    setSelectedFile(null);
    if (fileRef.current) {
      fileRef.current.value = '';
    }
    if (firstFileRef.current) {
      firstFileRef.current.value = '';
    }
    setSelectedFirstFile(null);
    props.reload();
  };

  const uploadFile = (file: File | null, newFolder?: string) => {
    if (file) {
      const Key = `${props.data?.path ? `${props.data?.path}/` : ''}${
        newFolder ? `${newFolder}/` : ''
      }${file.name}`;

      const params = {
        ACL: 'public-read',
        Body: file,
        Bucket: props.name,
        Key
      };

      props.bucket
        .putObject(params, reload)
        .on('httpUploadProgress', (evt) => {
          setProgress(Math.round((evt.loaded / evt.total) * 100));
        })
        .send((err) => {
          if (err) console.log(err);
        });
    }
  };

  const openFile = (item: FileOrFolder) => {
    if (item.isFolder) {
      toast('Please open the folders from the left menu');
    } else {
      const mapContent = (err: AWSError, data: GetObjectOutput) => {
        if (data.Body) {
          setFileContent(new TextDecoder().decode(data?.Body as Uint8Array));
        }
      };
      const params = {
        Bucket: props.name,
        Key: item.name
      };

      props.bucket.getObject(params, mapContent);
    }
  };

  return (
    <div className="current-folder">
      {fileContent && (
        <div>
          <div onClick={() => setFileContent(null)}>
            <BsFillBackspaceFill />
          </div>
          <h2>File content:</h2>
          <div>{fileContent}</div>
        </div>
      )}
      {!fileContent && (
        <div>
          <div>
            {props.data &&
              props.data.children &&
              props.data.children.map((parent) => {
                return (
                  <div key={parent.name} className="file">
                    <div onClick={() => openFile(parent)}>
                      {parent.isFolder ? <AiFillFolder /> : <AiFillFileText />}
                    </div>
                    {parent.name}
                    {!parent.isFolder && (
                      <span onClick={() => deleteItem(parent)}>
                        {<AiFillDelete id="trash" />}
                      </span>
                    )}
                  </div>
                );
              })}
          </div>
          {props.data && props.data.children && (
            <div className="add-files">
              <input type="file" ref={fileRef} onChange={handleFileInput} />
              <button
                disabled={!selectedFile}
                onClick={() => uploadFile(selectedFile)}
              >
                Add
              </button>
            </div>
          )}

          {props.data && props.data.children && (
            <div className="add-folder">
              Add new folder with initial file
              <input
                id="folder-name-input"
                type="text"
                placeholder="Folder name"
                onChange={(e) => setNewFolder(e.target.value)}
              />
              <input
                type="file"
                ref={firstFileRef}
                onChange={handleFirstFileInput}
              />
              <button
                disabled={!selectedFirstFile || !newFolder}
                onClick={() => uploadFirstFile(selectedFirstFile)}
              >
                Create
              </button>
              <div>Progress: {progress}%</div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
