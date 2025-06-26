// src/presentation/components/ui/AnimatedNumber.tsx
import React from 'react';

interface AnimatedNumberProps {
  value: number;
  unit?: string;
}

const AnimatedNumber: React.FC<AnimatedNumberProps> = ({ value, unit }) => {
  return (
    <span>
      {Number.isInteger(value) ? value : value.toFixed(2)} {unit}
    </span>
  );
};

export default AnimatedNumber;
