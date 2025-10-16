import * as React from 'react';
import type { ChangeEvent } from 'react';
import { InputField, Button } from '@admiral-ds/react-ui';
import { useAddUser } from '../../../hooks/useUsers';
import './style.css';

function UserActions() {
  const { mutate, isPending, isError } = useAddUser();

  const [localValue, setValue] = React.useState<string>('');

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const addUserHandler = () => {
    if (localValue) {
      mutate({ fio: localValue });
      setValue('');
    }
  };

  return (
    <div className="form">
      <InputField
        value={localValue}
        onChange={handleChange}
        label="ФИО"
        required
      />
      <Button
        appearance="primary"
        dimension="m"
        onClick={addUserHandler}
        disabled={!localValue}
        loading={isPending}
      >
        Добавить
      </Button>
      {isError && <div>Ошибка добавления пользователя</div>}
    </div>
  );
}

export default UserActions;
