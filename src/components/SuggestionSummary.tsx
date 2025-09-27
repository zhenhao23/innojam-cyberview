import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useChatContext } from "../contexts/ChatContext";
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
  description?: string;
}

const SuggestionSummary: React.FC = () => {
  const navigate = useNavigate();
  const { workflowResult } = useChatContext();
  const [commentInputs, setCommentInputs] = useState<{ [key: string]: string }>(
    {}
  );

  // Convert workflow result to suggestions format
  const suggestions: Suggestion[] = workflowResult
    ? [
        {
          id: "workflow-result",
          title: workflowResult.title,
          upvotes: 0,
          isUpvoted: false,
          description: workflowResult.description,
          comments: [],
        },
      ]
    : [];

  const [suggestionsState, setSuggestionsState] =
    useState<Suggestion[]>(suggestions);

  const handleUpvote = (suggestionId: string) => {
    setSuggestionsState((prev) =>
      prev.map((suggestion) =>
        suggestion.id === suggestionId
          ? {
              ...suggestion,
              upvotes: suggestion.isUpvoted
                ? suggestion.upvotes - 1
                : suggestion.upvotes + 1,
              isUpvoted: !suggestion.isUpvoted,
            }
          : suggestion
      )
    );
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

    setSuggestionsState((prev) =>
      prev.map((suggestion) =>
        suggestion.id === suggestionId
          ? {
              ...suggestion,
              comments: [...suggestion.comments, newComment],
            }
          : suggestion
      )
    );

    setCommentInputs((prev) => ({ ...prev, [suggestionId]: "" }));
  };

  const handleCommentInputChange = (suggestionId: string, value: string) => {
    setCommentInputs((prev) => ({ ...prev, [suggestionId]: value }));
  };

  return (
    <div className="location-discussion">
      <div className="header">
        <button
          className="back-button"
          onClick={() => navigate("/location/marker3")}
        >
          ← Back to Chat
        </button>
        <div className="location-info">
          <h1>Suggestion Summary - Site C</h1>
          <p className="address">
            📍 Strategic location for mixed-use development project
          </p>
        </div>
      </div>

      <div className="description-section">
        <h2>📝 Description</h2>
        <p className="description">
          Below are the suggestions generated from your conversation with our AI
          assistant. These represent the key ideas and recommendations discussed
          for the mixed-use development project at Site C.
        </p>
      </div>

      <div className="suggestions-section">
        <h2>💡 Generated Suggestions ({suggestionsState.length})</h2>

        {suggestionsState.map((suggestion) => (
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

            {suggestion.description && (
              <div
                className="suggestion-description"
                style={{
                  padding: "12px",
                  backgroundColor: "#f9f9f9",
                  borderRadius: "8px",
                  margin: "12px 0",
                  whiteSpace: "pre-wrap",
                  fontFamily: "inherit",
                }}
              >
                {suggestion.description}
              </div>
            )}

            {workflowResult &&
              suggestion.id === "workflow-result" &&
              workflowResult.image_link && (
                <div style={{ margin: "12px 0" }}>
                  <img
                    src={workflowResult.image_link}
                    alt={workflowResult.title}
                    style={{
                      width: "100%",
                      maxWidth: "500px",
                      height: "auto",
                      borderRadius: "8px",
                      border: "1px solid #ddd",
                    }}
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

        {suggestionsState.length === 0 && (
          <div className="no-suggestions">
            <p>
              No suggestions generated yet. Start a conversation in the chat to
              generate suggestions!
            </p>
            <button
              className="back-button"
              onClick={() => navigate("/location/marker3")}
              style={{ marginTop: "12px" }}
            >
              Go back to chat
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SuggestionSummary;
