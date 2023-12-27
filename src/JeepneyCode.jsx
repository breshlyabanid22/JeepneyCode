
import React from 'react';

const Routes = ({ input }) => {
  const routes = {
    '01A': ['Alpha', 'Bravo', 'Charlie', 'Echo', 'Golf'],
    '02B': ['Alpha', 'Delta', 'Echo', 'Foxtrot', 'Golf'],
    '03C': ['Charlie', 'Delta', 'Foxtrot', 'Hotel', 'India'],
    '04A': ['Charlie', 'Delta', 'Echo', 'Foxtrot', 'Golf'],
    '04D': ['Charlie', 'Echo', 'Foxtrot', 'Golf', 'India'],
    '06B': ['Delta', 'Hotel', 'Juliet', 'Kilo', 'Lima'],
    '06D': ['Delta', 'Foxtrot', 'Golf', 'India', 'Kilo'],
    '10C': ['Foxtrot', 'Golf', 'Hotel', 'India', 'Juliet'],
    '10H': ['Foxtrot', 'Hotel', 'Juliet', 'Lima', 'November'],
    '11A': ['Foxtrot', 'Golf', 'Kilo', 'Mike', 'November'],
    '11B': ['Foxtrot', 'Golf', 'Lima', 'Oscar', 'Papa'],
    '20A': ['India', 'Juliet', 'November', 'Papa', 'Romeo'],
    '20C': ['India', 'Kilo', 'Lima', 'Mike', 'Romeo'],
    '42C': ['Juliet', 'Kilo', 'Lima', 'Mike', 'Oscar'],
    '42D': ['Juliet', 'November', 'Oscar, Quebec', 'Romeo'],
  };

  const processJeepCodes = (inputStr) => {
    const codes = inputStr.split(',');
    const output = [];

    for (const code of codes) {
      const trimmedCode = code.trim();
      if (!trimmedCode.match(/^\d{2}[A-Z]$/)) {
        console.log(`Invalid Jeep Code: ${trimmedCode}`);
        continue;
      }

      const places = routes[trimmedCode] || [];
      output.push({ code: trimmedCode, places });
    }

    return output;
  };

  const findCommonPlaces = (outputs) => {
    const commonElements = {};

    for (let i = 0; i < outputs.length - 1; i++) {
      for (let j = i + 1; j < outputs.length; j++) {
        for (const place of outputs[i].places) {
          if (outputs[j].places.includes(place)) {
            commonElements[place] = true;
          }
        }
      }
    }

    return Object.keys(commonElements);
  };

  const highlightCommonPlaces = (output) => {
    const commonPlaces = findCommonPlaces(output);

    return output.map(({ code, places }) => {
      const highlightedPlaces = places.map((place) => {
        if (commonPlaces.includes(place)) {
          return (
            <span key={place} style={{ color: getColor(commonPlaces.indexOf(place)) }}>
              {place}
            </span>
          );
        } else {
          return <span key={place}>{place}</span>;
        }
      });
      return {
        code,
        places: highlightedPlaces,
      };
    });
  };

  const getColor = (index) => {
    const colors = ['red', 'green', 'purple', 'orange', 'cyan', 'yellow', 'magenta', 'brown'];
    return colors[index % colors.length];
  };

  const renderOutput = () => {
    const output = processJeepCodes(input);

    if (output.length === 0) {
      return <div>No valid Jeep Codes entered.</div>;
    }

    const highlightedOutput = highlightCommonPlaces(output);

    return highlightedOutput.map(({ code, places }, index) => (
      <div key={index}>
        {code} =&gt; {places.length ? places.reduce((acc, place, idx) => (idx === 0 ? [place] : [...acc, ' <-> ', place]), []) : 'No common places'}
      </div>
    ));
  };

  return <div>{renderOutput()}</div>;
};

export default Routes;
