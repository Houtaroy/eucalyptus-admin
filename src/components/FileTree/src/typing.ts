import { TreeItem } from '../../Tree';

export interface File {
  name: string;
  content: string;
  isDirectory: boolean;
  isRoot?: boolean;
  children?: File[];
}

export interface FileTreeItem extends File, TreeItem {
  children?: FileTreeItem[];
  state: FileState;
}

export interface FileAction {
  newFile: boolean;
  rename: boolean;
  delete: boolean;
}

export interface FileState {
  renaming: boolean;
}
