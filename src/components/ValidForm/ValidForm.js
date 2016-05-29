import React, {Component, PropTypes} from 'react';

import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import '../../index.styl';

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
      onSubmit(payload)
    }

  }

  render() {

    const {debug, children} = this.props;
    const {payload, valid, submitted} = this.state;

    return (
      <MuiThemeProvider muiTheme={getMuiTheme()}>
        <form
          onSubmit={this.handleSubmit.bind(this)}
          className="essential-form">

          {children}

          { debug &&
          <div className={`essential-form-debug ${valid ? 'valid' : ''}`}>
            <p>
              {JSON.stringify(payload)}
            </p>
            <p>
              {`Form is: ${valid ? 'valid' : 'invalid'}`}
            </p>
            <p>
              {`Submit button was ${submitted ? 'pressed' : 'not pressed'}.`}
            </p>
          </div>}

        </form>
      </MuiThemeProvider>
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