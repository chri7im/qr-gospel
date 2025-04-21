import { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

type WheelPickerProps = {
  items: string[];
  visibleCount?: number; // odd number, e.g. 5 or 7
  itemHeight?: number; // in px
  onChange?: (index: number) => void;
};

export function WheelPicker({
  items,
  visibleCount = 5,
  itemHeight = 40,
  onChange,
}: WheelPickerProps) {
  const [selected, setSelected] = useState(0);
  const y = useMotionValue(0);
  const springY = useSpring(y, { stiffness: 300, damping: 30 }); // Smooth scrolling
  const totalHeight = items.length * itemHeight;
  const centerOffset = (visibleCount - 1) / 2; // Center item index (2 for 5 visible items)

  // Derive the “selected index” by rounding scroll / itemHeight
  const currentIndex = useTransform(springY, (y) => Math.round(-y / itemHeight) + centerOffset);

  // When the derived index changes, clamp it and call onChange
  useEffect(() => {
    const unsubs = currentIndex.onChange((v) => {
      const i = Math.min(Math.max(0, v), items.length - 1);
      setSelected(i);
      onChange?.(i);
      console.log('Selected index:', i);
    });
    return () => unsubs();
  }, [currentIndex, items.length, onChange]);

  // Snap to nearest item on drag end
  const handleDragEnd = () => {
    const currentY = springY.get();
    const nearestIndex = Math.round(currentY / itemHeight);
    const snapY = nearestIndex * itemHeight;
    const boundedSnapY = Math.min(itemHeight * centerOffset, Math.max(-(totalHeight - itemHeight * (centerOffset + 1)), snapY));
    springY.set(boundedSnapY);
    console.log('Snapped y:', boundedSnapY, 'Nearest index:', nearestIndex);
  };

  // Handle wheel scrolling for desktop
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      const delta = e.deltaY * 0.5; // Adjust scroll sensitivity
      const newY = Math.min(itemHeight * centerOffset, Math.max(-(totalHeight - itemHeight * (centerOffset + 1)), y.get() - delta));
      y.set(newY);
      console.log('Wheel scroll y:', newY);
    };

    const wheelElement = wheelRef.current;
    if (wheelElement) {
      wheelElement.addEventListener('wheel', handleWheel, { passive: false });
    }

    return () => {
      if (wheelElement) {
        wheelElement.removeEventListener('wheel', handleWheel);
      }
    };
  }, [y]);

  const wheelRef = useRef<HTMLDivElement>(null);

  // Each item gets a 3D rotation based on distance to selected
  const getTransform = (i: number) => {
    const d = i - selected; // Distance in “rows”
    const angle = d * 20; // 20° per row
    const depth = -Math.abs(d) * 8; // Pull back into “barrel”
    return {
      rotateX: angle,
      translateZ: depth,
      scale: i === selected ? 1.2 : 1.0,
    };
  };

  return (
    <div
      className="relative mx-auto"
      style={{ height: itemHeight * visibleCount, perspective: 800 }}
    >
      {/* Gradient mask for fade effect */}
      <div
        className="absolute inset-x-0 top-0 h-12 bg-gradient-to-b from-gray-100 to-transparent z-0"
        style={{ height: itemHeight }}
      />
      <div
        className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-gray-100 to-transparent z-0"
        style={{ height: itemHeight }}
      />
      {/* Fixed highlight with modern iOS effect */}
      <div
        className="absolute inset-x-0 top-[80px] h-10 z-0"
        style={{
          background: 'rgba(255, 255, 255, 0.2)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          borderTop: '1px solid rgba(255, 255, 255, 0.3)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.3)',
        }}
      />
      <motion.div
        ref={wheelRef}
        className="flex flex-col items-center"
        style={{ y: springY }}
        drag="y"
        dragConstraints={{
          top: -(totalHeight - itemHeight * (centerOffset + 1)),
          bottom: itemHeight * centerOffset,
        }}
        dragElastic={0.1}
        dragMomentum={true}
        onDragEnd={handleDragEnd}
      >
        {items.map((label, i) => {
          const { rotateX, translateZ, scale } = getTransform(i);
          return (
            <motion.div
              key={i}
              className="flex items-center justify-center whitespace-nowrap"
              style={{
                height: itemHeight,
                fontSize: itemHeight * 0.4,
                transformStyle: 'preserve-3d',
                rotateX,
                translateZ,
                scale,
                color: i === selected ? 'rgb(0, 122, 255)' : 'rgb(44, 44, 44)', // iOS blue for selected, dark grey for others
                fontWeight: i === selected ? 600 : 400,
                opacity: Math.abs(i - selected) <= 2 ? 1 : 0.3,
                transition: 'scale 0.2s, color 0.2s, opacity 0.2s',
              }}
            >
              {label}
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}