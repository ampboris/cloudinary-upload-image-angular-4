import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ImageCropperComponent, CropperSettings} from 'ng2-img-cropper';
import { FileUploaderComponent } from './file-uploader.component';
import { FileUploaderService } from './file-uploader.service';
import { CloudinaryModule, CloudinaryConfiguration } from '@cloudinary/angular-4.x';
import { Cloudinary } from 'cloudinary-core';
import { environment } from '../../environments/environment';


@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    /* should place in app.module ? */
    CloudinaryModule.forRoot({Cloudinary},
      { cloud_name: environment.cloudinary.cloudName } as CloudinaryConfiguration),
  ],
  exports: [
    FileUploaderComponent
  ],
  declarations: [
    FileUploaderComponent,
    ImageCropperComponent
  ],
  providers: [
    CropperSettings,
    FileUploaderService
  ]
})
export class FileUploaderModule { }
