import React, { useState } from 'react';
import axios from 'axios';

function LocationSearch() {
  const [inputValue, setInputValue] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);

  const locationiqKey = import.meta.env.VITE_LOCATIONIQ_KEY;

  const handleInputChange = async (e) => {
    const value = e.target.value;
    setInputValue(value);

    if (value.length >= 3) {
      try {
        const response = await axios.get('https://api.locationiq.com/v1/autocomplete.php', {
          params: {
            key: locationiqKey,
            q: value,
            format: 'json',
            limit: 5,
          },
        });

        // Print the entire response to the console
        console.log('Autocomplete Response:', response.data);

        const suggestions = response.data.map((item) => ({
          value: item.display_name,
          place_id: item.place_id, // Extract place_id or similar identifier
          data: item,
        }));
        setSuggestions(suggestions);
      } catch (error) {
        console.error('Error fetching suggestions:', error);
      }
    } else {
      setSuggestions([]);
    }
  };

  const handleSelect = async (suggestion) => {
    setSelectedLocation(suggestion.data);
    setInputValue(suggestion.value);
    setSuggestions([]);

    // Print selected location's place_id and other details
    console.log('Selected Location:', suggestion.data);
    console.log('Selected Location Place ID:', suggestion.place_id);

    // Additional Axios Request After Selection
    try {
      const additionalResponse = await axios.get('https://api.locationiq.com/v1/autocomplete.php', {
        params: {
          key: locationiqKey,
          q: suggestion.value,
        },
      });
      console.log('Additional response:', additionalResponse.data);
    } catch (error) {
      console.error('Error fetching additional data:', error);
    }
  };

  const highlight = (text, focus) => {
    const regex = new RegExp(`(${focus})`, 'gi');
    return text.replace(regex, '<strong>$1</strong>');
  };

  return (
    <div className="container">
      <div id="search-box">
        <div className="locationiq-autocomplete-control" id="search-box-area">
          <input
            className="locationiq-autocomplete-input"
            id="search-box-input"
            title="Search"
            placeholder="Search for an address..."
            value={inputValue}
            onChange={handleInputChange}
          />
          <a className="locationiq-autocomplete-search-icon" />
        </div>
      </div>

      <ul id="suggestions">
        {suggestions.map((suggestion, index) => (
          <li key={index} onClick={() => handleSelect(suggestion)}>
            <div
              className="autocomplete-suggestion-name"
              dangerouslySetInnerHTML={{ __html: highlight(suggestion.value, inputValue) }}
            />
          </li>
        ))}
      </ul>

      <div id="result">
        {selectedLocation && (
          <div>
            You have selected {selectedLocation.display_name}
            <br />
            Lat: {selectedLocation.lat}
            <br />
            Lon: {selectedLocation.lon}
          </div>
        )}
      </div>
    </div>
  );
}

export default LocationSearch;