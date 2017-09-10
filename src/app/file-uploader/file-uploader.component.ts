import { CloudinaryImage } from './cloudinary.image.model';
import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { FileUploaderService } from './file-uploader.service';
import { ImageCropperComponent , CropperSettings} from 'ng2-img-cropper';

@Component({
  selector: 'app-file-uploader',
  templateUrl: './file-uploader.component.html',
  styleUrls: ['./file-uploader.component.css']
})
export class FileUploaderComponent implements OnInit {
  
  @Input() width = 100;
  @Input() height = 100 ;
  @ViewChild('cropper', undefined) cropper: ImageCropperComponent;

  public cropperData: any;
  public cloudinaryData: CloudinaryImage;
  public fileUploadUniqueId: string;
  public uploading: boolean;

  constructor(
    private fileUploaderService: FileUploaderService,
    public cropperSettings: CropperSettings) {

      this.fileUploadUniqueId = 'file-upload-' + new Date().getTime();
      this.cropperData = {};
  }

  private initCropper() {
    this.cropperSettings = new CropperSettings();
    this.cropperSettings.allowedFilesRegex = /.(jpe?g|png|gif)$/i;
    this.cropperSettings.noFileInput = true;
    this.cropperSettings.croppedWidth = this.width;
    this.cropperSettings.croppedHeight = this.height;
    this.cropperSettings.canvasWidth = this.width;
    this.cropperSettings.canvasHeight = this.height;
    this.cropperSettings.width = this.width;
    this.cropperSettings.height = this.height;
    this.cropperSettings.cropOnResize = true;
  }

  onFileSelected($event) {
    const image: any = new Image();
    const file: File = $event.target.files[0];
    const myReader: FileReader = new FileReader();
    const self = this;
    
    this.cloudinaryData = null;

    myReader.onloadend = function (loadEvent: any) {
        image.src = loadEvent.target.result;
        self.cropper.setImage(image);
    };

    myReader.readAsDataURL(file);
  }

  ngOnInit() {
    this.initCropper();
  }

  uploadImage() {
    // NOTE: could have return observable and use async in template
    this.uploading = true;
    const uploadRequest$ = this.fileUploaderService.uploadImage(this.cropperData.image)
    .subscribe(
      (cloudinaryData: CloudinaryImage) => {
        this.cloudinaryData = cloudinaryData;
        this.cropperData = {};
      },
      error => {
          console.error('Error Uploading Image', error);
      },
      () => {
        this.uploading = false;
      }
    );
  }

}
