import { useState } from 'react';
import {
  BsFolder,
  BsFolderFill,
  BsFolderMinus,
  BsFolderPlus
} from 'react-icons/bs';
import { FileOrFolder } from '../Interfaces';
interface Props {
  show: (folder: FileOrFolder) => void;
  data: FileOrFolder[];
  selected: FileOrFolder | null;
  reload: () => void;
}
type ResultType = {
  // eslint-disable-next-line
  [key: string]: any;
};

export const FoldersList = (props: Props) => {
  const [showNested, setShowNested] = useState<ResultType>({});
  const [clickTimeout, setClickTimeout] = useState<NodeJS.Timeout | null>(null);

  const handleClick = (
    event: React.MouseEvent<HTMLElement>,
    folder: FileOrFolder
  ) => {
    if (clickTimeout) {
      clearTimeout(clickTimeout);
    }
    setClickTimeout(null);

    if (event.detail === 1) {
      setClickTimeout(
        setTimeout(() => {
          setShowNested({
            ...showNested,
            [folder.name]: !showNested[folder.name]
          });
        }, 200)
      );
    } else if (event.detail === 2) {
      props.show(folder);
    }
  };

  return (
    <div style={{ paddingLeft: '10%' }}>
      {props.data.map((parent) => {
        return (
          <div
            key={parent.name}
            style={{
              display: parent.isFolder ? '' : 'none'
            }}
          >
            <div>
              <span onClick={(event) => handleClick(event, parent)}>
                {parent === props.selected ? (
                  <BsFolderFill />
                ) : !showNested[parent.name] &&
                  parent.children?.filter((child) => child.isFolder).length ? (
                    <BsFolderPlus />
                  ) : parent.children?.filter((child) => child.isFolder)
                    .length ? (
                      <BsFolderMinus />
                    ) : (
                      <BsFolder />
                    )}
              </span>
            </div>
            <div className="folder-name">{parent.name}</div>

            <div
              style={{
                display: !showNested[parent.name] ? 'none' : ''
              }}
            >
              {parent.children?.map((child) => child.children).length && (
                <FoldersList
                  data={parent.children}
                  show={(item) => {
                    props.show(item);
                  }}
                  reload={props.reload}
                  selected={props.selected}
                />
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};
