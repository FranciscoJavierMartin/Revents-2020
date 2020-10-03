import { Form, Formik, FormikHelpers } from 'formik';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Divider, Label } from 'semantic-ui-react';
import * as Yup from 'yup';
import { registerUserInFirebase } from '../../app/api/firestore/firebaseService';
import { EVENTS_PAGE_ROUTE } from '../../app/common/constants/routes';
import InputText from '../../app/common/form/InputText';
import SocialLogin from './SocialLogin';

interface IFormValues {
  displayName: string;
  email: string;
  password: string;
  auth?: string;
}

const RegisterPage: React.FC = () => {
  const history = useHistory();
  const validationSchema = Yup.object({
    displayName: Yup.string().required(),
    email: Yup.string().required().email(),
    password: Yup.string().required(),
  });

  return (
    <div>
      <Formik
        initialValues={{ email: '', password: '', displayName: '' }}
        validationSchema={validationSchema}
        onSubmit={async (
          values: IFormValues,
          { setSubmitting, setErrors }: FormikHelpers<IFormValues>
        ) => {
          try {
            await registerUserInFirebase(values);
            setSubmitting(false);
            history.push(EVENTS_PAGE_ROUTE);
          } catch (error) {
            setErrors({ auth: error.message });
            setSubmitting(false);
          }
        }}
      >
        {({ isSubmitting, isValid, dirty, errors }) => (
          <Form className='ui form'>
            <InputText name='displayName' placeholder='Name' />
            <InputText name='email' placeholder='Email address' type='email' />
            <InputText name='password' placeholder='Password' type='password' />
            {errors.auth && (
              <Label
                basic
                color='red'
                style={{ marginBottom: 10 }}
                content={errors.auth}
              />
            )}
            <Button
              loading={isSubmitting}
              disabled={!isValid || !dirty || isSubmitting}
              type='submit'
              fluid
              size='large'
              color='teal'
              content='Register'
            />
            <Divider horizontal>Or</Divider>
            <SocialLogin />
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default RegisterPage;
