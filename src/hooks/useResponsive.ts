import { useMediaQuery } from "react-responsive";

export const useResponsive = (): { isMobile: boolean; isTablet: boolean } => {
  const isMobile = useMediaQuery({
    maxWidth: 767,
  });
  const isTablet = useMediaQuery({
    maxWidth: 1279,
  });

  return { isMobile, isTablet };
};
