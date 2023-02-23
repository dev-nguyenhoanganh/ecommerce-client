import React from 'react';
import { Box } from '@mui/material';

import { Icon, IconifyIcon } from '@iconify/react';

interface RootProps {
  width?: string | number;
  icon: string | IconifyIcon;
  sx?: object;
}

export default function Iconify({ width = 20, icon, sx }: RootProps) {
  return (
    <React.Fragment>
      <Box component={Icon} icon={icon} sx={{ width, height: width, ...sx }} />
    </React.Fragment>
  );
}
