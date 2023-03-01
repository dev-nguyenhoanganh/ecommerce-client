import React from 'react';
import { NavLink as RouterLink } from 'react-router-dom';
import { Box, List, ListItemText } from '@mui/material';

import { StyledNavItem, StyledNavItemIcon } from './styles';

// ----------------------------------------------------------------------

type NavSectionProps = {
  data: ItemProps[];
};

type ItemProps = {
  title: string;
  path: string;
  icon: JSX.Element;
  info?: string;
};

export default function NavSection({ data = [], ...other }: NavSectionProps) {
  return (
    <Box {...other}>
      <List disablePadding sx={{ p: 1 }}>
        {data.map((item) => (
          <NavItem key={item.title} item={item} />
        ))}
      </List>
    </Box>
  );
}

// ----------------------------------------------------------------------

type NavItemProps = {
  item: ItemProps;
  key?: string | number;
};

function NavItem({ item }: NavItemProps) {
  const { title, path, icon, info } = item;

  return (
    <StyledNavItem
      component={RouterLink}
      to={path}
      sx={{
        '&.active': {
          color: 'text.primary',
          bgcolor: 'action.selected',
          fontWeight: 'fontWeightBold',
        },
      }}
    >
      <React.Fragment>
        <StyledNavItemIcon>{icon && icon}</StyledNavItemIcon>

        <ListItemText disableTypography primary={title} />

        {info && info}
      </React.Fragment>
    </StyledNavItem>
  );
}
