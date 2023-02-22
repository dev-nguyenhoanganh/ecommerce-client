import { Theme as MuiTheme } from '@mui/material';
import { CustomShadow } from './CustomShadow';

export interface Theme extends MuiTheme {
  customShadows: CustomShadow;
}
