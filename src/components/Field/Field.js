import React, {Component, PropTypes} from 'react';
import TextField from 'material-ui/TextField';
import useValidator from '../../utils/useValidator';

import getInputStyles from '../common/styles';
import Icon from '../Icon/Icon';

import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

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
      name='untitled',
      icons=true,
      defaultError
    } = this.props;

    const {
      valid,
      value,
    } = this.state;


    if (this.approve()) {
      return (
        <div className="essential-field">
          <div className={`essential-input-group`}>
            <MuiThemeProvider muiTheme={getMuiTheme()}>
              <TextField
                floatingLabelText={label}
                underlineStyle={getInputStyles(submitted, errors, name, valid)}
                underlineFocusStyle={getInputStyles(submitted, errors, name, valid)}
                style={getInputStyles(submitted, errors, name, valid)}
                errorText={(submitted && !valid && defaultError) || (errors && errors[name])}
                name={name}
                id={name}
                type={type}
                value={value}
                onChange={this.handleChange.bind(this)}
                hintText={placeholder}
              />
            </MuiThemeProvider>
            {icons && <div className="icons">
              { submitted && !valid && <Icon type="error"/> }
              { (validator || required) && valid && <Icon type="check"/> }
              { !required && !validator && <Icon type="optional"/> }
            </div>}
          </div>
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