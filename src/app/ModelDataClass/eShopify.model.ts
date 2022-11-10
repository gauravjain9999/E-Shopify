export interface AuthResponse {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?:boolean
}

export class ShopifyClothesModel{
  apiResponseStatus: boolean;
  status?: number;
  clothesList?: ClothesData;
}

export class ClothesData{}
