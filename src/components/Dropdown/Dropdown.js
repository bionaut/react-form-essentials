import React, {Component, PropTypes} from 'react';
import useValidator from '../../utils/useValidator';

import Icon from '../Icon/Icon';

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

  handleChange(ev) {
    const newValue = ev.target.value;
    this.setState({
      value: newValue,
      touched: true
    });
    const valid = this.validate(newValue);
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
        <option
          key={i}
          value={value}>{label}
        </option>
      ))
  }

  render() {

    const {
      submitted
    } =this.context;

    const {
      label,
      placeholder,
      required,
      validator,
      name
    } = this.props;

    const {
      valid,
      touched
    } = this.state;


    return (

      <div className={`essential-select ${(submitted && !valid) ? 'errors' : ''}`}>
        {label && <label>{label}</label>}

        <select tabIndex="0"
                value={this.state.value}
                onChange={this.handleChange.bind(this)}
                className={`${placeholder && !touched && 'placeholder'}`}
                name={name} id={name}>

          {!touched && placeholder && <option value="">{placeholder}</option>}
          {this.generateOptions()}

        </select>
        <div className="icons">
          { submitted && !valid && <Icon type="error"/> }
          { required && valid && <Icon type="check"/> }
          { (!required && !validator) && <Icon type="optional"/> }
        </div>
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