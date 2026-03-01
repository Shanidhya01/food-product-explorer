export interface Product {
  code: string;
  product_name: string;
  product_name_en?: string;
  brands?: string;
  image_front_small_url?: string;
  image_front_url?: string;
  image_small_url?: string;
  image_url?: string;
  categories?: string;
  ingredients_text?: string;
  nutrition_grades?: string;
  nutriscore_grade?: string;
  ecoscore_grade?: string;
  quantity?: string | number;
  origins?: string;
  labels?: string;
  labels_tags?: string[];

  nutriments?: {
    energy?: number;
    fat?: number;
    carbohydrates?: number;
    proteins?: number;
    [key: string]: number | string | undefined;
  };
}

