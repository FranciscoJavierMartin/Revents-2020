import React from 'react';
import { useHistory } from 'react-router-dom';
import { Formik, Form, FormikHelpers } from 'formik';
import { Button, Divider, Label } from 'semantic-ui-react';
import InputText from '../../app/common/form/InputText';
import * as Yup from 'yup';
import { signInWithEmailAndPassword } from '../../app/api/firestore/firebaseService';
import { EVENTS_PAGE_ROUTE } from '../../app/common/constants/routes';
import SocialLogin from './SocialLogin';
import { useSelector } from 'react-redux';
import { IRootState } from '../../app/common/interfaces/states';

interface IFormValues {
  email: string;
  password: string;
  auth?: string;
}

interface ILoginPageProps {}

const LoginPage: React.FC<any> = () => {
  const history = useHistory();
  const validationSchema = Yup.object({
    email: Yup.string().required().email(),
    password: Yup.string().required(),
  });
  const { prevLocation } = useSelector<IRootState, any>((state) => state.auth);

  return (
    <div>
      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={validationSchema}
        onSubmit={async (
          values: IFormValues,
          { setSubmitting, setErrors }: FormikHelpers<IFormValues>
        ) => {
          try {
            await signInWithEmailAndPassword(values.email, values.password);
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
            <InputText name='email' placeholder='Email address' />
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
              content='Login'
            />
            <Divider horizontal>Or</Divider>
            <SocialLogin />
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default LoginPage;
