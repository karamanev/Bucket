export interface FileOrFolder {
  name: string;
  children?: FileOrFolder[];
  isFolder: boolean;
}
