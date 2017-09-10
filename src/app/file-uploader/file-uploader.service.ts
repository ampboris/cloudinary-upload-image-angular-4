import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CloudinaryImage } from './cloudinary.image.model';

@Injectable()
export class FileUploaderService {

  constructor(private http: HttpClient) {}

  private isCloudinaryParams() {
    return this.getCloudName() && this.getPresetName();
  }

  public getCloudName(): string {
    return environment.cloudinary.cloudName;
  }

  public getPresetName(): string {
    return environment.cloudinary.presetName;
  }

  public getApiUrl() {
    return environment.cloudinary.apiUrl;
  }

  public uploadImage(imageBase64: string) {
    const url = this.getApiUrl() + '/upload';
    const fd = new FormData();

    fd.append('upload_preset', this.getPresetName());
    fd.append('tags', 'browser_upload');
    fd.append('file', imageBase64);

    return this.http.post<CloudinaryImage>(url, fd, {
      headers: new HttpHeaders().set('X-Requested-With', 'XMLHttpRequest')
    });
  }
}

