import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/user.entity';
import { Repository } from 'typeorm';
import { CreateReportDto } from './dtos/create-report.dto';
import { GetEstimateDto } from './dtos/get-estimate.dto';
import { Report } from './report.entity';

@Injectable()
export class ReportsService {
  constructor(@InjectRepository(Report) private repo: Repository<Report>) {}

  create(body: CreateReportDto, user: User) {
    const report = this.repo.create(body);
    report.user = user;
    return this.repo.save(report);
  }

  async approveReport(id: number, approved: boolean) {
    const report = await this.repo.findOne(id);
    if (!report) {
      throw new NotFoundException('Report not found');
    }
    report.approved = approved;
    return this.repo.save(report);

  }

  async createEstimate(query: GetEstimateDto) {
    return this.repo.createQueryBuilder()
    .select('avg(price)', 'price')
    .where('make = :make', { make: query.make })
    .andWhere('model = :model', { model: query.model })
    .andWhere('lat - :lat between -3 and 3', { lat: query.lat })
    .andWhere('long - :long between -3 and 3', { long: query.long })
    .andWhere('year - :year between -5 and 5', { year: query.year })
    .orderBy('abs(mileage - :mileage)', 'DESC')
    .setParameters({ mileage: query.mileage })
    .limit(3)
    .getRawOne();
  }
}
