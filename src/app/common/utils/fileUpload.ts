import {from, Observable, of, Subject} from "rxjs";

export class FileUpload {


  private b64Image$ = new Subject<string>();

  /**
   * Uploads a base64 encoded file.
   *
   * @param fileList - The file list to be uploaded.
   * @returns An observable of the base64 encoded file.
   */
  uploadBase64(fileList: any): Observable<string> {
    let fileReader = new FileReader();

    // Subscribe to the onload event of the FileReader
    fileReader.onload = result => {
      this.b64Image$.next(result.target.result.toString());
    }

    // Read the data URL of the first file in the fileList
    fileReader.readAsDataURL(fileList.files[0]);

    return this.b64Image$;
  }


}

