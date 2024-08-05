/* eslint-disable max-classes-per-file, class-methods-use-this */

export default () => {
  /** * Mock Google Maps JavaScript API ** */
  const google = {
    maps: {
      Marker: class {},
      Map: class {
        setTilt() {}

        fitBounds() {}
      },
      LatLngBounds: class {},
      places: {
        Autocomplete: class {
          addListener() {}
        },
        AutocompleteService: class {},
        PlacesServiceStatus: {
          INVALID_REQUEST: "INVALID_REQUEST",
          NOT_FOUND: "NOT_FOUND",
          OK: "OK",
          OVER_QUERY_LIMIT: "OVER_QUERY_LIMIT",
          REQUEST_DENIED: "REQUEST_DENIED",
          UNKNOWN_ERROR: "UNKNOWN_ERROR",
          ZERO_RESULTS: "ZERO_RESULTS",
        },
        PlacesAutocomplete: {
          INVALID_REQUEST: "INVALID_REQUEST",
          NOT_FOUND: "NOT_FOUND",
          OK: "OK",
          OVER_QUERY_LIMIT: "OVER_QUERY_LIMIT",
          REQUEST_DENIED: "REQUEST_DENIED",
          UNKNOWN_ERROR: "UNKNOWN_ERROR",
          ZERO_RESULTS: "ZERO_RESULTS",
        },
      },

      MarkerClusterer: class {},
      Geocoder: class {},
    },
  };

  global.window.google = google;
};
