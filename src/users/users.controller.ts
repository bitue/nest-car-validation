import {
  Body,
  Controller,
  Param,
  Post,
  Get,
  Delete,
  Patch,
  NotFoundException,
  UseInterceptors,
  Session,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dtos/update-user.dto';
import { SerializeInterceptor } from 'src/interceptors/serialize.interceptor';
import { UserDto } from './dtos/user.dto';
import { AuthService } from './auth.service';
import { CurrentUser } from './decorators/currentUser.decorator';
import { CurrentUserInterceptor } from './interceptor/current-user.interceptor';
import { AuthGuard } from 'src/guards/auth.guards';

@Controller('auth')
@UseInterceptors(new SerializeInterceptor(UserDto))
export class UsersController {
  constructor(
    private userService: UsersService,
    private authService: AuthService,
  ) {}

  // @Get('/whoAmI')
  // whoAmI(@Session() session: any) {
  //   return this.userService.findOne(session.userId);
  // }

  @Get('/whoAmI')
  @UseGuards(AuthGuard)
  @UseInterceptors(CurrentUserInterceptor)
  whoAmI(@CurrentUser() user: any) {
    return user;
  }

  @Post('/signUp')
  async createUser(@Body() body: CreateUserDto, @Session() session: any) {
    // console.log(body);
    // this.userService.create(body.email, body.password);
    const user = await this.authService.signUp(body.email, body.password); // storing hashed password
    session.userId = user.id;
    return user;
  }

  @Post('/signIn')
  async signIn(@Body() body: CreateUserDto, @Session() session: any) {
    const user = await this.authService.signIn(body.email, body.password);
    session.userId = user.id;
    return user;
  }

  @Post('/signOut')
  signOut(@Session() session: any) {
    session.userId = null;
  }

  @Get('/:id')
  async findUser(@Param('id') id: string) {
    console.log('handler is running ');
    const user = await this.userService.findOne(+id);
    if (!user) throw new NotFoundException('user not found !');
    return user;
  }

  @Patch('/:id')
  updateUser(@Param('id') id: string, @Body() body: UpdateUserDto) {
    return this.userService.update(+id, body);
  }

  @Delete('/:id')
  deleteUser(@Param('id') id: string) {
    return this.userService.remove(parseInt(id));
  }
}
