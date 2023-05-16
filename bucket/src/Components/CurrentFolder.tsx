import { useState } from 'react';
import { FileOrFolder } from '../Interfaces';

interface Props {
  data: FileOrFolder[];
}
type ResultType = {
  [key: string]: any;
};

export const CurrentFolder = (props: Props) => {
  const [showNested, setShowNested] = useState<ResultType>({});
  const toggleNested = (name: string) => {
    setShowNested({ ...showNested, [name]: !showNested[name] });
  };

  function download(e: any) {
    console.log(e);
  }

  return (
    <div style={{ paddingLeft: '200px' }}>
      {props.data.map((parent) => {
        return (
          <div key={parent.name}>
            {parent.name}
            {parent.children && (
              <button onClick={() => toggleNested(parent.name)}>
                {!showNested[parent.name] ? 'Open' : 'Close'}
              </button>
            )}
            <div
              style={{
                display: !showNested[parent.name] ? 'none' : ''
              }}
            >
              {parent.children && <CurrentFolder data={parent.children} />}
            </div>
          </div>
        );
      })}
    </div>
  );
};

// <div>File Upload Progress is {progress}%</div>
// <input type="file" onChange={handleFileInput} />
// <button onClick={() => uploadFile(selectedFile)}>
//   {' '}
//   Upload to S3
// </button>
