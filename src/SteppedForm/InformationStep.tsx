import {
  Button,
  FormControl,
  FormHelperText,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
} from '@material-ui/core';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

import * as React from 'react';
import { Field, FormErrors, InjectedFormProps, reduxForm, SubmissionError, WrappedFieldProps } from 'redux-form';

interface IFormParams {
  courseName: string;
  year: number;
  password: string;
}

interface IProps {
  nextStep: () => void;
}

const renderFacultyNameField: React.FC<WrappedFieldProps> = props => (
  <FormControl error={Boolean(props.meta.error)} style={{ padding: '10px 0px' }}>
    <InputLabel htmlFor="courseName">課程名</InputLabel>
    <Input type="text" {...props.input} />
    {props.meta.error ? <FormHelperText>{props.meta.error}</FormHelperText> : null}
  </FormControl>
);

const renderYearSelectField = (props: WrappedFieldProps & { label: string }) => (
  <FormControl style={{ padding: '10px 0px', width: '80px' }} error={Boolean(props.meta.error)}>
    <InputLabel htmlFor="year">年度</InputLabel>
    <Select {...props.input}>
      <MenuItem />
      <MenuItem value={2018}>
        <em>2018</em>
      </MenuItem>
      <MenuItem value={2019}>
        <em>2019</em>
      </MenuItem>
      <MenuItem value={2020}>
        <em>2020</em>
      </MenuItem>
    </Select>
    {props.meta.error ? <FormHelperText>{props.meta.error}</FormHelperText> : null}
  </FormControl>
);

const renderPasswordField: React.FC<WrappedFieldProps> = props => {
  const [showPassword, setShowPassword] = React.useState<boolean>(false);

  return (
    <FormControl error={Boolean(props.meta.error)}>
      <InputLabel htmlFor="password">パスワード</InputLabel>
      <Input
        type={showPassword ? 'text' : 'password'}
        {...props.input}
        endAdornment={
          <InputAdornment position="end">
            <IconButton aria-label="toggleVisibility" onClick={() => setShowPassword(prevState => !prevState)}>
              {showPassword ? <Visibility /> : <VisibilityOff />}
            </IconButton>
          </InputAdornment>
        }
      />
      {props.meta.error ? <FormHelperText>{props.meta.error}</FormHelperText> : null}
    </FormControl>
  );
};

const validate = (values: IFormParams): FormErrors<IFormParams> => {
  const errors: FormErrors<IFormParams> = {};
  if (!values.courseName) {
    errors.courseName = '必須項目です';
  }
  if (!values.year) {
    errors.year = '必須項目です';
  }
  if (!values.password) {
    errors.password = '必須項目です';
  }
  if (Object.keys(errors).length > 0) {
    errors._error = '入力内容に誤りがあります';
  }
  return errors;
};

const InformationStep: React.FC<IProps & InjectedFormProps<{}, IProps>> = props => {
  const handleSubmit = (values: IFormParams) => {
    const errors = validate(values);
    if (Object.keys(errors).length > 0) {
      throw new SubmissionError(errors);
    }
    props.nextStep();
  };

  return (
    <form onSubmit={props.handleSubmit(handleSubmit)}>
      <div>
        <Field name="courseName" component={renderFacultyNameField} />
      </div>
      <div>
        <Field name="year" component={renderYearSelectField} />
      </div>
      <div>
        <Field name="password" component={renderPasswordField} />
      </div>
      <div style={{ margin: 20 }}>
        <Button type="submit" variant="contained">
          研究室入力へ進む
        </Button>
      </div>
    </form>
  );
};

export default reduxForm<{}, IProps>({
  form: 'createForm',
  destroyOnUnmount: false,
})(InformationStep);
