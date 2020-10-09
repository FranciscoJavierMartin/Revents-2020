import React from 'react';
import { Header, Menu } from 'semantic-ui-react';
import Calendar from 'react-calendar';
import {
  FilterKeyType,
  FilterValueType,
} from '../../../app/common/constants/customTypes';

interface IEventFilterProps {
  predicate: Map<FilterKeyType, FilterValueType>;
  setPredicate: (key: FilterKeyType, value: FilterValueType) => void;
  isLoading: boolean;
}

const EventFilters: React.FC<IEventFilterProps> = ({
  predicate,
  setPredicate,
  isLoading,
}) => {
  return (
    <>
      <Menu vertical size='large' style={{ width: '100%' }}>
        <Header icon='filter' attached color='teal' content='Filters' />
        <Menu.Item
          content='All Events'
          active={predicate.get('filter') === 'all'}
          onClick={() => setPredicate('filter', 'all')}
          disabled={isLoading}
        />
        <Menu.Item
          content="I'm going"
          active={predicate.get('filter') === 'isGoing'}
          onClick={() => setPredicate('filter', 'isGoing')}
          disabled={isLoading}
        />
        <Menu.Item
          content="I'm hosting"
          active={predicate.get('filter') === 'isHosting'}
          onClick={() => setPredicate('filter', 'isHosting')}
          disabled={isLoading}
        />
      </Menu>
      <Header icon='calendar' attached color='teal' content='Select date' />
      <Calendar
        onChange={(date) => setPredicate('startDate', date as Date)}
        value={predicate.get('startDate') as Date || new Date()}
        tileDisabled={() => isLoading}
      />
    </>
  );
};

export default EventFilters;
