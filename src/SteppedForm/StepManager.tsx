import { Paper, Step, StepLabel, Stepper } from '@material-ui/core';
import * as React from 'react';
import InformationStep from './InformationStep';
import LabStep from './LabStep';
import PreviewStep from './PreviewStep';

const StepManager: React.FC = props => {
  const [stepId, setStepId] = React.useState<number>(0);

  const nextStep = () => {
    setStepId(prevState => (prevState < 2 ? prevState + 1 : prevState));
  };

  const prevStep = () => {
    setStepId(prevState => (prevState > 0 ? prevState - 1 : prevState));
  };

  return (
    <Paper style={{ width: 600, margin: 'auto', marginTop: 20, padding: 10 }}>
      <Stepper activeStep={stepId}>
        <Step key={1}>
          <StepLabel>基本情報入力</StepLabel>
        </Step>
        <Step key={2}>
          <StepLabel>研究室入力</StepLabel>
        </Step>
        <Step key={3}>
          <StepLabel>入力情報確認</StepLabel>
        </Step>
      </Stepper>
      {stepId === 0 ? <InformationStep nextStep={nextStep} /> : null}
      {stepId === 1 ? <LabStep nextStep={nextStep} prevStep={prevStep} /> : null}
      {stepId === 2 ? <PreviewStep prevStep={prevStep} /> : null}
    </Paper>
  );
};

export default StepManager;
