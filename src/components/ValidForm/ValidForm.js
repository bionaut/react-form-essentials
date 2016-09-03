import React, {Component, PropTypes} from 'react';
import equal from 'deep-equal';

export default class ValidForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      valid: false,
      submitted: false,
      payload: {},
      errors: {},
      lastInvalidPayload: {}
    }
  }

  componentDidUpdate() {
    const {errors} = this.props;
    const {lastInvalidPayload, payload} = this.state;
    const isError = errors && Object.keys(errors).length > 0;

    if (isError && !equal(lastInvalidPayload, payload)) {
      this.setState({
        lastInvalidPayload: payload,
        valid: false
      })
    }

  }

  getChildContext() {
    return {
      formValid: this.state.valid,
      submitted: this.state.submitted,
      updatePayload: this.updatePayload.bind(this),
      errors: this.props.errors,
      payload: this.state.payload
    }
  };

  updatePayload(name, value) {
    let obj = this.state.payload;
    obj[name] = value;
    this.setState({
      payload: Object.assign({}, obj)
    });

    this.validate();

  }

  validate() {
    const {payload} = this.state;

    let inValid;

    for (let val in payload) {
      if (!payload[val] && payload[val] !== '') inValid = true;
    }

    this.setState({
      valid: !inValid
    })
  }

  handleSubmit(event) {
    const {onSubmit} = this.props;
    const {valid, payload} = this.state;

    event.preventDefault();

    this.setState({
      submitted: true
    });

    if (valid) {
      const extended_payload = Object.assign({}, payload, this.props.payload);
      onSubmit(extended_payload)
    }

  }

  render() {

    const {debug, children, className} = this.props;
    const {payload, valid, submitted} = this.state;

    return (
      <form onSubmit={this.handleSubmit.bind(this)} className={`essential-form ${className ? className : ''}`}>

        {children}

        { debug &&
        <div className={`essential-form-debug ${valid ? 'valid' : ''}`}>
          <p>{JSON.stringify(payload)}</p>
          <p>{`Form is: ${valid ? 'valid' : 'invalid'}`}</p>
          <p>{`Submit button was ${submitted ? 'pressed' : 'not pressed'}.`}</p>
        </div>}

      </form>
    );
  }
}

ValidForm.childContextTypes = {
  formValid: PropTypes.bool,
  submitted: PropTypes.bool,
  updatePayload: PropTypes.func,
  errors: PropTypes.object,
  payload: PropTypes.object
};