import React, {Component, PropTypes} from 'react';
import useValidator from '../../utils/useValidator';

import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

import Icon from '../Icon/Icon';
import getStyles from '../common/styles';

export default class Dropdown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: this.props.value || ''
    };
  }

  componentDidMount() {
    const valid = this.validate();
    this.update(valid);
  }

  update(value) {
    const {updatePayload} = this.context;
    const {name} = this.props;
    updatePayload(name, value);
  }

  handleChange(event, index, value) {
    this.setState({
      value: value,
      touched: true
    });
    const valid = this.validate(value);
    this.update(valid);
  }

  validate(newValue = this.state.value) {
    let valid;

    if (this.props.validator) {
      valid = useValidator(this.props.validator, newValue);
      this.setState({
        valid
      })
    } else {
      valid = (this.props.required)
        ? newValue && newValue.length > 0
        : true;
      this.setState({
        valid
      });
    }

    return (valid) ? newValue : false;
  }

  generateOptions() {
    const {options} = this.props;
    return options
      .map(({value, label}, i) => (
        <MenuItem
          key={i}
          value={value}
          primaryText={label}/>
      ))
  }

  render() {

    const {
      submitted,
      errors
    } =this.context;

    const {
      placeholder,
      required,
      validator,
      name,
      icons=true,
      defaultError
    } = this.props;

    const {
      valid
    } = this.state;


    return (
      <div className={`essential-select ${(submitted && !valid) ? 'errors' : ''}`}>

        <SelectField
          tabIndex="0"
          floatingLabelText={placeholder}
          style={getStyles(submitted, errors, name, valid)}
          underlineStyle={getStyles(submitted, errors, name, valid)}
          value={this.state.value}
          onChange={this.handleChange.bind(this)}
          id={name}
          errorText={(submitted && !valid && defaultError) || (errors && errors[name])}
          name={name}>

          {this.generateOptions()}

        </SelectField>
        {icons && <div className="icons">
          { submitted && !valid && <Icon type="error"/> }
          { required && valid && <Icon type="check"/> }
          { (!required && !validator) && <Icon type="optional"/> }
        </div>}
      </div>
    );
  }
}

Dropdown.contextTypes = {
  formValid: PropTypes.bool,
  submitted: PropTypes.bool,
  updatePayload: PropTypes.func,
  errors: PropTypes.object,
  payload: PropTypes.object
};