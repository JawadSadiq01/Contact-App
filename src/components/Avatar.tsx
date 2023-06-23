import React from 'react';
import { Image, View, Text, StyleSheet, Touchable, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import { Avatar, Button } from 'react-native-paper';
import Icon from 'react-native-paper/lib/typescript/src/components/Icon';
interface IAvatar {
  img: any,
  placeholder: string,
  width: number,
  height: number,
  roundedImage: boolean,
  roundedPlaceholder: boolean,
  removeButton: boolean
}

const MyAvatar = (props: IAvatar) => {
  const renderImage = () => {
    const { img, width, height, roundedImage } = props;
    const { imageContainer, image } = styles;
    return (
      <View style={styles.imageContainer}>
        <Avatar.Image size={width} source={img} />
      </View>
    );
  };

  const renderPlaceholder = () => {
    const { placeholder, width } = props;
    return (
      <View style={styles.placeholderContainer}>
        <View>
          <Avatar.Text size={width} label={placeholder} />
        </View>
      </View>
    );
  };

  const { img, width, height, removeButton } = props;
  const { container } = styles;
  return (
    <View style={[container, { width, height }]}>
      {img ? renderImage() : renderPlaceholder()}
      {removeButton &&
        <View style={styles.RemoveContainer}>
          <TouchableOpacity>
            <Text style={styles.RemoveText}>×</Text>
          </TouchableOpacity>
        </View>
      }
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
    borderRadius: 50
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
    // backgroundColor: '#dddddd',
    height: '100%',
    // borderRadius: Math.round(80) / 2
  },
  placeholderText: {
    fontWeight: '700',
    color: '#ffffff',
  },
  RemoveContainer: {
    backgroundColor: 'gray',
    position: 'absolute',
    borderRadius: 10,
    width: 15,
    height: 15,
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
    right: 0,
    top: 0,
  },
  RemoveText: {
    marginTop: -3,
    fontSize: 14,
    color: '#ffffff',
  },
});

MyAvatar.propTypes = {
  // img: Image.propTypes.source,
  placeholder: PropTypes.string,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  roundedImage: PropTypes.bool,
  roundedPlaceholder: PropTypes.bool,
};

MyAvatar.defaultProps = {
  roundedImage: true,
  roundedPlaceholder: true,
};

export default MyAvatar;
