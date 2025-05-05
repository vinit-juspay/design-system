import { useState } from 'react';
import { Avatar, AvatarGroup } from '../../../lib/main'; // Assuming Avatar is exported from main
import { AvatarProps, AvatarSize, AvatarShape } from '../../../lib/components/Avatar/types'; // Updated path to directory index
import { AvatarData } from '../../../lib/components/AvatarGroup'; // Updated path to directory index

const avatarGroupData: AvatarData[] = [
  { id: 1, src: 'https://randomuser.me/api/portraits/women/10.jpg', alt: 'User 1' },
  { id: 2, src: 'https://randomuser.me/api/portraits/men/20.jpg', alt: 'User 2' },
  { id: 3, alt: 'User 3 No Src' }, // Fallback initials
  { id: 4, src: 'https://randomuser.me/api/portraits/women/30.jpg', alt: 'User 4' },
  { id: 5, fallback: 'U5', alt: 'User 5 Fallback' }, // Custom fallback
  { id: 6, src: 'https://randomuser.me/api/portraits/men/40.jpg', alt: 'User 6' },
  { id: 7, src: 'https://randomuser.me/api/portraits/women/50.jpg', alt: 'User 7' },
];

const AvatarDemo = () => {
  const [size, setSize] = useState<AvatarProps['size']>(AvatarSize.REGULAR);
  const [online, setOnline] = useState(true);
  const [src, setSrc] = useState('https://i.pravatar.cc/150?img=3'); // Example image source
  const [alt, setAlt] = useState('Jane Doe');
  const [fallback, setFallback] = useState('');
  const [useInvalidSrc, setUseInvalidSrc] = useState(false);
  const [shape, setShape] = useState<AvatarProps['shape']>(AvatarShape.CIRCULAR);
  const [groupMaxCount, setGroupMaxCount] = useState(5); // State for AvatarGroup maxCount

  const currentSrc = useInvalidSrc ? 'invalid-url' : src;

  const sizes: Array<AvatarSize | undefined> = Object.values(AvatarSize);
  const shapes: Array<AvatarShape | undefined> = Object.values(AvatarShape);

  return (
    <div className="flex flex-col gap-8 p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold">Avatar Component Playground</h1>

      {/* Preview area */}
      <div className="flex flex-col gap-4 items-center justify-center min-h-32 p-8 border border-gray-200 rounded-lg">
        <Avatar
          src={currentSrc}
          alt={alt}
          fallback={fallback}
          size={size}
          online={online}
          shape={shape}
        />
        <div className="mt-4 text-sm text-gray-600">
          Current state: size={size}, online={String(online)}, src={currentSrc || '(none)'}, alt="{alt}", fallback="{fallback || '(auto)'}", shape={shape}
        </div>
      </div>

      {/* Controls */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left column */}
        <div className="flex flex-col gap-4">
          <div>
            <label className="block mb-2 font-medium">Size</label>
            <select
              value={size}
              onChange={e => setSize(e.target.value as AvatarSize)}
              className="w-full p-2 border border-gray-300 rounded"
            >
              {sizes.map(s => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="online"
              checked={online}
              onChange={e => setOnline(e.target.checked)}
              className="w-4 h-4"
            />
            <label htmlFor="online" className="font-medium">
              Show Online Indicator
            </label>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="useInvalidSrc"
              checked={useInvalidSrc}
              onChange={e => setUseInvalidSrc(e.target.checked)}
              className="w-4 h-4"
            />
            <label htmlFor="useInvalidSrc" className="font-medium">
              Use Invalid Image Source (for fallback test)
            </label>
          </div>

          <div>
            <label className="block mb-2 font-medium">Shape</label>
            <select
              value={shape}
              onChange={e => setShape(e.target.value as AvatarShape)}
              className="w-full p-2 border border-gray-300 rounded"
            >
              {shapes.map(s => (
                <option key={s} value={s}>{s ? s.charAt(0).toUpperCase() + s.slice(1) : ''}</option>
              ))}
            </select>
          </div>

        </div>

        {/* Right column */}
        <div className="flex flex-col gap-4">
           <div>
            <label className="block mb-2 font-medium">Image Source (URL)</label>
            <input
              type="text"
              value={src}
              onChange={e => setSrc(e.target.value)}
              placeholder="e.g., https://..."
              className="w-full p-2 border border-gray-300 rounded"
              disabled={useInvalidSrc}
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">Alt Text (used for initials if no src/fallback)</label>
            <input
              type="text"
              value={alt}
              onChange={e => setAlt(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">Custom Fallback Text (overrides initials)</label>
            <input
              type="text"
              value={fallback}
              onChange={e => setFallback(e.target.value)}
              placeholder="e.g., JD"
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
        </div>
      </div>

       {/* Static Examples */}
       <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Static Examples - All Sizes</h2>

        {/* With Image */}
        <h3 className="text-lg font-medium mt-6 mb-3">With Image</h3>
        <div className="flex flex-wrap gap-6 items-end">
          {sizes.map((s, index) => (
             <div key={`img-size-${s}`} className="flex flex-col items-center gap-1 text-center">
                <Avatar src={`https://randomuser.me/api/portraits/women/${index}.jpg`} alt="User Image" size={s} />
                <span className="text-xs text-gray-500">{s}</span>
              </div>
          ))}
        </div>

        {/* With Image + Online Indicator */}
        <h3 className="text-lg font-medium mt-6 mb-3">With Image + Online</h3>
         <div className="flex flex-wrap gap-6 items-end">
          {sizes.map((s, index) => (
             <div key={`img-online-size-${s}`} className="flex flex-col items-center gap-1 text-center">
                <Avatar src={`https://randomuser.me/api/portraits/men/${index}.jpg`} alt="Online User" size={s} online={true}/>
                <span className="text-xs text-gray-500">{s}</span>
              </div>
          ))}
        </div>

        {/* Initials Fallback (No Src) */}
        <h3 className="text-lg font-medium mt-6 mb-3">Initials Fallback (No Src)</h3>
        <div className="flex flex-wrap gap-6 items-end">
          {sizes.map((s) => (
             <div key={`initials-size-${s}`} className="flex flex-col items-center gap-1 text-center">
                <Avatar alt="John Smith" size={s} />
                <span className="text-xs text-gray-500">{s}</span>
              </div>
          ))}
        </div>

         {/* Initials Fallback (Invalid Src) */}
        <h3 className="text-lg font-medium mt-6 mb-3">Initials Fallback (Invalid Src)</h3>
        <div className="flex flex-wrap gap-6 items-end">
          {sizes.map((s) => (
             <div key={`initials-invalid-src-size-${s}`} className="flex flex-col items-center gap-1 text-center">
                <Avatar src="invalid-url" alt="Jane Doe" size={s} />
                <span className="text-xs text-gray-500">{s}</span>
              </div>
          ))}
        </div>

        {/* Custom Fallback (No Src) */}
        <h3 className="text-lg font-medium mt-6 mb-3">Custom Fallback (No Src)</h3>
        <div className="flex flex-wrap gap-6 items-end">
          {sizes.map((s) => (
             <div key={`custom-fallback-size-${s}`} className="flex flex-col items-center gap-1 text-center">
                <Avatar fallback="FB" size={s} />
                <span className="text-xs text-gray-500">{s}</span>
              </div>
          ))}
        </div>

         {/* Custom Fallback (Invalid Src) */}
        <h3 className="text-lg font-medium mt-6 mb-3">Custom Fallback (Invalid Src)</h3>
         <div className="flex flex-wrap gap-6 items-end">
          {sizes.map((s) => (
             <div key={`custom-fallback-invalid-src-size-${s}`} className="flex flex-col items-center gap-1 text-center">
                <Avatar src="invalid-url" fallback="CF" alt="Ignored Alt" size={s} />
                <span className="text-xs text-gray-500">{s}</span>
              </div>
          ))}
        </div>
      </div>

      {/* --- Rounded Examples --- */}
      <h2 className="text-xl font-semibold mt-10 mb-4">Static Examples - Rounded</h2>

      {/* With Image */}
      <h3 className="text-lg font-medium mt-6 mb-3">With Image (Rounded)</h3>
      <div className="flex flex-wrap gap-6 items-end">
        {sizes.map((s, index) => (
           <div key={`img-rounded-size-${s}`} className="flex flex-col items-center gap-1 text-center">
              <Avatar src={`https://randomuser.me/api/portraits/women/${index+10}.jpg`} alt="Rounded User Image" size={s} shape={AvatarShape.ROUNDED} />
              <span className="text-xs text-gray-500">{s}</span>
            </div>
        ))}
      </div>

      {/* With Image + Online Indicator */}
      <h3 className="text-lg font-medium mt-6 mb-3">With Image + Online (Rounded)</h3>
       <div className="flex flex-wrap gap-6 items-end">
        {sizes.map((s, index) => (
           <div key={`img-online-rounded-size-${s}`} className="flex flex-col items-center gap-1 text-center">
              <Avatar src={`https://randomuser.me/api/portraits/men/${index+10}.jpg`} alt="Rounded Online User" size={s} online={true} shape={AvatarShape.ROUNDED}/>
              <span className="text-xs text-gray-500">{s}</span>
            </div>
        ))}
      </div>

      {/* Initials Fallback (No Src) */}
      <h3 className="text-lg font-medium mt-6 mb-3">Initials Fallback (No Src, Rounded)</h3>
      <div className="flex flex-wrap gap-6 items-end">
        {sizes.map((s) => (
           <div key={`initials-rounded-size-${s}`} className="flex flex-col items-center gap-1 text-center">
              <Avatar alt="Adam West" size={s} shape={AvatarShape.ROUNDED} />
              <span className="text-xs text-gray-500">{s}</span>
            </div>
        ))}
      </div>

      {/* Custom Fallback (No Src) */}
      <h3 className="text-lg font-medium mt-6 mb-3">Custom Fallback (No Src, Rounded)</h3>
      <div className="flex flex-wrap gap-6 items-end">
        {sizes.map((s) => (
           <div key={`custom-fallback-rounded-size-${s}`} className="flex flex-col items-center gap-1 text-center">
              <Avatar fallback="AW" size={s} shape={AvatarShape.ROUNDED} />
              <span className="text-xs text-gray-500">{s}</span>
            </div>
        ))}
      </div>

      {/* --- AvatarGroup Section --- */}
      <div className="mt-10 pt-8 border-t border-gray-200">
        <h1 className="text-2xl font-bold mb-6">AvatarGroup Component Examples</h1>

        {/* Controls for AvatarGroup */}
        <div className="mb-8 p-4 border border-dashed border-gray-300 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">AvatarGroup Controls</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="groupMaxCount" className="block mb-2 font-medium">Max Visible Avatars (maxCount)</label>
              <input
                type="number"
                id="groupMaxCount"
                value={groupMaxCount}
                onChange={e => setGroupMaxCount(Math.max(1, parseInt(e.target.value, 10) || 1))} // Ensure at least 1
                min="1"
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
             <div>
              <label className="block mb-2 font-medium">Group Size (Inherited by Avatars)</label>
              <select
                value={size}
                onChange={e => setSize(e.target.value as AvatarSize)}
                className="w-full p-2 border border-gray-300 rounded"
              >
                {sizes.map(s => (
                  <option key={`group-size-${s}`} value={s}>{s}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Live Preview */}
        <div className="flex flex-col gap-4 items-center justify-center min-h-32 p-8 border border-gray-200 rounded-lg mb-8">
          <h3 className="text-lg font-medium mb-3">Live Preview</h3>
           <AvatarGroup
              avatars={avatarGroupData}
              maxCount={groupMaxCount}
              size={size}
            />
           <div className="mt-4 text-sm text-gray-600">
            Current state: size={size}, maxCount={groupMaxCount}, total avatars={avatarGroupData.length}
          </div>
        </div>


        {/* Static Examples */}
        <h2 className="text-xl font-semibold mb-4">Static AvatarGroup Examples</h2>

        <h3 className="text-lg font-medium mt-6 mb-3">Default (size='md', maxCount=5)</h3>
        <AvatarGroup avatars={avatarGroupData} />

        <h3 className="text-lg font-medium mt-6 mb-3">Different Sizes</h3>
        <div className="flex flex-wrap gap-x-8 gap-y-4 items-end">
           {sizes.map(s => (
            <div key={`group-size-example-${s}`} className="flex flex-col items-center gap-1 text-center">
               <AvatarGroup avatars={avatarGroupData.slice(0, 4)} size={s} />
               <span className="text-xs text-gray-500">{s}</span>
             </div>
           ))}
         </div>

        <h3 className="text-lg font-medium mt-6 mb-3">Different maxCount Values</h3>
        <div className="flex flex-wrap gap-x-8 gap-y-4 items-end">
          <div>
            <AvatarGroup avatars={avatarGroupData} maxCount={3} size={AvatarSize.REGULAR} />
            <span className="block text-xs text-gray-500 text-center mt-1">maxCount=3</span>
          </div>
          <div>
            <AvatarGroup avatars={avatarGroupData} maxCount={5} size={AvatarSize.REGULAR} />
             <span className="block text-xs text-gray-500 text-center mt-1">maxCount=5</span>
          </div>
           <div>
            <AvatarGroup avatars={avatarGroupData} maxCount={avatarGroupData.length} size={AvatarSize.REGULAR} />
            <span className="block text-xs text-gray-500 text-center mt-1">maxCount={avatarGroupData.length} (no overflow)</span>
          </div>
          <div>
            <AvatarGroup avatars={avatarGroupData} maxCount={10} size={AvatarSize.REGULAR} />
            <span className="block text-xs text-gray-500 text-center mt-1">maxCount=10 (more than available)</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AvatarDemo; 