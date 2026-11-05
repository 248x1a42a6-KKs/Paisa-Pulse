import React from 'react';
import {
  Utensils,
  Navigation,
  GraduationCap,
  Receipt,
  PartyPopper,
  HeartPulse,
  Tag,
  CircleDollarSign,
} from 'lucide-react';
import { CategoryType } from '../types';

interface Props {
  category: CategoryType | string;
  className?: string;
  size?: number;
}

export const CategoryIcon: React.FC<Props> = ({ category, className = 'w-5 h-5', size = 20 }) => {
  switch (category) {
    case 'Food':
      return <Utensils className={className} size={size} />;
    case 'Travel':
      return <Navigation className={className} size={size} />;
    case 'Study':
      return <GraduationCap className={className} size={size} />;
    case 'Bills':
      return <Receipt className={className} size={size} />;
    case 'Fun':
      return <PartyPopper className={className} size={size} />;
    case 'Health':
      return <HeartPulse className={className} size={size} />;
    case 'Other':
    default:
      return <Tag className={className} size={size} />;
  }
};
