import { Form, Formik } from 'formik';
import React from 'react';
import { toast } from 'react-toastify';
import { Button } from 'semantic-ui-react';
import * as Yup from 'yup';
import { updateUserProfile } from '../../../../app/api/firestore/firestoreService';
import InputText from '../../../../app/common/form/InputText';
import InputTextArea from '../../../../app/common/form/InputTextArea';

interface IProfileFormProps {
  profile: any;
}

interface IFormValues {
  displayName: string;
  description: string;
}

const ProfileForm: React.FC<IProfileFormProps> = ({ profile }) => {
  const validationSchema = Yup.object({
    displayName: Yup.string().required(),
  });

  return (
    <Formik
      initialValues={{
        displayName: profile.displayName,
        description: profile.description || '',
      }}
      validationSchema={validationSchema}
      onSubmit={async (values: IFormValues, { setSubmitting }) => {
        try {
          await updateUserProfile(values);
        } catch (error) {
          toast.error(error.message);
        } finally {
          setSubmitting(false);
        }
      }}
    >
      {({ isSubmitting, isValid, dirty }) => (
        <Form className='ui form'>
          <InputText name='displayName' placeholder='Display Name' />
          <InputTextArea name='description' placeholder='Description' />
          <Button
            loading={isSubmitting}
            disabled={isSubmitting || !isValid || !dirty}
            floated='right'
            type='submit'
            size='large'
            positive
            content='Update profile'
          />
        </Form>
      )}
    </Formik>
  );
};

export default ProfileForm;
