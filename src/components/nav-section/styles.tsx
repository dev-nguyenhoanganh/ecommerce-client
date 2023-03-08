import React from 'react';
import { NavLinkProps } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { ListItemIcon, ListItemButton, ListItemButtonProps } from '@mui/material';

// ----------------------------------------------------------------------

type NavItemProps = {
  component: React.ForwardRefExoticComponent<NavLinkProps & React.RefAttributes<HTMLAnchorElement>>;
  to: string;
};

export const StyledNavItem = styled((props: ListItemButtonProps & NavItemProps) => (
  <ListItemButton disableGutters {...props} />
))(({ theme }) => ({
  ...theme.typography.body2,
  height: 48,
  position: 'relative',
  textTransform: 'capitalize',
  color: theme.palette.text.secondary,
  borderRadius: theme.shape.borderRadius,
}));

export const StyledNavItemIcon = styled(ListItemIcon)({
  width: 22,
  height: 22,
  color: 'inherit',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});
