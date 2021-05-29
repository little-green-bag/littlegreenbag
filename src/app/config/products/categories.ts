import { CategoryGroup } from "@models/product-category.model";

export const ProductCategoriesList = [
  { value: 'Products', viewValue: 'Products' },
  { value: 'Bangers', viewValue: 'Bangers' },
  { value: 'Decoration', viewValue: 'Decoration' },
  { value: 'Rigs', viewValue: 'Rigs' },
];


export const CategoryGroups: CategoryGroup[] = [
  {
    name: 'Glass Gallery',
    categories: [
      { value: 'rig-0', viewValue: 'Rig' },
      { value: 'pendants-1', viewValue: 'Pendants' },
      { value: 'dab-2', viewValue: 'Dab' },
      { value: 'tools-3', viewValue: 'Tools' }
    ]
  },
  {
    name: 'Accessories',
    categories: [
      { value: 'cleaning-0', viewValue: 'Cleaning' },
      { value: 'dab-mats-1', viewValue: 'Dab Mats' },
    ]
  },
  {
    name: 'Glass Essentials',
    categories: [
      { value: 'bangers-0', viewValue: 'Bangers' },
      { value: 'slupers-1', viewValue: 'Slupers' },
      { value: 'marbles-2', viewValue: 'Marbles' },
      { value: 'carb-caps-3', viewValue: 'Carb-caps' }
    ]
  },
];