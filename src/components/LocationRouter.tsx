import React from "react";
import { useParams } from "react-router-dom";
import LocationDiscussion from "./LocationDiscussion";
import AddSuggestion from "./AddSuggestion";

// Define which markers are empty land
const emptyLandMarkers = [
  "marker1",
  "marker2",
  "marker3",
  "marker7",
  "marker8",
  "marker9",
  "marker12",
];

const LocationRouter: React.FC = () => {
  const { locationId } = useParams<{ locationId: string }>();

  // Check if this is an empty land marker
  const isEmptyLand = locationId && emptyLandMarkers.includes(locationId);

  if (isEmptyLand) {
    return <AddSuggestion />;
  } else {
    return <LocationDiscussion />;
  }
};

export default LocationRouter;
