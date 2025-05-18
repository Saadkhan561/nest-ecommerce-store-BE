import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ParentCategoryService } from './parent_category.service';
import { CreateParentCategoryDto } from './dto/create-parent-category';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthorizationHeader } from 'src/common/enums';
import { RolesGuard } from 'src/common/guards/role.guard';
import { Roles } from 'src/common/decorators/role.decorator';
import { UserRole } from '../auth/enum/user.enum';

@Controller('parent-category')
export class ParentCategoryController {
  constructor(private readonly parentCategoryService: ParentCategoryService) {}

  @ApiBearerAuth(AuthorizationHeader.BEARER)
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @Post()
  async createParentCategory(
    @Body() createParentCategoryDto: CreateParentCategoryDto,
  ) {
    return this.parentCategoryService.createParentCategory(
      createParentCategoryDto,
    );
  }
}
