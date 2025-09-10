import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UploadFileDto {
  @ApiProperty({
    example: 'Folder name',
    description: 'Folder to store file',
    required: true,
  })
  @IsString()
  folderName: string;
}
