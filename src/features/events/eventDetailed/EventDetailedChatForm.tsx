import { Field, Form, Formik } from 'formik';
import React from 'react';
import { toast } from 'react-toastify';
import { Loader } from 'semantic-ui-react';
import * as Yup from 'yup';
import { addEventChatComment } from '../../../app/api/firestore/firebaseService';

interface IEventDetailedChatFormProps {
  eventId: string;
  parentId?: string;
  closeForm?: React.Dispatch<
    React.SetStateAction<{
      open: boolean;
      commentId: string;
    }>
  >;
}

interface IFormValues {
  comment: string;
}

const EventDetailedChatForm: React.FC<IEventDetailedChatFormProps> = ({
  eventId,
  parentId,
  closeForm,
}) => {
  const validationSchema = Yup.object({
    comment: Yup.string().required(),
  });

  return (
    <Formik
      initialValues={{ comment: '' }}
      validationSchema={validationSchema}
      onSubmit={async (values: IFormValues, { setSubmitting, resetForm }) => {
        try {
          await addEventChatComment(eventId, values.comment, parentId);
          resetForm();
        } catch (error) {
          toast.error(error.message);
        } finally {
          setSubmitting(false);
          if (closeForm) {
            closeForm({ open: false, commentId: '' });
          }
        }
      }}
    >
      {({ isSubmitting, handleSubmit, isValid }) => (
        <Form className='ui form'>
          <Field name='comment'>
            {({ field }: any) => (
              <div style={{ position: 'relative' }}>
                <Loader active={isSubmitting} />
                <textarea
                  rows={2}
                  {...field}
                  placeholder='Enter your comment (Enter to submit, SHIFT + Enter for new line)'
                  onKeyPress={(e: React.KeyboardEvent<HTMLTextAreaElement>) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      if (isValid) {
                        handleSubmit();
                      }
                    }
                  }}
                ></textarea>
              </div>
            )}
          </Field>
        </Form>
      )}
    </Formik>
  );
};

export default EventDetailedChatForm;
