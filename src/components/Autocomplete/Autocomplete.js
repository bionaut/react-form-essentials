import React, {Component, PropTypes} from 'react';
import useValidator from '../../utils/useValidator';

import Autocomplete from 'material-ui/AutoComplete';

import Icon from '../Icon/Icon';
import getStyles from '../common/styles';

import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

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
    if (typeof updatePayload === "function") {
      updatePayload(name, value);
    }
  }

  handleChange(value) {
    this.setState({
      value: value,
    });
    const valid = this.validate(value);
    this.update(valid);
  }

  validate(newValue = this.state.value) {
    const {validator, required} = this.props;
    let valid;

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
      placeholder,
      required,
      validator,
      name,
      icons = true,
      options,
      className,
      defaultError,
      value
    } = this.props;

    const {
      valid
    } = this.state;

    return (
      <div className={`essential-autocomplete ${(submitted && !valid) ? 'errors' : ''} ${className ? className : ''}`}>
        <MuiThemeProvider muiTheme={getMuiTheme()}>
          <Autocomplete
            openOnFocus={true}
            dataSource={options}
            hintText={placeholder}
            fullWidth={true}
            searchText={value}
            onUpdateInput={this.handleChange.bind(this)}
            onNewRequest={this.handleChange.bind(this)}
            errorText={(submitted && !valid && defaultError) || (errors && errors[name])}
            id={name}
            name={name}/>
        </MuiThemeProvider>
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