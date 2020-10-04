import React from 'react';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import { Button, Header, Segment } from 'semantic-ui-react';
import InputText from '../../app/common/form/InputText';
import { Link } from 'react-router-dom';

interface IFormValues {
  newPassword: string;
  newPassword2: string;
}

const AccountPage: React.FC = () => {
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
      <div>
        <Header color='teal' sub content='Change Password' />
        <p>Use this form to change your password</p>
        <Formik
          initialValues={{ newPassword: '', newPassword2: '' }}
          validationSchema={validationSchema}
          onSubmit={(values: IFormValues) => {
            console.log(values);
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
              <Button
                type='submit'
                disabled={!isValid || isSubmitting || !dirty}
                size='large'
                positive
                content='Update password'
              />
            </Form>
          )}
        </Formik>
      </div>
      <div>
        <Header color='teal' sub content='Facebook account' />
        <p>Please visit Facebook to upgrade your account</p>
        <Button
          icon='facebook'
          color='facebook'
          as={Link}
          to='https://facebook.com'
          content='Go to facebook'
        />
      </div>
      <div>
        <Header color='teal' sub content='Google account' />
        <p>Please visit Google to upgrade your account</p>
        <Button
          icon='google'
          color='google plus'
          as={Link}
          to='https://google.com'
          content='Go to Google'
        />
      </div>
    </Segment>
  );
};

export default AccountPage;
