import React from 'react';
import { Image, View, Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

interface IAvatar {
  img: any,
  placeholder: string,
  width: number,
  height: number,
  roundedImage: boolean,
  roundedPlaceholder: boolean
}

const Avatar = (props: IAvatar) => {
  const renderImage = () => {
    const { img, width, height, roundedImage } = props;
    const { imageContainer, image } = styles;
    return (
      <View style={styles.imageContainer}>
        <Image style={image} source={img} />
      </View>
    );
  };

  const renderPlaceholder = () => {
    const { placeholder, width, height, roundedPlaceholder } = props;
    const { placeholderContainer, placeholderText } = styles;

    const viewStyle = [placeholderContainer];

    return (
      <View style={styles.placeholderContainer}>
        <View style={styles.placeholderContainer}>
          <Text
            adjustsFontSizeToFit
            numberOfLines={1}
            minimumFontScale={0.01}
            style={[{ fontSize: Math.round(width) / 2 }, placeholderText]}>
            {placeholder}
          </Text>
        </View>
      </View>
    );
  };

  const { img, width, height } = props;
  const { container } = styles;
  return (
    <View style={[container, { width, height }]}>
      {img ? renderImage() : renderPlaceholder()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  imageContainer: {
    overflow: 'hidden',
    justifyContent: 'center',
    height: '100%',
    borderRadius: Math.round(80) / 2
  },
  image: {
    flex: 1,
    alignSelf: 'stretch',
    width: undefined,
    height: undefined,
  },
  placeholderContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#dddddd',
    height: '100%',
    borderRadius: Math.round(80) / 2
  },
  placeholderText: {
    fontWeight: '700',
    color: '#ffffff',
  },
});

Avatar.propTypes = {
  // img: Image.propTypes.source,
  placeholder: PropTypes.string,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  roundedImage: PropTypes.bool,
  roundedPlaceholder: PropTypes.bool,
};

Avatar.defaultProps = {
  roundedImage: true,
  roundedPlaceholder: true,
};

export default Avatar;
