export const stringifyObject = <T extends Record<string, string | number | boolean | undefined>>(
  obj: T
): Record<string, string> => {
  return Object.fromEntries(
    Object.entries(obj)
      .filter(([_, value]) => value !== undefined)
      .map(([key, value]) => [key, value!.toString()]) // мы убрали undefined значения, поэтому можно !
  );
};
