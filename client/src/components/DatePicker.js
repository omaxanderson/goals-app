import React from 'react';
import shortid from 'shortid';
import 'materialize-css/dist/css/materialize.min.css';
import M from 'materialize-css';

/* Materialize DatePicker component
 *
 * reference: https://materializecss.com/pickers.html
 */
export default class DatePicker extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedDate: null,
      elem: null,
    };
  }

  componentDidMount() {
    const elem = document.querySelector(`#${this.props.id || this.generateId}`);

    const options = {
      defaultDate: new Date(),
      setDefaultDate: true,
      onClose: () => {
        const newDate = M.Datepicker.getInstance(elem).date;
        this.props.onChange(newDate);
      },
    };

    M.Datepicker.init(elem, options);
    this.setState({ elem });
  }

  componentWillMount() {
    this.generateId = `a${shortid.generate()}`;
  }

  render() {
    return (
      <div className={`input-field ${this.props.size}`}>
        {this.props.showIcon
               && <i className="material-icons prefix">date_range</i>
            }
        <input onClose={this.props.onChange} type="text" className="datepicker" id={this.props.id || this.generateId} />
        <label htmlFor={this.props.id || this.generateId}>{this.props.label}</label>
      </div>
    );
  }
}

DatePicker.defaultProps = {
  size: 'col s12',
  showIcon: true,
};
