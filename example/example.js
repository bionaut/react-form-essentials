import React from 'react';
import {render} from 'react-dom';

import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import RaisedButton from 'material-ui/RaisedButton';

import {init, ValidForm, Field, Toggle, Dropdown} from '../dist/index';

init();

const dummyHandler = function (payload) {
  console.log(payload);
};

const dummyErrors = {
  ultimateValidation: 'Hey error here!'
};

const dummyError = 'Critical error!! Invalid';

const demoOptions = [
  {value: '1', label: 'One'},
  {value: '2', label: 'Two'},
  {value: '3', label: 'Three'}
];


const Example = () => (
  <div>

    <ValidForm errors={dummyErrors} debug={true} onSubmit={dummyHandler}>
      <Field placeholder="placeholder" required={true} validator="isLength:1:5|isAlpha|contains:test" name="ultimateValidation" label="Is 1-5 letters only, must contain 'test'"/>
      <Toggle required={true} name="toggle" label="This has to be checked as well"/>
      <RaisedButton type="submit">Submit</RaisedButton>
    </ValidForm>

    <hr/>
    <br/>
    <br/>
    <br/>

    <ValidForm debug={true} onSubmit={dummyHandler}>
      <Field multiLine={true} name="optionalField" label="Optional Field"/>
      <Field debounce={1000} onChange={dummyHandler} defaultError="This field is required!" required={true} name="requiredField" label="Required Field"/>
      <Dropdown defaultError="This field is required!" required={true} placeholder="Choose Number" label="choose" name="dropdown" options={demoOptions}/>
      <br/>
      <RaisedButton type="submit">Submit</RaisedButton>
    </ValidForm>

    <hr/>
    <br/>
    <br/>
    <br/>

    <ValidForm debug={true} onSubmit={dummyHandler}>
      <Field validator="isAlpha" required={true} name="username" label="Required UserName (letters only - isAlpha)"/>
      <Field required={true} validator="isNumeric" name="pin" label="Required PIN (only numbers - isNumeric)"/>
      <Field required={true} validator="isEmail" name="email" label="Required eMail (isEmail)"/>
      <RaisedButton type="submit">Submit</RaisedButton>
    </ValidForm>

    <hr/>
    <br/>
    <br/>
    <br/>

    <ValidForm debug={true} onSubmit={dummyHandler}>
      <Field required={true} validator="isLength:5" name="atLeast5" label="Longer than 5 (isLength:5)"/>
      <Field required={true} validator="isLength:5:10" name="atLeast5butLessThan10" label="Longer than 5 but less than 10 (isLength:5:10)"/>
      <RaisedButton type="submit">Submit</RaisedButton>
    </ValidForm>

    <hr/>

    <ValidForm debug={true} onSubmit={dummyHandler}>
      <Field required={true} validator="contains:test" name="containsTest" label="Must contain test (contains:test)"/>
      <RaisedButton type="submit">Submit</RaisedButton>
    </ValidForm>

    <hr/>

    <ValidForm debug={true} onSubmit={dummyHandler}>
      <Field required={true} validator="isIP" name="validIP" label="Must be a valid IP v4"/>
      <RaisedButton type="submit">Submit</RaisedButton>
    </ValidForm>

    <hr/>

    <ValidForm debug={true} onSubmit={dummyHandler}>
      <Field required={true} validator="isDivisibleBy:2" name="evenNumber" label="Must be an even number"/>
      <RaisedButton type="submit">Submit</RaisedButton>
    </ValidForm>

    <hr/>

    <ValidForm debug={true} onSubmit={dummyHandler}>
      <Field required={true} validator="isJSON" name="json" label="Must be valid JSON"/>
      <RaisedButton type="submit">Submit</RaisedButton>
    </ValidForm>

  </div>
);

const App = () => (
  <MuiThemeProvider muiTheme={getMuiTheme()}>
    <Example />
  </MuiThemeProvider>
);

render(<App/>, document.querySelector('#root'));