import { useState } from 'react';
import { FileOrFolder } from '../Interfaces';

interface Props {
  show: (folder: FileOrFolder) => void;
  data: FileOrFolder[];
}
type ResultType = {
  [key: string]: any;
};

export const FoldersList = (props: Props) => {
  const [showNested, setShowNested] = useState<ResultType>({});
  const toggleNested = (name: string) => {
    setShowNested({ ...showNested, [name]: !showNested[name] });
  };

  function show(e: any) {
    console.log(e);
  }

  return (
    <div style={{ paddingLeft: '20px' }}>
      {props.data.map((parent) => {
        return (
          <div
            key={parent.name}
            style={{
              display: parent.isFolder ? '' : 'none'
            }}
          >
            {parent.name}
            {parent.children?.filter((child) => child.isFolder).length && (
              <button onClick={() => toggleNested(parent.name)}>
                {!showNested[parent.name] ? 'Expand' : 'Collapse'}
              </button>
            )}
            <button onClick={() => show(parent.name)}>Open</button>;
            <div
              style={{
                display: !showNested[parent.name] ? 'none' : ''
              }}
            >
              {parent.children?.map((child) => child.children).length && (
                <FoldersList
                  data={parent.children}
                  show={(a) => {
                    show(a);
                  }}
                />
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};
