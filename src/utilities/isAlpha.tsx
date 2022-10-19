const isAlphaNumeric = (str: string) => {
  for (let i = 0; i < str.length; i++) {
    let code = str.charCodeAt(i);
    if (
      !(code > 64 && code < 91) && // upper alpha (A-Z)
      !(code > 96 && code < 123) // lower alpha (a-z)
    ) {
      return false;
    }
  }
  return true;
};

export default isAlphaNumeric;
