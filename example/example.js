import React from 'react';
import {render} from 'react-dom';

import {ValidForm, Field} from '../src/index';

const dummyHandler = function (payload) {
  alert(JSON.stringify(payload))
};

const Example = () => (
  <div>
    <ValidForm debug={true} onSubmit={dummyHandler}>
      <Field name="test" label="test"/>
    <button type="submit">Submit</button>
    </ValidForm>
  </div>
);

render(<Example/>, document.querySelector('#root'));