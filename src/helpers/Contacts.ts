import { useState } from 'react';
import Contacts from 'react-native-contacts';
import { IContacts } from '../Interfaces/interfaces';

const getSelectedLength = async (contacts: any) => {
  var selectedCount: number = 0;
  contacts?.map((c: any) => {
    if (c.isSelected == true) selectedCount++;
  })
  return selectedCount;
};

const loadContacts = async () => {
  const myContacts: IContacts[] = [];
  var data = {};

  await Contacts.getAll().then(contacts => {
    contacts?.map((c) => {
      const singleContact: IContacts = {
        recordID: c.recordID,
        givenName: c.givenName,
        familyName: c.familyName,
        isSelected: false,
        hasThumbnail: c.hasThumbnail,
        thumbnailPath: c.thumbnailPath
      };
      myContacts.push(singleContact);

      const key = c.recordID;
      const value = {
        recordID: c.recordID,
        givenName: c.givenName,
        familyName: c.familyName,
        isSelected: false,
        hasThumbnail: c.hasThumbnail,
        thumbnailPath: c.thumbnailPath
      };
      data = ({ ...data, [key]: value });
    });

    myContacts.sort((a, b) => {
      const nameA = a.givenName.toLowerCase();
      const nameB = b.familyName.toLowerCase();

      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
      return 0;
    });
    return data;
  }).catch(e => {
    console.warn('Permission to access contacts was denied');
  });
  return data;

};
const getAvatarInitials = (textString: string) => {
  if (!textString) return '';
  const text = textString.trim();
  const textSplit = text.split(' ');
  if (textSplit.length <= 1) return text.charAt(0);
  const initials =
    textSplit[0].charAt(0) + textSplit[textSplit.length - 1].charAt(0);
  return initials;
};

export { getSelectedLength, loadContacts, getAvatarInitials };
