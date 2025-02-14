import { Formik, Form, Field, ErrorMessage } from 'formik';
import styles from './EventsForm.module.sass';

function EventsForm() {
  const initialValues = {
    eventName: '',
    date: '',
    time: '',
    timeOutMessage: '',
  };

  const handleSubmit = formikBag => {
    formikBag.resetForm();
  };

  return (
    <div className={styles.eventFormContainer}>
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
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
              <ErrorMessage name="eventName" className={styles.formError} />
            </label>
            <label className={styles.formLabel}>
              <span className={styles.formSpan}>Event's Date:</span>
              <Field name="date" type="date" className={styles.formInput} />
              <ErrorMessage name="date" className={styles.formError} />
            </label>
            <label className={styles.formLabel}>
              <span className={styles.formSpan}>Event's Time:</span>
              <Field name="time" type="time" className={styles.formInput} />
              <ErrorMessage name="time" className={styles.formError} />
            </label>
            <label className={styles.formLabel}>
              <span className={styles.formSpan}>Time Out Message:</span>
              <Field
                name="timeOutMessage"
                type="time"
                className={styles.formInput}
              />
              <ErrorMessage
                name="timeOutMessage"
                className={styles.formError}
              />
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

export default EventsForm;
