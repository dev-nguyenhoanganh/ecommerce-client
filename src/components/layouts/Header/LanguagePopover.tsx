import React, { useState, useMemo, MouseEvent } from 'react';
import { alpha, useTheme } from '@mui/material/styles';
import { Box, MenuItem, Stack, IconButton, Popover, Divider, Typography } from '@mui/material';

import { Theme } from '../../../interface';

// ----------------------------------------------------------------------

const LANGS = [
  {
    value: 'en',
    label: 'English',
    icon: '/assets/icons/ic_flag_en.svg',
  },
  {
    value: 'vi',
    label: 'Vietnamese',
    icon: '/assets/icons/ic_flag_vn.svg',
  },
];

// ----------------------------------------------------------------------

export default function LanguagePopover() {
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
        sx={{
          padding: 0,
          width: 44,
          height: 44,
          ...buttonStyle,
        }}
      >
        <img src={LANGS[0].icon} alt={LANGS[0].label} />
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
            width: 220,
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
            Language
          </Typography>
        </Box>
        <Divider sx={{ borderStyle: 'dashed' }} />
        <Stack>
          {LANGS.map((option) => (
            <MenuItem key={option.value} selected={option.value === LANGS[0].value} onClick={() => handleClose()}>
              <Box component="img" alt={option.label} src={option.icon} sx={{ width: 28, mr: 2 }} />
              {option.label}
            </MenuItem>
          ))}
        </Stack>
      </Popover>
    </React.Fragment>
  );
}
