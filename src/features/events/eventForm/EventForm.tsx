/* global google */
import React from 'react';
import { Segment, Header, Button } from 'semantic-ui-react';
import { Formik, Form } from 'formik';
import cuid from 'cuid';
import { IEvent } from '../../../app/common/interfaces/models';
import { Link, RouteComponentProps } from 'react-router-dom';
import {
  EVENTS_PAGE_ROUTE,
  HOME_PAGE_ROUTE,
} from '../../../app/common/constants/routes';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '../../../app/common/interfaces/states';
import {
  createEvent,
  updateEvent,
} from '../../../app/store/events/eventActions';
import * as Yup from 'yup';
import InputText from '../../../app/common/form/InputText';
import InputTextArea from '../../../app/common/form/InputTextArea';
import SelectInput from '../../../app/common/form/SelectInput';
import { categoryData } from '../../../app/api/categoryOptions';
import DateInput from '../../../app/common/form/DateInput';
import PlaceInput from '../../../app/common/form/PlaceInput';

interface IEventFormParams {
  id?: string;
}

interface IEventFormProps extends RouteComponentProps<IEventFormParams> {}

const EventForm: React.FC<IEventFormProps> = ({ history, match }) => {
  const event = useSelector<IRootState, IEvent | undefined>((state) =>
    state.event.events.find((e) => e.id === match.params.id)
  );
  const dispatch = useDispatch();

  const initialValues: any = event ?? {
    title: '',
    category: '',
    description: '',
    /*city: {
      address: '',
      latLng: null,
    },
    venue: {
      address: '',
      latLng: null,
    },*/
    city: '',
    venue: '',
    date: '',
  };

  const validationSchema = Yup.object({
    title: Yup.string().required('You must provide a valid title'),
    category: Yup.string().required('You must provide a valid category'),
    description: Yup.string().required('You must provide a valid description'),
    city: Yup.string().required('City is required'),
    venue: Yup.string().required('Venue is required'),
    /*city: Yup.object().shape({
      address: Yup.string().required('City is required'),
    }),
    venue: Yup.object().shape({
      address: Yup.string().required('Venue is required'),
    }),*/
    date: Yup.string().required('You must provide a valid date'),
  });

  return (
    <Segment clearing>
      <Header content={event ? 'Edit event' : 'Create new event'} />
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          event
            ? dispatch(
                updateEvent({
                  ...event,
                  ...values,
                })
              )
            : dispatch(
                createEvent({
                  ...values,
                  id: cuid(),
                  hostedBy: 'Bob',
                  attendees: [],
                  hostPhotoURL: '/assets/user.png',
                })
              );
          history.push(EVENTS_PAGE_ROUTE);
        }}
      >
        {({ isSubmitting, dirty, isValid, values }) => (
          <Form className='ui form'>
            <Header sub color='teal' content='Event details' />
            <InputText name='title' placeholder='Event title' />
            <SelectInput
              name='category'
              placeholder='Event category'
              options={categoryData}
            />
            <InputTextArea
              name='description'
              placeholder='Event description'
              row={3}
            />
            <Header sub color='teal' content='Event Location Details' />
            <InputText name='city' placeholder='Event city' />
            <InputText name='venue' placeholder='Event venue' />
            {/*<PlaceInput name='city' placeholder='Event city' />
            <PlaceInput
              name='venue'
              placeholder='Event venue'
              disabled={!values.city.latLng}
              options={{
                location: new google.maps.LatLng(values.city.latLng),
                radius: 1000,
                types: ['establishment'],
              }}
            />*/}
            <DateInput
              name='date'
              placeholderText='Event date'
              timeFormat='HH:mm'
              showTimeSelect
              timeCaption='time'
              dateFormat='MMMM d, yyyy h:mm a'
            />
            <Button
              loading={isSubmitting}
              disabled={!isValid || !dirty || isSubmitting}
              type='submit'
              floated='right'
              positive
              content='Submit'
            />
            <Button
              disabled={isSubmitting}
              type='submit'
              floated='right'
              content='Cancel'
              as={Link}
              to={HOME_PAGE_ROUTE}
            />
          </Form>
        )}
      </Formik>
    </Segment>
  );
};

export default EventForm;
