"use server";

import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import Background from "@/components/Background/Background";
import * as styles from "./page.css";

type FootballArena = {
  name: string;
  city: string;
  size: [width: number, height: number];
};

type TableColumns = {
  name: FootballArena["name"];
  city: FootballArena["city"];
  width: FootballArena["size"][0];
  height: FootballArena["size"][1];
};

const columnHelper = createColumnHelper<TableColumns>();
const defaultData: TableColumns[] = [
  {
    name: "Arena 1",
    city: "City 1",
    width: 110,
    height: 64,
  },
  {
    name: "Arena 2",
    city: "City 2",
    width: 111,
    height: 65,
  },
];

const columns = [
  columnHelper.accessor("name", {
    id: "name",
    header: () => <span>Name</span>,
    cell: (value) => value.getValue(),
  }),
  columnHelper.accessor("city", {
    id: "city",
    header: () => <span>City</span>,
    cell: (value) => value.getValue(),
  }),
  columnHelper.accessor("width", {
    id: "width",
    header: () => <span>Width</span>,
    cell: (value) => value.getValue(),
  }),
  columnHelper.accessor("height", {
    id: "height",
    header: () => <span>Height</span>,
    cell: (value) => value.getValue(),
  }),
];

export default async function Results({
  searchParams,
}: {
  searchParams: Record<string, string>;
}) {
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
