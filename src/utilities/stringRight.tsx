function stringRight(stringVal: any, numberCharacters: number): string {
  return stringVal.substring(
    stringVal.length - numberCharacters,
    stringVal.length
  );
}

export default stringRight;
