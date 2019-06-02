import React from 'react';
import 'materialize-css/dist/css/materialize.min.css';
import M from 'materialize-css';

export default class TextField extends React.Component {
  componentDidMount() {
    M.FormSelect.init(document.querySelectorAll('select'), {});
  }

  render() {
    return (
      <div className={`input-field ${this.props.size} ${this.props.classes}`}>
        <input data-type="text" onChange={this.props.onChange} id={this.props.label} type="text" />
        <label htmlFor={this.props.label}>{this.props.label}</label>
      </div>
    );
  }
}

TextField.defaultProps = {
  size: '',
  classes: '',
};
