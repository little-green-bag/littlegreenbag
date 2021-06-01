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
      { value: 'rig', viewValue: 'Rig' },
      { value: 'pendants', viewValue: 'Pendants' },
      { value: 'dab', viewValue: 'Dab' },
      { value: 'tools', viewValue: 'Tools' }
    ]
  },
  {
    name: 'Accessories',
    categories: [
      { value: 'cleaning', viewValue: 'Cleaning' },
      { value: 'dabmats', viewValue: 'Dab Mats' },
    ]
  },
  {
    name: 'Glass Essentials',
    categories: [
      { value: 'bangers', viewValue: 'Bangers' },
      { value: 'slupers', viewValue: 'Slupers' },
      { value: 'marbles', viewValue: 'Marbles' },
      { value: 'carbcaps', viewValue: 'Carb-caps' }
    ]
  },
];