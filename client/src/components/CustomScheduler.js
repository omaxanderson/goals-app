import React, { Component } from 'react';
import TextField from './TextField';

export default class CustomScheduler extends Component {
   constructor(props) {
      super(props);

      this.state = {
         amount: '0',
         amountType: 1,
         perType: 3,
      };
   }

   render() {
      return (
         <div className={this.props.size || ''}>
            <span style={{ marginLeft: '20px', marginRight: '20px' }}>At least</span>
            <div className={'input-field inline'} style={{ marginTop: '0px', marginBottom: '0px', paddingTop: '12px' }} >
               <TextField 
                  classes='inline'
                  label='Amount'
                  data-type='amount'
                  onChange={ (e) => {
                     this.setState({ amount: e.target.value });
                     this.props.onChange(e);
                  }}
               />
            </div>

            <div className={'input-field inline'} style={{ marginTop: '0px', marginBottom: '0px', paddingTop: '12px' }}>
               <select data-type='amountType' onChange={ (e) => {
                  this.amountTypeValidate(e.target);
                  this.props.onChange(e);
               }} >
                  <option value='1'>minute{ Number(this.state.amount) !== 1 ? 's' : '' }</option>
                  <option value='2'>hour{ Number(this.state.amount) !== 1 ? 's' : '' }</option>
                  <option value='3'>day{ Number(this.state.amount) !== 1 ? 's' : '' }</option>
                  <option value='0'>time{ Number(this.state.amount) !== 1 ? 's' : '' }</option>
               </select>
            </div>

            <span style={{ marginLeft: '20px', marginRight: '20px' }}>per</span>

            <div className={'input-field inline'} style={{ marginTop: '0px', marginBottom: '0px', paddingTop: '12px' }}>
               <select onChange={ e => this.props.onChange(e) } data-type='perType' >
                  <option value='3'>day</option>
                  <option value='4'>week</option>
                  <option value='5'>month</option>
               </select>
            </div>
         </div>
      );
   }

   amountTypeValidate = (e) => {
      if (e.value >= this.state.perType) {
         console.log('error');
      }
   }
}
