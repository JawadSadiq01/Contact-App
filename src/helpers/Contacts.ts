
const getSelectedLength = async (contacts: any) => {

  var selectedCount: number = 0;
  contacts?.map((c: any) => {
    console.log(c);
    if (c.isSelected == true) selectedCount++;
  })

  return selectedCount;
};

export { getSelectedLength };