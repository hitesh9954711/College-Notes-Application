import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StudentRegisterationComponent } from './student-registeration/student-registeration.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
    
  }


}
