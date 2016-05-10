import React from 'react';
import {render} from 'react-dom';

import {ValidForm, Field} from '../src/index';

const dummyHandler = function (payload) {
  alert(JSON.stringify(payload))
};

const Example = () => (
  <div>
    <ValidForm debug={true} onSubmit={dummyHandler}>
      <Field name="optionalField" label="Optional Field"/>
      <Field required={true} name="requiredField" label="Required Field"/>
      <button type="submit">Submit</button>
    </ValidForm>
  </div>
);

render(<Example/>, document.querySelector('#root'));