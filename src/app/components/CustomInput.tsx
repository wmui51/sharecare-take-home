import { ChangeEvent, FocusEvent } from 'react';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import Input from '@mui/material/Input';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { styled } from '@mui/material/styles';

import CustomFormControl from './CustomFormControl';

const CssInput = styled(Input)({
  '&.MuiInputBase-root': {
    '& .Mui-error': {
      backgroundColor: '#fef2f2',
    },
    '&::before': {
      borderColor: 'rgba(0, 0, 0, 0.12)',
    },
    '&::after': {
      borderColor: '#00bfa5',
    },
    '&:hover': {
      '&::after': {
        borderColor: '#00bfa5',
      },
    },
  },
});

const CssLabel = styled(InputLabel)({
  '&.Mui-focused': {
    color: '#00bfa5',
  },
});

export default function CustomInput({
  hasError,
  id,
  defaultValue,
  disabled,
  errorLabel,
  htmlFor,
  label,
  onBlur,
  onChange,
  onFocus,
  placeholder,
  type,
  value,
}: {
  hasError?: boolean,
  id: string,
  defaultValue?: string,
  disabled?: boolean,
  errorLabel?: string,
  htmlFor: string,
  label: string,
  onBlur?: (event: FocusEvent<HTMLInputElement>) => void,
  onChange: (event: ChangeEvent<HTMLInputElement>) => void,
  onFocus?: (event: FocusEvent<HTMLInputElement>) => void,
  placeholder?: string,
  type?: string,
  value: string|number,
}) {
  const forceShrinkProp = errorLabel === "Required field." ? {shrink: true} : {};
  const customErrorBackground = hasError ? {backgroundColor: '#fef2f2'} : {};
  const customErrorAdornment = hasError ? {color: '#d32f2f'} : {};

  return (
    <CustomFormControl hasError={hasError} variant="standard" sx={customErrorBackground}>
      <CssLabel
        htmlFor={htmlFor}
        sx={{px: 2}}
        {...forceShrinkProp}
      >
        {hasError ? errorLabel : label}
      </CssLabel>
      <CssInput
        id={id}
        defaultValue={defaultValue}
        disabled={disabled}
        endAdornment={
          <InputAdornment position="end">
            <EditOutlinedIcon sx={customErrorAdornment} />
          </InputAdornment>
        }
        onBlur={onBlur}
        onChange={onChange}
        onFocus={onFocus}
        placeholder={placeholder}
        size="small"
        sx={{px: 2, py: 1}}
        type={type}
        value={value}
      />
    </CustomFormControl>
  );
}