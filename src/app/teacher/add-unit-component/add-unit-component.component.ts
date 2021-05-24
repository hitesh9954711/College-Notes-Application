import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-unit-component',
  templateUrl: './add-unit-component.component.html',
  styleUrls: ['./add-unit-component.component.css']
})
export class AddUnitComponentComponent implements OnInit {
  formValue:string;
  constructor() { }

  ngOnInit(): void {
  }

}
