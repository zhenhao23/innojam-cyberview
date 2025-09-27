export interface LocationData {
  id: string;
  position: { lat: number; lng: number };
  title: string;
  description: string;
  details: {
    type: string;
    severity: string;
    reportedBy: string;
    timestamp: string;
  };
}

export const getLocationData = (locationId: string): LocationData | null => {
  const locationDataMap: { [key: string]: LocationData } = {
    marker1: {
      id: "marker1",
      position: { lat: 2.907339562947603, lng: 101.65639822584465 },
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
    marker2: {
      id: "marker2",
      position: { lat: 2.9108112262010852, lng: 101.65535752875653 },
      title: "Empty Land - Site B",
      description: "Prime location for recreational facilities development",
      details: {
        type: "Land Development",
        severity: "High Priority",
        reportedBy: "Residents Association",
        timestamp: "2025-09-27 11:15:00",
      },
    },
    marker3: {
      id: "marker3",
      position: { lat: 2.914325025735, lng: 101.66068615884222 },
      title: "Empty Land - Site C",
      description: "Strategic location for mixed-use development project",
      details: {
        type: "Mixed-Use Development",
        severity: "Medium Priority",
        reportedBy: "Urban Planning Department",
        timestamp: "2025-09-27 12:00:00",
      },
    },
    marker4: {
      id: "marker4",
      position: { lat: 2.922354813841049, lng: 101.65098945282865 },
      title: "DPULZE Shopping Centre",
      description: "Major shopping and entertainment destination",
      details: {
        type: "Commercial Development",
        severity: "Established",
        reportedBy: "Business Directory",
        timestamp: "2025-09-28 09:00:00",
      },
    },
    marker5: {
      id: "marker5",
      position: { lat: 2.9200082218157664, lng: 101.63701446548157 },
      title: "Tamarind Square",
      description: "Shopping and dining complex",
      details: {
        type: "Commercial Development",
        severity: "Established",
        reportedBy: "Business Directory",
        timestamp: "2025-09-28 09:15:00",
      },
    },
    marker6: {
      id: "marker6",
      position: { lat: 2.9709630006915897, lng: 101.7136466374846 },
      title: "IOI City Mall",
      description: "Large-scale shopping mall and entertainment complex",
      details: {
        type: "Commercial Development",
        severity: "Established",
        reportedBy: "Business Directory",
        timestamp: "2025-09-28 09:30:00",
      },
    },
    marker7: {
      id: "marker7",
      position: { lat: 2.9089907224210494, lng: 101.65254974923516 },
      title: "Empty Land - Site D",
      description: "Available land for potential development",
      details: {
        type: "Land Development",
        severity: "Opportunity",
        reportedBy: "Land Survey Team",
        timestamp: "2025-09-28 10:00:00",
      },
    },
    marker8: {
      id: "marker8",
      position: { lat: 2.9309723998086588, lng: 101.66299624296362 },
      title: "Empty Land - Site E",
      description: "Vacant plot suitable for community projects",
      details: {
        type: "Community Development",
        severity: "Opportunity",
        reportedBy: "Land Survey Team",
        timestamp: "2025-09-28 10:15:00",
      },
    },
    marker9: {
      id: "marker9",
      position: { lat: 2.943020089574346, lng: 101.65706021754545 },
      title: "Empty Land - Site F",
      description: "Open space for potential development",
      details: {
        type: "Mixed-Use Development",
        severity: "Opportunity",
        reportedBy: "Land Survey Team",
        timestamp: "2025-09-28 10:30:00",
      },
    },
    marker10: {
      id: "marker10",
      position: { lat: 2.9167117014265336, lng: 101.64592675053386 },
      title: "Serin Residency",
      description: "Residential development complex",
      details: {
        type: "Residential Development",
        severity: "Established",
        reportedBy: "Housing Registry",
        timestamp: "2025-09-28 11:00:00",
      },
    },
    marker11: {
      id: "marker11",
      position: { lat: 2.9154064102559816, lng: 101.66957152212409 },
      title: "Cyberjaya Lakeside",
      description: "Lakeside residential and recreational area",
      details: {
        type: "Recreational Development",
        severity: "Established",
        reportedBy: "Tourism Board",
        timestamp: "2025-09-28 11:15:00",
      },
    },
    marker12: {
      id: "marker12",
      position: { lat: 2.9716832682313226, lng: 101.66254129849902 },
      title: "Empty Land - Site G",
      description: "Undeveloped area with development potential",
      details: {
        type: "Land Development",
        severity: "Opportunity",
        reportedBy: "Land Survey Team",
        timestamp: "2025-09-28 11:30:00",
      },
    },
    marker13: {
      id: "marker13",
      position: { lat: 2.896249236627696, lng: 101.68491107671477 },
      title: "Equestrian Park Putrajaya",
      description: "Horse riding and equestrian facilities",
      details: {
        type: "Recreational Development",
        severity: "Established",
        reportedBy: "Parks Department",
        timestamp: "2025-09-28 12:00:00",
      },
    },
    marker14: {
      id: "marker14",
      position: { lat: 2.9076157711227033, lng: 101.69450777255373 },
      title: "Putrajaya Balancing Reservoir",
      description: "Water management and recreational facility",
      details: {
        type: "Infrastructure Development",
        severity: "Established",
        reportedBy: "Water Authority",
        timestamp: "2025-09-28 12:15:00",
      },
    },
  };

  return locationDataMap[locationId] || null;
};
