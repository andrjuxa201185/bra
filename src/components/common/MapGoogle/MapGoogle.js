import React from 'react';
import {withGoogleMap, GoogleMap, Marker} from "react-google-maps";

export const MapGoogle = withGoogleMap(({isMarkerShown = false, lat = 0, lng = 0, zoom = 1}) =>
  <GoogleMap
    zoom={zoom}
    center={{lat, lng}}
    defaultZoom={zoom}
    defaultCenter={{lat, lng}}
  >
    {isMarkerShown && <Marker
      position={{lat, lng}}
    />}
  </GoogleMap>
);
