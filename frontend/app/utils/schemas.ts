import * as yup from "yup";

export const BrandSchema = yup.object({
  name: yup
    .string()
    .required("ឈ្មោះចាំបាច់ត្រូវបំពេញ")
    .min(3, "យ៉ាងតិច ៣ តួអក្សរ"),
  icon: yup.string().url("URL មិនត្រឹមត្រូវ"),
});

export const CategorySchema = yup.object({
  name: yup.string().required("ឈ្មោះចាំបាច់ត្រូវបំពេញ"),
});

export const BulkPriceSchema = yup.object({
  minQty: yup.number().required("ចាំបាច់ត្រូវបំពេញ").min(1, "យ៉ាងតិច ១"),
  price: yup
    .number()
    .required("ចាំបាច់ត្រូវបំពេញ")
    .min(0, "តម្លៃត្រូវធំជាងរឺស្មើ ០"),
  electronicId: yup.string().required("ចាំបាច់ត្រូវជ្រើសរើស"),
});

export const DatasheetSchema = yup.object({
  name: yup.string().required("ចាំបាច់ត្រូវបំពេញ"),
  size: yup.string().required("ចាំបាច់ត្រូវបំពេញ"),
  fileUrl: yup.string().required("ចាំបាច់ត្រូវបំពេញ").url("URL មិនត្រឹមត្រូវ"),
  productId: yup.string().nullable(),
});

export const ElectronicSchema = yup.object({
  sku: yup.string().required("ចាំបាច់ត្រូវបំពេញ"),
  package: yup.string().required("ចាំបាច់ត្រូវបំពេញ"),
  in_stock: yup.boolean().required("ចាំបាច់ត្រូវជ្រើសរើស"),
  product_id: yup.string().required("ចាំបាច់ត្រូវជ្រើសរើស"),
  type_id: yup.string().required("ចាំបាច់ត្រូវជ្រើសរើស"),
});

export const ProductSchema = yup.object({
  name: yup.string().required("ចាំបាច់ត្រូវបំពេញ"),
  slug: yup.string().required("ចាំបាច់ត្រូវបំពេញ"),
  description: yup.string().nullable(),
  thumbnailUrl: yup.string().required("ចាំបាច់ត្រូវជ្រើសរើសរូបភាព"),
  stock_quantity: yup.number().required("ចាំបាច់ត្រូវបំពេញ").min(0),
  price: yup.number().required("ចាំបាច់ត្រូវបំពេញ").min(0),
  discount: yup.number().nullable().min(0),
  is_active: yup.boolean().required("ចាំបាច់ត្រូវជ្រើសរើស"),
  is_used: yup.boolean().required("ចាំបាច់ត្រូវជ្រើសរើស"),
  brand_id: yup.string().required("ចាំបាច់ត្រូវជ្រើសរើស"),
  category_ids: yup.array().of(yup.string()).min(1, "សូមជ្រើសរើសយ៉ាងតិច ១"),
});

export const UserSchema = yup.object({
  username: yup.string().required("ចាំបាច់ត្រូវបំពេញ"),
  email: yup
    .string()
    .required("ចាំបាច់ត្រូវបំពេញ")
    .email("អ៊ីមែលមិនត្រឹមត្រូវ"),
  phone: yup.string().nullable(),
  password: yup
    .string()
    .required("ចាំបាច់ត្រូវបំពេញ")
    .min(6, "យ៉ាងតិច ៦ តួអក្សរ"),
  role: yup.string().required("ចាំបាច់ត្រូវជ្រើសរើស"),
  profile: yup.string().url("URL មិនត្រឹមត្រូវ").nullable(),
});
