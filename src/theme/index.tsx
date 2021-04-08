import React from 'react';
import { ThemeProvider, createGlobalStyle } from 'styled-components/native';
export * from './typography';
export const GlobalThemeStyle = createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        line-height: 1.2;
    }
    a {
      text-decoration: none;
    }
    .ais-SearchBox { margin: 1em 0; }
`;
export const colors = {
  lead: '#7c4dff',
  carbon: '#ffffff',
  primary: '#383f8c',
  default: '#383874',
  tertiary: '#DBDFF1',
  secondary: '#5668C6',
  black: '#000000',
  red: '#f4495d',
  green: '#06b66c',
  gray: '#9EA7BC',
  purple: '#EBE9FF',
  purple2: '#9A45D7',
  purple3: 'rgba(186, 177, 255, 0.2)',
  purple4: 'rgb(90, 72, 231, 0.25)',
  purple5: '#BAB1FF',
  transparent: 'transparent',
  orange: '#FFBA69',
  blue: '#2F80ED',
  background: '#534999',
};
const mapRoleToBorder = {
  success: 'green',
  primary: 'purple',
  info: 'tertiary',
  error: 'red',
  secondary: 'gray',
  background: 'background',
};
const mapRoleToText = {
  success: 'green',
  light: 'carbon',
  primary: 'purple',
  info: 'default',
  error: 'red',
  secondary: 'secondary',
  tertiary: 'gray',
  highlight: 'blue',
};

const mapRoleToBackground = {
  success: 'green',
  primary: 'purple',
  primary2: 'purple2',
  tertiary: 'purple3',
  tertiary2: 'purple5',
  info: 'tertiary',
  error: 'red',
  light: 'carbon',
  transparent: 'transparent',
  secondary: 'secondary',
  lightSecondary: 'purple4',
  alert: 'orange',
  highlight: 'blue',
  black: 'black',
};

export const mapRoleToBorderColor = type =>
  colors[mapRoleToBorder[type]] || 'white';

export const mapRoleToTextColor = type =>
  colors[mapRoleToText[type] || 'black'];

export const mapRoleToBackgroundColor = type =>
  colors[mapRoleToBackground[type] || 'transparent'];

export const DEFAULT = {
  baseSpace: 4,
  desktop: 1440,
  colors,
};
export const Theme = ({ children }) => {
  return <ThemeProvider theme={DEFAULT}>{children}</ThemeProvider>;
};
