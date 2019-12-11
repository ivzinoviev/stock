import { object, string } from 'yup';
import moment from 'moment';
import {
  COMPANY_LABEL, EMAIL_LABEL, END_LABEL, START_LABEL,
} from '../constants/fieldLabels';
import { isCorrectDateFormat, isInPast } from '../utils/validation';
import { DATE_FORMAT } from '../constants/formats';

export const formSchema = object().shape({
  company: string().required(`${COMPANY_LABEL} is required`),
  start: string()
    .required(`${START_LABEL} is required`)
    .test({
      test: isCorrectDateFormat,
      message: `Date must be in ${DATE_FORMAT} format`,
    })
    .test({
      test: isInPast,
      message: 'Date must be in past',
    }),
  end: string()
    .max(new Date(), `${END_LABEL} must be in past`)
    .required(`${END_LABEL} is required`)
    .when(
      'start',
      (start, schema) => (start && schema.test({
        test: (end) => moment(start).isBefore(moment(end)),
        message: 'End date must be after start date',
      })
      ),
    )
    .test({
      test: isCorrectDateFormat,
      message: `Date must be in ${DATE_FORMAT} format`,
    })
    .test({
      test: isInPast,
      message: 'Date must be in past',
    }),
  email: string().required(`${EMAIL_LABEL} is required`).email(`${EMAIL_LABEL} must be valid email`),
});
