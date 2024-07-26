import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  ChatDto,
  FoodDto,
  FoodLikeDto,
  FoodStoreDto,
  orderDto,
} from './dto/food.dto';
import { FoodOrder, FoodOrderDocument } from './schema/foodOrderSchema';
import { Food, FoodDocument } from './schema/foodSchema';
import { FoodLike, FoodLikeDocument } from './schema/likeFoodSchema';
import { FoodStore, FoodStoreDocument } from './schema/stroreFood';

@Injectable()
export class FoodService {
  constructor(
    @InjectModel(Food.name)
    private foodModel: Model<FoodDocument>,
    @InjectModel(FoodLike.name)
    private foodLikeModel: Model<FoodLikeDocument>,
    @InjectModel(FoodStore.name)
    private foodStoreModel: Model<FoodStoreDocument>,
    @InjectModel(FoodOrder.name)
    private foodOrderModel: Model<FoodOrderDocument>,
  ) {}

  async getFoods() {
    try {
      const data = await this.foodModel.find({});
      return {
        success: true,
        data,
      };
    } catch (error) {
      if (error) throw error;
    }
  }

  async addFoods(foodData: FoodDto, photo: string) {
    try {
      const { name, money } = foodData;
      const data = await this.foodModel.create({
        name,
        money,
        photo,
      });
      return {
        success: true,
        message: "Muvaffaqiyatli qo'shildi",
        data,
      };
    } catch (error) {
      if (error) throw error;
    }
  }

  async getLikeFoods(chatId: ChatDto) {
    try {
      const data = await this.foodLikeModel.findOne(chatId);
      return {
        success: true,
        data: data.foods,
      };
    } catch (error) {
      if (error) throw error;
    }
  }

  async updateLikeFoods(foodData: FoodLikeDto) {
    try {
      const { chatId, foodId } = foodData;
      const { foods } = await this.foodLikeModel.findOne({ chatId: chatId });
      const _data = foods;
      foods.push(foodId);
      const data = await this.foodLikeModel.updateOne(
        { chatId: chatId },
        { foods: _data },
      );
      return {
        success: true,
        data: data,
      };
    } catch (error) {
      if (error) throw error;
    }
  }

  async deleteLikes(foodData: FoodLikeDto) {
    try {
      const { chatId, foodId } = foodData;
      const { foods } = await this.foodLikeModel.findOne({ chatId: chatId });

      const _data = foods.filter((foods) => foods !== foodId);
      const data = await this.foodLikeModel.updateOne(
        { chatId: chatId },
        { foods: _data },
      );
      return {
        success: true,
        data: data,
      };
    } catch (error) {
      if (error) throw error;
    }
  }

  async addLikeFoods(chatId: ChatDto) {
    try {
      const data = await this.foodLikeModel.create(chatId);
      return {
        success: true,
        message: "Muvaffaqiyatli qo'shildi",
        data: data.foods,
      };
    } catch (error) {
      if (error) throw error;
    }
  }

  async addStoreData(storeData: FoodStoreDto) {
    try {
      const _data = await this.foodStoreModel.findOne({
        chatId: storeData.chatId,
        status: 0,
      });
      if (_data) {
        return {
          success: false,
          message: 'Sizda faol buyurtma mavjud',
          _data,
        };
      } else {
        const data = await this.foodStoreModel.create(storeData);
        return {
          success: true,
          message: "Muvaffaqiyatli qo'shildi",
          data,
        };
      }
    } catch (error) {
      if (error) throw error;
    }
  }

  async getStoreData(chatId: ChatDto) {
    try {
      const data = await this.foodStoreModel.find(chatId);
      return {
        success: true,
        data,
      };
    } catch (error) {
      if (error) throw error;
    }
  }

  async addFoodOrder(orderData: orderDto) {
    try {
      const { chatId } = orderData;
      const data = await this.foodOrderModel.create(orderData);
      if (data) {
        await this.foodStoreModel.updateOne({ chatId: chatId }, { status: 1 });
      }
      return {
        success: true,
        data,
      };
    } catch (error) {
      if (error) throw error;
    }
  }
}
