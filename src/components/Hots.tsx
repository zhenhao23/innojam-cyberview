import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Hots.css";

interface Comment {
  id: string;
  author: string;
  text: string;
  timestamp: string;
  avatar: string;
}

interface Suggestion {
  id: string;
  title: string;
  upvotes: number;
  isUpvoted: boolean;
  image: string;
  comments: Comment[];
  locationName?: string;
  locationId?: string;
}

interface LocationData {
  id: string;
  name: string;
  address: string;
  description: string;
  suggestions: Suggestion[];
}

const Hots = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  const locationDataMap: { [key: string]: LocationData } = {
    marker1: {
      id: "marker1",
      name: "Empty Land - Site A",
      address: "📍 Jalan Cyberjaya 5, Cyberjaya",
      description: "This is an underutilized empty plot of land in a prime location within Cyberjaya.",
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
          ],
        },
      ],
    },
    marker2: {
      id: "marker2",
      name: "Empty Land - Site B",
      address: "📍 Persiaran Multimedia, Cyberjaya",
      description: "Another underutilized piece of land in Cyberjaya that presents excellent opportunities.",
      suggestions: [
        {
          id: "suggestion-1",
          title: "Build a Public Swimming Pool",
          upvotes: 900,
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
          ],
        },
        {
          id: "suggestion-2",
          title: "Create a Basketball Court Complex",
          upvotes: 120,
          isUpvoted: false,
          image: "/basketballcourt.png",
          comments: [
            {
              id: "comment-2-1",
              author: "SportsCoach",
              text: "A proper basketball facility could host community tournaments!",
              timestamp: "2 hours ago",
              avatar: "🏆",
            },
          ],
        },
      ],
    },
    marker4: {
      id: "marker4",
      name: "DPULZE Shopping Centre",
      address: "📍 DPULZE, Cyberjaya",
      description: "DPULZE Shopping Centre is one of Cyberjaya's largest and most vibrant malls.",
      suggestions: [
        {
          id: "suggestion-1",
          title: "Build a Chagee!",
          upvotes: 3500,
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
          ],
        },
      ],
    },
    marker17: {
      id: "marker17",
      name: "Dell Global Business Center Sdn. Bhd.",
      address: "📍 Cyberjaya",
      description: "Dell Global Business Center is a corporate office in Cyberjaya specializing in computer technology.",
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
              text: "Visitors can learn about Dell's operations and career paths.",
              timestamp: "1 hour ago",
              avatar: "🏢",
            },
          ],
        },
      ],
    },
    marker5: {
      id: "marker5",
      name: "Tamarind Square",
      address: "📍 Tamarind Square, Cyberjaya",
      description: "Tamarind Square is a popular shopping and dining complex in Cyberjaya.",
      suggestions: [
        {
          id: "suggestion-1",
          title: "Build a Tiger Sugar!",
          upvotes: 1000,
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
          ],
        },
      ],
    },
  };

  // Flatten all suggestions and add location info
  const allSuggestions: Suggestion[] = [];
  Object.entries(locationDataMap).forEach(([locationId, locationData]) => {
    locationData.suggestions.forEach(suggestion => {
      allSuggestions.push({
        ...suggestion,
        locationName: locationData.name,
        locationId: locationId
      });
    });
  });

  // Sort by upvotes (highest first)
  const sortedSuggestions = allSuggestions.sort((a, b) => b.upvotes - a.upvotes);

  // Filter by search term and limit to top 3
  const filteredSuggestions = sortedSuggestions
    .filter(suggestion =>
      suggestion.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      suggestion.locationName?.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .slice(0, 10); // Only show top 3 suggestions

  const getRankIcon = (index: number) => {
    switch (index) {
      case 0: return "🥇";
      case 1: return "🥈";
      case 2: return "🥉";
      default: return `#${index + 1}`;
    }
  };

  const getRankClass = (index: number) => {
    switch (index) {
      case 0: return "rank-gold";
      case 1: return "rank-silver";
      case 2: return "rank-bronze";
      default: return "rank-default";
    }
  };

  const handleSuggestionClick = (suggestion: Suggestion) => {
    if (suggestion.locationId) {
      navigate(`/location/${suggestion.locationId}`);
    }
  };

  return (
    <div className="hots-container">
      {/* Header */}
      <div className="hots-header">
        <div className="header-content">
          <button 
            className="back-button"
            onClick={() => navigate("/")}
            title="Back to Map"
          >
            ← Back to Map
          </button>
          <div className="header-title">
            <h1>🔥 Hot Suggestions</h1>
            <p>Top-voted community suggestions ranked by popularity</p>
          </div>
        </div>
      </div>

      {/* Stats */}
      {/* <div className="stats-section">
        <div className="stats-container">
          <div className="stat-item">
            <span className="stat-number">10</span>
            <span className="stat-label">Total Suggestions</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">{allSuggestions.reduce((sum, s) => sum + s.upvotes, 0).toLocaleString()}</span>
            <span className="stat-label">Total Upvotes</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">{Object.keys(locationDataMap).length}</span>
            <span className="stat-label">Locations</span>
          </div>
        </div>
      </div> */}

      {/* Search */}
      <div className="search-section">
        <div className="search-container">
          <input
            type="text"
            placeholder="Search suggestions or locations..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
      </div>

      {/* Suggestions List */}
      <div className="suggestions-list">
        {filteredSuggestions.length === 0 ? (
          <div className="no-results">
            <div className="no-results-icon">🔍</div>
            <h3>No suggestions found</h3>
            <p>Try adjusting your search criteria</p>
          </div>
        ) : (
          filteredSuggestions.map((suggestion, index) => (
            <div 
              key={`${suggestion.locationId}-${suggestion.id}`} 
              className={`suggestion-card ${getRankClass(index)}`}
              onClick={() => handleSuggestionClick(suggestion)}
            >
              {/* Rank Badge */}
              <div className="rank-badge">
                <span className="rank-icon">{getRankIcon(index)}</span>
              </div>

              {/* Content */}
              <div className="suggestion-content">
                <div className="suggestion-image">
                  <img 
                    src={suggestion.image} 
                    alt={suggestion.title}
                    onError={(e) => {
                      e.currentTarget.src = '/public/placeholder.png';
                    }}
                  />
                </div>

                <div className="suggestion-info">
                  <div className="suggestion-header">
                    <h3 className="suggestion-title">{suggestion.title}</h3>
                    <div className="upvotes-container">
                      <button className={`upvote-btn ${suggestion.isUpvoted ? 'upvoted' : ''}`}>
                        👍 {suggestion.upvotes.toLocaleString()}
                      </button>
                    </div>
                  </div>

                  <div className="location-info">
                    <span className="location-icon">📍</span>
                    <span className="location-name">{suggestion.locationName}</span>
                  </div>

                  <div className="suggestion-meta">
                    <span className="comments-count">
                      💬 {suggestion.comments.length} comment{suggestion.comments.length !== 1 ? 's' : ''}
                    </span>
                    <span className="latest-comment">
                      {suggestion.comments.length > 0 && (
                        <>Latest: {suggestion.comments[0].timestamp}</>
                      )}
                    </span>
                  </div>

                  {/* Top Comment Preview */}
                  {suggestion.comments.length > 0 && (
                    <div className="top-comment">
                      <span className="comment-avatar">{suggestion.comments[0].avatar}</span>
                      <div className="comment-content">
                        <span className="comment-author">{suggestion.comments[0].author}</span>
                        <p className="comment-text">{suggestion.comments[0].text}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Trending Indicator */}
              {index < 3 && (
                <div className="trending-badge">
                  🔥 TRENDING
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {/* Footer Info */}
      <div className="footer-info">
        <p>Rankings are based on community upvotes and engagement</p>
        <p>Click on any suggestion to view details and join the discussion</p>
      </div>
    </div>
  );
};

export default Hots;