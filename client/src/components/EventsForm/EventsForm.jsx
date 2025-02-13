import { Formik, Form, Field, ErrorMessage } from 'formik';

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
    <div>
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        {formikProps => (
          <Form>
            <label>
              <span>Event:</span>
              <Field
                name="eventName"
                type="text"
                placeholder="Event's Name"
                autoFocus
              />
              <ErrorMessage name="eventName" />
            </label>
            <label>
              <span>Event's Date:</span>
              <Field name="date" type="date" />
              <ErrorMessage name="date" />
            </label>
            <label>
              <span>Event's Time:</span>
              <Field name="time" type="time" />
              <ErrorMessage name="time" />
            </label>
            <label>
              <span>Time Out Message:</span>
              <Field name="timeOutMessage" type="time" />
              <ErrorMessage name="timeOutMessage" />
            </label>
            <button type="submit">OK</button>
            <button type="reset">Reset</button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default EventsForm;
