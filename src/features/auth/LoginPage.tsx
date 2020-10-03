import React from 'react';
import { Formik, Form, FormikHelpers } from 'formik';
import { Button } from 'semantic-ui-react';
import InputText from '../../app/common/form/InputText';
import * as Yup from 'yup';
import { signInUser } from '../../app/store/auth/authActions';
import { useDispatch } from 'react-redux';
import { signInWithEmailAndPassword } from '../../app/api/firestore/firebaseService';

interface IFormValues {
  email: string;
  password: string;
}

const LoginPage = () => {
  const dispatch = useDispatch();
  const validationSchema = Yup.object({
    email: Yup.string().required().email(),
    password: Yup.string().required(),
  });
  return (
    <div>
      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={validationSchema}
        onSubmit={async (
          values: IFormValues,
          { setSubmitting }: FormikHelpers<IFormValues>
        ) => {
          try {
            await signInWithEmailAndPassword(values.email, values.password);
            setSubmitting(false);
          } catch (error) {
            console.log(error);
          }
          // dispatch(closeModal());
        }}
      >
        {({ isSubmitting, isValid, dirty }) => (
          <Form className='ui form'>
            <InputText name='email' placeholder='Email address' />
            <InputText name='password' placeholder='Password' type='password' />
            <Button
              loading={isSubmitting}
              disabled={!isValid || !dirty || isSubmitting}
              type='submit'
              fluid
              size='large'
              color='teal'
              content='Login'
            />
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default LoginPage;
