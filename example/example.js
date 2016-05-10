import React from 'react';
import {render} from 'react-dom';

import {ValidForm, Field, Toggle, Dropdown} from '../src/index';

const dummyHandler = function (payload) {
  alert(JSON.stringify(payload))
};

const demoOptions = [
  {value: '1', label: 'One'},
  {value: '2', label: 'Two'},
  {value: '3', label: 'Three'}
];


const Example = () => (
  <div>


    <ValidForm debug={true} onSubmit={dummyHandler}>
      <Field required={true} validator="isLength:1:5|isAlpha|contains:test" name="ultimateValidation" label="Is 1-5 letters only, must contain 'test'"/>
      <Toggle required={true} name="toggle" label="This has to be checked as well"/>
      <button type="submit">Submit</button>
    </ValidForm>

    <hr/>

    <ValidForm debug={true} onSubmit={dummyHandler}>
      <Field name="optionalField" label="Optional Field"/>
      <Field required={true} name="requiredField" label="Required Field"/>
      <Dropdown required={true} placeholder="Choose Number" label="choose" name="dropdown" options={demoOptions}/>
      <button type="submit">Submit</button>
    </ValidForm>

    <hr/>

    <ValidForm debug={true} onSubmit={dummyHandler}>
      <Field validator="isAlpha" required={true} name="username" label="Required UserName (letters only - isAlpha)"/>
      <Field required={true} validator="isNumeric" name="pin" label="Required PIN (only numbers - isNumeric)"/>
      <Field required={true} validator="isEmail" name="email" label="Required eMail (isEmail)"/>
      <button type="submit">Submit</button>
    </ValidForm>

    <hr/>

    <ValidForm debug={true} onSubmit={dummyHandler}>
      <Field required={true} validator="isLength:5" name="atLeast5" label="Longer than 5 (isLength:5)"/>
      <Field required={true} validator="isLength:5:10" name="atLeast5butLessThan10" label="Longer than 5 but less than 10 (isLength:5:10)"/>
      <button type="submit">Submit</button>
    </ValidForm>

    <hr/>

    <ValidForm debug={true} onSubmit={dummyHandler}>
      <Field required={true} validator="contains:test" name="containsTest" label="Must contain test (contains:test)"/>
      <button type="submit">Submit</button>
    </ValidForm>

    <hr/>

    <ValidForm debug={true} onSubmit={dummyHandler}>
      <Field required={true} validator="isIP" name="validIP" label="Must be a valid IP v4"/>
      <button type="submit">Submit</button>
    </ValidForm>

    <hr/>

    <ValidForm debug={true} onSubmit={dummyHandler}>
      <Field required={true} validator="isDivisibleBy:2" name="evenNumber" label="Must be an even number"/>
      <button type="submit">Submit</button>
    </ValidForm>

    <hr/>

    <ValidForm debug={true} onSubmit={dummyHandler}>
      <Field required={true} validator="isJSON" name="json" label="Must be valid JSON"/>
      <button type="submit">Submit</button>
    </ValidForm>

  </div>
);

render(<Example/>, document.querySelector('#root'));