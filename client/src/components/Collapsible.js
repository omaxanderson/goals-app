import React from 'react';
import 'materialize-css/dist/css/materialize.min.css';
import M from 'materialize-css';

// @TODO finish this
export default class Collapsible extends React.Component {
   componentDidMount() {
      M.Collapsible.init(document.querySelectorAll('.collapsible'), {});
   }

   render() {
      return (
         <ul className={`collapsible ${this.props.size}`} id={this.props.id || 'collapse'}>
            {this.props.children}
         </ul>
      );
   }
}

export class CollapsibleHeader extends React.Component {
   render() {
      return (
         <div className="collapsible-header">
            {this.props.children}
         </div>
      );
   }
}

export class CollapsibleBody extends React.Component {
   render() {
      return (
         <div className="collapsible-body">
            {this.props.children}
         </div>
      );
   }
}
