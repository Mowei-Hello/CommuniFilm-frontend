import { Fab, Tooltip, Badge } from '@mui/material';
import TheaterComedyIcon from '@mui/icons-material/TheaterComedy';

interface FloatingChatButtonProps {
  onClick: () => void;
}

export default function FloatingChatButton({ onClick }: FloatingChatButtonProps) {
  return (
    <Tooltip
      title="Chat with Filmi"
      placement="left"
      arrow
      slotProps={{
        tooltip: {
          sx: {
            bgcolor: 'primary.main',
            color: 'primary.contrastText',
            fontSize: '0.875rem',
            fontWeight: 600,
            px: 2,
            py: 1,
            boxShadow: 3,
          },
        },
        arrow: {
          sx: {
            color: 'primary.main',
          },
        },
      }}
    >
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
          <TheaterComedyIcon />
        </Badge>
      </Fab>
    </Tooltip>
  );
}
