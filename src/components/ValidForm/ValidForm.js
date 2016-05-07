import React, {Component, PropTypes} from 'react';

export default class ValidForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      valid: false,
      submitted: false,
      payload: {},
      errors: {}
    };
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
      if (!payload[val]) inValid = true;
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
      onSubmit(payload)
    }

  }

  render() {
    return (
      <form
        onSubmit={this.handleSubmit.bind(this)}
        className="ui form">
        {this.props.children}
        <p>
          {JSON.stringify(this.state.payload)}
        </p>
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