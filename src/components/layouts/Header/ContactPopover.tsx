import React, { useState, useMemo, MouseEvent } from 'react';
import { alpha, useTheme } from '@mui/material/styles';
import {
  Box,
  Stack,
  IconButton,
  Popover,
  Divider,
  Typography,
  ListItemButton,
  ListItemAvatar,
  Avatar,
  ListItemText,
} from '@mui/material';

import { Theme } from '../../../interface';
import { OnlineStatus } from '../../../utils/constants';
import { fToNow } from '../../../utils/formatTime';
import { CONTACTS } from '../../../_mock/contact';
import Scrollbar from '../../../components/scrollbar';
import { Iconify } from '../../iconify';

export default function ContactPopover() {
  // ----------- React Hook ------------------
  const theme: Theme = useTheme();

  // ----------- State declare ---------------
  const [open, setOpen] = useState<HTMLButtonElement | null>(null);

  // ----------- Memo logic ---------------
  const buttonStyle = useMemo(() => {
    return open
      ? {
          '&.MuiButtonBase-root.MuiIconButton-root': {
            bgcolor: alpha(theme.palette.grey[500], 0.16),
          },
        }
      : {};
  }, [open, theme]);

  // ----------- Handle change state ---------------
  const handleOpen = (event: MouseEvent<HTMLButtonElement>) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  return (
    <React.Fragment>
      <IconButton
        onClick={handleOpen}
        color={open ? 'primary' : 'default'}
        sx={{ width: 40, height: 40, ...buttonStyle }}
      >
        <Iconify icon="eva:people-fill" />
      </IconButton>

      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            pb: 1,
            mt: 1.5,
            ml: 0.75,
            width: 376,
            boxShadow: theme.customShadows.dropdown,
            '& .MuiMenuItem-root': {
              pl: 2.5,
              pr: 2,
              typography: 'body2',
            },
          },
        }}
      >
        <Box sx={{ p: theme.spacing(2, 2.5) }}>
          <Typography component="span" variant="subtitle1">
            Contact ({CONTACTS.length})
          </Typography>
        </Box>
        <Divider sx={{ borderStyle: 'dashed' }} />
        <Scrollbar sx={{ height: { xs: 340, sm: 488 } }}>
          <Stack>
            {CONTACTS.map((user) => (
              <ContactItem key={user.id} contact={user} />
            ))}
          </Stack>
        </Scrollbar>
      </Popover>
    </React.Fragment>
  );
}

// ----------------------------------------------------------------------

interface ContactDetail {
  photoURL: string;
  displayName: string;
  activeStatus: OnlineStatus;
  lastActive?: Date;
  id: string;
}

interface ContactItemProps {
  contact: ContactDetail;
}

function ContactItem({ contact }: ContactItemProps): JSX.Element {
  return (
    <ListItemButton
      sx={{
        py: 1.5,
        px: 2.5,
        mt: '1px',
      }}
    >
      <ListItemAvatar>
        <Avatar sx={{ bgcolor: 'background.neutral' }} src={contact.photoURL} />
      </ListItemAvatar>
      <ListItemText
        primary={contact.displayName}
        secondary={
          <Typography
            variant="caption"
            sx={{
              mt: 0.5,
              display: 'flex',
              alignItems: 'center',
              color: 'text.disabled',
            }}
          >
            {contact.lastActive && fToNow(contact.lastActive)}
          </Typography>
        }
      />
    </ListItemButton>
  );
}
