import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cart } from './cart/cart.entity';
import { CartItem } from './cart-item/cart-item.entity';
import { CartModule } from './cart/cart.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost', // or your RDS/Cloud host
      port: 5432,
      username: 'your_user',
      password: 'your_password',
      database: 'your_database',
      entities: [Cart, CartItem],
      synchronize: true, // ⚠️ Don't use in production
    }),
    CartModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
