import * as React from 'react';
import type { ChangeEvent } from 'react';
import { InputField, Button } from '@admiral-ds/react-ui';
import './style.css';

function UserActions() {
  const [localValue, setValue] = React.useState<string>('');

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const addUser = () => {
    if (localValue) {
      console.log('add', localValue);
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
        onClick={addUser}
        disabled={!localValue}
      >
        Добавить
      </Button>
    </div>
  );
}

export default UserActions;
