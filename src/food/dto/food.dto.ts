export class FoodDto {
  id: string;
  name: string;
  money: number;
  photo: string;
}

export class FoodLikeDto {
  chatId: number;
  foodId: string;
}

export class ChatDto {
  chatid: number;
}

export class FoodStoreDto {
  all_food: [
    {
      foodId: string;
      count: number;
    },
  ];
  status: number;
  all_money: number;
  chatId: number;
}

export class orderDto {
  chatId: number;
  description: string;
  orderType: string;
  money: number;
}
