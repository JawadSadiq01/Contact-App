import React, { memo } from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';
import MyAvatar from './Avatar';
import { HorizontalContactsStyles } from './styles';
import { IHorizontalListItem } from '../Interfaces/interfaces';
import { getAvatarInitials } from '../helpers/Contacts';

const HorizontalListItem = (props: IHorizontalListItem) => {
  const { item, onPress, index } = props;

  const removeContact = () => {
    onPress(item, index);
  }

  return (
    <View>
      <View style={HorizontalContactsStyles.itemContainer}>
        <View style={HorizontalContactsStyles.leftElementContainer}>
          <MyAvatar
            img={item.hasThumbnail ? { uri: item.thumbnailPath } : undefined}
            placeholder={getAvatarInitials(`${item.givenName} ${item.familyName}`)}
            width={50}
            height={50}
            removeButton={true}
            onPress={removeContact}
          />
          <View style={HorizontalContactsStyles.mainTitleContainer}>
            <Text
              numberOfLines={1}
              ellipsizeMode="tail"
              style={HorizontalContactsStyles.titleStyle}>{`${item.givenName} ${item.familyName}`}</Text>
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


