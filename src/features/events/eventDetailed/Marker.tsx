import React from 'react';
import { Icon } from 'semantic-ui-react';

interface IMarkerProps{
  lat: number;
  lng: number;
}

const Marker: React.FC<IMarkerProps> = () => {
  return <Icon name='marker' size='big' color='red' />;
};

export default Marker;
