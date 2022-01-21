export interface Folder {
    id: number;
    name: string
    fullPath: string
    childs: Folder[] | null
}