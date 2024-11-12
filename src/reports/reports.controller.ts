import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CreateReportDto } from './dtos/create-reports.dto';
import { ReportsService } from './reports.service';
import { AuthGuard } from 'src/guards/auth.guards';
import { CurrentUser } from 'src/users/decorators/currentUser.decorator';
import { User } from 'src/users/user.entity';
import { CurrentUserInterceptor } from 'src/users/interceptor/current-user.interceptor';
import { SerializeInterceptor } from 'src/interceptors/serialize.interceptor';
import { ReportDto } from './dtos/report-dto';
import { AdminGuard } from 'src/guards/admin.guards';
import { getEstimateDto } from './dtos/getEstimate.dto';

@Controller('reports')
export class ReportsController {
  constructor(private reportService: ReportsService) {}

  @Post()
  @UseGuards(AuthGuard)
  @UseInterceptors(new SerializeInterceptor(ReportDto))
  createReport(@Body() body: CreateReportDto, @CurrentUser() user: User) {
    console.log(user);
    return this.reportService.create(body, user);
  }

  @Patch('/:id')
  @UseGuards(AdminGuard)
  approvedReport(@Param('id') id: string, @Body() body: { approved: boolean }) {
    return this.reportService.changeApproval(+id, body.approved);
  }

  @Get()
  @UseGuards(AuthGuard)
  @UseGuards(AdminGuard)
  getEstimate(@Query() query: getEstimateDto) {
    return this.reportService.createEstimate(query);
  }
}
