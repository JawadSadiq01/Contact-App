import { StyleSheet, Dimensions, Platform } from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const primaryBg = '#242424';
const secondaryBg = '#494949';
const primaryText = '#FFFFFF';

const AvatarStyles = StyleSheet.create({
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
    height: '100%',
  },
  placeholderText: {
    fontWeight: '700',
    color: primaryText,
  },
  RemoveContainer: {
    backgroundColor: 'gray',
    position: 'absolute',
    borderRadius: 10,
    width: windowWidth * 0.04,
    height: windowHeight * 0.02,
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
    right: 0,
    top: 0,
  },
  RemoveText: {
    marginTop: -2.5,
    fontSize: 14,
    color: primaryText,
  },
});

const HorizontalContactsStyles = StyleSheet.create({
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

const VerticalContactsStyles = StyleSheet.create({
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
    borderColor: '#515151',
    color: 'white',
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

export { AvatarStyles, VerticalContactsStyles, HorizontalContactsStyles };