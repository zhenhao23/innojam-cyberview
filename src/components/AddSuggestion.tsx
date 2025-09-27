import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Card,
  Input,
  List,
  Avatar,
  Typography,
  Space,
  Spin,
} from "antd";
import {
  SendOutlined,
  UserOutlined,
  RobotOutlined,
  ArrowLeftOutlined,
} from "@ant-design/icons";
import { useChatContext } from "../contexts/ChatContext";

const { TextArea } = Input;
const { Text } = Typography;

interface Message {
  id: string;
  content: string;
  role: "user" | "assistant";
  timestamp: Date;
}

const AddSuggestion: React.FC = () => {
  const navigate = useNavigate();
  const { addResponse, responses } = useChatContext();
  const [inputMessage, setInputMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content:
        "Hello! I'm here to help you submit suggestions for the mixed-use development project at Site C. What ideas do you have for this strategic location?",
      role: "assistant",
      timestamp: new Date(),
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async (message: string) => {
    if (!message.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: message,
      role: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputMessage("");
    setIsLoading(true);

    try {
      // Call Dify API
      const response = await fetch(
        "https://7qb3nlxs-80.asse.devtunnels.ms/v1/chat-messages",
        {
          method: "POST",
          headers: {
            Authorization: "Bearer app-0WvdunaSHjqWVfalDufXWdSC",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            inputs: {},
            query: message,
            response_mode: "blocking",
            conversation_id: "",
            user: "user-" + Date.now(),
            files: [],
          }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        const assistantMessage: Message = {
          id: (Date.now() + 1).toString(),
          content:
            data.answer ||
            "Thank you for your suggestion! I'll help you develop this idea further.",
          role: "assistant",
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, assistantMessage]);

        // Save response to context
        addResponse({
          id: assistantMessage.id,
          query: message,
          response: assistantMessage.content,
          timestamp: assistantMessage.timestamp,
          conversationId: data.conversation_id || "",
          user: "user-" + Date.now(),
        });
      } else {
        throw new Error("Failed to get response");
      }
    } catch (error) {
      console.error("Error sending message:", error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content:
          "I apologize, but I'm having trouble connecting right now. Thank you for your suggestion about the mixed-use development project. Your input is valuable for improving Site C!",
        role: "assistant",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);

      // Save error response to context
      addResponse({
        id: errorMessage.id,
        query: message,
        response: errorMessage.content,
        timestamp: errorMessage.timestamp,
        conversationId: "",
        user: "user-" + Date.now(),
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendMessage = () => {
    sendMessage(inputMessage);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleBack = () => {
    navigate("/");
  };

  const handleSubmit = async () => {
    try {
      // Format chat history from ChatContext responses
      const chatHistory = responses
        .map((response) => `${response.query}\n\n🤖\n\n${response.response}`)
        .join('\n\n');

      // Call the workflow API
      const workflowResponse = await fetch(
        "https://7qb3nlxs-80.asse.devtunnels.ms/v1/workflows/run",
        {
          method: "POST",
          headers: {
            Authorization: "Bearer app-tBhxttZmecW8wWcoMbnRfzr6",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            inputs: {
              chat_history: chatHistory,
            },
            response_mode: "streaming",
            user: "abc-123",
          }),
        }
      );

      if (workflowResponse.ok) {
        console.log("Workflow submitted successfully");
        // Navigate to summary page after successful submission
        navigate("/suggestion-summary");
      } else {
        console.error("Failed to submit workflow");
        // Still navigate to summary page even if workflow fails
        navigate("/suggestion-summary");
      }
    } catch (error) {
      console.error("Error submitting workflow:", error);
      // Navigate to summary page even on error
      navigate("/suggestion-summary");
    }
  };

  return (
    <div
      style={{
        padding: "20px",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#f5f5f5",
      }}
    >
      {/* Header */}
      <Card style={{ marginBottom: "20px" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
          }}
        >
          <Space direction="vertical" size="small" style={{ flex: 1 }}>
            <Button
              type="default"
              icon={<ArrowLeftOutlined />}
              onClick={handleBack}
            >
              Back to Map
            </Button>

            <Typography.Title level={2} style={{ margin: 0 }}>
              Add Suggestion - Site C
            </Typography.Title>

            <Text type="secondary">
              Strategic location for mixed-use development project
            </Text>
          </Space>

          <Button
            type="primary"
            size="large"
            onClick={handleSubmit}
            style={{ marginTop: "4px" }}
          >
            Submit
          </Button>
        </div>
      </Card>

      {/* Chat Messages */}
      <Card
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
        bodyStyle={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          padding: 0,
        }}
      >
        <div
          style={{
            flex: 1,
            overflowY: "auto",
            padding: "16px",
            maxHeight: "calc(100vh - 300px)",
          }}
        >
          <List
            dataSource={messages}
            renderItem={(message) => (
              <List.Item
                style={{
                  border: "none",
                  padding: "8px 0",
                  display: "flex",
                  justifyContent:
                    message.role === "user" ? "flex-end" : "flex-start",
                }}
              >
                <div
                  style={{
                    maxWidth: "70%",
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "8px",
                    flexDirection:
                      message.role === "user" ? "row-reverse" : "row",
                  }}
                >
                  <Avatar
                    icon={
                      message.role === "user" ? (
                        <UserOutlined />
                      ) : (
                        <RobotOutlined />
                      )
                    }
                    style={{
                      backgroundColor:
                        message.role === "user" ? "#1890ff" : "#52c41a",
                      flexShrink: 0,
                    }}
                  />
                  <div
                    style={{
                      backgroundColor:
                        message.role === "user" ? "#1890ff" : "#f6f6f6",
                      color: message.role === "user" ? "white" : "black",
                      padding: "12px 16px",
                      borderRadius: "12px",
                      wordWrap: "break-word",
                    }}
                  >
                    <div>{message.content}</div>
                    <div
                      style={{
                        fontSize: "12px",
                        opacity: 0.7,
                        marginTop: "4px",
                      }}
                    >
                      {message.timestamp.toLocaleTimeString()}
                    </div>
                  </div>
                </div>
              </List.Item>
            )}
          />
          {isLoading && (
            <div
              style={{
                display: "flex",
                justifyContent: "flex-start",
                padding: "8px 0",
              }}
            >
              <div
                style={{ display: "flex", alignItems: "center", gap: "8px" }}
              >
                <Avatar
                  icon={<RobotOutlined />}
                  style={{ backgroundColor: "#52c41a" }}
                />
                <div
                  style={{
                    backgroundColor: "#f6f6f6",
                    padding: "12px 16px",
                    borderRadius: "12px",
                  }}
                >
                  <Spin size="small" /> <Text>Thinking...</Text>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Input Area */}
        <div
          style={{
            padding: "16px",
            borderTop: "1px solid #f0f0f0",
            backgroundColor: "white",
          }}
        >
          <Space.Compact style={{ width: "100%" }}>
            <TextArea
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Share your suggestions for this development site..."
              autoSize={{ minRows: 1, maxRows: 4 }}
              style={{ resize: "none" }}
              disabled={isLoading}
            />
            <Button
              type="primary"
              icon={<SendOutlined />}
              onClick={handleSendMessage}
              disabled={!inputMessage.trim() || isLoading}
              style={{ height: "auto" }}
            />
          </Space.Compact>
        </div>
      </Card>
    </div>
  );
};

export default AddSuggestion;
