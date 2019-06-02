import React from 'react';

export default class Checkbox extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      checked: props.checked || false,
    };
  }

  render() {
    return (
      <form>
        <label>
          <input defaultChecked={this.props.checked} onChange={this.props.onChange} type="checkbox" />
          <span>{this.props.label}</span>
        </label>
      </form>
    );
  }
}
