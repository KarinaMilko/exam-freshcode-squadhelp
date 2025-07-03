import React from 'react';
import { Field } from 'formik';

const FieldFileInput = ({ classes, ...rest }) => {
  const { fileUploadContainer, labelClass, fileNameClass, fileInput } = classes;

  return (
    <Field name={rest.name}>
      {({ field, form }) => {
        const getFileName = () => {
          if (form.values[rest.name]) {
            return form.values[rest.name].name;
          }
          return '';
        };

        const handleChange = event => {
          const file = event.currentTarget.files[0];
          form.setFieldValue(rest.name, file);
        };

        return (
          <div className={fileUploadContainer}>
            <label htmlFor="fileInput" className={labelClass}>
              Choose file
            </label>
            <span id="fileNameContainer" className={fileNameClass}>
              {getFileName()}
            </span>
            <input
              className={fileInput}
              id="fileInput"
              type="file"
              name={rest.name}
              onChange={handleChange}
            />
          </div>
        );
      }}
    </Field>
  );
};

export default FieldFileInput;
