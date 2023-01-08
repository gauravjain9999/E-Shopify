import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css'],
})
export class MyProfileComponent implements OnInit {
  firstName: string;
  user: any;
  fullName: any;
  lastName: string;
  editingName = true;
  editingNumber = true;
  editingEmail = true;
  flagName = false;
  flagEmail = false;
  flagNumber = false;
  email: string;
  showFlagSpinner = true;
  phoneNumber: number;
  faqList: any = [];
  reqField = false;
  reqEmail = false;
  reqNumber = false;

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
      Flipkart has a 'single sign-on' policy. Any changes will reflect in your Seller account also.`,
    ];

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
    setTimeout(() => {
      this.showFlagSpinner = false;
    }, 3000);
    this.showFlagSpinner = true;

    if (localStorage.getItem('LOGIN_USER')) {
      this.user = JSON.parse(localStorage.getItem('LOGIN_USER') as string);
      this.fullName = this.user[0].name.split(' ');
      this.firstName = this.fullName[0];
      this.lastName = this.fullName[1];
      this.email = this.user[0].email;
      this.phoneNumber = this.user[0].phoneNumber;
    }
  }

  getFormData(event: any, value: any) {
    if (value === 'firstName' || value === 'lastName') {
      this.reqField =(event==='') ? true : false;
    }
    else if (value === 'email') {
      this.reqEmail =(event === '') ? true : false;
    }
    else if (value === 'phoneNumber') {
      this.reqNumber =(event === null || event === '') ? true : false;
    }
  }

  editData(value: any) {

  switch(value){

    case 'name':

      if (this.firstName && this.lastName) {
        this.editingName = false;
        this.flagName = true;
      }
      else {
        this.editingName = true;
        this.flagName = false;
      }
       break;

    case 'email':
      if(this.email){
        this.editingEmail = false;
        this.flagEmail = true;
      }
      else{
        this.editingEmail = true;
        this.flagEmail = false;
      }
       break;

    case 'phoneNumber':
      if(this.phoneNumber){
        this.editingNumber = false;
        this.flagNumber = true;
      }
      else{
        this.editingNumber = true;
        this.flagNumber = false;
      }
       break;

    default: break;
    }
  }
}
