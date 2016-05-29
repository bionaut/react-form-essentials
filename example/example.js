import React from 'react';
import {render} from 'react-dom';

import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import RaisedButton from 'material-ui/RaisedButton';

import {init, ValidForm, Field, Toggle, Dropdown} from '../src/index';

init();

const dummyHandler = function (payload) {
  alert(JSON.stringify(payload))
};

const dummyErrors = {
//   example of error
//   ultimateValidation: 'Hey error here!'
};

const demoOptions = [
  {value: '1', label: 'One'},
  {value: '2', label: 'Two'},
  {value: '3', label: 'Three'}
];


const Example = () => (
  <div>

    <h1><u>Form</u> syntax</h1>

    <pre>
      {
        `<ValidForm errors={errorsObject} debug={true} onSubmit={dummyHandler}>
        <!--children here-->
</ValidForm>`
      }
    </pre>

    <ul>
      <li><b>debug:</b> will provide form feedback</li>
      <li><b>errors:</b> send errors object available for all child components</li>
      <li><b>onSubmit:</b> is a submit handler (use from outside container)</li>
    </ul>

    <h1><u>Field</u> syntax</h1>
    <pre>
      {
        `<Field name="someName"
       placeholder="HintText"
       required={true}
       validator={isLength:2}
       icons={false}
       label="Some label">
</Field>`
      }
    </pre>

    <ul>
      <li><b>name:</b> input name</li>
      <li><b>placeholder:</b> hint text for input</li>
      <li><b>validator:</b> isLength:1:5|isAlpha|contains:test </li>
      <li><b>icons:</b> show/hide icons (default: true)</li>
      <li><b>label:</b> input label </li>
    </ul>


    <hr/>
    <br/>
    <br/>
    <br/>

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
      <Field name="optionalField" label="Optional Field"/>
      <Field required={true} name="requiredField" label="Required Field"/>
      <Dropdown required={true} placeholder="Choose Number" label="choose" name="dropdown" options={demoOptions}/>
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