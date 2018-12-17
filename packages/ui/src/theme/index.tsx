export interface ITheme {
  /**
   * Fonts according to design spec, can be accessed using `fontFamily="key"` in component props
   */
  fonts: {
    [key: string]: string;
  };

  /**
   * Font-sizes according to design spec, can be accessed using `fontSize={index}` in component props
   */
  fontSizes: string[];

  /**
   * Colours according to design spec, can be accessed using `color={index}`/`color={index[]}` and `bg={index[]}`/`bg={index[]}` in component props
   */
  colors: {
    [key: string]: string[];
  };

  /**
   * Testing a new theory
   */
  primaryColor: string;

  /**
   * Border-radii according to design spec, can be accessed using `borderRadius={index}` in component props
   */
  radii: string[];

  /**
   * spacing according to design spec, can be accessed using the `m(t|r|b|l)` and `p(t|r|b|l)` props with the corresponding index
   */
  space: string[];

  textStyles?: {
    [key: string]: {};
  };

  colorStyles?: {
    [key: string]: {};
  };

  buttons: {
    [key: string]: {};
  };
}

const theme: ITheme = {
  primaryColor: '#34404A',
  fonts: {
    sans: '"Rubik", sans-serif',
    mono: '"Roboto Mono", sans-serif',
  },
  fontSizes: ['8px', '10px', '12px', '13px', '14px', '16px'],
  colors: {
    primary: [
      '#07385A',
      '#184F76',
      '#3290D4',
      '#6DC1FD',
      '#A7DAFF',
      '#E2F3FF',
      '#F3FAFF',
    ],
    neutrals: [
      '#263238',
      '#78909C',
      '#B7C1C6',
      '#E6EAEF',
      '#F9FBFD',
      '#FFFFFF',
    ],
    errors: ['#7A1414', '#BE0A0A', '#FF4F4F', '#FFC6C6', '#FFF3F3'],
    warnings: ['#684B00', '#CC9C23', '#FFCB44', '#FFE6A6', '#FFF8E7'],
    success: ['#07822A', '#49B267', '#67D987', '#AEF1C1', '#E1FFE9'],
  },
  radii: ['3px', '4px', '5px', '6px'],
  space: ['4px', '6px', '8px', '10px', '14px'],
  buttons: {
    primary: {
      backgroundColor: '#34404A',
      color: '#ffffff',
      fontSize: '1em',
    },
    secondary: {
      backgroundColor: 'white',
      color: '#34404A',
      fontSize: '1em',
    },
  },
};
export default theme;
