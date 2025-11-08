import { Fab, Tooltip, Badge } from '@mui/material';
import SmartToyIcon from '@mui/icons-material/SmartToy';

interface FloatingChatButtonProps {
  onClick: () => void;
}

export default function FloatingChatButton({ onClick }: FloatingChatButtonProps) {
  return (
    <Tooltip title="Chat with AI Assistant" placement="left">
      <Fab
        color="primary"
        aria-label="chat"
        onClick={onClick}
        sx={{
          position: 'fixed',
          bottom: 24,
          right: 24,
          zIndex: 1000,
          boxShadow: 4,
          '&:hover': {
            transform: 'scale(1.1)',
            transition: 'transform 0.2s',
          },
        }}
      >
        <Badge
          badgeContent="AI"
          color="secondary"
          sx={{
            '& .MuiBadge-badge': {
              fontSize: '0.65rem',
              height: 18,
              minWidth: 18,
              fontWeight: 'bold',
            },
          }}
        >
          <SmartToyIcon />
        </Badge>
      </Fab>
    </Tooltip>
  );
}
