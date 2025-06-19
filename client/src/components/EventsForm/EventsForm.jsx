import { Formik, Form, Field, ErrorMessage } from 'formik';
import { connect } from 'react-redux';
import styles from './EventsForm.module.sass';
import Schems from './../../utils/validators/validationSchems';
import { createEvent } from '../../store/slices/eventListSlice';

function EventsForm({ create }) {
  const initialValues = {
    eventName: '',
    date: '',
    time: '',
    notifyBeforeDays: '',
    notifyBeforeHours: '',
    notifyBeforeMinutes: '',
    notifyTimeValidation: '',
  };

  const handleSubmit = (values, { resetForm }) => {
    create(values);
    resetForm();
  };

  return (
    <div className={styles.eventFormContainer}>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={Schems.EventsFormSchema}
      >
        {formikProps => (
          <Form className={styles.formContainer}>
            <label className={styles.formLabel}>
              <span className={styles.formSpan}>Event:</span>
              <Field
                name="eventName"
                type="text"
                placeholder="Event's Name"
                autoFocus
                className={styles.formInput}
              />
              <ErrorMessage
                name="eventName"
                component="span"
                className={styles.formError}
              />
            </label>
            <label className={styles.formLabel}>
              <span className={styles.formSpan}>Event's Date:</span>
              <Field name="date" type="date" className={styles.formInput} />
              <ErrorMessage
                name="date"
                component="span"
                className={styles.formError}
              />
            </label>
            <label className={styles.formLabel}>
              <span className={styles.formSpan}>Event's Time:</span>
              <Field name="time" type="time" className={styles.formInput} />
              <ErrorMessage
                name="time"
                component="span"
                className={styles.formError}
              />
            </label>
            <label className={styles.formLabel}>
              <span className={styles.formSpan}>Time Out Message:</span>
              <div className={styles.notifyInputsContainer}>
                <Field
                  name="notifyBeforeDays"
                  type="number"
                  min="0"
                  placeholder="Days"
                  className={styles.notifyInput}
                />
                <Field
                  name="notifyBeforeHours"
                  type="number"
                  min="0"
                  max="23"
                  placeholder="Hours"
                  className={styles.notifyInput}
                />
                <Field
                  name="notifyBeforeMinutes"
                  type="number"
                  min="0"
                  max="59"
                  placeholder="Minutes"
                  className={styles.notifyInput}
                />
              </div>
              {formikProps.errors.notifyTimeValidation && (
                <span className={styles.formError}>
                  {formikProps.errors.notifyTimeValidation}
                </span>
              )}
            </label>
            <div className={styles.btns}>
              <button type="submit" className={styles.formButton}>
                OK
              </button>
              <button type="reset" className={styles.formButton}>
                Reset
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

const mapDispatchToProps = dispatch => ({
  create: values => dispatch(createEvent(values)),
});

export default connect(null, mapDispatchToProps)(EventsForm);
