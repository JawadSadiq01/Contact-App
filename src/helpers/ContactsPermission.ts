import { PermissionsAndroid, Platform } from 'react-native';

const requestContactsPermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
      {
        title: 'Contacts Permission',
        message: 'This app needs access to your contacts.',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      }
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      // Permission granted, you can access contacts here
      console.log('Contacts permission Granted');
      return true;
    } else {
      // Permission denied
      console.log('Contacts permission denied');
      return false;
    }
  } catch (error) {
    console.log('Error requesting contacts permission:', error);
  }
};

const checkPermission = async () => {
  if (Platform.OS === 'android') {
    try {
      const granted = await PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.READ_CONTACTS
      );
      if (granted) {
        // console.log('READ_CONTACTS permission is granted');
        return true;
      } else {
        // console.log('READ_CONTACTS permission is not granted');
        return false;
      }
    } catch (error) {
      // console.log('Error checking permission:', error);
      return false;
    }
  } else {
    console.log('Checking permission is only supported on Android');
    return false;
  }
};

export { checkPermission, requestContactsPermission };
