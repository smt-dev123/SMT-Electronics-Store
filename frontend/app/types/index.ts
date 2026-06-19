export interface BrandType {
  id?: string;
  name: string;
  icon?: string;
}

export interface CategoryType {
  id?: string;
  name: string;
}

export interface TypeElectronicType {
  id?: string;
  name: string;
}

export interface BulkPriceType {
  id?: string;
  minQty: number;
  price: number;
  electronic_id: string;
}

export interface DatasheetType {
  id?: string;
  name: string;
  size: string;
  file_url: string;
  product_id?: string;
}

export interface ElectronicType {
  id?: string;
  sku: string;
  package: string;
  inStock: boolean;
  product_id: string;
  type_id: string;
  product?: {
    id: string;
    name: string;
  };
  type?: {
    id: string;
    name: string;
  };
}

export interface ProductType {
  id?: string;
  name: string;
  description?: string;
  stockQty: number;
  price: number;
  specifications?: any;
  discount?: number;
  isActive: boolean;
  isUsed: boolean;
  thumbnailUrl: string;
  images?: string | undefined;
  brandId: string;
  categoryIds: string[];
  brand?: {
    id: string;
    name: string;
  };
  category?: {
    id: string;
    name: string;
  };
  electronics?: ElectronicType[];
  created_at?: string;
  updated_at?: string;
}

export interface UserType {
  id?: string;
  username: string;
  email: string;
  phone?: string;
  password: string;
  role: string;
  profile?: string;
}
