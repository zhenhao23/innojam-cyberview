import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();

  // Hardcoded markers with different colors and mock data
  const customMarkers: CustomMarker[] = [
    {
      id: "marker1",
      position: { lat: 2.907339562947603, lng: 101.65639822584465 },
      color: "#28a745", // Green
      title: "Empty Land - Site A",
      description:
        "Underutilized land with potential for community development",
      details: {
        type: "Community Development",
        severity: "Opportunity",
        reportedBy: "Community Planning Committee",
        timestamp: "2025-09-27 10:30:00",
      },
    },
    {
      id: "marker2",
      position: { lat: 2.9108112262010852, lng: 101.65535752875653 },
      color: "#17a2b8", // Blue
      title: "Empty Land - Site B",
      description: "Prime location for recreational facilities development",
      details: {
        type: "Land Development",
        severity: "High Priority",
        reportedBy: "Residents Association",
        timestamp: "2025-09-27 11:15:00",
      },
    },
    {
      id: "marker3",
      position: { lat: 2.914325025735, lng: 101.66068615884222 },
      color: "#dc3545", // Red
      title: "Empty Land - Site C",
      description: "Strategic location for mixed-use development project",
      details: {
        type: "Mixed-Use Development",
        severity: "Medium Priority",
        reportedBy: "Urban Planning Department",
        timestamp: "2025-09-27 12:00:00",
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
        <div class="map-controls">
          <button id="view-toggle-btn" class="view-toggle-button">
            🛰️ Satellite
          </button>
        </div>
        <gmp-map center="${center}" zoom="${zoom}" map-id="${mapId}">
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

      if (!map || !centerMarker || !searchMarker || !window.google) return;

      const infowindow = new window.google.maps.InfoWindow();

      // Set the center marker to always show at the map center
      const [lat, lng] = center.split(",").map(Number);
      centerMarker.position = { lat, lng };

      map.innerMap.setOptions({
        mapTypeControl: false,
        mapTypeId: window.google.maps.MapTypeId.HYBRID,
      });

      // Add view toggle functionality
      let isHybridView = true;
      const toggleButton = containerRef.current.querySelector(
        "#view-toggle-btn"
      ) as HTMLButtonElement;

      if (toggleButton) {
        toggleButton.addEventListener("click", () => {
          if (isHybridView) {
            // Switch to Satellite view
            map.innerMap.setOptions({
              mapTypeId: window.google.maps.MapTypeId.SATELLITE,
            });
            toggleButton.innerHTML = "🗺️ Hybrid";
            toggleButton.title = "Switch to Hybrid view";
            isHybridView = false;
          } else {
            // Switch to Hybrid view
            map.innerMap.setOptions({
              mapTypeId: window.google.maps.MapTypeId.HYBRID,
            });
            toggleButton.innerHTML = "🛰️ Satellite";
            toggleButton.title = "Switch to Satellite view";
            isHybridView = true;
          }
        });
      }

      // Get Street View panorama
      const panorama = map.innerMap.getStreetView();

      // Helper function to show InfoWindow that works in both map and street view
      const showInfo = (marker: any, data: any) => {
        const content = `
          <div class="marker-tooltip">
            <h3 style="margin: 0 0 10px 0; color: #333;">${data.title}</h3>
            <p style="margin: 0 0 8px 0; color: #666;">${data.description}</p>
            <div class="marker-details">
              <p><strong>Type:</strong> ${data.details.type}</p>
              <p><strong>Severity:</strong> <span style="color: ${getSeverityColor(
                data.details.severity
              )}">${data.details.severity}</span></p>
              <p><strong>Reported By:</strong> ${data.details.reportedBy}</p>
              <p><strong>Timestamp:</strong> ${data.details.timestamp}</p>
            </div>
            <div style="margin-top: 15px; text-align: center;">
              <button 
                onclick="window.navigateToLocation('${data.id}')"
                style="
                  background: #007bff; 
                  color: white; 
                  border: none; 
                  padding: 8px 16px; 
                  border-radius: 4px; 
                  cursor: pointer;
                  font-size: 14px;
                  font-weight: 600;
                  transition: background-color 0.2s;
                "
                onmouseover="this.style.backgroundColor='#0056b3'"
                onmouseout="this.style.backgroundColor='#007bff'"
              >
                ${
                  data.id === "marker3"
                    ? "➕ Add Suggestion"
                    : "💬 View Discussion"
                }
              </button>
            </div>
          </div>
        `;

        infowindow.setContent(content);
        infowindow.open(marker.getMap(), marker); // automatically detects map or panorama
      };

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

      // Add custom markers to both Map and Street View
      customMarkers.forEach((markerData) => {
        // Create SVG icon for the marker
        const svg = `
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32">
            <circle cx="16" cy="16" r="10" fill="${markerData.color}" stroke="white" stroke-width="2"/>
          </svg>
        `;
        const iconUrl = `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(
          svg
        )}`;

        const markerOptions = {
          position: markerData.position,
          title: markerData.title,
          icon: {
            url: iconUrl,
            scaledSize: new window.google.maps.Size(28, 28),
            anchor: new window.google.maps.Point(14, 14),
          },
        };

        // Create marker for regular map view
        const mapMarker = new window.google.maps.Marker({
          ...markerOptions,
          map: map.innerMap,
        });

        // Create marker for street view
        const panoMarker = new window.google.maps.Marker({
          ...markerOptions,
          map: panorama,
        });

        // Set up navigation function
        (window as any).navigateToLocation = (locationId: string) => {
          console.log("Navigating to location:", locationId);
          navigate(`/location/${locationId}`);
        };

        // Add click listeners for both markers
        mapMarker.addListener("click", () => showInfo(mapMarker, markerData));
        panoMarker.addListener("click", () => showInfo(panoMarker, markerData));
      });

      // Add click listeners to custom markers
      customMarkers.forEach((markerData) => {
        const markerElement = containerRef.current?.querySelector(
          `#${markerData.id}`
        ) as any;
        if (markerElement) {
          markerElement.addEventListener("click", () => {
            // Create a global function for navigation
            (window as any).navigateToLocation = (locationId: string) => {
              console.log("Navigating to location:", locationId);
              navigate(`/location/${locationId}`);
            };

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
                <div style="margin-top: 15px; text-align: center;">
                  <button 
                    onclick="window.navigateToLocation('${markerData.id}')"
                    style="
                      background: #007bff; 
                      color: white; 
                      border: none; 
                      padding: 8px 16px; 
                      border-radius: 4px; 
                      cursor: pointer;
                      font-size: 14px;
                      font-weight: 600;
                      transition: background-color 0.2s;
                    "
                    onmouseover="this.style.backgroundColor='#0056b3'"
                    onmouseout="this.style.backgroundColor='#007bff'"
                  >
                    ${
                      markerData.id === "marker3"
                        ? "➕ Add Suggestion"
                        : "💬 View Discussion"
                    }
                  </button>
                </div>
              </div>
            `;

            infowindow.setContent(content);
            infowindow.open(map.innerMap, markerElement);
          });
        }
      });
    };

    // Initialize when the component mounts
    init();
  }, [apiKey, center, zoom, mapId]);

  return <div className="google-map-container" ref={containerRef}></div>;
};

export default GoogleMap;
