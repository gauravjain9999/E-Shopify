import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent implements OnInit {

  firstName:string;
  lastName: string;
  editingName=false;
  flagName: boolean;
  editingEmail=false;
  editingNumber=false;
  flagEmail: boolean;
  flagNumber: boolean;
  email: string;
  phoneNumber: number;

  constructor() { }

  ngOnInit(): void {
  }

  nameChange()
  {
    this.editingName = !this.editingName;
    this.flagName = !this.flagName;
  }
  emailChange()
  {
    this.editingEmail = !this.editingEmail;
    this.flagEmail = !this.flagEmail;
  }

  numberChange()
  {
    this.editingNumber = !this.editingNumber;
    this.flagNumber = !this.flagNumber
  }

}
