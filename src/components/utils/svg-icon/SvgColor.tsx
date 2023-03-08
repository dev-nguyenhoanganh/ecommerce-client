import React from 'react';

import { Box } from '@mui/material';

// ----------------------------------------------------------------------

type SvgColorProps = {
  sx: object;
  src: string;
};

export default function SvgColor({ src, sx }: SvgColorProps): JSX.Element {
  return (
    <React.Fragment>
      <Box
        component="span"
        sx={{
          width: 24,
          height: 24,
          display: 'inline-block',
          bgcolor: 'currentColor',
          mask: `url(${src}) no-repeat center / contain`,
          WebkitMask: `url(${src}) no-repeat center / contain`,
          ...sx,
        }}
      />
    </React.Fragment>
  );
}
