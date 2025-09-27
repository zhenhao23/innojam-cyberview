import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./GoogleMap.css";

interface GoogleMapProps {
  apiKey: string;
  center?: string;
  zoom?: number;
  mapId?: string;
}

const CYBERJAYA_BOUNDS = {
  north: 2.978, // top + padding
  south: 2.868, // bottom - padding
  west: 101.612, // left - padding
  east: 101.703, // right + padding
};

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
    navigateToLocation?: (id: string) => void;
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

  const customMarkers: CustomMarker[] = [
    {
      id: "marker1",
      position: { lat: 2.907339562947603, lng: 101.65639822584465 },
      color: "#28a745",
      title: "Empty Land - Site A",
      description: "Underutilized land with potential for community development",
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
      color: "#17a2b8",
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
      color: "#dc3545",
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
    let mounted = true;
    containerRef.current!.innerHTML = `
      <!-- Hamburger button + menu -->
      <button id="hamburger-btn" class="hamburger-btn" aria-label="Open menu" aria-expanded="false">☰</button>
      <div id="hamburger-menu" class="hamburger-menu" aria-hidden="true">
        <div id="menu-address" class="menu-row menu-address"></div>
        <button id="menu-satellite" class="menu-row menu-action">🛰️ Satellite</button>
        <button id="menu-business" class="menu-row menu-action">🏢 Business</button>
        <button id="menu-settings" class="menu-row menu-action">⚙️ Settings</button>
        <button id="menu-profile" class="menu-row menu-action">👤 Profile</button>
      </div>

      <!-- The gmp loader + map + inline controls (kept from your original) -->
      <gmpx-api-loader key="${apiKey}" solution-channel="GMP_GE_mapsandplacesautocomplete_v2"></gmpx-api-loader>
      <div class="map-controls">
        <button id="view-toggle-btn" class="view-toggle-button">🛰️ Satellite</button>
      </div>
      <gmp-map center="${center}" zoom="${zoom}" map-id="${mapId}">
        <div slot="control-block-start-inline-start" class="place-picker-container">
          <gmpx-place-picker placeholder="Enter an address"></gmpx-place-picker>
        </div>
        <gmp-advanced-marker id="center-marker"></gmp-advanced-marker>
        <gmp-advanced-marker id="search-marker"></gmp-advanced-marker>
      </gmp-map>
    `;

    const init = async () => {
      if (!mounted || !containerRef.current) return;

      // Wait for custom elements definitions
      await customElements.whenDefined("gmp-map");
      // gmpx-place-picker is used both inside map and inside menu; wait for it too
      await customElements.whenDefined("gmpx-place-picker");

      if (!mounted || !containerRef.current) return;

      const map = containerRef.current.querySelector("gmp-map") as any;
      const centerMarker = containerRef.current.querySelector("#center-marker") as any;
      const searchMarker = containerRef.current.querySelector("#search-marker") as any;
      const placePicker = containerRef.current.querySelector("gmpx-place-picker") as any;

      const hamburgerBtn = containerRef.current.querySelector("#hamburger-btn") as HTMLButtonElement;
      const hamburgerMenu = containerRef.current.querySelector("#hamburger-menu") as HTMLDivElement;
      const menuAddressContainer = containerRef.current.querySelector("#menu-address") as HTMLDivElement;
      const menuSatelliteBtn = containerRef.current.querySelector("#menu-satellite") as HTMLButtonElement;
      const menuBusinessBtn = containerRef.current.querySelector("#menu-business") as HTMLButtonElement;
      const menuSettingsBtn = containerRef.current.querySelector("#menu-settings") as HTMLButtonElement;
      const menuProfileBtn = containerRef.current.querySelector("#menu-profile") as HTMLButtonElement;
      const toggleButton = containerRef.current.querySelector("#view-toggle-btn") as HTMLButtonElement;

      if (!map || !centerMarker || !searchMarker || !placePicker || !window.google) {
        console.warn("Map or required elements not found or window.google missing");
        return;
      }

      const infowindow = new window.google.maps.InfoWindow();

      // center marker
      const [lat, lng] = center.split(",").map(Number);
      centerMarker.position = { lat, lng };

      map.innerMap.setOptions({
        mapTypeControl: false,
        mapTypeId: window.google.maps.MapTypeId.HYBRID,
        restriction: {
          latLngBounds: CYBERJAYA_BOUNDS,
          strictBounds: true,
        },
      });

      // Street View panorama
      const panorama = map.innerMap.getStreetView();

      // HELPERS
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

      const showInfo = (marker: any, data: any) => {
        const content = `
          <div class="marker-tooltip">
            <h3 style="margin: 0 0 10px 0; color: #333;">${data.title}</h3>
            <p style="margin: 0 0 8px 0; color: #666;">${data.description}</p>
            <div class="marker-details">
              <p><strong>Type:</strong> ${data.details.type}</p>
              <p><strong>Severity:</strong> <span style="color: ${getSeverityColor(data.details.severity)}">${data.details.severity}</span></p>
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
                ${data.id === "marker3" ? "➕ Add Suggestion" : "💬 View Discussion"}
              </button>
            </div>
          </div>
        `;
        infowindow.setContent(content);
        try {
          infowindow.open(marker.getMap(), marker);
        } catch {
          infowindow.open(map.innerMap, marker);
        }
      };

      // Make navigateToLocation available for inline button
      window.navigateToLocation = (locationId: string) => {
        navigate(`/location/${locationId}`);
      };

      // Add markers (single shared google.maps.Marker per item, moved to panorama when needed)
      customMarkers.forEach((markerData) => {
        const svg = `
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32">
            <circle cx="16" cy="16" r="10" fill="${markerData.color}" stroke="white" stroke-width="2"/>
          </svg>
        `;
        const iconUrl = `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;

        const sharedMarker = new window.google.maps.Marker({
          position: markerData.position,
          title: markerData.title,
          icon: {
            url: iconUrl,
            scaledSize: new window.google.maps.Size(28, 28),
            anchor: new window.google.maps.Point(14, 14),
          },
          map: map.innerMap,
          clickable: true,
        });

        sharedMarker.addListener("click", () => showInfo(sharedMarker, markerData));

        const updateMarkerParent = () => {
          try {
            const svVisible = typeof panorama.getVisible === "function"
              ? panorama.getVisible()
              : !!(panorama && (panorama as any).visible);
            if (svVisible) {
              sharedMarker.setMap(panorama);
            } else {
              sharedMarker.setMap(map.innerMap);
            }
          } catch (err) {
            sharedMarker.setMap(map.innerMap);
            console.error("Error updating marker parent:", err);
          }
        };

        updateMarkerParent();
        panorama.addListener("visible_changed", updateMarkerParent);
      });

      // ---------- PLACE PICKER HANDLING ----------
      // Create a place-picker inside the hamburger menu (menuPlacePicker) and wire it up.
      const menuPlacePicker = document.createElement("gmpx-place-picker");
      menuPlacePicker.setAttribute("placeholder", "Enter an address");
      menuPlacePicker.setAttribute("class", "menu-place-picker");
      if (menuAddressContainer) menuAddressContainer.appendChild(menuPlacePicker);

      const handlePlaceSelection = (picker: any) => {
        const place = picker.value;
        if (!place || !place.location) {
          window.alert("No details available for input: '" + (place?.name ?? "") + "'");
          infowindow.close();
          searchMarker.position = null;
          return;
        }

        if (place.viewport) {
          map.innerMap.fitBounds(place.viewport);
        } else {
          map.center = place.location;
          map.zoom = 17;
        }

        searchMarker.position = place.location;
        infowindow.setContent(`<strong>${place.displayName}</strong><br><span>${place.formattedAddress || ""}</span>`);
        infowindow.open(map.innerMap, searchMarker);

        // Close hamburger menu if open
        if (hamburgerMenu && hamburgerMenu.classList.contains("open")) {
          hamburgerMenu.classList.remove("open");
          hamburgerMenu.setAttribute("aria-hidden", "true");
          if (hamburgerBtn) hamburgerBtn.setAttribute("aria-expanded", "false");
        }
      };

      // Listen to both place pickers (the one inside map & the one in menu)
      menuPlacePicker.addEventListener("gmpx-placechange", () => handlePlaceSelection(menuPlacePicker));
      placePicker.addEventListener("gmpx-placechange", () => handlePlaceSelection(placePicker));

      // ---------- HAMBURGER TOGGLE ----------
      const toggleMenu = () => {
        if (!hamburgerMenu || !hamburgerBtn) return;
        const isOpen = hamburgerMenu.classList.toggle("open");
        hamburgerMenu.setAttribute("aria-hidden", isOpen ? "false" : "true");
        hamburgerBtn.setAttribute("aria-expanded", String(isOpen));
      };

      hamburgerBtn?.addEventListener("click", toggleMenu);

      // ---------- VIEW TOGGLE / SATELLITE ----------
      let isHybridView = true;
      const setViewButtonState = () => {
        if (!toggleButton || !menuSatelliteBtn) return;
        if (isHybridView) {
          toggleButton.innerHTML = "🛰️ Satellite";
          toggleButton.title = "Switch to Satellite view";
          menuSatelliteBtn.textContent = "🛰️ Satellite";
        } else {
          toggleButton.innerHTML = "🗺️ Hybrid";
          toggleButton.title = "Switch to Hybrid view";
          menuSatelliteBtn.textContent = "🗺️ Hybrid";
        }
      };

      const toggleMapView = () => {
        if (!map || !window.google) return;
        if (isHybridView) {
          map.innerMap.setOptions({ mapTypeId: window.google.maps.MapTypeId.SATELLITE });
          isHybridView = false;
        } else {
          map.innerMap.setOptions({ mapTypeId: window.google.maps.MapTypeId.HYBRID });
          isHybridView = true;
        }
        setViewButtonState();
      };

      toggleButton?.addEventListener("click", toggleMapView);
      menuSatelliteBtn?.addEventListener("click", () => {
        toggleMapView();
        // close menu after selection
        if (hamburgerMenu?.classList.contains("open")) toggleMenu();
      });

      setViewButtonState();

      // ---------- MENU NAV ACTIONS ----------
      menuBusinessBtn?.addEventListener("click", () => {
        navigate("/business");
        if (hamburgerMenu?.classList.contains("open")) toggleMenu();
      });
      menuSettingsBtn?.addEventListener("click", () => {
        navigate("/settings");
        if (hamburgerMenu?.classList.contains("open")) toggleMenu();
      });
      menuProfileBtn?.addEventListener("click", () => {
        navigate("/profile");
        if (hamburgerMenu?.classList.contains("open")) toggleMenu();
      });
    };

    init();

    return () => {
      mounted = false;
      // clear injected DOM so listeners are gone
      try {
        if (containerRef.current) containerRef.current.innerHTML = "";
      } catch (e) {
        console.warn("Error during cleanup", e);
      }
      // Remove global function
      try {
        delete (window as any).navigateToLocation;
      } catch {}
    };
  }, [apiKey, center, zoom, mapId, navigate]);

  return <div className="google-map-container" ref={containerRef}></div>;
};

export default GoogleMap;
