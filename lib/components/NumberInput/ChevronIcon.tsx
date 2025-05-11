import { themeConfig } from "../../themeConfig";

interface ChevronIconProps {
  direction: 'up' | 'down';
  className?: string;
}

export const ChevronIcon = ({ direction, className = '' }: ChevronIconProps) => {
  const transform = direction === 'down' ? 'rotate(180deg)' : 'rotate(0deg)';
  
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="9" 
      height="5" 
      viewBox="0 0 9 5" 
      fill="none"
      style={{ transform }}
      className={className}
    >
      <path 
        d="M5.19369 0.745106C6.29087 1.62826 7.26951 2.65739 8.10412 3.80551C8.20686 3.94502 8.26202 4.1206 8.24784 4.30691C8.21641 4.71993 7.85611 5.02927 7.4431 4.99784C5.48387 4.84874 3.51614 4.84874 1.55692 4.99784C1.1439 5.02927 0.783599 4.71993 0.752168 4.30691C0.737989 4.1206 0.793151 3.94502 0.895889 3.80552C1.7305 2.65739 2.70914 1.62826 3.80632 0.745106C4.21232 0.418299 4.78769 0.418298 5.19369 0.745106Z" 
        fill={`${themeConfig.euler.numberInput.stepper.button.icon}`}
      />
    </svg>
  );
}; 