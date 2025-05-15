import React from 'react';

interface ColorSwatchProps {
  colorName: string;
  shade: string | number;
}

const ColorSwatch: React.FC<ColorSwatchProps> = ({ colorName, shade }) => {
  const bgClass = `bg-${colorName}-${shade}`;
  const textColorClass = Number(shade) > 500 ? 'text-white' : 'text-jp-gray-900';
  
  return (
    <div className="flex flex-col">
      <div 
        className={`${bgClass} w-20 h-20 rounded-md mb-1 shadow-sm flex items-center justify-center ${textColorClass}`}
      >
        <span className="text-jp-body-sm font-jp-600">{shade}</span>
      </div>
      <div className="text-jp-body-sm text-jp-gray-600">{colorName}-{shade}</div>
    </div>
  );
};

interface ColorGroupProps {
  title: string;
  colorName: string;
  shades: (string | number)[];
}

const ColorGroup: React.FC<ColorGroupProps> = ({ title, colorName, shades }) => (
  <div className="mb-10">
    <h3 className="text-jp-heading-sm font-jp-600 mb-4 text-jp-gray-800">{title}</h3>
    <div className="flex flex-wrap gap-6">
      {shades.map((shade) => (
        <ColorSwatch 
          key={`${colorName}-${shade}`} 
          colorName={colorName}
          shade={shade}
        />
      ))}
    </div>
  </div>
);

const ColorPaletteDemo: React.FC = () => {
  const grayShades = [0, 25, 50, 100, 150, 200, 300, 400, 500, 600, 700, 800, 900, 950, 1000];
  const standardShades = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950];

  return (
    <div className="max-w-6xl mx-auto">
      <h2 className="text-jp-heading-lg font-jp-700 mb-8 text-jp-gray-900">Juspay Design System Color Palette</h2>
      <p className="text-jp-body-lg text-jp-gray-700 mb-8">
        This color palette is defined in the tailwind.config.js file and used throughout the design system. 
        The colors are organized by type and shade.
      </p>
      
      <ColorGroup 
        title="Gray" 
        colorName="jp-gray" 
        shades={grayShades} 
      />
      
      <ColorGroup 
        title="Primary" 
        colorName="jp-primary" 
        shades={standardShades} 
      />
      
      <ColorGroup 
        title="Purple" 
        colorName="jp-purple" 
        shades={standardShades} 
      />
      
      <ColorGroup 
        title="Orange" 
        colorName="jp-orange" 
        shades={standardShades} 
      />
      
      <ColorGroup 
        title="Red" 
        colorName="jp-red" 
        shades={standardShades} 
      />
      
      <ColorGroup 
        title="Green" 
        colorName="jp-green" 
        shades={standardShades} 
      />
      
      <ColorGroup 
        title="Yellow" 
        colorName="jp-yellow" 
        shades={standardShades} 
      />

      <div className="text-jp-body-md text-jp-gray-600 mt-8 p-4 bg-jp-gray-50 rounded-md">
        <p>Usage in CSS classes:</p>
        <code className="font-mono mt-2 block">bg-jp-primary-500</code>
        <code className="font-mono mt-1 block">text-jp-red-600</code>
        <code className="font-mono mt-1 block">border-jp-gray-200</code>
      </div>
    </div>
  );
};

export default ColorPaletteDemo; 