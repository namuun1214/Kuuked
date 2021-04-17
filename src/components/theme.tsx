import React, { createContext } from 'react';

export const colors = {
  lead: '#7c4dff',
  carbon: '#FFFFFF',
  primary: '#5969BD',
  default: '#FFFFFF',
  tertiary: '#AFAFAF',
  red: '#f4495d',
  cyan: '#37CDFA',
  lightGreen: '#C78EFF',
  green: '#5EB14E',
  darkGreen: '#50A141',
  green2: '#E1EEDF',
  purple: '#BAB1FF',
  pink: '#FAF2F4',
  grey: '#C8C8C8',
  grey2: '#DBDBDB',
  grey3: '#F2F2F2',
  grey4: '#AFAFAF',
  transparent: 'transparent',
  overlay: 'rgba(18,18,18,0.3)',
  yellow: '#FFC700',
  lightGreen2: '#E7F3E4',
  lightCyan: '#DEF6FC',
  lightYellow: '#FDE7B1',
  paragraph: '#474747',
};

const mapRoleToText = {
  success: 'green',
  light: 'carbon',
  primary: 'default',
  info: 'grey4',
  error: 'red',
  secondary: 'carbon',
  tertiary: 'tertiary',
  paragraph: 'paragraph',
};

const mapRoleToBackground = {
  accent: 'darkGreen',
  success: 'green',
  lightSuccess: 'lightGreen',
  light: 'carbon',
  primary: 'defualt',
  info: 'primary',
  error: 'red',
  secondary: 'grey3',
  tertiary: 'tertiary',
  grey: 'grey',
  transparent: 'transparent',
  overlay: 'overlay',
  lightGreen: 'green2',
  yellow: 'yellow',
  lightGreen2: 'lightGreen2',
  lightCyan: 'lightCyan',
  lightYellow: 'lightYellow',
};

const mapRoleToBorder = {
  success: 'green',
  light: 'grey2',
  primary: 'default',
  info: 'primary',
  error: 'red',
  secondary: 'tertiary',
};

const LINE_MAP = {
  xlight: 0.5,
  light: 1,
  medium: 2,
  thick: 3,
};

export const mapRoleToTextColor = role =>
  colors[mapRoleToText[role] || 'primary'];

export const mapRoleToBackgroundColor = role =>
  colors[mapRoleToBackground[role] || 'transparent'];

export const mapRoleToBorderColor = role =>
  colors[mapRoleToBorder[role] || 'default'];

export const mapLineWidthToBorderWidth = lineWidth => LINE_MAP[lineWidth];

export const DEFAULT = {
  baseSpace: 5,
  colors,
};

export const ThemeContext = createContext(DEFAULT);
export const Theme = ({ children }) => {
  return (
    <ThemeContext.Provider value={DEFAULT}>{children}</ThemeContext.Provider>
  );
};
