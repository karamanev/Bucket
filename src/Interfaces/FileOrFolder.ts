export interface FileOrFolder {
  name: string;
  isFolder: boolean;
  children?: FileOrFolder[];
  path: string;
}
