import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./LocationDiscussion.css";

interface Comment {
  id: string;
  author: string;
  text: string;
  timestamp: string;
  avatar?: string;
}

interface Suggestion {
  id: string;
  title: string;
  upvotes: number;
  comments: Comment[];
  isUpvoted: boolean;
  image?: string;
}

interface LocationData {
  id: string;
  name: string;
  address: string;
  description: string;
  suggestions: Suggestion[];
}

// Mock data mapping - in a real app, this would come from an API
const locationDataMap: { [key: string]: LocationData } = {
  marker1: {
    id: "marker1",
    name: "Empty Land - Site A",
    address: "📍 Jalan Cyberjaya 5, Cyberjaya",
    description:
      "This is an underutilized empty plot of land in a prime location within Cyberjaya. The site has great potential for community recreational development and could significantly benefit local residents. Currently, the area remains unused and could be transformed into a valuable community asset.",
    suggestions: [
      {
        id: "suggestion-1",
        title: "Build a Public Swimming Pool",
        upvotes: 24,
        isUpvoted: false,
        image: "/pool.png",
        comments: [
          {
            id: "comment-1-1",
            author: "SwimEnthusiast",
            text: "A public pool would be amazing! Great for families and fitness.",
            timestamp: "2 hours ago",
            avatar: "🏊‍♀️",
          },
          {
            id: "comment-1-2",
            author: "FamilyDad",
            text: "My kids would love this. Currently we have to travel far for swimming.",
            timestamp: "1 hour ago",
            avatar: "👨‍👩‍👧‍�",
          },
          {
            id: "comment-1-3",
            author: "HealthAdvocate",
            text: "Swimming is excellent exercise for all ages. This would promote community health.",
            timestamp: "45 minutes ago",
            avatar: "�",
          },
        ],
      },
      {
        id: "suggestion-2",
        title: "Construct a Basketball Court",
        upvotes: 18,
        isUpvoted: true,
        image: "/basketballcourt.png",
        comments: [
          {
            id: "comment-2-1",
            author: "BasketballFan",
            text: "We need more sports facilities in this area. Basketball court would be perfect!",
            timestamp: "3 hours ago",
            avatar: "🏀",
          },
          {
            id: "comment-2-2",
            author: "TeenageResident",
            text: "This would give us youth a great place to hang out and stay active.",
            timestamp: "2 hours ago",
            avatar: "�",
          },
        ],
      },
    ],
  },
  marker2: {
    id: "marker2",
    name: "Empty Land - Site B",
    address: "📍 Persiaran Multimedia, Cyberjaya",
    description:
      "Another underutilized piece of land in Cyberjaya that presents excellent opportunities for community development. This spacious area could host various recreational facilities that would serve the growing population in the surrounding residential and commercial areas.",
    suggestions: [
      {
        id: "suggestion-1",
        title: "Build a Public Swimming Pool",
        upvotes: 19,
        isUpvoted: false,
        image: "/pool.png",
        comments: [
          {
            id: "comment-1-1",
            author: "AquaticLover",
            text: "This location would be perfect for a community pool with easy access!",
            timestamp: "4 hours ago",
            avatar: "🏊‍♂️",
          },
          {
            id: "comment-1-2",
            author: "LocalMom",
            text: "Swimming lessons for kids would be so convenient here.",
            timestamp: "3 hours ago",
            avatar: "👩‍�",
          },
        ],
      },
      {
        id: "suggestion-2",
        title: "Create a Basketball Court Complex",
        upvotes: 22,
        isUpvoted: true,
        image: "/basketballcourt.png",
        comments: [
          {
            id: "comment-2-1",
            author: "SportsCoach",
            text: "A proper basketball facility could host community tournaments!",
            timestamp: "2 hours ago",
            avatar: "🏆",
          },
          {
            id: "comment-2-2",
            author: "CommunityLeader",
            text: "Sports facilities bring people together and build community spirit.",
            timestamp: "1 hour ago",
            avatar: "🤝",
          },
        ],
      },
    ],
  },
  marker4: {
    id: "marker4",
    name: "DPULZE Shopping Centre",
    address: "📍 DPULZE, Cyberjaya",
    description:
      "DPULZE Shopping Centre is one of Cyberjaya's largest and most vibrant malls, strategically located to serve both residents and visitors from surrounding areas. The mall offers an extensive variety of retail outlets, from international brands to local boutiques, providing a diverse shopping experience for all age groups and interests. In addition to its retail offerings, DPULZE boasts numerous dining options, ranging from casual eateries and cafés to fine dining establishments, catering to different tastes and budgets. The cinemas feature the latest movie releases in comfortable and modern settings, making it a popular entertainment destination. Beyond shopping and dining, DPULZE hosts a wide range of events and promotional activities throughout the year, including seasonal festivals, pop-up markets, and community engagement programs, which help strengthen social connections and foster a sense of community. The mall’s modern infrastructure, convenient parking facilities, and proximity to public transport make it highly accessible, while its focus on safety and family-friendly amenities ensures a welcoming environment for all visitors. Overall, DPULZE plays a pivotal role in Cyberjaya’s commercial landscape, not only as a shopping and entertainment hub but also as a key driver of local economic activity and community interaction.",
    suggestions: [
      {
        id: "suggestion-1",
        title: "Build a Chagee!",
        upvotes: 3500, // more upvotes for popularity
        isUpvoted: true,
        image: "/public/chagee.jpg",
        comments: [
          {
            id: "comment-1-1",
            author: "Chagee123",
            text: "Love chagee! Always wanted to have Chagee in Cyberjaya.",
            timestamp: "2 hours ago",
            avatar: "🛍️",
          },
          {
            id: "comment-1-2",
            author: "FoodieGal",
            text: "It would be great to have more food options here. Chagee is a fantastic choice!",
            timestamp: "1 hour ago",
            avatar: "🍽️",
          },
          {
            id: "comment-1-3",
            author: "MovieBuff",
            text: "Chagee would be a perfect addition after a movie night!",
            timestamp: "30 minutes ago",
            avatar: "🎬",
          },
          {
            id: "comment-1-4",
            author: "FamilyFun",
            text: "My family would love this! Chagee has something for everyone.",
            timestamp: "45 minutes ago",
            avatar: "👨‍👩‍👧‍👦",
          },
          {
            id: "comment-1-5",
            author: "EventPlanner",
            text: "Chagee could also be a great spot for community events and gatherings.",
            timestamp: "15 minutes ago",
            avatar: "🎉",
          },
        ],
      },
      {
        id: "suggestion-2",
        title: "Build a KOI!",
        upvotes: 200,
        isUpvoted: false,
        image: "/public/koi.jpg",
        comments: [
          {
            id: "comment-2-1",
            author: "TeaLover",
            text: "KOI would be a great addition for bubble tea fans like me!",
            timestamp: "1 hour ago",
            avatar: "🎨",
          },
          {
            id: "comment-2-2",
            author: "ilovemyKid",
            text: "My kid loves KOI! It would be so convenient to have one here.",
            timestamp: "30 minutes ago",
            avatar: "👨‍👦",
          },
        ],
      },


    ],
  },

  marker5: {
    id: "marker5",
    name: "Tamarind Square",
    address: "📍 Tamarind Square, Cyberjaya",
    description:
      "Tamarind Square is a popular shopping and dining complex in Cyberjaya, featuring a mix of retail stores, cafes, restaurants, and entertainment options. It attracts visitors from nearby residential and commercial areas, making it a lively community hub.",
    suggestions: [
      {
        id: "suggestion-1",
        title: "Build a Tiger Sugar!",
        upvotes: 300,
        isUpvoted: false,
        image: "/public/tiger_sugar.jpg",
        comments: [
          {
            id: "comment-1-1",
            author: "sugarLover",
            text: "Tiger Sugar would be a fantastic addition! Their brown sugar boba is the best.",
            timestamp: "2 hours ago",
            avatar: "🥕",
          },
          {
            id: "comment-1-2",
            author: "bobalover",
            text: "We need more bubble tea options here.",
            timestamp: "1 hour ago",
            avatar: "🛒",
          },
        ],
      },
      {
        id: "suggestion-2",
        title: "Build a Boba Guys!",
        upvotes: 100,
        isUpvoted: true,
        image: "/public/boba_guys.png",
        comments: [
          {
            id: "comment-2-1",
            author: "MusicLover",
            text: "Live music would make the weekend evenings so much more fun!",
            timestamp: "2 hours ago",
            avatar: "🎸",
          },
          {
            id: "comment-2-2",
            author: "FamilyFun",
            text: "Perfect place for families to enjoy entertainment together.",
            timestamp: "1 hour ago",
            avatar: "👨‍👩‍👧‍👦",
          },
        ],
      },
    ],
  },
  marker8: {
    id: "marker8",
    name: "Empty Land - Site E",
    address: "📍 Cyberjaya",
    description: "Vacant plot suitable for community projects",
    suggestions: [
      {
        id: "suggestion-1",
        title: "Community Garden & Green Space",
        upvotes: 450,
        isUpvoted: true,
        image: "/communitygarden.png",
        comments: [
          {
            id: "comment-1-1",
            author: "GreenThumb",
            text: "A community garden would bring residents together and promote healthy living.",
            timestamp: "3 hours ago",
            avatar: "🌱",
          },
          {
            id: "comment-1-2",
            author: "EcoWarrior",
            text: "Great initiative for urban sustainability!",
            timestamp: "2 hours ago",
            avatar: "♻️",
          },
        ],
      },
      {
        id: "suggestion-2",
        title: "Open Air Fitness Park",
        upvotes: 380,
        isUpvoted: false,
        image: "/fitnesspark.png",
        comments: [
          {
            id: "comment-2-1",
            author: "FitnessFan",
            text: "Would love a space to exercise outdoors. Makes fitness accessible to everyone!",
            timestamp: "1 hour ago",
            avatar: "🏋️",
          },
          {
            id: "comment-2-2",
            author: "JoggerGal",
            text: "A great way to stay active and enjoy nature.",
            timestamp: "45 minutes ago",
            avatar: "🏃‍♀️",
          },
        ],
      },
    ],
  },
  marker9: {
    id: "marker9",
    name: "Empty Land - Site F",
    address: "📍 Cyberjaya",
    description: "Open space for potential development",
    suggestions: [
      {
        id: "suggestion-1",
        title: "Kids’ Adventure Playground",
        upvotes: 600,
        isUpvoted: true,
        image: "/playground.png",
        comments: [
          {
            id: "comment-1-1",
            author: "ParentLife",
            text: "Kids would love this! Safe and fun play area is much needed.",
            timestamp: "2 hours ago",
            avatar: "🛝",
          },
          {
            id: "comment-1-2",
            author: "NeighborhoodMom",
            text: "Perfect space for children to explore and stay active.",
            timestamp: "1 hour ago",
            avatar: "👩‍👧",
          },
        ],
      },
      {
        id: "suggestion-2",
        title: "Urban Sports Hub",
        upvotes: 400,
        isUpvoted: false,
        image: "/sportshub.png",
        comments: [
          {
            id: "comment-2-1",
            author: "TeenAthlete",
            text: "Skateboarding, basketball, and more would keep teens engaged!",
            timestamp: "1 hour ago",
            avatar: "🏀",
          },
          {
            id: "comment-2-2",
            author: "YouthLeader",
            text: "A hub like this encourages healthy lifestyles and teamwork.",
            timestamp: "45 minutes ago",
            avatar: "🤝",
          },
        ],
      },
    ],
  },
  marker10: {
    id: "marker10",
    name: "Serin Residency",
    address: "📍 Serin Residency, Cyberjaya",
    description: "Residential development complex",
    suggestions: [
      {
        id: "suggestion-1",
        title: "Community Fitness Center",
        upvotes: 200,
        isUpvoted: true,
        image: "/fitnesscenter.png",
        comments: [
          {
            id: "comment-1-1",
            author: "ResidentA",
            text: "A gym in the complex would be very convenient!",
            timestamp: "2 hours ago",
            avatar: "🏋️‍♂️",
          },
          {
            id: "comment-1-2",
            author: "ResidentB",
            text: "Great idea for encouraging a healthy lifestyle among residents.",
            timestamp: "1 hour ago",
            avatar: "💪",
          },
        ],
      },
      {
        id: "suggestion-2",
        title: "Community Garden",
        upvotes: 100,
        isUpvoted: false,
        image: "/communitygarden.png",
        comments: [
          {
            id: "comment-2-1",
            author: "GardenerGal",
            text: "Lovely idea! Residents can grow vegetables and flowers together.",
            timestamp: "1 hour ago",
            avatar: "🌸",
          },
          {
            id: "comment-2-2",
            author: "EcoResident",
            text: "Community gardens improve wellbeing and sense of community.",
            timestamp: "45 minutes ago",
            avatar: "🌿",
          },
        ],
      },
    ],
  },
  marker11: {
    id: "marker11",
    name: "Cyberjaya Lakeside",
    address: "📍 Lakeside, Cyberjaya",
    description: "Lakeside residential and recreational area",
    suggestions: [
      {
        id: "suggestion-1",
        title: "Waterfront Jogging Path",
        upvotes: 50,
        isUpvoted: true,
        image: "/joggingpath.png",
        comments: [
          {
            id: "comment-1-1",
            author: "JoggerGuy",
            text: "Beautiful path to exercise while enjoying the lake view!",
            timestamp: "2 hours ago",
            avatar: "🏃‍♂️",
          },
          {
            id: "comment-1-2",
            author: "NatureLover",
            text: "Walking by the lake is so relaxing. Great suggestion!",
            timestamp: "1 hour ago",
            avatar: "🌊",
          },
        ],
      },
      {
        id: "suggestion-2",
        title: "Outdoor Cafes & Benches",
        upvotes: 35,
        isUpvoted: false,
        image: "/cafebenches.png",
        comments: [
          {
            id: "comment-2-1",
            author: "CoffeeFan",
            text: "Perfect spot to sip coffee and enjoy nature.",
            timestamp: "1 hour ago",
            avatar: "☕",
          },
          {
            id: "comment-2-2",
            author: "RelaxedResident",
            text: "Adding benches makes it more welcoming for families and seniors.",
            timestamp: "45 minutes ago",
            avatar: "🪑",
          },
        ],
      },
    ],
  },
  marker13: {
    id: "marker13",
    name: "Equestrian Park Putrajaya",
    address: "📍 Putrajaya",
    description: "Horse riding and equestrian facilities",
    suggestions: [
      {
        id: "suggestion-1",
        title: "Organize Equestrian Competitions",
        upvotes: 40,
        isUpvoted: true,
        image: "/equestrian.png",
        comments: [
          {
            id: "comment-1-1",
            author: "HorseLover",
            text: "Competitions would attract enthusiasts and tourists alike.",
            timestamp: "2 hours ago",
            avatar: "🐴",
          },
          {
            id: "comment-1-2",
            author: "TrainerJoe",
            text: "Great way to promote equestrian sports locally.",
            timestamp: "1 hour ago",
            avatar: "🏆",
          },
        ],
      },
      {
        id: "suggestion-2",
        title: "Weekend Riding Lessons",
        upvotes: 30,
        isUpvoted: false,
        image: "/ridinglessons.png",
        comments: [
          {
            id: "comment-2-1",
            author: "ParentMom",
            text: "My kids would love riding lessons! Very educational and fun.",
            timestamp: "1 hour ago",
            avatar: "👧🐴",
          },
          {
            id: "comment-2-2",
            author: "EquestrianFan",
            text: "Lessons bring more people into the sport. Excellent idea!",
            timestamp: "45 minutes ago",
            avatar: "🏇",
          },
        ],
      },
    ],
  },
  marker14: {
    id: "marker14",
    name: "Putrajaya Balancing Reservoir",
    address: "📍 Putrajaya",
    description:
      "The Putrajaya Balancing Reservoir is a key water management facility designed to regulate water levels and prevent flooding in the surrounding areas. It also provides recreational opportunities for the public, including jogging paths, fishing spots, and scenic views, making it an important community and infrastructure asset.",
    suggestions: [
      {
        id: "suggestion-1",
        title: "Scenic Jogging & Cycling Trails",
        upvotes: 55,
        isUpvoted: true,
        image: "/trail.png",
        comments: [
          {
            id: "comment-1-1",
            author: "JoggerGirl",
            text: "A perfect place for morning jogs and bike rides!",
            timestamp: "2 hours ago",
            avatar: "🚴‍♀️",
          },
          {
            id: "comment-1-2",
            author: "NatureFan",
            text: "Beautiful area to relax and enjoy nature.",
            timestamp: "1 hour ago",
            avatar: "🌿",
          },
        ],
      },
      {
        id: "suggestion-2",
        title: "Weekend Community Events",
        upvotes: 42,
        isUpvoted: false,
        image: "/communityevent.png",
        comments: [
          {
            id: "comment-2-1",
            author: "EventPlanner",
            text: "Organizing weekend events here would engage locals and promote community bonding.",
            timestamp: "1 hour ago",
            avatar: "🎉",
          },
          {
            id: "comment-2-2",
            author: "ResidentA",
            text: "Great idea! A lovely place for fun outdoor activities.",
            timestamp: "45 minutes ago",
            avatar: "🏞️",
          },
        ],
      },
    ],
  },
  marker15: {
    id: "marker15",
    name: "MONSTA - Animonsta / Monsta Studios Sdn. Bhd.",
    address: "📍 Cyberjaya",
    description:
      "Monsta Studios is a renowned animation studio in Cyberjaya, responsible for producing popular animated content. It operates as a creative business hub, employing animation professionals and hosting office facilities, contributing to the local creative industry.",
    suggestions: [
      {
        id: "suggestion-1",
        title: "Host Animation Workshops",
        upvotes: 48,
        isUpvoted: true,
        image: "/animationworkshop.png",
        comments: [
          {
            id: "comment-1-1",
            author: "AnimFan",
            text: "Learning animation here would be amazing for aspiring animators!",
            timestamp: "2 hours ago",
            avatar: "🎨",
          },
          {
            id: "comment-1-2",
            author: "StudentA",
            text: "Great opportunity for students to gain hands-on experience.",
            timestamp: "1 hour ago",
            avatar: "📚",
          },
        ],
      },
      {
        id: "suggestion-2",
        title: "Open Studio Tours",
        upvotes: 35,
        isUpvoted: false,
        image: "/studiotour.png",
        comments: [
          {
            id: "comment-2-1",
            author: "TouristGuy",
            text: "Studio tours would attract tourists and fans of animation.",
            timestamp: "1 hour ago",
            avatar: "🎥",
          },
          {
            id: "comment-2-2",
            author: "FamilyFun",
            text: "Kids would love seeing how animations are made!",
            timestamp: "45 minutes ago",
            avatar: "👨‍👩‍👧‍👦",
          },
        ],
      },
    ],
  },
  marker16: {
    id: "marker16",
    name: "Kanvas SOHO",
    address: "📍 Cyberjaya",
    description:
      "Kanvas SOHO is a modern apartment building in Cyberjaya offering residential units for individuals and families. It features contemporary living spaces with convenient access to nearby amenities, making it a popular choice for urban dwellers.",
    suggestions: [
      {
        id: "suggestion-1",
        title: "Rooftop Garden & Lounge",
        upvotes: 50,
        isUpvoted: true,
        image: "/rooftopgarden.png",
        comments: [
          {
            id: "comment-1-1",
            author: "ResidentA",
            text: "Rooftop garden would be perfect for relaxation and socializing.",
            timestamp: "2 hours ago",
            avatar: "🌿",
          },
          {
            id: "comment-1-2",
            author: "ResidentB",
            text: "A great way to enjoy city views and fresh air.",
            timestamp: "1 hour ago",
            avatar: "🏙️",
          },
        ],
      },
      {
        id: "suggestion-2",
        title: "Fitness & Yoga Studio",
        upvotes: 38,
        isUpvoted: false,
        image: "/fitnessyoga.png",
        comments: [
          {
            id: "comment-2-1",
            author: "FitnessFan",
            text: "Convenient to have a gym and yoga studio within the building!",
            timestamp: "1 hour ago",
            avatar: "🧘",
          },
          {
            id: "comment-2-2",
            author: "HealthyResident",
            text: "Encourages residents to maintain an active lifestyle.",
            timestamp: "45 minutes ago",
            avatar: "💪",
          },
        ],
      },
    ],
  },
  marker17: {
    id: "marker17",
    name: "Dell Global Business Center Sdn. Bhd.",
    address: "📍 Cyberjaya",
    description:
      "Dell Global Business Center is a corporate office in Cyberjaya specializing in computer technology and IT services. The facility houses administrative, technical, and support staff, contributing to the local commercial and technology sector.",
    suggestions: [
      {
        id: "suggestion-1",
        title: "Open Tech Workshops for Students",
        upvotes: 500,
        isUpvoted: true,
        image: "/public/tech_workshops.jpg",
        comments: [
          {
            id: "comment-1-1",
            author: "StudentA",
            text: "Workshops would be an excellent learning opportunity for tech enthusiasts!",
            timestamp: "2 hours ago",
            avatar: "💻",
          },
          {
            id: "comment-1-2",
            author: "MentorB",
            text: "Helps foster talent in the local technology sector.",
            timestamp: "1 hour ago",
            avatar: "🎓",
          },
        ],
      },
      {
        id: "suggestion-2",
        title: "Corporate Open House & Tours",
        upvotes: 3000,
        isUpvoted: false,
        image: "/public/dell_tour.jpg",
        comments: [
          {
            id: "comment-2-1",
            author: "VisitorA",
            text: "Visitors can learn about Dell’s operations and career paths.",
            timestamp: "1 hour ago",
            avatar: "🏢",
          },
          {
            id: "comment-2-2",
            author: "StudentB",
            text: "Great for students exploring technology careers.",
            timestamp: "45 minutes ago",
            avatar: "💼",
          },
        ],
      },
    ],
  },
  marker18: {
    id: "marker18",
    name: "Cyber Heights Villa",
    address: "📍 Cyberjaya",
    description:
      "Cyber Heights Villa is a residential apartment complex in Cyberjaya, offering comfortable living spaces for individuals and families. The building provides modern amenities and convenient access to nearby services and facilities.",
    suggestions: [
      {
        id: "suggestion-1",
        title: "Community Lounge & Library",
        upvotes: 48,
        isUpvoted: true,
        image: "/communitylounge.png",
        comments: [
          {
            id: "comment-1-1",
            author: "ResidentA",
            text: "A lounge and library would foster community interaction and learning.",
            timestamp: "2 hours ago",
            avatar: "📚",
          },
          {
            id: "comment-1-2",
            author: "ResidentB",
            text: "Perfect for reading and socializing in a cozy space.",
            timestamp: "1 hour ago",
            avatar: "☕",
          },
        ],
      },
      {
        id: "suggestion-2",
        title: "Kids’ Indoor Play Area",
        upvotes: 35,
        isUpvoted: false,
        image: "/indoorplay.png",
        comments: [
          {
            id: "comment-2-1",
            author: "ParentMom",
            text: "Indoor play area keeps kids entertained safely during all seasons!",
            timestamp: "1 hour ago",
            avatar: "🛝",
          },
          {
            id: "comment-2-2",
            author: "ParentDad",
            text: "Excellent idea! Encourages kids to be active and socialize.",
            timestamp: "45 minutes ago",
            avatar: "👨‍👦",
          },
        ],
      },
    ],
  },


};

// Default fallback data
const defaultLocationData: LocationData = {
  id: "unknown",
  name: "Unknown Location",
  address: "📍 Location details not available",
  description:
    "This location needs more information. Help us build a better community by sharing your knowledge and suggestions.",
  suggestions: [],
};

const LocationDiscussion: React.FC = () => {
  const { locationId } = useParams<{ locationId: string }>();
  const navigate = useNavigate();

  // Get location data based on locationId, fallback to default
  const initialLocationData =
    locationId && locationDataMap[locationId]
      ? locationDataMap[locationId]
      : defaultLocationData;

  const [locationData, setLocationData] =
    useState<LocationData>(initialLocationData);
  const [newSuggestion, setNewSuggestion] = useState("");
  const [commentInputs, setCommentInputs] = useState<{ [key: string]: string }>(
    {}
  );

  const handleUpvote = (suggestionId: string) => {
    setLocationData((prev) => ({
      ...prev,
      suggestions: prev.suggestions.map((suggestion) =>
        suggestion.id === suggestionId
          ? {
            ...suggestion,
            upvotes: suggestion.isUpvoted
              ? suggestion.upvotes - 1
              : suggestion.upvotes + 1,
            isUpvoted: !suggestion.isUpvoted,
          }
          : suggestion
      ),
    }));
  };

  const handleAddComment = (suggestionId: string) => {
    const commentText = commentInputs[suggestionId];
    if (!commentText.trim()) return;

    const newComment: Comment = {
      id: `comment-${Date.now()}`,
      author: "You",
      text: commentText,
      timestamp: "Just now",
      avatar: "👤",
    };

    setLocationData((prev) => ({
      ...prev,
      suggestions: prev.suggestions.map((suggestion) =>
        suggestion.id === suggestionId
          ? {
            ...suggestion,
            comments: [...suggestion.comments, newComment],
          }
          : suggestion
      ),
    }));

    setCommentInputs((prev) => ({ ...prev, [suggestionId]: "" }));
  };

  const handleAddSuggestion = () => {
    if (!newSuggestion.trim()) return;

    const suggestion: Suggestion = {
      id: `suggestion-${Date.now()}`,
      title: newSuggestion,
      upvotes: 0,
      isUpvoted: false,
      comments: [],
    };

    setLocationData((prev) => ({
      ...prev,
      suggestions: [...prev.suggestions, suggestion],
    }));

    setNewSuggestion("");
  };

  const handleCommentInputChange = (suggestionId: string, value: string) => {
    setCommentInputs((prev) => ({ ...prev, [suggestionId]: value }));
  };

  return (
    <div className="location-discussion">
      <div className="header">
        <button className="back-button" onClick={() => navigate("/")}>
          ← Back
        </button>
        <div className="location-info">
          <h1>{locationData.name}</h1>
          <p className="address">{locationData.address}</p>
        </div>
      </div>

      <div className="description-section">
        <h2>📝 Description</h2>
        <p className="description">{locationData.description}</p>
      </div>

      <div className="suggestions-section">
        <h2>💡 Suggestions ({locationData.suggestions.length})</h2>

        {locationData.suggestions.map((suggestion) => (
          <div key={suggestion.id} className="suggestion-card">
            <div className="suggestion-header">
              <h3 className="suggestion-title">{suggestion.title}</h3>
              <button
                className={`upvote-button ${suggestion.isUpvoted ? "upvoted" : ""
                  }`}
                onClick={() => handleUpvote(suggestion.id)}
              >
                👍 {suggestion.upvotes} Upvotes
              </button>
            </div>

            {suggestion.image && (
              <div className="suggestion-image">
                <img
                  src={suggestion.image}
                  alt={suggestion.title}
                  className="suggestion-img"
                />
              </div>
            )}

            <div className="comments-section">
              <h4>Comments:</h4>
              {suggestion.comments.map((comment) => (
                <div key={comment.id} className="comment">
                  <span className="comment-avatar">{comment.avatar}</span>
                  <div className="comment-content">
                    <div className="comment-header">
                      <span className="comment-author">{comment.author}</span>
                      <span className="comment-timestamp">
                        {comment.timestamp}
                      </span>
                    </div>
                    <p className="comment-text">{comment.text}</p>
                  </div>
                </div>
              ))}

              <div className="add-comment">
                <span className="comment-icon">➕</span>
                <input
                  type="text"
                  placeholder="Add a comment..."
                  value={commentInputs[suggestion.id] || ""}
                  onChange={(e) =>
                    handleCommentInputChange(suggestion.id, e.target.value)
                  }
                  onKeyPress={(e) =>
                    e.key === "Enter" && handleAddComment(suggestion.id)
                  }
                />
                <button
                  className="send-button"
                  onClick={() => handleAddComment(suggestion.id)}
                  disabled={!commentInputs[suggestion.id]?.trim()}
                >
                  Send
                </button>
              </div>
            </div>
          </div>
        ))}

        {locationData.suggestions.length === 0 && (
          <div className="no-suggestions">
            <p>No suggestions yet. Be the first to suggest an improvement!</p>
          </div>
        )}
      </div>

      <div className="add-suggestion-section">
        <h3>➕ Suggest a new modification...</h3>
        <div className="add-suggestion-input">
          <input
            type="text"
            placeholder="Enter your suggestion..."
            value={newSuggestion}
            onChange={(e) => setNewSuggestion(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleAddSuggestion()}
          />
          <button
            className="submit-button"
            onClick={handleAddSuggestion}
            disabled={!newSuggestion.trim()}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default LocationDiscussion;
