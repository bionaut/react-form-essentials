const {describe, it} = global;

import React from 'react';
import {expect} from 'chai';
import {contain} from 'chai-enzyme';
import {mount, shallow} from 'enzyme';
import {spy, stub} from 'sinon';

import Dropdown from '../Dropdown';

describe('Dropdown', () => {
  it('should render', () => {
    const wrapper = mount(
      <Dropdown options={[
        {value: '1', label: 'Item 1'},
        {value: '2', label: 'Item 2'}
      ]}/>, {
        context: {
          updatePayload: () => null
        }
      }
    );

    expect(wrapper).to.have.className('essential-select');
    expect(wrapper).to.have.descendants('SelectField');

  });

  it('should have error when empty and required', () => {
    const wrapper = mount(
      <Dropdown
        name="dropdown"
        required={true}
        options={[
          {value: '1', label: 'Item 1'},
          {value: '2', label: 'Item 2'}
      ]}/>, {
        context: {
          updatePayload: () => null,
          submitted: true
        }
      }
    );

    expect(wrapper.find('.red'));

  });

  it('should be valid', () => {
    const wrapper = mount(
      <Dropdown
        name="dropdown"
        required={true}
        value='1'
        options={[
          {value: '1', label: 'Item 1'},
          {value: '2', label: 'Item 2'}
      ]}/>, {
        context: {
          updatePayload: () => null,
          submitted: true
        }
      }
    );

    expect(wrapper).to.have.state('value', '1');
    expect(wrapper.find('.green'));

  });

  it('should be validated', () => {
    const wrapper = mount(
      <Dropdown
        name="dropdown"
        required={true}
        validator="isLength:5"
        value='2'
        options={[
          {value: '1', label: 'Item'},
          {value: '2', label: 'It'}
      ]}/>, {
        context: {
          updatePayload: () => null,
          submitted: true
        }
      }
    );

    expect(wrapper).to.have.state('value', '2');
    expect(wrapper.find('.red'));

  })
});