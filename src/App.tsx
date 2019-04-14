import * as React from 'react';
import './App.css';
// import NoUseForm from './SampleForm/NoUseForm';
// import UseForm from './SampleForm/UseForm';
import StepManager from './SteppedForm/StepManager';

class App extends React.Component {
  public render() {
    return (
      <div className="App">
        <StepManager />
        {/*<NoUseForm />*/}
        {/*<UseForm />*/}
      </div>
    );
  }
}

export default App;
