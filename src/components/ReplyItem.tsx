import { ReviewReply } from '@/types';
import { Box, Typography, Paper, Avatar } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';

interface ReplyItemProps {
  reply: ReviewReply;
}

export default function ReplyItem({ reply }: ReplyItemProps) {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 2,
        mb: 2,
        bgcolor: 'action.hover',
        borderLeft: '3px solid',
        borderColor: 'primary.main',
      }}
    >
      <Box sx={{ display: 'flex', gap: 2 }}>
        <Avatar sx={{ bgcolor: 'secondary.main', width: 32, height: 32 }}>
          <PersonIcon sx={{ fontSize: 20 }} />
        </Avatar>

        <Box sx={{ flex: 1 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
              {reply.username}
            </Typography>
            <Typography variant="caption" color="text.secondary" suppressHydrationWarning>
              {new Date(reply.createdAt).toLocaleDateString()}
            </Typography>
          </Box>

          <Typography variant="body2" color="text.primary">
            {reply.text}
          </Typography>
        </Box>
      </Box>
    </Paper>
  );
}
