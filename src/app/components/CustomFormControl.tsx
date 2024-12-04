import { ReactNode } from 'react';
import FormControl from '@mui/material/FormControl';
import { SxProps, Theme } from '@mui/material/styles';

export default function CustomFormControl({
  children,
  hasError,
  sx,
  variant,
}: {
  children: ReactNode,
  hasError?: boolean,
  sx?: SxProps<Theme>,
  variant?: 'standard'|'outlined'|'filled'|undefined,
}) {
  return (
    <FormControl error={hasError} variant={variant} sx={sx} >
      {children}
    </FormControl>
  )
}
