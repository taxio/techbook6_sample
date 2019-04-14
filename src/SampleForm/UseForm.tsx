import * as React from 'react';
import { Field, FormErrors, InjectedFormProps, reduxForm, SubmissionError, WrappedFieldProps } from 'redux-form';

interface IFormParams {
  username: string;
  password: string;
}

const renderInputField: React.FC<WrappedFieldProps & { label: string; type: string }> = props => (
  <div>
    <p>{props.label}</p>
    <input type={props.type} {...props.input} />
    <p style={{ color: 'red' }}>{props.meta.error}</p>
  </div>
);

const validate = (values: IFormParams): FormErrors<IFormParams> => {
  const errors: FormErrors<IFormParams> = {};
  if (values.username !== 'aquatan') {
    errors.username = 'ダメー';
  }
  if (values.password !== 'studio') {
    errors.password = 'ダメー';
  }
  if (Object.keys(errors).length > 0) {
    errors._error = '入力内容に誤りがあります';
  }
  return errors;
};

const handleSubmit = (values: IFormParams) => {
  const errors: FormErrors<IFormParams> = validate(values);
  if (Object.keys(errors).length > 0) {
    throw new SubmissionError(errors);
  }
  alert(`login\nusername:${values.username}\npassword:${values.password}`);
};

const UseForm: React.FC<{} & InjectedFormProps<IFormParams, {}>> = props => {
  return (
    <form onSubmit={props.handleSubmit(handleSubmit)}>
      <Field name="username" label="Username" type="text" component={renderInputField} />
      <Field name="password" label="Password" type="password" component={renderInputField} />
      <div>
        <button type="submit">login</button>
        <p style={{ color: 'red' }}>{props.error}</p>
      </div>
    </form>
  );
};

export default reduxForm<IFormParams, {}>({
  form: 'useForm',
})(UseForm);
