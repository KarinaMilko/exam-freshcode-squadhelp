import * as yup from 'yup';
import { isBefore } from 'date-fns';
import valid from 'card-validator';

export default {
  LoginSchem: yup.object().shape({
    email: yup.string().email('check email').required('required'),
    password: yup
      .string()
      .test(
        'test-password',
        'min 6 symbols',
        value => value && value.trim().length >= 6
      )
      .required('required'),
  }),
  RegistrationSchem: yup.object().shape({
    email: yup.string().email('check email').required('Email is required'),
    password: yup
      .string()
      .test(
        'test-password',
        'min 6 symbols',
        value => value && value.trim().length >= 6
      )
      .required('required'),
    confirmPassword: yup
      .string()
      .required('confirm password is required')
      .oneOf([yup.ref('password')], 'confirmation pass must match password'),
    firstName: yup
      .string()
      .test(
        'test-firstName',
        'required',
        value => value && value.trim().length >= 1
      )
      .required('First Name is required'),
    lastName: yup
      .string()
      .test(
        'test-lastName',
        'required',
        value => value && value.trim().length >= 1
      )
      .required('Last Name is required'),
    displayName: yup
      .string()
      .test(
        'test-displayName',
        'required',
        value => value && value.trim().length >= 1
      )
      .required('Display Name is required'),
    role: yup
      .string()
      .matches(/(customer|creator)/)
      .required('Role is required'),
    agreeOfTerms: yup
      .boolean()
      .oneOf([true], 'Must Accept Terms and Conditions')
      .required('Must Accept Terms and Conditions'),
  }),
  ContestSchem: yup.object({
    nameVenture: yup.string().min(3),
    contestType: yup
      .string()
      .matches(/(name|tagline|logo)/)
      .required(),
    title: yup
      .string()
      .test(
        'test-title',
        'required',
        value => value && value.trim().length >= 1
      )
      .required('title of contest required'),
    industry: yup.string().required('industry required'),
    focusOfWork: yup
      .string()
      .test(
        'test-focusOfWork',
        'required',
        value => value && value.trim().length >= 1
      )
      .required('focus of work required'),
    targetCustomer: yup
      .string()
      .test(
        'test-targetCustomer',
        'required',
        value => value && value.trim().length >= 1
      )
      .required('target customers required'),
    styleName: yup.string().min(1),
    typeOfName: yup.string().min(1),
    typeOfTagline: yup.string().min(1),
    brandStyle: yup.string().min(1),
    file: yup.mixed(),
  }),
  filterSchem: yup.object().shape({
    typeIndex: yup.number().oneOf[(1, 2, 3, 4, 5, 6, 7)],
    contestId: yup.string(),
    awardSort: yup.string().matches(/(desc|asc)/),
    industry: yup.string(),
  }),
  LogoOfferSchema: yup.object().shape({
    offerData: yup.mixed().required('required'),
  }),
  TextOfferSchema: yup.object().shape({
    offerData: yup
      .string()
      .test(
        'test-offerData',
        'required',
        value => value && value.trim().length >= 1
      )
      .required('suggestion is required'),
  }),
  PaymentSchema: yup.object().shape({
    number: yup
      .string()
      .test(
        'test-cardNumber',
        'Credit Card number is invalid',
        value => valid.number(value).isValid
      )
      .required('required'),
    name: yup
      .string()
      .min(1, 'required atleast one symbol')
      .matches(/^[a-z]{1,31}$/i)
      .required('required'),
    cvc: yup
      .string()
      .test('test-cvc', 'cvc is invalid', value => valid.cvv(value).isValid)
      .required('required'),
    expiry: yup
      .string()
      .test(
        'test-expiry',
        'expiry is invalid',
        value => valid.expirationDate(value).isValid
      )
      .required('required'),
  }),
  CashoutSchema: yup.object().shape({
    sum: yup.number().min(5, 'min sum is 5$').required('required'),
    number: yup
      .string()
      .test(
        'test-cardNumber',
        'Credit Card number is invalid',
        value => valid.number(value).isValid
      )
      .required('required'),
    name: yup.string().min(1).required('required'),
    cvc: yup
      .string()
      .test('test-cvc', 'cvc is invalid', value => valid.cvv(value).isValid)
      .required('required'),
    expiry: yup
      .string()
      .test(
        'test-expiry',
        'expiry is invalid',
        value => valid.expirationDate(value).isValid
      )
      .required('required'),
  }),
  UpdateUserSchema: yup.object().shape({
    firstName: yup
      .string()
      .test(
        'test-firstName',
        'required',
        value => value && value.trim().length >= 1
      )
      .required('required'),
    lastName: yup
      .string()
      .test(
        'test-lastName',
        'required',
        value => value && value.trim().length >= 1
      )
      .required('required'),
    displayName: yup
      .string()
      .test(
        'test-displayName',
        'required',
        value => value && value.trim().length >= 1
      )
      .required('required'),
    file: yup.mixed(),
  }),
  MessageSchema: yup.object({
    message: yup
      .string()
      .test(
        'test-message',
        'required',
        value => value && value.trim().length >= 1
      )
      .required('required'),
  }),
  CatalogSchema: yup.object({
    catalogName: yup
      .string()
      .test(
        'test-catalogName',
        'required',
        value => value && value.trim().length >= 1
      )
      .required('required'),
  }),
  EventsFormSchema: yup
    .object()
    .shape({
      eventName: yup
        .string()
        .min(1, 'required atleast one symbol')
        .trim()
        .required('Event name is required'),
      date: yup.date().required('Date is required'),
      time: yup.string().required('Time is required'),
      notifyBeforeDays: yup
        .number()
        .min(0, 'Days cannot be negative')
        .integer('Days must be an integer')
        .default(0),

      notifyBeforeHours: yup
        .number()
        .min(0, 'Hours cannot be negative')
        .max(23, 'Hours cannot exceed 23')
        .integer('Hours must be an integer')
        .default(0),

      notifyBeforeMinutes: yup
        .number()
        .min(0, 'Minutes cannot be negative')
        .max(59, 'Minutes cannot exceed 59')
        .integer('Minutes must be an integer')
        .default(0),
    })
    .test(
      'not-in-past',
      'Event date and time cannot be in the past',
      function (values) {
        const { date, time } = values;
        if (!date || !time) return true;

        const [hours, minutes] = time.split(':').map(Number);
        const eventDateTime = new Date(
          date.getFullYear(),
          date.getMonth(),
          date.getDate(),
          hours,
          minutes,
          0
        );

        if (isBefore(eventDateTime, new Date())) {
          return this.createError({
            path: 'date',
            message: 'Event cannot be scheduled in the past',
          });
        }

        return true;
      }
    )
    .test(
      'notify-time-valid',
      'Event date and time must be in the future',
      function (values) {
        const {
          date,
          time,
          notifyBeforeDays,
          notifyBeforeHours,
          notifyBeforeMinutes,
        } = values;

        if (!date || !time) return true;

        const eventDateTime = new Date(date);
        const [hours, minutes] = time.split(':');

        eventDateTime.setHours(+hours);
        eventDateTime.setMinutes(+minutes);
        eventDateTime.setSeconds(0);

        const notifyBeforeTime =
          (notifyBeforeDays || 0) * 24 * 60 * 60 * 1000 +
          (notifyBeforeHours || 0) * 60 * 60 * 1000 +
          (notifyBeforeMinutes || 0) * 60 * 1000;

        const notifyTime = new Date(eventDateTime.getTime() - notifyBeforeTime);
        const now = new Date();

        if (notifyTime <= now) {
          return this.createError({
            path: 'notifyTimeValidation',
            message:
              'Notification time must be before event time and in the future',
          });
        }
        return true;
      }
    ),
};
