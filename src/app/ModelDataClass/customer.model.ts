export class CustomerInfo
{
  name: string;
  email: string;
  password: string;
  phoneNumber: string;

  constructor()
  {
    this.name='',
    this.email = '',
    this.password = '',
    this.phoneNumber= ''
  }
}

export interface LoginUser {
  email: String;
  password: String;
}
