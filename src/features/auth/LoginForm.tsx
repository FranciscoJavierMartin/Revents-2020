import React from 'react';
import { Formik, Form, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import ModalWrapper from '../../app/common/modals/ModalWrapper';
import InputText from '../../app/common/form/InputText';
import { Button } from 'semantic-ui-react';
import { useDispatch } from 'react-redux';
import { signInUser } from '../../app/store/auth/authActions';
import { closeModal } from '../../app/store/modal/modalActions';

interface IFormValues {
  email: string;
  password: string;
}

const LoginForm: React.FC = () => {
  const dispatch = useDispatch();

  return (
    <ModalWrapper size='mini' header='Sign in to Re-vents'>
      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={Yup.object({
          email: Yup.string().required().email(),
          password: Yup.string().required(),
        })}
        onSubmit={(
          values: IFormValues,
          { setSubmitting }: FormikHelpers<IFormValues>
        ) => {
          dispatch(signInUser(values));
          /*setSubmitting(false);
          dispatch(closeModal());*/
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
    </ModalWrapper>
  );
};

export default LoginForm;
