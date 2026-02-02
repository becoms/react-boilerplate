import { BaseType } from "@/api/base.type";

export type Tire = BaseType & {
  cai: string;
  fiaBarcode?: string;
  routingBarcode?: string;
  tireManufactureDate?: string;
  factoryTrigram?: string;
  importDate?: string;
};
