import React from 'react';
import { Box } from '@mui/material';
import { styled } from '@mui/system';

import { Icon, IconifyIcon } from '@iconify/react';

interface RootProps {
  width?: string | number;
  icon: string | IconifyIcon;
  sx?: object;
}

const StyledContainer = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'width' && prop !== 'sx',
  name: 'Iconify',
  slot: 'Root',
})<{ width: string | number }>(({ width }) => ({
  width,
  height: width,
}));

export default function Iconify({ width = 20, icon, sx }: RootProps) {
  return (
    <StyledContainer width={width} sx={sx}>
      <Icon icon={icon} />
    </StyledContainer>
  );
}
