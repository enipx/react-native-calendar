import { forwardRef } from 'react';
import {
  View as DefaultView,
  type ViewProps as DefaultViewProps,
  type TextProps as DefaultTextProps,
  type TextStyle,
  type ViewStyle,
  Text as DefaultText,
  TouchableOpacity,
  type TouchableOpacityProps,
  FlatList as DefaultFlatList,
  type FlatListProps as DefaultFlatListProps,
  ScrollView as DefaultScrollView,
  type ScrollViewProps as DefaultScrollViewProps,
} from 'react-native';

export interface ButtonProps extends TouchableOpacityProps {
  bg?: ViewStyle['backgroundColor'];
  size?: ViewStyle['width'];
  width?: ViewStyle['width'];
  height?: ViewStyle['height'];
  borderRadius?: ViewStyle['borderRadius'];
}

export interface ViewProps extends DefaultViewProps {
  flex?: number;
  size?: ViewStyle['width'];
  width?: ViewStyle['width'];
  height?: ViewStyle['height'];
  bg?: ViewStyle['backgroundColor'];
  center?: boolean;
  flexWrap?: ViewStyle['flexWrap'];
  direction?: ViewStyle['flexDirection'];
  p?: ViewStyle['padding'];
  px?: ViewStyle['paddingHorizontal'];
  py?: ViewStyle['paddingVertical'];
  m?: ViewStyle['margin'];
  mx?: ViewStyle['marginHorizontal'];
  my?: ViewStyle['marginVertical'];
  mb?: ViewStyle['marginBottom'];
  mt?: ViewStyle['marginTop'];
  pb?: ViewStyle['paddingBottom'];
  pt?: ViewStyle['paddingTop'];
  borderRadius?: ViewStyle['borderRadius'];
  opacity?: ViewStyle['opacity'];
  overflow?: ViewStyle['overflow'];
  position?: ViewStyle['position'];
}

export interface FlexProps extends ViewProps {
  centerY?: boolean;
  centerX?: boolean;
}

export type TextFontSizeType = 'sm' | 'md' | 'lg';

export interface TextProps extends DefaultTextProps {
  size?: TextFontSizeType;
  color?: string;
  opacity?: number;
  weight?: TextStyle['fontWeight'];
  font?: TextStyle['fontFamily'];
}

export const View = (props: ViewProps) => {
  const {
    direction,
    flexWrap,
    center,
    width,
    height,
    size,
    bg,
    style,
    flex,
    p,
    px,
    py,
    pt,
    pb,
    m,
    mx,
    my,
    mb,
    mt,
    borderRadius,
    opacity,
    overflow,
    position,
    ...rest
  } = props;

  return (
    <DefaultView
      style={[
        {
          backgroundColor: bg,
          width: size || width,
          height: size || height,
          flex,
          flexWrap,
          flexDirection: direction,
          padding: p,
          paddingHorizontal: px,
          paddingVertical: py,
          paddingTop: pt,
          paddingBottom: pb,
          margin: m,
          marginHorizontal: mx,
          marginVertical: my,
          marginBottom: mb,
          marginTop: mt,
          borderRadius,
          opacity,
          overflow,
          position,
        },
        // eslint-disable-next-line react-native/no-inline-styles
        center ? { justifyContent: 'center', alignItems: 'center' } : {},
        style,
      ]}
      {...rest}
    />
  );
};

export const Flex = (props: FlexProps) => {
  const { centerY, centerX, style, ...rest } = props;

  return (
    <View
      style={[
        { flexDirection: 'row' },
        centerY ? { alignItems: 'center' } : {},
        centerX ? { justifyContent: 'center' } : {},
        style,
      ]}
      {...rest}
    />
  );
};

const textFontSizes: Record<TextFontSizeType, number> = {
  sm: 14,
  md: 16,
  lg: 18,
};

export const Text = (props: TextProps) => {
  const {
    weight = 'normal',
    style,
    size = 'md',
    color = '#000000',
    opacity = 1,
    font,
    ...rest
  } = props;

  const fontSize = textFontSizes[size];

  const fontWeight = weight;

  return (
    <DefaultText
      style={[
        { fontFamily: font, fontWeight, fontSize, color, opacity },
        style,
      ]}
      {...rest}
    />
  );
};

export const Button = (props: ButtonProps) => {
  const { borderRadius, style, bg, size, width, height, ...rest } = props;

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={[
        {
          backgroundColor: bg,
          width: size || width,
          height: size || height,
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius,
        },
        style,
      ]}
      {...rest}
    />
  );
};

export interface FlatListProps<T> extends DefaultFlatListProps<T> {}

export const FlatList = <T extends any>(props: FlatListProps<T>) => {
  return (
    <DefaultFlatList
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      {...props}
    />
  );
};

export interface ScrollViewProps extends DefaultScrollViewProps {}

export const ScrollView = forwardRef((props: ScrollViewProps, ref) => {
  const { style, ...rest } = props;

  return (
    <DefaultScrollView
      ref={ref as any}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      style={[style]}
      {...rest}
    />
  );
});
