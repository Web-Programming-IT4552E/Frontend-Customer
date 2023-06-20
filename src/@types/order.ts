import type { StaticImageData } from 'next/image';

export type orderItemType = {
  name: string;
  price: number;
  quantity: number;
  itemImg: StaticImageData
}

export interface IOrderItem {
	data: orderItemType;
} 