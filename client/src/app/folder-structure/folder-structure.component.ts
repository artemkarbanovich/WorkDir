import { Component, OnInit } from '@angular/core';
import { Folder } from '../interfaces/Folder';
import { FolderService } from '../services/folder.service';
import { NestedTreeControl } from '@angular/cdk/tree';
import { MatTreeNestedDataSource } from '@angular/material/tree';

@Component({
  selector: 'app-folder-structure',
  templateUrl: 'folder-structure.component.html',
  styleUrls: ['folder-structure.component.css']
})
export class FolderStructureComponent implements OnInit {
  private folderId: number = 0;
  private folders: Folder[] = [];
  treeControl = new NestedTreeControl<Folder>(node => node.childs);
  dataSource = new MatTreeNestedDataSource<Folder>();
  selectedFullPath: string = '-';
  idPath: number = -1;
  dataFrom: string = 'API request';

  constructor(private folderService: FolderService) { }


  ngOnInit() {
    this.folders.push({
      id: this.folderId++,
      name: 'File system',
      fullPath: '-',
      childs: null
    })

    this.folderService.getDisks().subscribe(data => {
      this.folders[0].childs = data
      this.folders[0].childs.forEach(item => {
        item.id = this.folderId++
        item.childs = null
      })
      this.updateSource()
    })
  }

  getSubfolders(id: number, fullPath: string) {
    this.selectedFullPath = fullPath
    this.idPath = id
    let selectedFolder: Folder | null = this.searchFolder(this.folders[0], id)

    if (selectedFolder === null) return
    if (selectedFolder?.childs !== null) {
      this.dataFrom = 'Memory';
      return
    }

    this.selectedFullPath = selectedFolder?.fullPath
    this.folderService.getFolder(selectedFolder.fullPath).subscribe(data => {
      selectedFolder!.childs = data
      selectedFolder?.childs.forEach(item => {
        item.id = this.folderId++
        item.childs = null
      })
      this.updateSource()
      this.dataFrom = 'API request';
    })
  }

  private searchFolder(element: Folder, id: number): Folder | null {
    if (element.id === id) {
      return element
    } else if (element.childs != null) {
      let i
      let result: Folder | null = null

      for (i = 0; result === null && i < element.childs.length; i++) {
        result = this.searchFolder(element.childs[i], id)
      }
      return result
    }
    return null
  }

  private updateSource() {
    this.dataSource.data = []
    this.dataSource.data = this.folders
  }

  public updateFoldersAfterCreate(event: any) {
    let childsToDelete = this.searchFolder(this.folders[0], this.idPath)
    childsToDelete!.childs = null
    this.getSubfolders(this.idPath, this.selectedFullPath)
  }
}