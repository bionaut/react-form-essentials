import React from 'react';
import {render} from 'react-dom';

import {ValidForm, Field} from '../src/index';

const Example = () => (
  <div>
    <ValidForm>
      <Field name="test" label="test"/>
    <button type="submit">Submit</button>
    </ValidForm>
  </div>
);

render(<Example/>, document.querySelector('#root'));