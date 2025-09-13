import { IsString, IsOptional, IsNumber, IsBoolean } from 'class-validator';

export class CreateDeviceDto {
  @IsString()
  name: string;

  @IsString()
  deviceEUI: string;

  @IsString()
  applicationKey: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  location?: string;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @IsOptional()
  @IsNumber()
  frequency?: number;

  @IsOptional()
  @IsString()
  deviceProfile?: string;
}
