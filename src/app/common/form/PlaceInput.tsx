import React from 'react';
import { FormField, Label, List, Segment } from 'semantic-ui-react';
import { useField, FieldInputProps } from 'formik';
import PlacesAutocomplete, {
  geocodeByAddress,
  geocodeByPlaceId,
  getLatLng,
} from 'react-places-autocomplete';

interface IInputTextProps extends FieldInputProps<any> {
  label: any;
  placeholder: string;
}

// FIXME: Fix type
const PlaceInput: React.FC<any> = ({ label, options, ...props }) => {
  const [field, meta, helpers] = useField(props);

  function handleSelect(address: string): void {
    geocodeByAddress(address)
      .then((results) => getLatLng(results[0]))
      .then((latLng) => helpers.setValue({ address, latLng }))
      .catch((error) => helpers.setError(error));
  }

  function handleBlur(e: any) {
    field.onBlur(e);
    if (!field.value.latLng) {
      helpers.setValue({ address: '', latLng: null });
    }
  }

  return (
    <PlacesAutocomplete
      value={field.value['address']}
      onChange={(value) => helpers.setValue({ address: value })}
      onSelect={(value) => handleSelect(value)}
      searchOptions={options}
    >
      {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
        <FormField error={meta.touched && !!meta.error}>
          <input
            {...getInputProps({
              name: field.name,
              onBlur: (e: any) => handleBlur(e),
              ...props,
            })}
          />
          {meta.touched && meta.error ? (
            <Label basic color='red'>
              {meta.error}
            </Label>
          ) : null}
          {suggestions?.length > 0 && (
            <Segment
              loading={loading}
              style={{
                marginTop: 0,
                position: 'absolute',
                zIndex: 1000,
                width: '100%',
              }}
            >
              <List selection>
                {suggestions.map((suggestion) => (
                  <List.Item {...getSuggestionItemProps(suggestion)}>
                    <List.Header>
                      {suggestion.formattedSuggestion.mainText}
                    </List.Header>
                    <List.Description>
                      {suggestion.formattedSuggestion.secondaryText}
                    </List.Description>
                  </List.Item>
                ))}
              </List>
            </Segment>
          )}
        </FormField>
      )}
    </PlacesAutocomplete>
  );
};

export default PlaceInput;
