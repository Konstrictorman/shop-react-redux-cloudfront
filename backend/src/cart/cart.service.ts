import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cart, CartStatus } from './cart.entity';
import { CartItem } from '../cart-item/cart-item.entity';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart)
    private readonly cartRepository: Repository<Cart>,

    @InjectRepository(CartItem)
    private readonly cartItemRepository: Repository<CartItem>,
  ) {}

  async createCart(userId: string): Promise<Cart> {
    const cart = this.cartRepository.create({
      userId,
      status: CartStatus.OPEN,
    });
    return this.cartRepository.save(cart);
  }

  async getCartById(id: number): Promise<Cart> {
    const cart = await this.cartRepository.findOne({
      where: { id },
      relations: ['items'],
    });

    if (!cart) {
      throw new NotFoundException(`Cart with ID ${id} not found`);
    }

    return cart;
  }

  async addItemToCart(
    cartId: number,
    productId: string,
    count: number,
  ): Promise<CartItem> {
    const cart = await this.cartRepository.findOne({ where: { id: cartId } });

    if (!cart) {
      throw new NotFoundException(`Cart with ID ${cartId} not found`);
    }

    const cartItem = this.cartItemRepository.create({
      cart,
      productId,
      count,
    });

    return this.cartItemRepository.save(cartItem);
  }

  async updateCartStatus(cartId: number, status: CartStatus): Promise<Cart> {
    const cart = await this.getCartById(cartId);
    cart.status = status;
    return this.cartRepository.save(cart);
  }

  async removeItem(cartItemId: number): Promise<void> {
    await this.cartItemRepository.delete(cartItemId);
  }

  async deleteCart(cartId: number): Promise<void> {
    await this.cartRepository.delete(cartId);
  }
}
