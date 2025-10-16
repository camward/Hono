import * as React from 'react';
import { Table, Button } from '@admiral-ds/react-ui';
import type { Column, TableRow } from '@admiral-ds/react-ui';

function UserList() {
  type RowData = TableRow & {
    fio: string;
    date: string;
    status: string;
    actions: React.ReactNode;
  };

  const changeStatus = (data: number) => {
    console.log(data);
  };

  const rowList: RowData[] = [
    {
      id: '0001',
      fio: 'МНО',
      date: new Date('2020-08-06').toLocaleDateString(),
      status: '1',
      actions: (
        <Button
          appearance="ghost"
          dimension="s"
          onClick={() => changeStatus(1)}
        >
          Изменить статус
        </Button>
      ),
    },
    {
      id: '0002',
      fio: 'МНО',
      date: new Date('2020-08-06').toLocaleDateString(),
      status: '2',
      actions: (
        <Button
          appearance="ghost"
          dimension="s"
          onClick={() => changeStatus(2)}
        >
          Изменить статус
        </Button>
      ),
    },
  ];

  const columnList: Column[] = [
    {
      name: 'id',
      title: '№',
    },
    {
      name: 'fio',
      title: 'ФИО',
      width: 300,
    },
    {
      name: 'date',
      title: 'Дата создания',
      width: 150,
    },
    {
      name: 'status',
      title: 'Статус',
      width: 100,
    },
    {
      name: 'actions',
      title: '',
      width: 200,
    },
  ];

  const [cols, setCols] = React.useState(columnList);

  const handleResize = ({ name, width }: { name: string; width: string }) => {
    const newCols = cols.map((col) =>
      col.name === name ? { ...col, width } : col,
    );
    setCols(newCols);
  };

  return (
    <Table rowList={rowList} columnList={cols} onColumnResize={handleResize} />
  );
}

export default UserList;
