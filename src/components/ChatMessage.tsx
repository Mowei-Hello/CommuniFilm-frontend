import { Box, Paper, Typography, Avatar } from '@mui/material';
import { ChatMessage as ChatMessageType } from '@/types';
import PersonIcon from '@mui/icons-material/Person';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import ReactMarkdown from 'react-markdown';

interface ChatMessageProps {
  message: ChatMessageType;
}

export default function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === 'user';

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: isUser ? 'flex-end' : 'flex-start',
        mb: 2,
        gap: 1,
      }}
    >
      {!isUser && (
        <Avatar
          sx={{
            bgcolor: 'primary.main',
            width: 32,
            height: 32,
          }}
        >
          <SmartToyIcon sx={{ fontSize: 20 }} />
        </Avatar>
      )}

      <Paper
        elevation={1}
        sx={{
          maxWidth: '75%',
          p: 2,
          bgcolor: isUser ? 'primary.main' : 'background.paper',
          color: isUser ? 'primary.contrastText' : 'text.primary',
          borderRadius: 2,
          borderTopRightRadius: isUser ? 0 : 2,
          borderTopLeftRadius: isUser ? 2 : 0,
        }}
      >
        {isUser ? (
          <Typography variant="body1">{message.content}</Typography>
        ) : (
          <Box
            sx={{
              '& p': { margin: 0, mb: 1 },
              '& p:last-child': { mb: 0 },
              '& ul, & ol': { mt: 0.5, mb: 0.5, pl: 2 },
              '& strong': { fontWeight: 700 },
              '& code': {
                bgcolor: 'action.hover',
                px: 0.5,
                py: 0.25,
                borderRadius: 0.5,
                fontSize: '0.9em',
              },
            }}
          >
            <ReactMarkdown>{message.content}</ReactMarkdown>
          </Box>
        )}

        <Typography
          variant="caption"
          sx={{
            display: 'block',
            mt: 0.5,
            opacity: 0.7,
            fontSize: '0.7rem',
          }}
        >
          {new Date(message.timestamp).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          })}
        </Typography>
      </Paper>

      {isUser && (
        <Avatar
          sx={{
            bgcolor: 'secondary.main',
            width: 32,
            height: 32,
          }}
        >
          <PersonIcon sx={{ fontSize: 20 }} />
        </Avatar>
      )}
    </Box>
  );
}
