export const checkIfNotEmpty = (input: string) => {
  return input.trim().length > 0;
};

export const checkIfIsEmail = (input: string): boolean => {
  const result = input.match(
    //eslint-disable-next-line
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );

  return result ? true : false;
};
