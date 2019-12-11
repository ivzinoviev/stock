import moment from 'moment';
import { DATE_FORMAT } from '../constants/formats';

export const isCorrectDateFormat = (value) => moment(value, DATE_FORMAT, true).isValid();

export const isInPast = (value) => moment(value, DATE_FORMAT).isBefore(moment().format(DATE_FORMAT));
