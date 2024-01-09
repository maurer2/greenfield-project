// https://github.com/maurer2/run-types-run/blob/main/src/helpers/listformatter/listformatter.ts

const behaviourValues = ['and', 'or', 'delimiter'] as const satisfies readonly string[];
const behaviourMap: Record<(typeof behaviourValues)[number], Intl.ListFormatType> = {
  and: 'conjunction',
  delimiter: 'unit',
  or: 'disjunction',
};

export function formatList(
  behaviour: keyof typeof behaviourMap = 'and',
  style: Intl.ListFormatStyle = 'long',
) {
  const type: Intl.ListFormatType = behaviourMap[behaviour];
  const formatter = new Intl.ListFormat('en-gb', { style, type });

  return <T extends readonly string[]>(list: T): string => formatter.format(list);
}
