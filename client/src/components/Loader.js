import React from 'react';

export default class Loader extends React.Component {
  render() {
    return (
      <div className="loader-background">
        <img alt="circular loading gif" className="loader" src="loader.gif" />
      </div>
    );
  }
}
