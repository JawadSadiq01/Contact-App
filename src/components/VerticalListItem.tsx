import React, { memo } from 'react';
import { View, Text } from 'react-native';
import { RadioButton } from 'react-native-paper';
import PropTypes from 'prop-types';
import MyAvatar from './Avatar';
import { VerticalContactsStyles } from './styles';
import { IListitem } from '../Interfaces/interfaces';
import { getAvatarInitials } from '../helpers/Contacts';

const VerticalListItem = (props: IListitem) => {
  const { item, onPress, index } = props;
  return (
    <View>
      <View style={VerticalContactsStyles.itemContainer}>
        <View style={VerticalContactsStyles.leftElementContainer}>
          <MyAvatar
            img={item.hasThumbnail ? { uri: item.thumbnailPath } : undefined}
            placeholder={getAvatarInitials(`${item.givenName} ${item.familyName}`)}
            width={40}
            height={40}
            removeButton={false}
          />
        </View>
        <View style={VerticalContactsStyles.rightSectionContainer}>
          <View style={VerticalContactsStyles.mainTitleContainer}>
            <Text style={VerticalContactsStyles.titleStyle}>{`${item.givenName} ${item.familyName}`}</Text>
          </View>
        </View>

        <View style={VerticalContactsStyles.actionSectionContainer}>
          <RadioButton
            color='gray'
            value="first"
            status={item.isSelected == true ? 'checked' : 'unchecked'}
            onPress={() => onPress(item, index)}
          />
        </View>

      </View>
    </View>
  );
};

VerticalListItem.propTypes = {
  item: PropTypes.object,
  onPress: PropTypes.func,
};

export default memo(VerticalListItem);