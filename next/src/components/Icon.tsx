'use client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { iconMap } from '@/lib/icons';
import type { IconProp } from '@fortawesome/fontawesome-svg-core';

interface IconProps {
  icon: string;
  className?: string;
  [key: string]: any;
}

export default function Icon({ icon, className = '', ...props }: IconProps) {
  const iconName = iconMap[icon as keyof typeof iconMap];

  if (!iconName) {
    console.warn(`Icon "${icon}" not found in icon library`);
    return null;
  }

  return (
    <FontAwesomeIcon
      icon={iconName as IconProp}
      className={className}
      {...props}
    />
  );
}
