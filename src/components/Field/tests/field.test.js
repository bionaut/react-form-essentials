const {describe, it} = global;

import React from 'react';
import {expect} from 'chai';
import {contain} from 'chai-enzyme';
import {mount, shallow} from 'enzyme';
import {spy, stub} from 'sinon';
import Field from '../Field';

describe('Field component', () => {
  it('should render', () => {
    const wrapper = shallow(
      <Field
        name="testField"
        type="number"
        label="Name"
        placeholder="testPlaceholder"
        required={true}/>, {
        context: {
          updatePayload: () => null
        }
      });

    expect(wrapper).to.have.className('essential-field');
    expect(wrapper).to.have.descendants('.essential-input-group');
    expect(wrapper).to.have.descendants('input');
    expect(wrapper.find('label')).to.have.text('Name');
    expect(wrapper.find('input')).to.have.attr('id').equal('testField');
    expect(wrapper.find('input')).to.have.attr('name').equal('testField');
    expect(wrapper.find('input')).to.have.attr('placeholder').equal('testPlaceholder');

  });

  it('Should display optional icon', () => {
    const wrapper = shallow(
      <Field name="optional"/>);
    expect(wrapper).to.have.descendants('i');
    expect(wrapper.find('i')).to.have.className('blue');

  });

  it('Should display error icon and be invalid', () => {
    const wrapper = mount(
      <Field
        required={true}
        name="optional"/>, {
        context: {
          updatePayload: () => null,
          submitted: true
        }
      });
    expect(wrapper).to.have.descendants('i');
    expect(wrapper.find('i')).to.have.className('red');

  });

  it('Should display checkmark icon and be valid', () => {
    const wrapper = mount(
      <Field
        required={true}
        value="Some Value"
        name="optional"/>, {
        context: {
          updatePayload: () => null,
          submitted: true
        }
      });
    expect(wrapper).to.have.descendants('i');
    expect(wrapper.find('i')).to.have.className('green');

  });

});