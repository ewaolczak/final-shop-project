import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared/services/prisma.service';
import { Order, ProductOrders } from '@prisma/client';

@Injectable()
export class OrdersService {
  constructor(private prismaService: PrismaService) {}

  public getAll(): Promise<Order[]> {
    return this.prismaService.order.findMany({
      include: { products: true },
    });
  }

  public getById(id: Order['id']): Promise<Order | null> {
    return this.prismaService.order.findUnique({
      where: { id },
      include: { products: true },
    });
  }

  async create(orderData: {
    totalCost: Order['totalCost'];
    email: Order['email'];
    name: Order['name'];
    phone: Order['phone'];
    address: Order['address'];
    products: ProductOrders[];
  }): Promise<Order> {
    const { products, ...otherData } = orderData;
    try {
      return await this.prismaService.order.create({
        data: {
          ...otherData,
          products: {
            createMany: {
              data: products.map((product) => ({ ...product })),
            },
          },
        },
        include: {
          products: true,
        },
      });
    } catch (error) {
      throw error;
    }
  }
}
