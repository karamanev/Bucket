export default function mapFilesData(a: string[]) {
  const result: any = [];
  a.reduce(
    (r, path) => {
      path.split('/').reduce((o, name) => {
        let temp = (o.children = o.children || []).find(
          (q: any) => q.name === name
        );
        if (!temp) {
          o.children.push((temp = { name }));
          o.isFolder = true;
          const splitted = path.split('/');
          console.log(splitted);

          //          fix!!!!! if it is folder with only folders

          o.path = splitted.slice(0, splitted.length - 1).join('/');
        }
        return temp;
      }, r);
      return r;
    },
    { children: result, isFolder: false, path: '' }
  );
  console.log(result);

  return result;
}
