import * as React from 'react';
import { connect } from 'react-redux';
import { formValueSelector, InjectedFormProps, reduxForm } from 'redux-form';

const selector = formValueSelector('createForm');

interface IFormParams {
  facultyName: string;
  year: number;
  password: string;
  labs: any[];
}

interface IProps extends Partial<IFormParams> {
  prevStep: () => void;
}

const create = (values: IFormParams) => {
  return new Promise(resolve => {
    setTimeout(() => {
      alert(`created!!\n\n${JSON.stringify(values)}`);
      resolve();
    }, 1000);
  });
};

const PreviewStep: React.FC<IProps & InjectedFormProps<IFormParams, IProps>> = props => (
  <form onSubmit={props.handleSubmit(create)}>
    <ul style={{ listStyleType: 'none' }}>
      <li>学部名 : {props.facultyName}</li>
      <li>年度 : {props.year}</li>
      <li>パスワード : {'*'.repeat(props.password ? props.password.length : 0)}</li>
    </ul>
    <div style={{ marginBottom: 20 }}>
      <p style={{ marginBottom: 5 }}>研究室一覧</p>
      {props.lab
        ? props.labs.map((lab, index) => (
            <div key={index}>
              {lab.name} {lab.capacity}
            </div>
          ))
        : null}
    </div>
    <button type="button" disabled={props.submitting} onClick={props.prevStep} style={{ margin: 5 }}>
      研究室入力に戻る
    </button>
    <button type="submit" disabled={props.submitting} style={{ margin: 5 }}>
      作成
    </button>
    <div>{props.error}</div>
  </form>
);

export default reduxForm<IFormParams, IProps>({
  form: 'createForm',
})(
  connect<IFormParams>(state => ({
    facultyName: selector(state, 'courseName'),
    year: selector(state, 'year'),
    password: selector(state, 'password'),
    labs: selector(state, 'labs'),
  }))(PreviewStep)
);
