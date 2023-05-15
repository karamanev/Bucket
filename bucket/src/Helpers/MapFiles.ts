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
        }
        return temp;
      }, r);
      return r;
    },
    { children: result, isFolder: false }
  );

  return result;
}
