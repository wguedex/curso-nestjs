import { BadRequestException,  Controller,  Get,  Param,  Post, Res, UploadedFile, UseInterceptors,   } from '@nestjs/common';
import { FilesService } from './files.service'; 
import { FileInterceptor } from '@nestjs/platform-express'; 
import { diskStorage } from 'multer';
 
import {fileFilter, fileNamer} from './helpers/index';
import { Response } from 'express';

@Controller('files')
export class FilesController {

  constructor(private readonly filesService: FilesService) {}

  @Get('product/:imageName')
  findProductImage(
      @Res() res: Response,
      @Param('imageName') imageName: string
  ) {

    const path = this.filesService.getStaticProductImage(imageName);

    // res.status(403).json({
    //   ok:false, 
    //   path: path
    // });

    res.sendFile(path)

      // return path;
  }  

  @Post('product')
  @UseInterceptors(FileInterceptor('file', {
    fileFilter: fileFilter, 
    // limits: {fileSize: 1000}, 
    storage: diskStorage({
      destination: './static/products', 
      filename : fileNamer
    }), 
    

  }) )
  uploadProductImage(  @UploadedFile() file: Express.Multer.File ){
 
    if (!file) {
      throw new BadRequestException('Make sure that the file is an image'); 
  }

    const secureUrl = `${ file.filename }`;

    return {secureUrl};
   
    // return file.originalname;
  
  }

}
