import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product-dto';
import { RolesGuard } from 'src/common/guards/role.guard';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { Roles } from 'src/common/decorators/role.decorator';
import { UserRole } from '../auth/enum/user.enum';
import { AuthorizationHeader } from 'src/common/enums';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @ApiBearerAuth(AuthorizationHeader.BEARER)
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @Post()
  async createProduct(@Body() product: CreateProductDto) {
    return this.productService.createProduct(product);
  }
}
