import { useState } from 'react';

// Font style options
enum FontWeight {
  THIN = 100,
  EXTRA_LIGHT = 200,
  LIGHT = 300,
  REGULAR = 400,
  MEDIUM = 500,
  SEMI_BOLD = 600,
  BOLD = 700,
  EXTRA_BOLD = 800,
  BLACK = 900,
}

enum FontStyle {
  NORMAL = 'normal',
  ITALIC = 'italic',
}

const FontDemo = () => {
  const [fontWeight, setFontWeight] = useState<FontWeight>(FontWeight.REGULAR);
  const [fontStyle, setFontStyle] = useState<FontStyle>(FontStyle.NORMAL);

  // Characters to display
  const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  const lowercase = 'abcdefghijklmnopqrstuvwxyz'.split('');
  const numbers = '0123456789'.split('');

  const renderControls = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">Font Weight</label>
        <select
          className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
          value={fontWeight}
          onChange={(e) => setFontWeight(Number(e.target.value) as FontWeight)}
        >
          <option value={FontWeight.THIN}>Thin (100)</option>
          <option value={FontWeight.EXTRA_LIGHT}>Extra Light (200)</option>
          <option value={FontWeight.LIGHT}>Light (300)</option>
          <option value={FontWeight.REGULAR}>Regular (400)</option>
          <option value={FontWeight.MEDIUM}>Medium (500)</option>
          <option value={FontWeight.SEMI_BOLD}>Semi Bold (600)</option>
          <option value={FontWeight.BOLD}>Bold (700)</option>
          <option value={FontWeight.EXTRA_BOLD}>Extra Bold (800)</option>
          <option value={FontWeight.BLACK}>Black (900)</option>
        </select>
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">Font Style</label>
        <select
          className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
          value={fontStyle}
          onChange={(e) => setFontStyle(e.target.value as FontStyle)}
        >
          <option value={FontStyle.NORMAL}>Normal</option>
          <option value={FontStyle.ITALIC}>Italic</option>
        </select>
      </div>
    </div>
  );

  const renderCharacterGrid = (title: string, characters: string[]) => (
    <div className="mb-8">
      <h3 className="text-xl font-semibold mb-4">{title}</h3>
      <div className="grid grid-cols-3 sm:grid-cols-6 md:grid-cols-9 lg:grid-cols-13 gap-4">
        {characters.map((char) => (
          <div
            key={char}
            className="flex items-center justify-center bg-gray-50 border border-gray-200 rounded-md aspect-square"
          >
            <span
              style={{
                fontWeight: fontWeight,
                fontStyle: fontStyle,
                fontSize: '2rem',
              }}
            >
              {char}
            </span>
          </div>
        ))}
      </div>
    </div>
  );



  return (
    <div>
      {renderControls()}
      {renderCharacterGrid('Uppercase Letters', uppercase)}
      {renderCharacterGrid('Lowercase Letters', lowercase)}
      {renderCharacterGrid('Numbers', numbers)}
    </div>
  );
};

export default FontDemo; 