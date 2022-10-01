import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent implements OnInit {

  firstName:string;
  user:any;
  fullName:any;
  lastName: string;
  editingName=false;
  flagName: boolean;
  editingEmail=false;
  editingNumber=false;
  flagEmail: boolean;
  flagNumber: boolean;
  email: string;
  module: {};
  showFlagSpinner: boolean = true;
  phoneNumber: number;
  faqList: any = [];

  constructor() {

    this.faqList = [

      `1) What happens when I update my email address (or mobile number)?
      Your login email id (or mobile number) changes, likewise. You'll receive
      all your account related communication on your updated email address (or mobile number).`,

      `2) When will my Flipkart account be updated with the new email address (or mobile number)?
      It happens as soon as you confirm the verification code sent to your email (or mobile) and save the changes.`,

      `3) What happens to my existing Flipkart account when I update my email address (or mobile number)?
      Updating your email address (or mobile number) doesn't invalidate your account. Your account remains fully functional. You'll
      continue seeing your Order history, saved information and personal details.`,

      `4) Does my Seller account get affected when I update my email address?
      Flipkart has a 'single sign-on' policy. Any changes will reflect in your Seller account also.`

    ]

  //   this.module = {
  //     'emoji-shortname': true,
  //     'emoji-textarea': true,
  //     'emoji-toolbar': true,
  //     toolbar: [
  //       ['bold', 'italic', 'underline'], // toggled buttons
  //       [{ header: 1 }, { header: 2 }], // custom button values
  //       [{ list: 'ordered' }, { list: 'bullet' }],
  //       [{ header: [1, 2, 3, 4, 5, 6] }],
  //     ],
  //   };
  }

  // addBindingCreated(editor: any) {
  //   quill.clipboard.addMatcher(Node.ELEMENT_NODE, (node: { innerText: any; }, delta: any) => {
  //     const plaintext = node.innerText;
  //     return quill.insert(plaintext);
  //   });
  //   editor.clipboard.addMatcher('IMG', (node: any, delta: any) => {
  //     const Delta = Quill.import('delta')
  //     return new Delta().insert('')
  // })
  // editor.clipboard.addMatcher('PICTURE', (node: any, delta: any) => {
  //     const Delta = Quill.import('delta')
  //     return new Delta().insert('')
  // })
  // }



  ngOnInit(): void {

    setTimeout(() =>{
      this.showFlagSpinner = false;
    }, 3000)

    this.showFlagSpinner = true;

    if(localStorage.getItem('loginUser')){
      this.user = JSON.parse(localStorage.getItem(('loginUser')) as string);
      this.fullName = this.user[0].name.split(' ');
    }

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
