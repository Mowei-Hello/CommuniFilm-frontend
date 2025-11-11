import { useState, useRef, useEffect } from 'react';
import {
  Drawer,
  Box,
  Typography,
  IconButton,
  TextField,
  Paper,
  Divider,
  CircularProgress,
  Button,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import SendIcon from '@mui/icons-material/Send';
import DeleteIcon from '@mui/icons-material/Delete';
import TheaterComedyIcon from '@mui/icons-material/TheaterComedy';
import { useChat } from '@/hooks/useChat';
import ChatMessage from './ChatMessage';

interface ChatDrawerProps {
  open: boolean;
  onClose: () => void;
}

export default function ChatDrawer({ open, onClose }: ChatDrawerProps) {
  const { messages, isLoading, sendMessage, clearHistory } = useChat();
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || isLoading) return;

    const message = inputValue;
    setInputValue('');
    await sendMessage(message);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    // Submit on Enter (without Shift)
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (inputValue.trim() && !isLoading) {
        handleSend(e as any);
      }
    }
    // Shift+Enter creates a new line (default behavior)
  };

  const handleClearHistory = async () => {
    if (window.confirm('Are you sure you want to clear the chat history?')) {
      await clearHistory();
    }
  };

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      slotProps={{
        paper: {
          sx: {
            width: { xs: '100%', sm: 400, md: 480 },
            display: 'flex',
            flexDirection: 'column',
          },
        },
      }}
    >
      {/* Header */}
      <Box
        sx={{
          p: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          bgcolor: 'primary.main',
          color: 'primary.contrastText',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <TheaterComedyIcon />
          <Typography variant="h6">CommuniFilm AI</Typography>
        </Box>
        <IconButton onClick={onClose} sx={{ color: 'inherit' }}>
          <CloseIcon />
        </IconButton>
      </Box>

      <Divider />

      {/* Messages Area */}
      <Box
        sx={{
          flex: 1,
          overflowY: 'auto',
          p: 2,
          bgcolor: 'background.default',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {messages.length === 0 ? (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100%',
              textAlign: 'center',
              gap: 2,
            }}
          >
            <TheaterComedyIcon sx={{ fontSize: 64, color: 'primary.main', opacity: 0.5 }} />
            <Typography variant="h6" color="text.secondary">
              Hi! I am Filmi, the CommuniFilm AI!
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ maxWidth: 300 }}>
              I can help you discover movies, analyze reviews, and get personalized recommendations just for you!
            </Typography>
          </Box>
        ) : (
          <>
            {messages.map((message) => (
              <ChatMessage key={message.id} message={message} />
            ))}
            {isLoading && (
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                  mb: 2,
                }}
              >
                <CircularProgress size={20} />
                <Typography variant="body2" color="text.secondary">
                  AI is thinking...
                </Typography>
              </Box>
            )}
            <div ref={messagesEndRef} />
          </>
        )}
      </Box>

      {/* Clear History Button */}
      {messages.length > 0 && (
        <Box sx={{ px: 2, py: 1, bgcolor: 'background.paper' }}>
          <Button
            size="small"
            startIcon={<DeleteIcon />}
            onClick={handleClearHistory}
            color="error"
            variant="outlined"
            fullWidth
          >
            Clear Chat History
          </Button>
        </Box>
      )}

      <Divider />

      {/* Input Area */}
      <Paper
        component="form"
        onSubmit={handleSend}
        elevation={3}
        sx={{
          p: 2,
          display: 'flex',
          alignItems: 'flex-end',
          gap: 1,
          bgcolor: 'background.paper',
        }}
      >
        <TextField
          fullWidth
          placeholder="Ask me about movies... (Enter to send, Shift+Enter for new line)"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={isLoading}
          size="small"
          multiline
          maxRows={6}
          sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: 2,
              alignItems: 'flex-end',
            },
          }}
        />
        <IconButton
          type="submit"
          color="primary"
          disabled={!inputValue.trim() || isLoading}
          sx={{
            bgcolor: 'primary.main',
            color: 'white',
            flexShrink: 0,
            '&:hover': {
              bgcolor: 'primary.dark',
            },
            '&:disabled': {
              bgcolor: 'action.disabledBackground',
            },
          }}
        >
          <SendIcon />
        </IconButton>
      </Paper>
    </Drawer>
  );
}
