import { Body, Controller,  Post, UploadedFile, UseInterceptors,   } from '@nestjs/common';
import { FilesService } from './files.service'; 
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Post('product')
  @UseInterceptors(FileInterceptor('file') )
  uploadProductImage( 
    @UploadedFile()  
    file: Express.Multer.File, 
    // @Body
   ){

    return file;

    // console.log('Hola')
    // return 'Hola mundo';
  }

}
