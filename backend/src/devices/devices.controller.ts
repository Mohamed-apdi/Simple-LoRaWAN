import { Controller, Get, Post, Put, Delete, Body, Param, Query, UseGuards } from '@nestjs/common';
import { DevicesService } from './devices.service';
import { CreateDeviceDto } from './dto/create-device.dto';
import { DeviceDataDto } from './dto/device-data.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

@Controller('devices')
@UseGuards(JwtAuthGuard, RolesGuard)
export class DevicesController {
  constructor(private readonly devicesService: DevicesService) {}

  @Post()
  @Roles('admin', 'user')
  async createDevice(@Body() createDeviceDto: CreateDeviceDto) {
    return this.devicesService.createDevice(createDeviceDto);
  }

  @Get()
  @Roles('admin', 'user')
  async getAllDevices(@Query('page') page: number = 1, @Query('limit') limit: number = 10) {
    return this.devicesService.getAllDevices(page, limit);
  }

  @Get(':id')
  @Roles('admin', 'user')
  async getDeviceById(@Param('id') id: string) {
    return this.devicesService.getDeviceById(id);
  }

  @Get(':id/data')
  @Roles('admin', 'user')
  async getDeviceData(
    @Param('id') id: string,
    @Query('startDate') startDate: string,
    @Query('endDate') endDate: string,
    @Query('limit') limit: number = 100
  ) {
    return this.devicesService.getDeviceData(id, startDate, endDate, limit);
  }

  @Post(':id/data')
  @Roles('admin', 'user', 'device')
  async addDeviceData(@Param('id') id: string, @Body() deviceDataDto: DeviceDataDto) {
    return this.devicesService.addDeviceData(id, deviceDataDto);
  }

  @Put(':id')
  @Roles('admin', 'user')
  async updateDevice(@Param('id') id: string, @Body() updateDeviceDto: Partial<CreateDeviceDto>) {
    return this.devicesService.updateDevice(id, updateDeviceDto);
  }

  @Delete(':id')
  @Roles('admin')
  async deleteDevice(@Param('id') id: string) {
    return this.devicesService.deleteDevice(id);
  }

  @Get('eui/:deviceEUI')
  @Roles('admin', 'user')
  async getDeviceByEUI(@Param('deviceEUI') deviceEUI: string) {
    return this.devicesService.getDeviceByEUI(deviceEUI);
  }
}
