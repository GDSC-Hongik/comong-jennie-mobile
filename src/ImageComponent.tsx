import React from 'react';
import { Image, ImageStyle, StyleProp, ViewStyle } from 'react-native';

type ImageComponentProps = {
  style: StyleProp<ImageStyle>; // Use ImageStyle instead of ViewStyle
  src: string;
};

export default function ImageComponent({ src, style }: ImageComponentProps) {
  return <Image source={require(src)} style={style} />;
}