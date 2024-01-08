// https://github.com/maurer2/run-types-run/blob/main/src/helpers/listformatter/listformatter.ts

const behaviourValues = ['and', 'or', 'delimiter'] as const satisfies string[];
const behaviourMap: Record<(typeof behaviourValues)[number], Intl.ListFormatType> = {
  and: 'conjunction',
  delimiter: 'unit',
  or: 'disjunction',
};

export function formatList<T extends string[]>(
  behaviour: keyof typeof behaviourMap = 'and',
  style: Intl.ListFormatStyle = 'long',
) {
  const type: Intl.ListFormatType = behaviourMap[behaviour];
  const formatter = new Intl.ListFormat('en-gb', { style, type });

  return (list: T): string => formatter.format(list);
}
