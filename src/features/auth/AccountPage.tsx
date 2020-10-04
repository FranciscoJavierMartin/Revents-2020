import React from 'react';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import { Button, Header, Label, Segment } from 'semantic-ui-react';
import InputText from '../../app/common/form/InputText';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { IAuthState, IRootState } from '../../app/common/interfaces/states';
import { updateUserPassword } from '../../app/api/firestore/firebaseService';

interface IFormValues {
  newPassword: string;
  newPassword2: string;
  auth?: string;
}

const AccountPage: React.FC = () => {
  const { currentUser } = useSelector<IRootState, IAuthState>(
    (state) => state.auth
  );
  const validationSchema = Yup.object({
    newPassword: Yup.string().required(),
    newPassword2: Yup.string().oneOf(
      [Yup.ref('newPassword')],
      'Passwords do not match '
    ),
  });

  return (
    <Segment>
      <Header dividing size='large' content='Account' />
      {currentUser.providerId === 'password' && (
        <>
          <Header color='teal' sub content='Change Password' />
          <p>Use this form to change your password</p>
          <Formik
            initialValues={{ newPassword: '', newPassword2: '' }}
            validationSchema={validationSchema}
            onSubmit={async (
              values: IFormValues,
              { setSubmitting, setErrors }
            ) => {
              try {
                await updateUserPassword(values.newPassword);
              } catch (error) {
                setErrors({ auth: error.message });
              } finally {
                setSubmitting(false);
              }
            }}
          >
            {({ errors, isSubmitting, isValid, dirty }) => (
              <Form className='ui form'>
                <InputText
                  name='newPassword'
                  type='password'
                  placeholder='New Password'
                />
                <InputText
                  name='newPassword2'
                  type='password'
                  placeholder='Confirm Password'
                />
                {errors.auth && (
                  <Label
                    basic
                    color='red'
                    style={{ marginBottom: 10 }}
                    content={errors.auth}
                  />
                )}
                <Button
                  style={{ display: 'block' }}
                  type='submit'
                  disabled={!isValid || isSubmitting || !dirty}
                  loading={isSubmitting}
                  size='large'
                  positive
                  content='Update password'
                />
              </Form>
            )}
          </Formik>
        </>
      )}
      {currentUser.providerId === 'facebook.com' && (
        <>
          <Header color='teal' sub content='Facebook account' />
          <p>Please visit Facebook to upgrade your account</p>
          <Button
            icon='facebook'
            color='facebook'
            as={Link}
            to='https://facebook.com'
            content='Go to facebook'
          />
        </>
      )}
      {currentUser.providerId === 'google.com' && (
        <>
          <Header color='teal' sub content='Google account' />
          <p>Please visit Google to upgrade your account</p>
          <Button
            icon='google'
            color='google plus'
            as={Link}
            to='https://google.com'
            content='Go to Google'
          />
        </>
      )}
    </Segment>
  );
};

export default AccountPage;
