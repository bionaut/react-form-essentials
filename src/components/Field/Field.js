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
    const valid = this.validate();
    this.update(valid);
  }

  update(value) {
    const {updatePayload} = this.context;
    const {name} = this.props;
    updatePayload(name, value);
  }

  handleChange(ev) {
    ev.persist();
    const {onChange, debounce, error} = this.props;
    const newValue = ev.target.value;
    this.setState({
      value: newValue
    });
    const valid = this.validate(newValue);
    const isEmpty = newValue === '';
    this.update(valid);

    if (onChange && (valid || isEmpty || error)) {
      if (debounce) {

        const {timeout} = this.state;

        if (timeout) {
          clearTimeout(timeout);
        }

        const newTimeout = setTimeout(() => {
          onChange(ev);
        }, debounce);

        this.setState({
          timeout: newTimeout
        });

      } else {
        onChange(ev);
      }
    }
  }

  validate(newValue = this.state.value) {
    let valid;

    const {required, validator, error} = this.props;

    if (error){
      this.setState({
        valid: false
      });
      return false;
    }

    if (validator) {
      valid = useValidator(validator, newValue);
      this.setState({
        valid
      })
    } else {
      valid = (required)
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
      error,
      placeholder,
      type = 'text',
      required,
      validator,
      name = 'untitled',
      icons = true,
      defaultError,
      multiLine
    } = this.props;

    const {
      valid,
      value,
    } = this.state;


    return (
      <div className="essential-field">
        <div className={`essential-input-group`}>
          <MuiThemeProvider muiTheme={getMuiTheme()}>
            <TextField
              floatingLabelText={label}
              underlineStyle={getInputStyles(submitted, errors, name, valid)}
              underlineFocusStyle={getInputStyles(submitted, errors, name, valid)}
              style={getInputStyles(submitted, errors, name, valid)}
              errorText={error || (submitted && !valid && defaultError) || (errors && errors[name])}
              name={name}
              id={name}
              type={type}
              value={value}
              multiLine={multiLine}
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
  }
}

Field.contextTypes = {
  formValid: PropTypes.bool,
  submitted: PropTypes.bool,
  updatePayload: PropTypes.func,
  errors: PropTypes.object,
  payload: PropTypes.object
};