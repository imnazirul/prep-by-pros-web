'use client';

import { useHeaderHeight } from '@/hooks/use-header-height';

const NavbarHeight = () => {
  const navbarHeihgt = useHeaderHeight();

  return <div style={{ height: `${navbarHeihgt}px` }} />;
};

export default NavbarHeight;
