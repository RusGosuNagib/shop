import {from, Observable, of} from "rxjs";

export class FileUpload {


  private b64Image: string ;

  uploadBase64(fileList: any, uploadStatus: boolean): any {
    let fileReader = new FileReader()
    fileReader.onloadend = result => {
      this.b64Image = result.target.result.toString();
      console.log(this.b64Image);
    }
    fileReader.readAsDataURL(fileList.target.files[0]);

    let obs$ = of(this.b64Image)
    return obs$.subscribe({
      next(response) {
        console.log(response);
      },
      error(err) {
        console.error('Error: ' + err);
      },
      complete() {
        console.log('Completed');
      },
    });
  }


}

