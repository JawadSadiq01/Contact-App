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

interface IContacts {
  recordID: string,
  givenName: string,
  familyName: string,
  isSelected: boolean,
  hasThumbnail: boolean,
  thumbnailPath: string,
  push: () => void,
  pop: () => void
}
interface IHorizontalListItem {
  item: IContacts,
  onPress: () => void,
}


const HorizontalListItem = (props: IHorizontalListItem) => {
  const { item, onPress } = props;

  const removeContact = () => {
    onPress(item);
  }
  return (
    <View>
      <View style={styles.itemContainer}>
        <View style={styles.leftElementContainer}>
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
          <View style={styles.mainTitleContainer}>
            <Text
              numberOfLines={1}
              ellipsizeMode="tail"
              style={
                styles.titleStyle
              }>{`${item.givenName} ${item.familyName}`}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    minHeight: 44,
    height: 80,
    alignItems: 'center',
    marginLeft: 16,
  },
  leftElementContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainTitleContainer: {
    width: 50,
    marginTop: 3
  },
  titleStyle: {
    fontSize: 12,
    color: 'white'
  },
});

HorizontalListItem.propTypes = {
  item: PropTypes.object,
  onPress: PropTypes.func,
};

export default memo(HorizontalListItem);


