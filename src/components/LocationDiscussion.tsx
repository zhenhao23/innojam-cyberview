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
                className={`upvote-button ${
                  suggestion.isUpvoted ? "upvoted" : ""
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
