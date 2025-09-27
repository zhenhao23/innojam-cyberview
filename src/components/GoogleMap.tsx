import { useEffect, useRef } from "react";
import "./GoogleMap.css";

interface GoogleMapProps {
  apiKey: string;
  center?: string;
  zoom?: number;
  mapId?: string;
}

interface CustomMarker {
  id: string;
  position: { lat: number; lng: number };
  color: string;
  title: string;
  description: string;
  details: {
    type: string;
    severity: string;
    reportedBy: string;
    timestamp: string;
  };
}

declare global {
  interface Window {
    google: any;
  }
}

const GoogleMap: React.FC<GoogleMapProps> = ({
  apiKey,
  center = "40.749933,-73.98633",
  zoom = 13,
  mapId = "DEMO_MAP_ID",
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Hardcoded markers with different colors and mock data
  const customMarkers: CustomMarker[] = [
    {
      id: "marker1",
      position: { lat: 2.907339562947603, lng: 101.65639822584465 },
      color: "#FF0000", // Red
      title: "ABC Hotel - Security Breach",
      description: "Unauthorized access to guest WiFi network detected",
      details: {
        type: "Network Intrusion",
        severity: "High",
        reportedBy: "Hotel Security System",
        timestamp: "2025-09-27 16:45:00",
      },
    },
    {
      id: "marker2",
      position: { lat: 2.9108112262010852, lng: 101.65535752875653 },
      color: "#FFA500", // Orange
      title: "123 Center - Malware Alert",
      description: "Suspicious file activity in building network",
      details: {
        type: "Malware Detection",
        severity: "Medium",
        reportedBy: "Automated Security Scanner",
        timestamp: "2025-09-27 15:22:00",
      },
    },
  ];

  useEffect(() => {
    const init = async () => {
      if (!containerRef.current) return;

      // Create the HTML structure with custom markers
      const customMarkersHTML = customMarkers
        .map(
          (marker) =>
            `<gmp-advanced-marker id="${marker.id}" position="${marker.position.lat},${marker.position.lng}">
          <div class="custom-marker" style="background-color: ${marker.color}; width: 20px; height: 20px; border-radius: 50%; border: 2px solid white; cursor: pointer;"></div>
        </gmp-advanced-marker>`
        )
        .join("");

      containerRef.current.innerHTML = `
        <gmpx-api-loader key="${apiKey}" solution-channel="GMP_GE_mapsandplacesautocomplete_v2"></gmpx-api-loader>
        <gmp-map center="${center}" zoom="${zoom}" map-id="${mapId}">
          <div slot="control-block-start-inline-start" class="place-picker-container">
            <gmpx-place-picker placeholder="Enter an address"></gmpx-place-picker>
          </div>
          <gmp-advanced-marker id="center-marker"></gmp-advanced-marker>
          <gmp-advanced-marker id="search-marker"></gmp-advanced-marker>
          ${customMarkersHTML}
        </gmp-map>
      `;

      // Wait for the custom elements to be defined
      await customElements.whenDefined("gmp-map");

      const map = containerRef.current.querySelector("gmp-map") as any;
      const centerMarker = containerRef.current.querySelector(
        "#center-marker"
      ) as any;
      const searchMarker = containerRef.current.querySelector(
        "#search-marker"
      ) as any;
      const placePicker = containerRef.current.querySelector(
        "gmpx-place-picker"
      ) as any;

      if (
        !map ||
        !centerMarker ||
        !searchMarker ||
        !placePicker ||
        !window.google
      )
        return;

      const infowindow = new window.google.maps.InfoWindow();

      // Set the center marker to always show at the map center
      const [lat, lng] = center.split(",").map(Number);
      centerMarker.position = { lat, lng };

      map.innerMap.setOptions({
        mapTypeControl: false,
        mapTypeId: window.google.maps.MapTypeId.HYBRID,
      });

      // Add click listeners to custom markers
      customMarkers.forEach((markerData) => {
        const markerElement = containerRef.current?.querySelector(
          `#${markerData.id}`
        ) as any;
        if (markerElement) {
          markerElement.addEventListener("click", () => {
            const content = `
              <div class="marker-tooltip">
                <h3 style="margin: 0 0 10px 0; color: #333;">${
                  markerData.title
                }</h3>
                <p style="margin: 0 0 8px 0; color: #666;">${
                  markerData.description
                }</p>
                <div class="marker-details">
                  <p><strong>Type:</strong> ${markerData.details.type}</p>
                  <p><strong>Severity:</strong> <span style="color: ${getSeverityColor(
                    markerData.details.severity
                  )}">${markerData.details.severity}</span></p>
                  <p><strong>Reported By:</strong> ${
                    markerData.details.reportedBy
                  }</p>
                  <p><strong>Timestamp:</strong> ${
                    markerData.details.timestamp
                  }</p>
                </div>
              </div>
            `;

            infowindow.setContent(content);
            infowindow.open(map.innerMap, markerElement);
          });
        }
      });

      // Helper function to get severity color
      function getSeverityColor(severity: string): string {
        switch (severity.toLowerCase()) {
          case "critical":
            return "#FF0000";
          case "high":
            return "#FF4500";
          case "medium":
            return "#FFA500";
          case "low":
            return "#32CD32";
          default:
            return "#666";
        }
      }

      placePicker.addEventListener("gmpx-placechange", () => {
        const place = placePicker.value;

        if (!place.location) {
          window.alert("No details available for input: '" + place.name + "'");
          infowindow.close();
          // Hide the search marker but keep the center marker
          searchMarker.position = null;
          return;
        }

        if (place.viewport) {
          map.innerMap.fitBounds(place.viewport);
        } else {
          map.center = place.location;
          map.zoom = 17;
        }

        // Show the search result marker
        searchMarker.position = place.location;
        infowindow.setContent(
          `<strong>${place.displayName}</strong><br>
           <span>${place.formattedAddress}</span>`
        );
        infowindow.open(map.innerMap, searchMarker);
      });
    };

    // Initialize when the component mounts
    init();
  }, [apiKey, center, zoom, mapId]);

  return <div className="google-map-container" ref={containerRef}></div>;
};

export default GoogleMap;
