type BackgroundRoleType =
  | 'success'
  | 'light'
  | 'primary'
  | 'info'
  | 'error'
  | 'secondary'
  | 'tertiary'
  | 'transparent'
  | 'overlay'
  | 'accent'
  | 'lightGreen'
  | 'yellow'
  | 'lightGreen2'
  | 'lightCyan'
  | 'lightYellow';

type LineWidthType = 'none' | 'xlight' | 'light' | 'medium' | 'thick';

type TextRoleType =
  | 'success'
  | 'light'
  | 'primary'
  | 'info'
  | 'error'
  | 'secondary'
  | 'tertiary';

type BorderRoleType =
  | 'success'
  | 'light'
  | 'primary'
  | 'info'
  | 'error'
  | 'none'
  | 'secondary';
type BorderRadius = 'small' | 'medium' | 'xmedium' | 'large' | 'xlarge';
type BorderType = {
  children?: any;
  role?: 'success' | 'light' | 'primary' | 'info' | 'error' | 'secondary';
  backgroundRole?: BackgroundRoleType;
  lineWidth?: 'xlight' | 'light' | 'medium' | 'thick';
  radius?: BorderRadius;
  topWidth?: 'xlight' | 'light' | 'medium' | 'thick';
  bottomWidth?: 'xlight' | 'light' | 'medium' | 'thick';
  leftWidth?: 'xlight' | 'light' | 'medium' | 'thick';
  rightWidth?: 'xlight' | 'light' | 'medium' | 'thick';
  opacity?: number;
  grow?: number;
};

type MarginType = {
  top?: number;
  bottom?: number;
  left?: number;
  right?: number;
  children?: any;
  size?: Array<number>;
  role?: BackgroundRoleType;
  grow?: number;
};

type PaddingType = {
  top?: number;
  bottom?: number;
  left?: number;
  right?: number;
  size?: Array<number>;
  children?: any;
  role?: BackgroundRoleType;
};

type QueueType = {
  size?: number;
  role?: BackgroundRoleType;
  children: any;
  justifyContent?:
    | 'flex-start'
    | 'space-between'
    | 'flex-end'
    | 'center'
    | 'space-around'
    | 'space-evenly';
  alignItems?: 'flex-start' | 'flex-end' | 'center' | 'stretch' | 'baseline';
  height?: number | string;
  width?: number | string;
};

type StackType = {
  size?: number;
  children: any;
  role?: BackgroundRoleType;
  height?: number | string;
  width?: number | string;
  maxWidth?: number | string;
  zIndex?: number;
};
type TextAlign = 'center' | 'left' | 'right';
type TextType = {
  type?:
    | 'title'
    | 'price'
    | 'headline1'
    | 'headline2'
    | 'headline3'
    | 'primaryBody1'
    | 'primaryBody2'
    | 'secondaryBody1'
    | 'secondaryBody2'
    | 'tertiaryBody1'
    | 'tertiaryBody2'
    | 'paragraph';
  role?:
    | 'success'
    | 'light'
    | 'primary'
    | 'info'
    | 'error'
    | 'secondary'
    | 'tertiary';
  numberOfLines?: number;
  textAlign?: TextAlign;
  width?: string | number;
  children?: JSX.Element | JSX.Element[] | string;
  heigth?: string | number;
  heigthSize?: string | number;
};

type RemoteImageType = {
  source?: object;
  url?: string;
  aspectRatio?: number;
  resizeMode?: 'cover' | 'contain';
  width?: string | number;
};
