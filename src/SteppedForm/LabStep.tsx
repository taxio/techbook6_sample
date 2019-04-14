import * as React from 'react';
import { Field, FieldArray, GenericFieldArray, InjectedFormProps, reduxForm, WrappedFieldArrayProps } from 'redux-form';
import LabAddForm from './LabAddForm';

const FieldArrayCustom = FieldArray as new () => GenericFieldArray<Field, any>;

interface IProps {
  nextStep: () => void;
  prevStep: () => void;
}

interface ILab {
  name: string;
  capacity: number;
}

const renderLabsField: React.FC<WrappedFieldArrayProps<ILab>> = props => {
  const labs = props.fields.getAll() ? props.fields.getAll() : [];

  const addLab = (name: string, capacity: number) => {
    props.fields.push({ name, capacity });
  };

  return (
    <>
      <table style={{ border: 'none', margin: 'auto' }}>
        <thead>
          <tr>
            <th>研究室名</th>
            <th>配属可能人数</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {labs.map((lab, index) => (
            <tr key={index}>
              <td>{lab.name}</td>
              <td>{lab.capacity}</td>
              <td>
                <button type="button" onClick={() => props.fields.remove(index)}>
                  削除
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <LabAddForm labs={labs} addLab={addLab} />
    </>
  );
};

const LabStep: React.FC<IProps & InjectedFormProps<{}, IProps>> = props => {
  return (
    <div>
      <FieldArrayCustom name="labs" component={renderLabsField} />
      <div style={{ margin: 20 }}>
        <button type="button" onClick={props.prevStep} style={{ margin: 5 }}>
          基本情報入力へ戻る
        </button>
        <button type="button" onClick={props.nextStep} style={{ margin: 5 }}>
          確認画面へ進む
        </button>
      </div>
    </div>
  );
};

export default reduxForm<{}, IProps>({
  form: 'createForm',
  destroyOnUnmount: false,
})(LabStep);
