import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FolderService } from '../services/folder.service';

@Component({
  selector: 'app-upload-json',
  templateUrl: './upload-json.component.html',
  styleUrls: ['./upload-json.component.css']
})
export class UploadJsonComponent {
  selectedFile: File | null = null
  @Input() selectedFullPath?: string | undefined = '-'
  @ViewChild('inputFile') myInputVariable?: ElementRef
  @Output() updateFolders = new EventEmitter<string>();

  constructor(private folderService: FolderService) { }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0]
  }

  applySchema() {
    if (this.selectedFile != null && this.selectedFullPath != '-') {
      const reader = new FileReader()

      reader.readAsText(this.selectedFile, "UTF-8")
      reader.onload = () => {
        this.folderService.createFoldersByJson({
          fullPath: this.selectedFullPath,
          jsonString: reader.result?.toString() || "[]"
        }).subscribe(() => {
          this.selectedFile = null
          this.myInputVariable!.nativeElement.value = ''
          this.updateFolders.next('update');
        })
      }
      reader.onerror = (error) => {
        console.log(error)
      }
    }
  }
}