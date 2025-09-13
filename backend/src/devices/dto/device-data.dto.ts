import { IsString, IsOptional, IsNumber, IsDateString, IsObject } from 'class-validator';

export class DeviceDataDto {
  @IsString()
  deviceEUI: string;

  @IsDateString()
  timestamp: string;

  @IsNumber()
  rssi: number;

  @IsNumber()
  snr: number;

  @IsNumber()
  frequency: number;

  @IsNumber()
  dataRate: number;

  @IsString()
  payload: string;

  @IsOptional()
  @IsObject()
  metadata?: Record<string, any>;

  @IsOptional()
  @IsString()
  gatewayId?: string;

  @IsOptional()
  @IsNumber()
  batteryLevel?: number;

  @IsOptional()
  @IsNumber()
  temperature?: number;

  @IsOptional()
  @IsNumber()
  humidity?: number;
}
