import React, { memo } from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';
import MyAvatar from './Avatar';
import { HorizontalContactsStyles } from './styles';
import { IHorizontalListItem } from '../Interfaces/interfaces';

const getAvatarInitials = (textString: string) => {
  if (!textString) return '';
  const text = textString.trim();
  const textSplit = text.split(' ');
  if (textSplit.length <= 1) return text.charAt(0);
  const initials =
    textSplit[0].charAt(0) + textSplit[textSplit.length - 1].charAt(0);
  return initials;
};

const HorizontalListItem = (props: IHorizontalListItem) => {
  const { item, onPress } = props;

  const removeContact = () => {
    onPress(item);
  }
  return (
    <View>
      <View style={HorizontalContactsStyles.itemContainer}>
        <View style={HorizontalContactsStyles.leftElementContainer}>
          <MyAvatar
            img={item.hasThumbnail ? { uri: item.thumbnailPath } : undefined}
            placeholder={getAvatarInitials(
              `${item.givenName} ${item.familyName}`,
            )}
            width={50}
            height={50}
            removeButton={true}
            onPress={removeContact}
          />
          <View style={HorizontalContactsStyles.mainTitleContainer}>
            <Text
              numberOfLines={1}
              ellipsizeMode="tail"
              style={
                HorizontalContactsStyles.titleStyle
              }>{`${item.givenName} ${item.familyName}`}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

HorizontalListItem.propTypes = {
  item: PropTypes.object,
  onPress: PropTypes.func,
};

export default memo(HorizontalListItem);


