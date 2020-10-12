import React from 'react';
import { Header, Menu } from 'semantic-ui-react';
import Calendar from 'react-calendar';
import { useDispatch, useSelector } from 'react-redux';
import {
  IEventsState,
  IRootState,
} from '../../../app/common/interfaces/states';
import {
  setFilter,
  setStartDate,
} from '../../../app/store/events/eventActions';

interface IEventFilterProps {
  isLoading: boolean;
}

const EventFilters: React.FC<IEventFilterProps> = ({ isLoading }) => {
  const dispatch = useDispatch();
  const { filter, startDate } = useSelector<IRootState, IEventsState>(
    (state) => state.event
  );

  return (
    <>
      <Menu vertical size='large' style={{ width: '100%' }}>
        <Header icon='filter' attached color='teal' content='Filters' />
        <Menu.Item
          content='All Events'
          active={filter === 'all'}
          onClick={() => dispatch(setFilter('all'))}
          disabled={isLoading}
        />
        <Menu.Item
          content="I'm going"
          active={filter === 'isGoing'}
          onClick={() => dispatch(setFilter('isGoing'))}
          disabled={isLoading}
        />
        <Menu.Item
          content="I'm hosting"
          active={filter === 'isHosting'}
          onClick={() => dispatch(setFilter('isHosting'))}
          disabled={isLoading}
        />
      </Menu>
      <Header icon='calendar' attached color='teal' content='Select date' />
      <Calendar
        onChange={(date) => dispatch(setStartDate(date as Date))}
        value={startDate || new Date()}
        tileDisabled={() => isLoading}
      />
    </>
  );
};

export default EventFilters;
