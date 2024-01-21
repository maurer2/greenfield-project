import Background from '@/components/Background/Background';
// import { createColumnHelper } from '@tanstack/react-table';

import * as styles from './page.css';

// type FootballArena = {
//   city: string;
//   name: string;
//   size: [width: number, height: number];
// };

// type TableColumns = {
//   city: FootballArena['city'];
//   height: FootballArena['size'][1];
//   name: FootballArena['name'];
//   width: FootballArena['size'][0];
// };

// const columnHelper = createColumnHelper<TableColumns>();
// const defaultData: TableColumns[] = [
//   {
//     city: 'City 1',
//     height: 64,
//     name: 'Arena 1',
//     width: 110,
//   },
//   {
//     city: 'City 2',
//     height: 65,
//     name: 'Arena 2',
//     width: 111,
//   },
// ];

// const columns = [
//   columnHelper.accessor('name', {
//     cell: (value) => value.getValue(),
//     header: () => <span>Name</span>,
//     id: 'name',
//   }),
//   columnHelper.accessor('city', {
//     cell: (value) => value.getValue(),
//     header: () => <span>City</span>,
//     id: 'city',
//   }),
//   columnHelper.accessor('width', {
//     cell: (value) => value.getValue(),
//     header: () => <span>Width</span>,
//     id: 'width',
//   }),
//   columnHelper.accessor('height', {
//     cell: (value) => value.getValue(),
//     header: () => <span>Height</span>,
//     id: 'height',
//   }),
// ];

export default async function Results({ searchParams }: { searchParams: Record<string, string> }) {
  const params = searchParams;

  return (
    <main className={styles.page}>
      <Background />
      <div className={styles.content}>
        <h1>Results</h1>
        <code>{params?.value}</code>
      </div>
    </main>
  );
}
