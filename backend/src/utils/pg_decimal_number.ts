import { customType } from 'drizzle-orm/pg-core';

const pgDecimalAsNumber = customType<{ data: number; driverData: string }>({
  dataType() {
    return 'numeric(10, 2)';
  },
  fromDriver(value: string): number {
    return Number(value);
  },
  toDriver(value: number): string {
    return value.toString();
  },
});

export default pgDecimalAsNumber;
