import { MD3LightTheme as DefaultTheme } from 'react-native-paper';

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#9880ff',
    secondary: '#03dac6',
    background: '#f6f6f6',
    surface: '#ffffff',
    accent: '#03dac4',
    error: '#B00020',
    text: '#000000',
    onSurface: '#000000',
    disabled: 'rgba(0, 0, 0, 0.26)',
    placeholder: 'rgba(0, 0, 0, 0.54)',
    backdrop: 'rgba(0, 0, 0, 0.5)',
  },
};

export default theme;
