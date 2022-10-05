import { uniqueId } from 'lodash-es';

import { File, FileTreeItem } from './typing';

export function newFileTreeItem(): FileTreeItem {
  return {
    key: uniqueId('file'),
    name: '',
    content: '',
    isDirectory: false,
    state: {
      renaming: true,
    },
  };
}

export function toFileTreeItems(files: File[]): FileTreeItem[] {
  const result: FileTreeItem[] = [];
  files.forEach((file) => {
    const item: FileTreeItem = Object.assign(
      newFileTreeItem(),
      { state: { renaming: false } },
      file,
    );
    if (file.children) {
      item.children = toFileTreeItems(file.children);
    }
    result.push(item);
  });
  return result;
}

export function findFileByKey(key: string, files: FileTreeItem[]): Nullable<FileTreeItem> {
  let result: FileTreeItem | null = null;
  if (files.length <= 0) {
    return result;
  }
  result = files[files.findIndex((file) => file.key === key)];
  if (!result) {
    for (const file of files) {
      result = findFileByKey(key, file.children || []);
    }
    if (result) {
      return result;
    }
  }
  return result;
}

export function deleteFileByKey(key: string | number, files: FileTreeItem[]): boolean {
  if (files.length <= 0) {
    return false;
  }
  const index = files.findIndex((file) => file.key === key);
  if (index >= 0) {
    files.splice(index, 1);
    return true;
  }
  for (const file of files) {
    if (deleteFileByKey(key, file.children || [])) {
      return true;
    }
  }
  return false;
}
