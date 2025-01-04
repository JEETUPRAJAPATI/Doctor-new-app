import React from 'react';
import { Image as RNImage, ImageProps, StyleSheet } from 'react-native';
import { DEFAULT_IMAGES } from '@/utils/constants/images';

interface ThemedImageProps extends Omit<ImageProps, 'source'> {
  type?: keyof typeof DEFAULT_IMAGES;
  source?: ImageProps['source'];
}

export function Image({ type, source, style, ...props }: ThemedImageProps) {
  const imageSource = source || { uri: type ? DEFAULT_IMAGES[type] : DEFAULT_IMAGES.APP_ICON };

  return (
    <RNImage
      source={imageSource}
      style={[styles.image, style]}
      {...props}
    />
  );
}

const styles = StyleSheet.create({
  image: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
});