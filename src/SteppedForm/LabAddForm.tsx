import { FormControl, FormHelperText, TextField } from '@material-ui/core';
import * as React from 'react';
import { Field, FormErrors, InjectedFormProps, reduxForm, SubmissionError, WrappedFieldProps } from 'redux-form';

interface IFormParams {
  name: string;
  capacity: string;
}

interface IProps {
  labs: any[];
  addLab: (name: string, capacity: number) => void;
}

const renderInputField: React.FC<WrappedFieldProps & { type: string }> = props => (
  <FormControl error={Boolean(props.meta.error)} style={{ margin: '0 5px' }}>
    <TextField error={Boolean(props.meta.error)} type={props.type} {...props.input} />
    <FormHelperText>{props.meta.error}</FormHelperText>
  </FormControl>
);

const validate = (values: IFormParams, props: IProps): FormErrors<IFormParams> => {
  const errors: FormErrors<IFormParams> = {};
  if (!values.name) {
    errors.name = '必須項目です';
  } else if (props.labs && props.labs.find(lab => lab.name === values.name)) {
    errors.name = '既に存在します';
  }

  const numCapacity = parseInt(values.capacity, 10);
  if (!values.capacity) {
    errors.capacity = '必須項目です';
  } else if (isNaN(numCapacity)) {
    errors.capacity = '正しい人数を入力してください';
  }

  return errors;
};

const LabAddForm: React.FC<IProps & InjectedFormProps<IFormParams, IProps>> = props => {
  const addLab = (values: IFormParams) => {
    const errors = validate(values, props);
    if (Object.keys(errors).length > 0) {
      throw new SubmissionError(errors);
    }
    props.addLab(values.name, parseInt(values.capacity, 10));
    props.reset();
  };

  return (
    <form onSubmit={props.handleSubmit(addLab)}>
      <Field name="name" type="text" component={renderInputField} />
      <Field name="capacity" type="number" component={renderInputField} />
      <button type="submit">追加</button>
    </form>
  );
};

export default reduxForm<IFormParams, IProps>({
  form: 'labAddForm',
  initialValues: {
    name: '',
    capacity: '0',
  },
  validate,
})(LabAddForm);
