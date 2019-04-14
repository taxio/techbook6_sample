import * as React from 'react';

interface IErrorMessages {
  username: string;
  password: string;
  _error: string;
}

const NoUseForm: React.FC = prop => {
  const [username, setUsername] = React.useState<string>('');
  const [password, setPassword] = React.useState<string>('');
  const [errMsgs, setErrMsgs] = React.useState<Partial<IErrorMessages>>({});

  const validate = (): Partial<IErrorMessages> => {
    const errors: Partial<IErrorMessages> = {};
    if (username !== 'aquatan') {
      errors.username = 'ダメー';
    }
    if (password !== 'studio') {
      errors.password = 'ダメー';
    }
    if (Object.keys(errors).length > 0) {
      errors._error = '入力内容に誤りがあります';
    }
    return errors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors: Partial<IErrorMessages> = validate();
    if (Object.keys(errors).length > 0) {
      setErrMsgs(errors);
      return;
    }
    alert(`login\nusername:${username}\npassword:${password}`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <p>Username</p>
        <input name="username" type="text" value={username} onChange={e => setUsername(e.target.value)} />
        <p style={{ color: 'red' }}>{errMsgs.username}</p>
      </div>
      <div>
        <p>Password</p>
        <input name="password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
        <p style={{ color: 'red' }}>{errMsgs.password}</p>
      </div>
      <div>
        <button type="submit">login</button>
        <p style={{ color: 'red' }}>{errMsgs._error}</p>
      </div>
    </form>
  );
};

export default NoUseForm;
