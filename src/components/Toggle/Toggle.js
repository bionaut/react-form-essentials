import React, {Component, PropTypes} from 'react';
import useValidator from '../../utils/useValidator';

export default class Toggle extends Component {
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

  handleToggle() {
    const active = this.props.active || true;
    const current = this.state.value;
    const newValue = !current ? active : '';

    this.setState({
      value: newValue
    });
    const valid = this.validate(newValue);
    this.update(valid);

  }

  validate(newValue = '') {
    let valid;

    if (this.props.validator) {
      valid = useValidator(this.props.validator, newValue);
      this.setState({
        valid
      })
    } else {
      valid = (this.props.required)
        ? newValue || newValue.length > 0
        : true;
      this.setState({
        valid
      });
    }

    return (valid) ? newValue : false;
  }

  render() {

    const {
      submitted
    } =this.context;

    const {
      label,
      children,
      name
    } = this.props;

    const {
      valid,
      value
    } = this.state;

    return (
      <div
        onClick={this.handleToggle.bind(this)}
        className={`inline field ${(submitted && !valid) ? 'error' : ''}`}>
        <div className={`ui toggle checkbox ${value && 'checked'}`}>
          <input checked={value} value={value} name={name} id={name} type="checkbox" tabIndex="0" className="hidden"/>
          {(label || children) && <label>{label || children}</label>}
        </div>
      </div>
    );
  }
}

Toggle.contextTypes = {
  formValid: PropTypes.bool,
  submitted: PropTypes.bool,
  updatePayload: PropTypes.func,
  errors: PropTypes.object,
  payload: PropTypes.object
};