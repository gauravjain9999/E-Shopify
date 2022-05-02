import { Component, OnInit } from '@angular/core';
import Quill from 'quill';

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
  module: {};
  phoneNumber: number;

  constructor() {

    this.module = {
      'emoji-shortname': true,
      'emoji-textarea': true,
      'emoji-toolbar': true,
      toolbar: [
        ['bold', 'italic', 'underline'], // toggled buttons
        [{ header: 1 }, { header: 2 }], // custom button values
        [{ list: 'ordered' }, { list: 'bullet' }],
        [{ header: [1, 2, 3, 4, 5, 6] }],
      ],
    };
  }

  addBindingCreated(editor: any) {
    // quill.clipboard.addMatcher(Node.ELEMENT_NODE, (node: { innerText: any; }, delta: any) => {
    //   const plaintext = node.innerText;
    //   return quill.insert(plaintext);
    // });
    editor.clipboard.addMatcher('IMG', (node: any, delta: any) => {
      const Delta = Quill.import('delta')
      return new Delta().insert('')
  })
  editor.clipboard.addMatcher('PICTURE', (node: any, delta: any) => {
      const Delta = Quill.import('delta')
      return new Delta().insert('')
  })
  }



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
