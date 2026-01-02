import { Module, ValidationPipe } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CategoryModule } from './categories/entities/category.module';
import { APP_PIPE } from '@nestjs/core';

@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost:27017/forumWeb'),
    CategoryModule
  ],
  controllers: [AppController],
  providers: [AppService,
    {
      provide: APP_PIPE,
      useFactory: () =>
        new ValidationPipe({
          whitelist: true,
          forbidNonWhitelisted: true,
          transform: true
      })
    }
  ],
})
export class AppModule {}
