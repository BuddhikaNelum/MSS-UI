import { createTheme } from '@mui/material/styles';

import colors from 'assets/scss/_themes-vars.module.scss';

import componentStyleOverrides from './compStyleOverrides';
import themePalette from './palette';
import themeTypography from './typography';

declare module '@mui/material/styles' {
  interface Theme {
    typography: {
      customInput: any;
      menuCaption: any;
      subMenuCaption: { [k: string]: [v: string | number] };
      commonAvatar: { [k: string]: [v: string] },
      mediumAvatar: { [k: string]: [v: string] },
    },
    pallete: {
      light: string;
    }
  }
  // allow configuration using `createTheme`
  interface ThemeOptions {

  }
}

const color: any = colors;

const themeOption = {
  colors: color,
  heading: color.grey900,
  paper: color.paper,
  backgroundDefault: color.paper,
  background: color.primaryLight,
  darkTextPrimary: color.grey700,
  darkTextSecondary: color.grey500,
  textDark: color.grey900,
  menuSelected: color.secondaryDark,
  menuSelectedBack: color.secondaryLight,
  menuText: color.secondary200,
  divider: color.grey200,
};

const theme = createTheme({
  direction: 'ltr',
  palette: themePalette(themeOption),
  typography: themeTypography(themeOption),
  mixins: {
    toolbar: {
      minHeight: '48px',
      padding: '16px',
      '@media (min-width: 600px)': {
        minHeight: '48px'
      }
    }
  }
});

theme.components = componentStyleOverrides(themeOption);

export default theme;