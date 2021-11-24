import React from 'react';
import './App.css';

import {Background} from './components/Background';
import {InputField} from './components/InputField';
import {FormWrapper} from './components/FormWrapper';

function App() {
  return (
    <div className="App">
      {/* <Background /> */}

      <InputField />

      <FormWrapper />
    </div>
  );
}

export default App;
