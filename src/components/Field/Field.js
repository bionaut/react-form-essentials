import React, {Component, PropTypes} from 'react';
import useValidator from '../../utils/useValidator';

export default class Field extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: this.props.value || ''
    };
  }

  componentDidMount() {
    this.init();
  }

  init() {
    if (this.approve()) {
      const valid = this.validate();
      this.update(valid);
    }
  }

  approve() {
    const {payload} = this.context;
    const {show} = this.props;

    if (show) {
      return !!(payload && payload[show]);
    }
    return true;
  }

  update(value) {
    const {updatePayload} = this.context;
    const {name} = this.props;
    updatePayload(name, value);
  }

  handleChange(ev) {
    const newValue = ev.target.value;
    this.setState({
      value: newValue
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

  render() {

    const {
      submitted,
      errors
    } = this.context;

    const {
      label,
      placeholder,
      type='text',
      required,
      validator,
      name='untitled'
    } = this.props;

    const {
      valid,
      value,
    } = this.state;


    if (this.approve()) {
      return (
        <div className="field">
          {label && <label>{label}</label>}
          <div className={`ui icon input ${ ((errors && errors[name]) || (submitted && !valid)) && 'error'}`}>
            <input
              name={name}
              id={name}
              className="field-component"
              type={type}
              value={value}
              onChange={this.handleChange.bind(this)}
              placeholder={placeholder}
            />
            { submitted && !valid && <i className="red remove icon"></i> }
            { (validator || required) && valid && <i className="green checkmark icon"></i> }
            { !required && !validator && <i className="blue info icon"></i> }
          </div>
          { errors && errors[name] &&
          <span>
            <i className="orange warning icon"></i>
            <span className="secondary-error">{errors[name]}</span>
          </span>}
        </div>
      );
    } else {
      return false;
    }

  }
}

Field.contextTypes = {
  formValid: PropTypes.bool,
  submitted: PropTypes.bool,
  updatePayload: PropTypes.func,
  errors: PropTypes.object,
  payload: PropTypes.object
};