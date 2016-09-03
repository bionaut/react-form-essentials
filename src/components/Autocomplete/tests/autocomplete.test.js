const {describe, it} = global;

import React from 'react';
import {expect} from 'chai';
import {contain} from 'chai-enzyme';
import {mount, shallow} from 'enzyme';
import {spy, stub} from 'sinon';

import Autocomplete from '../Autocomplete';

describe('Autocomplete', () => {
  // it('should render', () => {
  //   const wrapper = mount(
  //     <Dropdown options={[
  //       {value: '1', label: 'Item 1'},
  //       {value: '2', label: 'Item 2'}
  //     ]}/>, {
  //       context: {
  //         updatePayload: () => null
  //       }
  //     }
  //   );
  //
  //   expect(wrapper).to.have.className('essential-select');
  //   expect(wrapper).to.have.descendants('SelectField');
  //
  // });

});