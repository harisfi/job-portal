import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { userProviders } from './users.providers';
import { UsersService } from './users.service';

@Module({
  imports: [DatabaseModule],
  providers: [...userProviders, UsersService],
  exports: [UsersService],
})
export class UsersModule {}
