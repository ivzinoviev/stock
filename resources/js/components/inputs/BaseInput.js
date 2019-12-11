import React from 'react';
import { connect } from 'formik';
import { InputError } from './InputError';

export const BaseInputComponent = ({
  field,
  label,
  type,
}) => (
    <div className="form-group">
        <label>{label}</label>
        <input type={type} className="form-control" {...field} />
        <InputError field={field}/>
    </div>
);

BaseInputComponent.defaultProps = {
  type: 'text',
};

export const BaseInput = connect(BaseInputComponent);
