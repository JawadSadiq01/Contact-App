import React, { memo } from 'react';
import { View, Text } from 'react-native';
import { RadioButton } from 'react-native-paper';
import PropTypes from 'prop-types';
import MyAvatar from './Avatar';
import { VerticalContactsStyles } from './styles';
import { IListitem } from '../Interfaces/interfaces';

const getAvatarInitials = (textString: string) => {
  if (!textString) return '';
  const text = textString.trim();
  const textSplit = text.split(' ');
  if (textSplit.length <= 1) return text.charAt(0);
  const initials =
    textSplit[0].charAt(0) + textSplit[textSplit.length - 1].charAt(0);
  return initials;
};

const VerticalListItem = (props: IListitem) => {
  const { item, onPress, selectedHashData } = props;
  return (
    <View>
      <View style={VerticalContactsStyles.itemContainer}>
        <View style={VerticalContactsStyles.leftElementContainer}>
          <MyAvatar
            img={item.hasThumbnail ? { uri: item.thumbnailPath } : undefined}
            placeholder={getAvatarInitials(
              `${item.givenName} ${item.familyName}`,
            )}
            width={40}
            height={40}
            removeButton={false}
          />
        </View>
        <View style={VerticalContactsStyles.rightSectionContainer}>
          <View style={VerticalContactsStyles.mainTitleContainer}>
            <Text
              style={
                VerticalContactsStyles.titleStyle
              }>{`${item.givenName} ${item.familyName}`}</Text>
          </View>
        </View>

        <View style={VerticalContactsStyles.actionSectionContainer}>
          <RadioButton
            color='gray'
            value="first"
            status={selectedHashData[item.recordID] ? 'checked' : 'unchecked'}
            onPress={() => onPress(item)}
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