
'use client';

import { useTheme } from '@/contexts/ThemeContext';

function Component() {
  const { currentTheme } = useTheme();
  return (
    <>
      <h1 className={currentTheme.colors.textMain}>Hello World</h1>
    </>
  );
}

export default Component;
