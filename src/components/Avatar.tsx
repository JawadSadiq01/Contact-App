import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import { AvatarStyles } from './styles';
import { Avatar } from 'react-native-paper';
import { IAvatar } from '../Interfaces/interfaces';

const MyAvatar = (props: IAvatar) => {
  const { img, width, height, removeButton, onPress } = props;
  const { container } = AvatarStyles;

  const renderImage = () => {
    const { img, width } = props;
    return (
      <View style={AvatarStyles.imageContainer}>
        <Avatar.Image size={width} source={img} />
      </View>
    );
  };

  const renderPlaceholder = () => {
    const { placeholder, width } = props;
    return (
      <View style={AvatarStyles.placeholderContainer}>
        <View>
          <Avatar.Text size={width} label={placeholder} />
        </View>
      </View>
    );
  };

  return (
    <View style={[container, { width, height }]}>
      {img ? renderImage() : renderPlaceholder()}
      {removeButton &&
        <View style={AvatarStyles.RemoveContainer}>
          <TouchableOpacity onPress={onPress}>
            <Text style={AvatarStyles.RemoveText}>×</Text>
          </TouchableOpacity>
        </View>
      }
    </View>
  );
};

MyAvatar.propTypes = {
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
