import React, { useEffect, useCallback } from "react";

import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng
} from "react-places-autocomplete";

const Map = props => {
  const [address, setAddress] = React.useState("");

  const { updateLocation } = props;

  useEffect(() => {
    updateLocation(address);
  }, [address]);

  const handleSelect = async value => {
    const results = await geocodeByAddress(value);
    console.log(results[0].address_components);
    const locale = results[0].address_components.find(
      address =>
        address.types.includes("locality") ||
        address.types.includes("postal_town") ||
        address.types.includes("establishment")
    );
    const country = results[0].address_components.find(address =>
      address.types.includes("country")
    );
    setAddress(locale.long_name + ", " + country.long_name);
  };

  return (
    <div>
      <PlacesAutocomplete
        value={address}
        onChange={setAddress}
        onSelect={handleSelect}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div>
            <input className="form-control" {...getInputProps({ placeholder: "Enter Location" })} />

            <div>
              {loading ? <div>...loading</div> : null}

              {suggestions.map(suggestion => {
                const style = suggestion.active
                  ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                  : { backgroundColor: '#ffffff', cursor: 'pointer' };

                return (
                  <div
                    {...getSuggestionItemProps(suggestion, {
                      style,
                    })}
                  >
                    <span>{suggestion.description}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </PlacesAutocomplete>
    </div>
  );
};

export default Map;
