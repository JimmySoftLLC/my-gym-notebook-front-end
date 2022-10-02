const changeToMultiline = (items: string[]) => {
  const dataJSONString = items
    .map(function (item: string) {
      return item;
    })
    .join('\n');
  return dataJSONString;
};

export default changeToMultiline;
