import React, { useState } from 'react';
// Import colors directly from tailwind config
import resolvedConfig from 'tailwindcss/resolveConfig';

// Color definitions directly from tailwind.config.js
const colorPalette = {
  'jp-gray': {
    0: '#FFFFFF',
    25: '#FCFCFD',
    50: '#F5F7FA',
    100: '#F2F4F8',
    150: '#ECEFF3',
    200: '#E1E4EA',
    300: '#CACFD8',
    400: '#99A0AE',
    500: '#717784',
    600: '#525866',
    700: '#2B303B',
    800: '#222530',
    900: '#181B25',
    950: '#0E121B',
    1000: '#050506',
  },
  'jp-primary': {
    50: '#EFF6FF',
    100: '#DBEAFE',
    200: '#BEDBFF',
    300: '#8EC5FF',
    400: '#51A2FF',
    500: '#2B7FFF',
    600: '#0561E2',
    700: '#1447E6',
    800: '#193CB8',
    900: '#1C398E',
    950: '#162456',
  },
  'jp-purple': {
    50: '#FAF5FF',
    100: '#F3E8FF',
    200: '#E9D4FF',
    300: '#DAB2FF',
    400: '#C27AFF',
    500: '#AD46FF',
    600: '#9810FA',
    700: '#8200DB',
    800: '#6E11B0',
    900: '#59168B',
    950: '#3C0366',
  },
  'jp-orange': {
    50: '#FFF7ED',
    100: '#FFEDD4',
    200: '#FFD6A8',
    300: '#FFB86A',
    400: '#FF8904',
    500: '#FF6900',
    600: '#F54A00',
    700: '#CA3500',
    800: '#9F2D00',
    900: '#7E2A0C',
    950: '#441306',
  },
  'jp-red': {
    50: '#FEF2F2',
    100: '#FFE2E2',
    200: '#FFC9C9',
    300: '#FFA2A2',
    400: '#FF6467',
    500: '#FB2C36',
    600: '#E7000B',
    700: '#C10007',
    800: '#9F0712',
    900: '#82181A',
    950: '#460809',
  },
  'jp-green': {
    50: '#F0FDF4',
    100: '#DCFCE7',
    200: '#B9F8CF',
    300: '#7BF1A8',
    400: '#00D492',
    500: '#00C951',
    600: '#00A63E',
    700: '#008236',
    800: '#016630',
    900: '#0D542B',
    950: '#052E16',
  },
  'jp-yellow': {
    50: '#FEFCE8',
    100: '#FEF9C2',
    200: '#FFF085',
    300: '#FFDF20',
    400: '#FCC800',
    500: '#EFB100',
    600: '#D08700',
    700: '#A65F00',
    800: '#894B00',
    900: '#733E0A',
    950: '#432004',
  },
};

// Consistent shade collections for different color types
const GRAY_SHADES = [0, 25, 50, 100, 150, 200, 300, 400, 500, 600, 700, 800, 900, 950, 1000];
const STANDARD_SHADES = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950];

// Color families in display order
const COLOR_FAMILIES = [
  { 
    name: 'Gray', 
    key: 'jp-gray', 
    shades: GRAY_SHADES, 
    indicatorColor: '#717784',
    description: 'Neutral colors for backgrounds, text, and borders'
  },
  { 
    name: 'Primary', 
    key: 'jp-primary', 
    shades: STANDARD_SHADES, 
    indicatorColor: '#2B7FFF',
    description: 'Primary brand colors for key actions and elements'
  },
  { 
    name: 'Purple', 
    key: 'jp-purple', 
    shades: STANDARD_SHADES, 
    indicatorColor: '#AD46FF',
    description: 'Accent colors for secondary elements and highlights'
  },
  { 
    name: 'Orange', 
    key: 'jp-orange', 
    shades: STANDARD_SHADES, 
    indicatorColor: '#FF6900',
    description: 'Warning and notification states'
  },
  { 
    name: 'Red', 
    key: 'jp-red', 
    shades: STANDARD_SHADES, 
    indicatorColor: '#FB2C36',
    description: 'Error states and destructive actions'
  },
  { 
    name: 'Green', 
    key: 'jp-green', 
    shades: STANDARD_SHADES, 
    indicatorColor: '#00C951',
    description: 'Success states and positive indicators'
  },
  { 
    name: 'Yellow', 
    key: 'jp-yellow', 
    shades: STANDARD_SHADES, 
    indicatorColor: '#EFB100',
    description: 'Caution states and important highlights'
  },
];

interface ColorSwatchProps {
  colorName: string;
  shade: string | number;
  hexColor: string;
}

const ColorSwatch = ({ colorName, shade, hexColor }: ColorSwatchProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const isDark = Number(shade) > 500;
  const textColor = isDark ? '#FFFFFF' : '#181B25';
  
  return (
    <div 
      className="relative group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div 
        className="w-20 h-20 rounded-lg shadow-sm transition-all duration-200 ease-in-out group-hover:shadow-md group-hover:scale-105 flex items-center justify-center cursor-pointer"
        style={{ backgroundColor: hexColor }}
      >
        <span 
          style={{ color: textColor }} 
          className="text-xs font-medium"
        >
          {shade}
        </span>
      </div>
      {isHovered && (
        <div className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 bg-white shadow-md rounded-md py-1 px-2 z-10 text-xs">
          <div className="font-mono">{hexColor}</div>
          <div className="text-gray-600">{colorName}-{shade}</div>
        </div>
      )}
    </div>
  );
};

interface ColorGroupProps {
  title: string;
  colorName: string;
  shades: (string | number)[];
  indicatorColor: string;
  description: string;
}

const ColorGroup = ({ title, colorName, shades, indicatorColor, description }: ColorGroupProps) => {
  const colorShades = colorPalette[colorName as keyof typeof colorPalette] || {};
  
  return (
    <div className="mb-16 bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center gap-3 mb-3">
        <div className="w-5 h-5 rounded-full shadow-inner" style={{ backgroundColor: indicatorColor }}></div>
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
      </div>
      
      <p className="text-sm text-gray-600 mb-5 ml-8">{description}</p>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-7 xl:grid-cols-11 gap-4 ml-8">
        {shades.map((shade) => {
          const hexColor = colorShades[shade as keyof typeof colorShades] || '#CCCCCC';
          return (
            <ColorSwatch 
              key={`${colorName}-${shade}`} 
              colorName={colorName}
              shade={shade}
              hexColor={hexColor}
            />
          );
        })}
      </div>
    </div>
  );
};

const ColorPaletteDemo = () => {
  return (
    <div className="max-w-[1200px] mx-auto px-6 py-8 bg-gray-50">
      <div className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Color System</h2>
        <p className="text-gray-600 max-w-2xl">
          A comprehensive color palette designed for consistency and accessibility across the design system.
          Hover over each color to see its hex value and usage class.
        </p>
      </div>
      
      <div className="space-y-6">
        {COLOR_FAMILIES.map(family => (
          <ColorGroup 
            key={family.key}
            title={family.name} 
            colorName={family.key} 
            shades={family.shades}
            indicatorColor={family.indicatorColor}
            description={family.description}
          />
        ))}
      </div>
    </div>
  );
};

export default ColorPaletteDemo; 