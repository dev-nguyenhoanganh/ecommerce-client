/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, MouseEvent, useMemo, useCallback } from 'react';
import { noCase } from 'change-case';
import { alpha, useTheme } from '@mui/material/styles';
import {
  Box,
  List,
  Badge,
  Button,
  Avatar,
  Tooltip,
  Divider,
  Popover,
  Typography,
  IconButton,
  ListItemText,
  ListSubheader,
  ListItemAvatar,
  ListItemButton,
} from '@mui/material';

import { fToNow, fDateTime } from '../../../utils/formatTime';
import { Iconify } from '../../../components/iconify';
import { Theme } from '../../../interface';
import { NOTIFICATIONS } from '../../../_mock/notification';
import Scrollbar from '../../../components/scrollbar';

// ----------------------------------------------------------------------

export default function NotificationsPopover() {
  // ----------- React Hook ------------------
  const theme: Theme = useTheme();

  // ----------- State declare ---------------
  const [notifications, setNotifications] = useState(NOTIFICATIONS);
  const [open, setOpen] = useState<HTMLButtonElement | null>(null);

  // ----------- Memo logic ---------------
  const totalUnRead = useMemo(() => {
    return notifications.filter((item) => item.isUnRead === true).length;
  }, [notifications]);

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

  const handleMarkAllAsRead = useCallback(() => {
    setNotifications(
      notifications.map((notification) => ({
        ...notification,
        isUnRead: false,
      }))
    );
  }, [notifications]);

  return (
    <React.Fragment>
      <IconButton
        color={open ? 'primary' : 'default'}
        onClick={handleOpen}
        sx={{ width: 40, height: 40, ...buttonStyle }}
      >
        <Badge badgeContent={totalUnRead} color="error">
          <Iconify icon="eva:bell-fill" />
        </Badge>
      </IconButton>

      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            mt: 1.5,
            ml: 0.75,
            width: 360,
            boxShadow: theme.customShadows.dropdown,
          },
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', py: 2, px: 2.5 }}>
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="subtitle1">Notifications</Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              You have {totalUnRead} unread messages
            </Typography>
          </Box>

          {totalUnRead > 0 && (
            <Tooltip title=" Mark all as read">
              <IconButton color="primary" onClick={handleMarkAllAsRead}>
                <Iconify icon="eva:done-all-fill" />
              </IconButton>
            </Tooltip>
          )}
        </Box>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <Scrollbar sx={{ height: { xs: 340, sm: 560 } }}>
          <List
            disablePadding
            subheader={
              <ListSubheader disableSticky sx={{ py: 1, px: 2.5, typography: 'overline' }}>
                New
              </ListSubheader>
            }
          >
            {notifications.slice(0, 2).map((notification) => (
              <NotificationItem key={notification.id} notification={notification} formatToNow />
            ))}
          </List>

          <List
            disablePadding
            subheader={
              <ListSubheader disableSticky sx={{ py: 1, px: 2.5, typography: 'overline' }}>
                Before that
              </ListSubheader>
            }
          >
            {notifications.slice(2, 5).map((notification) => (
              <NotificationItem key={notification.id} notification={notification} />
            ))}
          </List>
        </Scrollbar>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <Box sx={{ p: 1 }}>
          <Button fullWidth disableRipple>
            View All
          </Button>
        </Box>
      </Popover>
    </React.Fragment>
  );
}

// ----------------------------------------------------------------------

interface NotificationDetail {
  createdAt: Date;
  id: string;
  isUnRead: boolean;
  title: string;
  description: string;
  type: string;
  avatar: any;
}

interface NotificationItemProps {
  notification: NotificationDetail;
  formatToNow?: boolean;
}

function NotificationItem({ notification, formatToNow }: NotificationItemProps): JSX.Element {
  const { avatar, title } = renderContent(notification);

  return (
    <ListItemButton
      sx={{
        py: 1.5,
        px: 2.5,
        mt: '1px',
        ...(notification.isUnRead && {
          bgcolor: 'action.selected',
        }),
      }}
    >
      <ListItemAvatar>
        <Avatar sx={{ bgcolor: 'background.neutral' }}>{avatar}</Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={title}
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
            <Iconify icon="eva:clock-outline" sx={{ mr: 0.5, width: 16, height: 16 }} />
            {formatToNow ? fToNow(notification.createdAt) : fDateTime(notification.createdAt)}
          </Typography>
        }
      />
    </ListItemButton>
  );
}

// ----------------------------------------------------------------------

function renderContent(notification: NotificationDetail) {
  const title = (
    <Typography variant="subtitle2">
      {notification.title}
      <Typography component="span" variant="body2" sx={{ color: 'text.secondary' }}>
        &nbsp; {noCase(notification.description)}
      </Typography>
    </Typography>
  );

  if (notification.type === 'order_placed') {
    return {
      avatar: <img alt={notification.title} src="/assets/icons/ic_notification_package.svg" />,
      title,
    };
  }
  if (notification.type === 'order_shipped') {
    return {
      avatar: <img alt={notification.title} src="/assets/icons/ic_notification_shipping.svg" />,
      title,
    };
  }
  if (notification.type === 'mail') {
    return {
      avatar: <img alt={notification.title} src="/assets/icons/ic_notification_mail.svg" />,
      title,
    };
  }
  if (notification.type === 'chat_message') {
    return {
      avatar: <img alt={notification.title} src="/assets/icons/ic_notification_chat.svg" />,
      title,
    };
  }
  return {
    avatar: notification.avatar ? <img alt={notification.title} src={notification.avatar} /> : null,
    title,
  };
}
