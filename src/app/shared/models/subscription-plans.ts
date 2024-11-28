import { User } from './user.model'; // Asume que tienes un modelo para User o lo defines según lo que necesites.

export enum SubscriptionLevel {
  BASIC = 'BASIC',
  PREMIUM = 'PREMIUM',
  VIP = 'VIP'
}

export interface SubscriptionPlan {
  name: string;
  description: string;
  price: number;
  duration_days: number;
  level: string;
  userId?: number;  // Agregar el campo userId opcional
}
