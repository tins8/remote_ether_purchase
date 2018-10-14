import React from 'react';

class Slot extends React.Component {
  render() {
      return (
        <div className="fl w-100 w-third-ns pa1">
            <div className="bg-white pv0 tl">
            <h2>
                { this.props.label && (
                <span>{this.props.label}</span>
                )}
                { this.props.display && (
                <span>{this.props.display}</span>
                )}
            </h2>
            </div>
        { this.props.data && (
          <div>{this.props.data}</div>
        )}
      </div>
      );
  }
}

export { Slot }