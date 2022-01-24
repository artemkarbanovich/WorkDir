import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-folder-structure-info',
  templateUrl: './folder-structure-info.component.html',
  styleUrls: ['./folder-structure-info.component.css']
})
export class FolderStructureInfoComponent implements OnInit {

  @Input() selectedFullPath?: string;
  @Input() dataFrom?: string;

  constructor() { }

  ngOnInit(): void { }
}