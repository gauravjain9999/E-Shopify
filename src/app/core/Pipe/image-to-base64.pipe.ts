import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'imageToBase64'
})
export class ImageToBase64Pipe implements PipeTransform {

  fileReader = new FileReader();

  transform(textValue: any){

    let imgData = this.fileReader.readAsDataURL(textValue);
    console.log(imgData);
    return imgData;
  }

}
