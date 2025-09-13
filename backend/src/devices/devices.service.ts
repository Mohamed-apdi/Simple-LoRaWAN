import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Device } from './entities/device.entity';
import { CreateDeviceDto } from './dto/create-device.dto';
import { DeviceDataDto } from './dto/device-data.dto';

@Injectable()
export class DevicesService {
  constructor(
    @InjectRepository(Device)
    private deviceRepository: Repository<Device>,
  ) {}

  async createDevice(createDeviceDto: CreateDeviceDto): Promise<Device> {
    const existingDevice = await this.deviceRepository.findOne({
      where: { deviceEUI: createDeviceDto.deviceEUI },
    });

    if (existingDevice) {
      throw new BadRequestException('Device with this EUI already exists');
    }

    const device = this.deviceRepository.create(createDeviceDto);
    return this.deviceRepository.save(device);
  }

  async getAllDevices(page: number = 1, limit: number = 10): Promise<{ devices: Device[]; total: number }> {
    const [devices, total] = await this.deviceRepository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
      order: { createdAt: 'DESC' },
    });

    return { devices, total };
  }

  async getDeviceById(id: string): Promise<Device> {
    const device = await this.deviceRepository.findOne({ where: { id } });
    if (!device) {
      throw new NotFoundException('Device not found');
    }
    return device;
  }

  async getDeviceByEUI(deviceEUI: string): Promise<Device> {
    const device = await this.deviceRepository.findOne({ where: { deviceEUI } });
    if (!device) {
      throw new NotFoundException('Device not found');
    }
    return device;
  }

  async updateDevice(id: string, updateDeviceDto: Partial<CreateDeviceDto>): Promise<Device> {
    const device = await this.getDeviceById(id);
    
    if (updateDeviceDto.deviceEUI && updateDeviceDto.deviceEUI !== device.deviceEUI) {
      const existingDevice = await this.deviceRepository.findOne({
        where: { deviceEUI: updateDeviceDto.deviceEUI },
      });
      if (existingDevice) {
        throw new BadRequestException('Device with this EUI already exists');
      }
    }

    Object.assign(device, updateDeviceDto);
    return this.deviceRepository.save(device);
  }

  async deleteDevice(id: string): Promise<void> {
    const device = await this.getDeviceById(id);
    await this.deviceRepository.remove(device);
  }

  async addDeviceData(id: string, deviceDataDto: DeviceDataDto): Promise<void> {
    const device = await this.getDeviceById(id);
    
    // Update device with latest data
    device.lastSeen = new Date(deviceDataDto.timestamp);
    device.batteryLevel = deviceDataDto.batteryLevel;
    device.temperature = deviceDataDto.temperature;
    device.humidity = deviceDataDto.humidity;
    
    await this.deviceRepository.save(device);
    
    // Here you would typically also save the device data to a separate table
    // For now, we're just updating the device entity
  }

  async getDeviceData(
    id: string,
    startDate: string,
    endDate: string,
    limit: number = 100
  ): Promise<any[]> {
    // This would typically query a separate device_data table
    // For now, returning empty array as placeholder
    return [];
  }

  async getActiveDevices(): Promise<Device[]> {
    return this.deviceRepository.find({
      where: { isActive: true },
      order: { lastSeen: 'DESC' },
    });
  }

  async getDevicesByLocation(location: string): Promise<Device[]> {
    return this.deviceRepository.find({
      where: { location },
      order: { name: 'ASC' },
    });
  }
}
