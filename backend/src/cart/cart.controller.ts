import {
  Controller,
  Post,
  Body,
  Param,
  Get,
  Patch,
  Delete,
  ParseIntPipe,
  HttpCode,
} from '@nestjs/common';
import { CartService } from './cart.service';
import { CartStatus } from './cart.entity';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post()
  async createCart(@Body('userId') userId: string) {
    return this.cartService.createCart(userId);
  }

  @Get(':id')
  async getCart(@Param('id', ParseIntPipe) id: number) {
    return this.cartService.getCartById(id);
  }

  @Post(':id/items')
  async addItemToCart(
    @Param('id', ParseIntPipe) cartId: number,
    @Body('productId') productId: string,
    @Body('count') count: number,
  ) {
    return this.cartService.addItemToCart(cartId, productId, count);
  }

  @Patch(':id/status')
  async updateCartStatus(
    @Param('id', ParseIntPipe) cartId: number,
    @Body('status') status: CartStatus,
  ) {
    return this.cartService.updateCartStatus(cartId, status);
  }

  @Delete(':id')
  @HttpCode(204)
  async deleteCart(@Param('id', ParseIntPipe) cartId: number) {
    await this.cartService.deleteCart(cartId);
  }

  @Delete('item/:itemId')
  @HttpCode(204)
  async deleteItem(@Param('itemId', ParseIntPipe) itemId: number) {
    await this.cartService.removeItem(itemId);
  }
}
