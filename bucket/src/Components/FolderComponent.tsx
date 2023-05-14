import React, { useState } from 'react';
import { FileOrFolder } from '../Interfaces';

interface Props {
  data: FileOrFolder[];
}
type ResultType = {
  [key: string]: any;
};

export const FolderComponent = (props: Props) => {
  const [showNested, setShowNested] = useState<ResultType>({});
  const toggleNested = (name: string) => {
    setShowNested({ ...showNested, [name]: !showNested[name] });
  };

  function download(e: any) {
    console.log(e);
    console.log(typeof e);

    console.log(props.data[0].name);
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
              {parent.children && <FolderComponent data={parent.children} />}
            </div>
            <button onClick={() => download(parent)}> download</button>
          </div>
        );
      })}
    </div>
  );
};
