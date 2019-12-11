import React, { Component, createRef } from 'react';
import $ from 'jquery';
import { connect } from 'formik';
import { InputError } from './InputError';
import { PICKER_FORMAT } from '../../constants/formats';

export class DatePickerComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: '',
    };

    this.ref = createRef();
  }

  componentDidMount() {
    const {
      form: { setFieldValue },
      field: { name },
    } = this.props;
    $(this.ref.current)
      .datepicker({
        dateFormat: PICKER_FORMAT,
      })
      .datepicker()
      .change(({ target: { value } }) => {
        setFieldValue(name, value);
      });
  }

  componentWillUnmount() {
    $(this.ref.current).datepicker('destroy');
  }

  render() {
    const {
      field,
      label,
    } = this.props;
    return (
            <div className="form-group">
                <label>{ label }</label>
                <input
                    className="form-control"
                    ref={this.ref}
                    {...field}

                />
                <InputError field={field}/>
            </div>
    );
  }
}

export const DatePicker = connect(DatePickerComponent);
