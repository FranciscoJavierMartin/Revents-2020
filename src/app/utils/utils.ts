import { IComment } from '../common/interfaces/models';

export function getFileExtension(filename: string): string {
  return filename.slice(((filename.lastIndexOf('.') - 1) >>> 0) + 2);
}

export function createDataTree(dataset: IComment[]): IComment[] {
  let hashTable = Object.create(null);
  let dataTree: IComment[] = [];

  dataset.forEach(
    (a: IComment) => (hashTable[a.id] = { ...a, childNodes: [] })
  );

  dataset.forEach((a: IComment) => {
    if (a.parentId) {
      hashTable[a.parentId].childNodes.push(hashTable[a.id]);
    } else {
      dataTree.push(hashTable[a.id]);
    }
  });
  return dataTree;
}
