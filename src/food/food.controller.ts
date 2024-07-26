import {
  Body,
  Controller,
  Delete,
  FileTypeValidator,
  Get,
  HttpCode,
  MaxFileSizeValidator,
  ParseFilePipe,
  Patch,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ChatDto,
  FoodDto,
  FoodLikeDto,
  FoodStoreDto,
  orderDto,
} from './dto/food.dto';
import { FoodService } from './food.service';

@Controller('food')
export class FoodController {
  constructor(private readonly foodService: FoodService) {}

  //All foods
  @HttpCode(200)
  @Get('foods')
  async getFoods() {
    return await this.foodService.getFoods();
  }

  //Add Foods
  @HttpCode(200)
  @Post('add-food')
  @UseInterceptors(FileInterceptor('photo'))
  async addFoods(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 1000000 }),
          new FileTypeValidator({ fileType: 'jpg|jpeg|png|gif' }),
        ],
      }),
    )
    file: Express.Multer.File,
    @Body() foodData: FoodDto,
  ) {
    return this.foodService.addFoods(foodData, file.filename);
  }

  //Get Like save Foods
  @HttpCode(200)
  @Post('likes')
  async getLikeFoods(@Body() chatId: ChatDto) {
    return this.foodService.getLikeFoods(chatId);
  }

  //Add Like foods
  @HttpCode(200)
  @Post('add-like')
  async addLikeFoods(@Body() chatId: ChatDto) {
    return this.foodService.addLikeFoods(chatId);
  }

  //Update Like foods
  @HttpCode(201)
  @Patch('update-like')
  async updateLike(@Body() foodData: FoodLikeDto) {
    return this.foodService.updateLikeFoods(foodData);
  }

  //Delete Like foods
  @HttpCode(200)
  @Delete('delete-like')
  async deleteLike(@Body() foodData: FoodLikeDto) {
    return this.foodService.deleteLikes(foodData);
  }

  //Add Store Foods
  @HttpCode(200)
  @Post('add-store')
  async addStoreFood(@Body() storeData: FoodStoreDto) {
    return this.foodService.addStoreData(storeData);
  }

  //Get Store Foods
  @HttpCode(200)
  @Post('get-store')
  async getStoreData(@Body() chatId: ChatDto) {
    return this.foodService.getStoreData(chatId);
  }

  //Add Order Food
  @HttpCode(200)
  @Post('add-order')
  async addOrderFood(@Body() orderData: orderDto) {
    return this.foodService.addFoodOrder(orderData);
  }
}
