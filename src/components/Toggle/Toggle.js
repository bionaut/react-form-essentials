import React, {Component, PropTypes} from 'react';
import useValidator from '../../utils/useValidator';
import Checkbox from 'material-ui/Checkbox';

import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import getStyles from '../common/styles';

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
      submitted, errors
    } =this.context;

    const {
      label,
      name
    } = this.props;

    const {
      valid,
      value
    } = this.state;

    return (
      <div
        onClick={this.handleToggle.bind(this)}
        className={`essential-toggle ${(submitted && !valid) ? 'error' : ''}`}>
        <div className={`checkbox ${value && 'checked'}`}>
          <MuiThemeProvider muiTheme={getMuiTheme()}>
            <Checkbox
              label={label}
              checked={value ? true:false}
              value={value ? 'true':'false'}
              labelStyle={getStyles(submitted, errors, name, valid)}
              name={name}
              id={name}/>
          </MuiThemeProvider>
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