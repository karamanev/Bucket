import React from 'react';
import { FileOrFolder } from '../Interfaces';

interface Props {
  data: FileOrFolder[];
}

export const FolderComponent = (props: Props) => {
  console.log(props);

  function download(e: any) {
    console.log(e);

    console.log(props.data[0].name);
  }

  return (
    <div style={{ paddingLeft: '200px' }}>
      {props.data.map((parent) => {
        return (
          <div key={parent.name}>
            <span>{parent.name}</span>
            {/* Base Condition and Rendering recursive component from inside itself */}
            <div>
              {parent.children && <FolderComponent data={parent.children} />}
            </div>

            <button onClick={(e) => download(e)}> download</button>
          </div>
        );
      })}
    </div>
  );
};
