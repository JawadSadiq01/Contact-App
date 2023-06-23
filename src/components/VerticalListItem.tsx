import React, { memo } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Button } from 'react-native';
import { RadioButton } from 'react-native-paper';

import PropTypes from 'prop-types';
import MyAvatar from './Avatar';

const getAvatarInitials = (textString: string) => {
  if (!textString) return '';
  const text = textString.trim();
  const textSplit = text.split(' ');
  if (textSplit.length <= 1) return text.charAt(0);
  const initials =
    textSplit[0].charAt(0) + textSplit[textSplit.length - 1].charAt(0);
  return initials;
};

interface IListitem {
  item: any,
  onPress: any
}

const VerticalListItem = (props: IListitem) => {
  const shouldComponentUpdate = () => {
    return false;
  };
  const { item, onPress } = props;

  return (
    <View>
      <View style={styles.itemContainer}>
        <View style={styles.leftElementContainer}>
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
        <View style={styles.rightSectionContainer}>
          <View style={styles.mainTitleContainer}>
            <Text
              style={
                styles.titleStyle
              }>{`${item.givenName} ${item.familyName}`}</Text>
          </View>
        </View>

        <View style={styles.actionSectionContainer}>
          <RadioButton
            color='gray'
            value="first"
            status={item.isSelected == true ? 'checked' : 'unchecked'}
            onPress={() => onPress(item)}
          />
        </View>

      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    minHeight: 44,
    height: 63,
    alignItems: 'center',
    marginLeft: 22,
    marginRight: 15,
  },
  leftElementContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 2,
  },
  rightSectionContainer: {
    marginLeft: 18,
    flexDirection: 'row',
    flex: 20,
    // borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: '#515151',
    color: 'white',
  },
  actionSectionContainer: {

  },
  mainTitleContainer: {
    justifyContent: 'center',
    flexDirection: 'column',
    flex: 1,
  },
  titleStyle: {
    fontSize: 16,
    color: 'white'
  },
});

export default memo(VerticalListItem);

VerticalListItem.propTypes = {
  item: PropTypes.object,
  onPress: PropTypes.func,
};
