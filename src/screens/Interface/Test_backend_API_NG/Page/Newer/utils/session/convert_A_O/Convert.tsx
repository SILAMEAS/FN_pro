export const ConvertArrayToObject = <T,>(
  body: T[],
  valueProp?: keyof T,
  textProp?: keyof T,
) => {
  const D = body
    ? body.map((a: any, index: number) => {
        return {
          text: textProp ? a[textProp] : a,
          value: valueProp ? a[valueProp] : a,
          isSelected: index === 0,
        };
      })
    : [];
  return D;
};
