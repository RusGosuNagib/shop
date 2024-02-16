import {from, Observable, of, Subject} from "rxjs";

export class FileUpload {


  private b64Image$ = new Subject<string>();

  uploadBase64(fileList: any): Observable<string> {
    let fileReader = new FileReader()
    fileReader.onload = result => {
      this.b64Image$.next(result.target.result.toString())
    }
    fileReader.readAsDataURL(fileList.files[0]);
    return this.b64Image$
  }


}

