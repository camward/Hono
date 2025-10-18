import * as React from 'react';
import { Table, Button } from '@admiral-ds/react-ui';
import type { Column, TableRow } from '@admiral-ds/react-ui';
import type { User } from '../../../types/user';
import { useGetUsers, useUpdateUserStatus } from '../../../hooks/useUsers';

function UserList() {
  const { data: users, isLoading, isError } = useGetUsers();
  const { mutateAsync } = useUpdateUserStatus();

  type RowData = TableRow & User & { actions: React.ReactNode };

  const changeStatus = async (id: number, status: string) => {
    try {
      const newStatus = status === 'active' ? 'inactive' : 'active';
      await mutateAsync({ id, status: newStatus });
    } catch (err) {
      console.error('Ошибка обновления статуса:', err);
    }
  };

  const rowList: RowData[] = (users || [])?.map((user) => ({
    ...user,
    actions: (
      <Button
        appearance="ghost"
        dimension="s"
        onClick={() => changeStatus(user.id, user.status)}
      >
        Изменить статус
      </Button>
    ),
  }));

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
    <>
      {isLoading && <div>Загрузка...</div>}

      {isError && <div>Ошибка загрузки данных</div>}

      {!isError && !isLoading && (
        <Table
          rowList={rowList}
          columnList={cols}
          onColumnResize={handleResize}
        />
      )}
    </>
  );
}

export default UserList;
