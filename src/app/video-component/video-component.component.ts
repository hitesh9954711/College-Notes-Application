import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-video-component',
  templateUrl: './video-component.component.html',
  styleUrls: ['./video-component.component.css']
})
export class VideoComponentComponent implements OnInit {
  uri:string;
  filename:string;
  check:boolean;
  constructor(@Inject(MAT_DIALOG_DATA) public data:any) { }

  ngOnInit(): void {
    this.filename=this.data.filename
    this.check=this.data.check
    
    this.uri="http://localhost:8080/teacher/download?name="+this.filename+"&"+"check="+this.check
  }

}
