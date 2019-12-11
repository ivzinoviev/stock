import React from 'react';
import {
  Formik, Form, Field,
} from 'formik';
import { connect } from 'react-redux';
import { isEmpty } from 'lodash';
import { formSchema } from '../schemas/form';
import { submitForm } from '../actions/actions';
import { DatePicker } from './inputs/DatePicker';
import { BaseInput } from './inputs/BaseInput';
import {
  COMPANY_LABEL, EMAIL_LABEL, END_LABEL, START_LABEL,
} from '../constants/fieldLabels';

const CompanyFormComponent = ({
  submitForm,
}) => (
    <Formik
        initialValues={
            {
              company: '',
              start: '',
              end: '',
              email: '',
            }}
        validationSchema={formSchema}
        onSubmit={submitForm}
        validateOnChange
        validateOnBlur
    >
        {({ errors, dirty }) => (
        <Form>
            <h1>Set request data</h1>
            <Field
                label={COMPANY_LABEL}
                name="company"
                component={BaseInput}
            />
            <Field
                label={START_LABEL}
                name="start"
                component={DatePicker}
            />
            <Field
                label={END_LABEL}
                name="end"
                component={DatePicker}
            />
            <Field
                label={EMAIL_LABEL}
                name="email"
                component={BaseInput}
            />
            <button
                type="submit"
                className="btn btn-primary"
                disabled={!isEmpty(errors) || !dirty}
            >
                Submit
            </button>
        </Form>
        )}
    </Formik>
);

const mapDispatchToProps = {
  submitForm,
};

export const CompanyForm = connect(null, mapDispatchToProps)(CompanyFormComponent);
