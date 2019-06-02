import React from 'react';

export default class TextArea extends React.Component {
   render() {
      return (
         <div className={`input-field ${this.props.size}`}>
            <textarea onChange={this.props.onChange} id={this.props.label} className="materialize-textarea" />
            <label htmlFor={this.props.label}>{this.props.label}</label>
         </div>
      );
   }
}

TextArea.defaultProps = {
   size: '',
};
