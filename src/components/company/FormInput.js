import React, { Component } from 'react';

export default class FormInput extends Component {

  render() {
    const { label, mandatory=false, width = 6 } = this.props;
    return (<div className={ "col-" + width } style={ { marginBottom: 30 } }>
      <div className={ "form-label" }>{ label }{ mandatory && <span style={ { color: "#EB5928" } }>*</span> }</div>
      <input className={ "form-input form-control" } {...this.props}/>
    </div>
    );
  }
}