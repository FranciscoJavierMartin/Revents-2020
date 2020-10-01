import React from 'react';
import { Segment } from 'semantic-ui-react';
import GoogleMapReact from 'google-map-react';
import Marker from './Marker';
import { ILatLng } from '../../../app/common/interfaces/models';

interface IEventDetailedMap {
  latLng: ILatLng;
}

const EventDetailedMap: React.FC<IEventDetailedMap> = ({ latLng }) => {
  const zoom = 14;
  return (
    <Segment attached='bottom' style={{ padding: 0 }}>
      <div style={{ height: 300, width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{
            key: process.env.REACT_APP_API_KEY_GOOGLE_MAPS || '',
          }}
          center={latLng}
          zoom={zoom}
        >
          <Marker lat={latLng.lat} lng={latLng.lng}/>
        </GoogleMapReact>
      </div>
    </Segment>
  );
};

export default EventDetailedMap;
