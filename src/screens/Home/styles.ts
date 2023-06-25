import { StyleSheet, Platform } from 'react-native';
const primaryBg = '#242424';
const secondaryBg = '#494949';
const primaryText = '#FFFFFF';

const styles = StyleSheet.create({
  container: {
    backgroundColor: primaryBg,
    height: '100%'
  },
  header: {
    backgroundColor: secondaryBg,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 20,
    alignItems: 'center'
  },
  headerMain: {
    color: primaryText,
  },
  headerSpan: {
    marginTop: 3,
    color: primaryText,
  },
  searchContainer: {
    flexDirection: 'row',
    display: 'flex',
    height: 40,
    marginBottom: 6
  },
  searchIcon: {
    position: 'absolute',
    zIndex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    left: 5,
    top: 0
  },
  searchBar: {
    backgroundColor: '#6D6D6D',
    paddingHorizontal: 30,
    borderColor: '#6D6D6D',
    marginTop: 5,
    borderWidth: 1,
    borderRadius: 10,
    color: primaryText,
    width: '100%',
    height: 40
  },
  noContactsMsg: {
    marginTop: 10,
    alignItems: 'center'
  },
  noContactsMsgText: {
    fontSize: 20,
    color: primaryText
  },
  horizontalListContainer: {
    marginTop: 8,
  }
});

export default styles;