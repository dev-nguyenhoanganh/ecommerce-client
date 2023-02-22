import { Theme } from '../../interface';

// ----------------------------------------------------------------------

export default function Table(theme: Theme) {
  return {
    MuiTableCell: {
      styleOverrides: {
        head: {
          color: theme.palette.text.secondary,
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          backgroundColor: theme.palette.background.neutral,
        },
      },
    },
  };
}
