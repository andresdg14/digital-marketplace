'use client';

import { PRODUCT_CATEGORIES } from '@/src/config';
import { useEffect, useRef, useState } from 'react';
import NavItem from './NavItem';
import { useOnClickOutside } from '@/src/hooks/use-on-click-outside';

const NavItems = () => {
  const [activeIndex, setActiveIndex] = useState<null | number>(null);
  const isAnyOpen = activeIndex !== null;
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setActiveIndex(null);
      }
    };
    document.addEventListener('keydown', handler);

    // Cleanup function
    return () => {
      document.removeEventListener('keydown', handler);
    };
  }, []);

  useOnClickOutside(navRef, () => setActiveIndex(null));

  return (
    <div className="flex gap-4 h-full" ref={navRef}>
      {PRODUCT_CATEGORIES.map((category, index) => {
        const handleOpen = () => {
          if (activeIndex === index) {
            setActiveIndex(null);
          } else {
            setActiveIndex(index);
          }
        };

        const isOpen = index === activeIndex;
        const close = () => setActiveIndex(null);

        return (
          <NavItem
            category={category}
            handleOpen={handleOpen}
            isOpen={isOpen}
            key={category.value}
            isAnyOpen={isAnyOpen}
            close={close}
          />
        );
      })}
    </div>
  );
};

export default NavItems;
