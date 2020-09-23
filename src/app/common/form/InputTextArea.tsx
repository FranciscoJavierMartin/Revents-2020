import React from 'react';
import { FormField, Label } from 'semantic-ui-react';
import { useField, FieldInputProps } from 'formik';

interface IInputTextAreaProps extends FieldInputProps<any> {
  label: any;
  placeholder: string;
}

// FIXME: Fix type
const InputTextArea: React.FC<any> = ({ label, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <FormField error={meta.touched && !meta.error}>
      <label>{label}</label>
      <textarea {...field} {...props} />
      {meta.touched && meta.error ? (
        <Label basic color='red'>
          {meta.error}
        </Label>
      ) : null}
    </FormField>
  );
};

export default InputTextArea;
