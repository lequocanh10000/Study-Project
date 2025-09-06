import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule, SequelizeModuleOptions } from '@nestjs/sequelize';
import { sequelizeConfig } from './config/sequelize.config';
import { StudentModule } from './modules/student/student.module';
import { StartTimingMiddleware } from './common/middlewares/start-timing.middleware';
import { AdminModule } from './modules/admin/admin.module';
import { AuthModule } from './modules/auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { TeacherModule } from './modules/teacher/teacher.module';
import { SeedModule } from './modules/seed/seed.module';
import { CourseModule } from './modules/course/course.module';
import { ClassModule } from './modules/class/class.module';

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true}),
    SequelizeModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService): SequelizeModuleOptions =>
        sequelizeConfig(configService),
    }),
    StudentModule,
    AdminModule,
    AuthModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: configService.get<string>('JWT_EXPIRES_IN')
        },
      }),
      global: true
    }),
    TeacherModule,
    SeedModule,
    CourseModule,
    ClassModule
  ],
})
export class AppModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(StartTimingMiddleware).forRoutes({ path: '*', method: RequestMethod.ALL});
  }
}
