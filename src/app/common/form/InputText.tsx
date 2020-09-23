import React from 'react';
import { FormField, Label } from 'semantic-ui-react';
import { useField, FieldInputProps } from 'formik';

interface IInputTextProps extends FieldInputProps<any> {
  label: any;
  placeholder: string;
}

// FIXME: Fix type
const InputText: React.FC<any> = ({ label, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <FormField error={meta.touched && !meta.error}>
      <label>{label}</label>
      <input {...field} {...props} />
      {meta.touched && meta.error ? (
        <Label basic color='red'>
          {meta.error}
        </Label>
      ) : null}
    </FormField>
  );
};

export default InputText;
