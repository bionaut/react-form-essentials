const {describe, it} = global;

import React from 'react';
import {expect} from 'chai';
import {contain} from 'chai-enzyme';
import {mount, shallow} from 'enzyme';
import {spy, stub} from 'sinon';

import Toggle from '../Toggle';

describe('Toggle Component', () => {
  it('should render', () => {
    const wrapper = mount(<Toggle name="testField" label="Accept"/>,
      {
        context: {
          updatePayload: () => null
        }
      });

    expect(wrapper).to.have.className('essential-toggle');
    expect(wrapper).to.have.descendants('.checkbox');
    expect(wrapper).to.have.descendants('input');
    expect(wrapper.find('label')).to.have.text('Accept');
    expect(wrapper.find('input')).to.have.attr('id').equal('testField');
    expect(wrapper.find('input')).to.not.be.checked();
    expect(wrapper.find('input')).to.be.value('false');
    expect(wrapper.find('.checkbox')).to.not.have.className('checked');
    expect(wrapper.find('input')).to.have.attr('name').equal('testField');

  });

  it('should be invalid when empty (required, submitted)', () => {
    const wrapper = mount(
      <Toggle required={true} name="testField" label="Accept"/>, {
        context: {
          updatePayload: () => null,
          submitted: true
        }
      }
    );

    expect(wrapper.find('input')).to.not.be.checked();
    expect(wrapper).to.have.className('error');
    expect(wrapper.find('input')).to.be.value('false');
    expect(wrapper.find('.checkbox')).to.not.have.className('checked')


  });

  it('should be ok when empty (required submitted)', () => {
    const wrapper = mount(
      <Toggle required={true} name="testField" label="Accept"/>, {
        context: {
          updatePayload: () => null,
          submitted: false
        }
      }
    );

    expect(wrapper).to.not.have.className('error');
    expect(wrapper.find('input')).to.be.value('false');
    expect(wrapper.find('.checkbox')).to.not.have.className('checked');

  });

  it('should be checked', () => {
    const wrapper = mount(
      <Toggle value={true} required={true} name="testField" label="Accept"/>, {
        context: {
          updatePayload: () => null,
          submitted: false
        }
      }
    );
    expect(wrapper.find('input')).to.be.checked();
    expect(wrapper.find('input')).to.be.value('true');
    expect(wrapper.find('.checkbox')).to.have.className('checked');
  });

});