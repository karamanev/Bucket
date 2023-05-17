import { FileOrFolder } from '../Interfaces';

export default function mapFilesData(files: string[]) {
  // eslint-disable-next-line
  const result: any = [];
  files.reduce(
    (r, path) => {
      path.split('/').reduce((o, name) => {
        let temp = (o.children = o.children || []).find(
          (q: FileOrFolder) => q.name === name
        );
        if (!temp) {
          o.children.push((temp = { name }));
          o.isFolder = true;
        }
        return temp;
      }, r);

      return r;
    },
    {
      children: result,
      isFolder: false
    }
  );

  // TODO Combine in one mapping function and don't mutate original array

  const updatePaths = (arr: FileOrFolder[], path = '') => {
    arr?.forEach((el: FileOrFolder) => {
      el.path = path + el.name;
      if (el.children) updatePaths(el.children, el.path + '/');
    });
  };

  updatePaths(result);
  console.log(result);

  return result;
}
