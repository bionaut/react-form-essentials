const {describe, it} = global;

import React from 'react';
import {expect} from 'chai';
import {contain} from 'chai-enzyme';
import {mount, shallow} from 'enzyme';
import {spy, stub} from 'sinon';

import ValidForm from '../ValidForm';

describe('ValidForm Component', () => {
  it('should render', () => {
    const wrapper = mount(
      <ValidForm />
    );

    expect(wrapper).to.have.className('essential-form');
    expect(wrapper).to.have.state('valid').to.equal(false);
    expect(wrapper).to.have.state('payload').to.deep.equal({});
    expect(wrapper).to.have.state('submitted').to.equal(false);

  })
});