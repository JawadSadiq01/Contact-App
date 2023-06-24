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
interface IAvatar {
  img: string,
  placeholder: string,
  width: number,
  height: number,
  roundedImage: boolean,
  roundedPlaceholder: boolean,
  removeButton: boolean
  onPress: () => void
}
interface IHorizontalListItem {
  item: IContacts,
  onPress: () => void,
}
interface IListitem {
  item: IContacts,
  onPress: () => void,
}
export { IContacts, IListitem, IAvatar, IHorizontalListItem }