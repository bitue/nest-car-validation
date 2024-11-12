import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Report } from './report.entity';
import { CreateReportDto } from './dtos/create-reports.dto';
import { User } from 'src/users/user.entity';
import { getEstimateDto } from './dtos/getEstimate.dto';

@Injectable()
export class ReportsService {
  constructor(@InjectRepository(Report) private repo: Repository<Report>) {}

  create(reportDto: CreateReportDto, user: User) {
    const report = this.repo.create(reportDto);
    report.user = user;
    console.log(report);

    return this.repo.save(report);
  }

  async changeApproval(id: number, approved: boolean) {
    const report = await this.repo.findOne({ where: { id } });
    if (!report) {
      throw new NotFoundException('report not found ');
    }

    report.approved = approved;
    return this.repo.save(report);
  }

  async createEstimate({
    make,
    model,
    lat,
    long,
    year,
    mileage,
  }: getEstimateDto) {
    console.log(typeof year);
    return this.repo
      .createQueryBuilder()
      .select('AVG(price)', 'price')
      .where('make = :make', { make })
      .andWhere('model = :model', { model })
      .andWhere('ABS(lat - :lat) <= 5', { lat })
      .andWhere('ABS(long - :long) <= 5', { long })
      .andWhere('ABS(year - :year) <= 3', { year })
      .orderBy('ABS(mileage - :mileage)', 'DESC')
      .setParameters({ mileage })
      .limit(3)
      .getRawOne();
    // return this.repo
    //   .createQueryBuilder()
    //   .select('AVG(price)', 'price')
    //   .where('make =:make', { make })
    //   .andWhere('model -:model', { model })
    //   .andWhere('lat -:lat BETWEEN -5 AND 5', { lat })
    //   .andWhere('long -:lat BETWEEN -5 AND 5', { long })
    //   .andWhere('year -:year BETWEEN -3 AND 3', { year })
    //   .orderBy('ABS(mileage -:mileage)', 'DESC')
    //   .setParameters({ mileage })
    //   .limit(3)
    //   .getRawOne();
  }
}
