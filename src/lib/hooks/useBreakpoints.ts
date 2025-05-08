import { useMediaQuery } from '@mui/material';

import { theme } from '../consts/theme';

export const useBreakpoints = () => {
  // breakpoint limits
  const mobileBreakpoint = useMediaQuery(
    `(max-width: ${theme.breakpoints.values.sm.toString()}px)`
  );
  const tabletBreakpoint = useMediaQuery(
    `(max-width: ${theme.breakpoints.values.md.toString()}px)`
  );
  const desktopBreakpoint = useMediaQuery(
    `(max-width: ${theme.breakpoints.values.lg.toString()}px)`
  );

  // screen sizes
  const isMobile = useMediaQuery(
    `(max-width: ${(theme.breakpoints.values.md - 1).toString()}px)`
  );
  const isTablet = useMediaQuery(
    `(min-width: ${theme.breakpoints.values.md.toString()}px) and (max-width: ${(
      theme.breakpoints.values.lg - 1
    ).toString()}px)`
  );
  const isDesktop = useMediaQuery(
    `(min-width: ${theme.breakpoints.values.lg.toString()}px)`
  );

  return {
    isMobile,
    isTablet,
    isDesktop,
    // breakpoints
    mobileBreakpoint,
    tabletBreakpoint,
    desktopBreakpoint,
  };
};
