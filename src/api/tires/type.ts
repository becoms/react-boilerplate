import { BaseType } from "@/types/base.type";

export type Tire = BaseType & {
  cai: string;
  fiaBarcode?: string;
  routingBarcode?: string;
  tireManufactureDate?: string;
  factoryId?: string;
  factoryTrigram?: string;
  importDate?: string;
  importLogId?: string;
};
