import { Platform } from 'react-native';

const theme = {
    colors: {
      textPrimary: '#24292e',
      textSecondary: '#586069',
      textWhite: 'white',
      primary: '#0366d6',
      mainBackgroundColor: '#e1e4e8',
    },
    fontSizes: {
      body: 14,
      subheading: 16,
      heading: 20,
      appBar: 25
    },
    fonts: {
      main: Platform.select({
        android: 'Roboto',
        ios: 'Arial',
        default: 'System'
      }),
    },
    fontWeights: {
      normal: '400',
      bold: '700',
    },
    backgroundColors: {
        appBar: '#24292e'
    }
  };
  
  export default theme;