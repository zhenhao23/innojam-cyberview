import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './LocationDiscussion.css';

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
  "marker1": {
    id: "marker1",
    name: "ABC Hotel",
    address: "📍 Jalan Cyberjaya 5, Cyberjaya",
    description: "ABC Hotel is a popular accommodation facility in Cyberjaya. Recently, there have been cybersecurity concerns regarding the guest WiFi network that need community attention and collaborative solutions.",
  suggestions: [
    {
      id: "suggestion-1",
      title: "Add shaded area for kids",
      upvotes: 12,
      isUpvoted: false,
      comments: [
        {
          id: "comment-1-1",
          author: "Aisyah",
          text: "Great idea, gets too hot here during afternoon hours.",
          timestamp: "2 hours ago",
          avatar: "🧑"
        },
        {
          id: "comment-1-2",
          author: "Ravi",
          text: "Yes, safety first! Children need protection from the sun.",
          timestamp: "1 hour ago",
          avatar: "👩"
        }
      ]
    },
    {
      id: "suggestion-2",
      title: "Install more benches for parents",
      upvotes: 8,
      isUpvoted: false,
      comments: [
        {
          id: "comment-2-1",
          author: "John",
          text: "Agree, parents need seating while watching their kids.",
          timestamp: "3 hours ago",
          avatar: "👨"
        }
      ]
    },
    {
      id: "suggestion-3",
      title: "Better lighting at night",
      upvotes: 15,
      isUpvoted: true,
      comments: [
        {
          id: "comment-3-1",
          author: "Maria",
          text: "Makes it safer after 7pm when families walk by.",
          timestamp: "5 hours ago",
          avatar: "👩"
        },
        {
          id: "comment-3-2",
          author: "Ali",
          text: "Also prevents vandalism and makes the area more welcoming.",
          timestamp: "4 hours ago",
          avatar: "👦"
        }
      ]
    }
  ]
};

const LocationDiscussion: React.FC = () => {
  const { locationId } = useParams<{ locationId: string }>();
  const navigate = useNavigate();
  const [locationData, setLocationData] = useState<LocationData>(mockLocationData);
  const [newSuggestion, setNewSuggestion] = useState('');
  const [commentInputs, setCommentInputs] = useState<{ [key: string]: string }>({});

  const handleUpvote = (suggestionId: string) => {
    setLocationData(prev => ({
      ...prev,
      suggestions: prev.suggestions.map(suggestion =>
        suggestion.id === suggestionId
          ? {
              ...suggestion,
              upvotes: suggestion.isUpvoted ? suggestion.upvotes - 1 : suggestion.upvotes + 1,
              isUpvoted: !suggestion.isUpvoted
            }
          : suggestion
      )
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
      avatar: "👤"
    };

    setLocationData(prev => ({
      ...prev,
      suggestions: prev.suggestions.map(suggestion =>
        suggestion.id === suggestionId
          ? {
              ...suggestion,
              comments: [...suggestion.comments, newComment]
            }
          : suggestion
      )
    }));

    setCommentInputs(prev => ({ ...prev, [suggestionId]: '' }));
  };

  const handleAddSuggestion = () => {
    if (!newSuggestion.trim()) return;

    const suggestion: Suggestion = {
      id: `suggestion-${Date.now()}`,
      title: newSuggestion,
      upvotes: 0,
      isUpvoted: false,
      comments: []
    };

    setLocationData(prev => ({
      ...prev,
      suggestions: [...prev.suggestions, suggestion]
    }));

    setNewSuggestion('');
  };

  const handleCommentInputChange = (suggestionId: string, value: string) => {
    setCommentInputs(prev => ({ ...prev, [suggestionId]: value }));
  };

  return (
    <div className="location-discussion">
      <div className="header">
        <button className="back-button" onClick={() => navigate('/')}>
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
        
        {locationData.suggestions.map(suggestion => (
          <div key={suggestion.id} className="suggestion-card">
            <div className="suggestion-header">
              <h3 className="suggestion-title">{suggestion.title}</h3>
              <button 
                className={`upvote-button ${suggestion.isUpvoted ? 'upvoted' : ''}`}
                onClick={() => handleUpvote(suggestion.id)}
              >
                👍 {suggestion.upvotes} Upvotes
              </button>
            </div>

            <div className="comments-section">
              <h4>Comments:</h4>
              {suggestion.comments.map(comment => (
                <div key={comment.id} className="comment">
                  <span className="comment-avatar">{comment.avatar}</span>
                  <div className="comment-content">
                    <div className="comment-header">
                      <span className="comment-author">{comment.author}</span>
                      <span className="comment-timestamp">{comment.timestamp}</span>
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
                  value={commentInputs[suggestion.id] || ''}
                  onChange={(e) => handleCommentInputChange(suggestion.id, e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleAddComment(suggestion.id)}
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
      </div>

      <div className="add-suggestion-section">
        <h3>➕ Suggest a new modification...</h3>
        <div className="add-suggestion-input">
          <input
            type="text"
            placeholder="Enter your suggestion..."
            value={newSuggestion}
            onChange={(e) => setNewSuggestion(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleAddSuggestion()}
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