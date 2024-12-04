'use client';

import { ChangeEvent, FocusEvent, useCallback, useState } from 'react';
import FormHelperText from '@mui/material/FormHelperText';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import BadgeIcon from '@mui/icons-material/Badge';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import ExpandMoreOutlinedIcon from '@mui/icons-material/ExpandMoreOutlined';
import { styled } from '@mui/material/styles';

import styles from './SignUpForm.module.css';

import CustomInput from './CustomInput';
import CustomFormControl from './CustomFormControl';

type InputValueError = {
  hasError: boolean,
  errorLabel: string,
}

const DEFAULT_VALUE_ERROR = {
  hasError: false,
  errorLabel: '',
};

const CssTextField = styled(TextField)({
  '& label.Mui-focused': {
    color: '#00bfa5',
  },
  '& .MuiInput-underline::before': {
    border: 0,
  },
  '& .MuiInput-underline::after': {
    borderBottomColor: '#00bfa5',
  },
  '& .MuiOutlinedInput-root': {
    backgroundColor: '#fff',
    '&.Mui-error': {
      backgroundColor: '#fef2f2',
    },
    '&:hover fieldset': {
      borderColor: '#6b7280',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#00bfa5',
      '&:hover': {
        borderColor: '#6b7280',
      },
    },
  },
});

function getNumbers(tel: string, isDob?: boolean) {
  const maxNumbers = isDob ? 8 : 10
  const numbersOnly = tel.replace(/\D/g, '');

  if (numbersOnly.length > maxNumbers) {
    return numbersOnly.substring(0, maxNumbers);
  }
  return numbersOnly;
}

function formatPhoneNumber(tel: string) {
  const telArray = tel.split('');
  const formattedTelArray = telArray.map((digit, index) => {
    if (index === 0) {
      return `(${digit}`;
    }
    if (index === 2) {
      return `${digit}) `;
    }
    if (index === 5) {
      return `${digit}-`;
    }
    return digit;
  });

  return formattedTelArray.join('');
}

function formatDate(dob: string) {
  const dobArray = dob.split('');
  const formattedDobArray = dobArray.map((digit, index) => {
    if (index === 1 || index ===3) {
      return `${digit}/`
    }
    return digit;
  });

  return formattedDobArray.join('');
}

export default function SignUpForm() {
  const [nameValue, setNameValue] = useState<string>('');
  const [nameValueError, setNameValueError] = useState<InputValueError>(DEFAULT_VALUE_ERROR);
  const [addressValue, setAddressValue] = useState<string>('');
  const [addressValueError, setAddressValueError] = useState<InputValueError>(DEFAULT_VALUE_ERROR);
  const [cityValue, setCityValue] = useState<string>('');
  const [cityValueError, setCityValueError] = useState<InputValueError>(DEFAULT_VALUE_ERROR);
  const [stateValue, setStateValue] = useState<string>('');
  const [stateValueError, setStateValueError] = useState<InputValueError>(DEFAULT_VALUE_ERROR);
  const [phoneValue, setPhoneValue] = useState<string>('');
  const [formattedPhoneValue, setFormattedPhoneValue] = useState<string>('');
  const [phoneValueError, setPhoneValueError] = useState<InputValueError>(DEFAULT_VALUE_ERROR);
  const [dobValue, setDobValue] = useState<string>('');
  const [formattedDobValue, setFormattedDobValue] = useState<string>('');
  const [dobValueError, setDobValueError] = useState<InputValueError>(DEFAULT_VALUE_ERROR);
  const [genderValue, setGenderValue] = useState<string>('');
  const [emailValue, setEmailValue] = useState<string>('');
  const [emailValueError, setEmailValueError] = useState<InputValueError>(DEFAULT_VALUE_ERROR);
  const isDisabled = nameValueError?.hasError || addressValueError?.hasError || cityValueError?.hasError || stateValueError?.hasError || phoneValueError?.hasError || dobValueError?.hasError || emailValueError?.hasError;
  const isEmpty = !nameValue || !addressValue || !cityValue || !stateValue || !phoneValue || !dobValue || !emailValue;
  const [open, setOpen] = useState<boolean>(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.currentTarget.value;

    switch(event.currentTarget.id) {
      case "address":
        setAddressValue(inputValue);
        break;
      case "city":
        setCityValue(inputValue);
        break;
      case "state":
        setStateValue(inputValue);
        break;
      case "email":
        setEmailValue(inputValue.trim());
        break;
      case "mobile-number":
        const phoneNumber = getNumbers(inputValue.trim());
        setPhoneValue(phoneNumber);
        setFormattedPhoneValue(phoneNumber);
        break;
      case "date-of-birth":
        const dobNumber = getNumbers(inputValue.trim(), true);
        setDobValue(dobNumber);
        setFormattedDobValue(dobNumber);
        break;
      case "full-name":
      default:
        setNameValue(inputValue);
        break;
    }
  }, [
    setAddressValue,
    setCityValue,
    setDobValue,
    setFormattedDobValue,
    setNameValue,
    setPhoneValue,
    setStateValue,
  ]);

  const handleSelectChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setGenderValue(event.target.value);
  }, [setGenderValue]);

  const handleFocus = useCallback((event: FocusEvent<HTMLInputElement>) => {
    switch(event.currentTarget.id) {
      case "address":
        setAddressValueError(DEFAULT_VALUE_ERROR);
        break;
      case "city":
        setCityValueError(DEFAULT_VALUE_ERROR);
        break;
      case "state":
        setStateValueError(DEFAULT_VALUE_ERROR);
        break;
      case "email":
        setEmailValueError(DEFAULT_VALUE_ERROR);
        break;
      case "mobile-number":
        setPhoneValueError(DEFAULT_VALUE_ERROR);
        setFormattedPhoneValue(phoneValue);
        break;
      case "date-of-birth":
        setDobValueError(DEFAULT_VALUE_ERROR);
        setFormattedDobValue(dobValue);
        break;
      case "full-name":
      default:
        setNameValueError(DEFAULT_VALUE_ERROR);
        break;
    }
  }, [
    dobValue,
    phoneValue,
    setAddressValueError,
    setCityValueError,
    setFormattedDobValue,
    setFormattedPhoneValue,
    setNameValueError,
    setPhoneValueError,
    setStateValueError,
  ]);

  const handleBlur = useCallback((event: FocusEvent<HTMLInputElement>) => {
    const inputValue = event.currentTarget.value.trim();

    switch(event.currentTarget.id) {
      case "address":
        if (inputValue === '') {
          setAddressValueError({hasError: true, errorLabel: 'Required field.'});
          return;
        }
        setAddressValueError(DEFAULT_VALUE_ERROR);
        break;
      case "city":
        if (inputValue === '') {
          setCityValueError({hasError: true, errorLabel: 'Required field.'});
          return;
        }
        setCityValueError(DEFAULT_VALUE_ERROR);
        break;
      case "state":
        if (inputValue === '') {
          setStateValueError({hasError: true, errorLabel: 'Required field.'});
          return;
        }
        setStateValueError(DEFAULT_VALUE_ERROR);
        break;
      case "email":
        if (inputValue === '') {
          setEmailValueError({hasError: true, errorLabel: 'Required field.'});
          return;
        }
        if (!inputValue.match(/^\S+@\S+\.\S+$/)) {
          setEmailValueError({hasError: true, errorLabel: 'Invalid email.'});
          return;
        }
        setEmailValueError(DEFAULT_VALUE_ERROR);
        break;
      case "mobile-number":
        setFormattedPhoneValue(formatPhoneNumber(getNumbers(inputValue)));
        if (inputValue === '') {
          setPhoneValueError({hasError: true, errorLabel: 'Required field.'});
          return;
        }
        if (inputValue.length < 10) {
          setPhoneValueError({hasError: true, errorLabel: 'Phone number must be at least 10 digits.'});
          return;
        }
        setPhoneValueError(DEFAULT_VALUE_ERROR);
        break;
      case "date-of-birth":
        setFormattedDobValue(formatDate(getNumbers(inputValue, true)));
        if (inputValue === '') {
          setDobValueError({hasError: true, errorLabel: 'Required field.'});
          return;
        }
        if (inputValue.length < 8) {
          setDobValueError({hasError: true, errorLabel: 'Invalid format - must be MM/DD/YYYY.'});
          return;
        }
        if (inputValue.length === 8) {
          const pickedDate = new Date(formatDate(getNumbers(inputValue, true)));
          const today = new Date();
          if (isNaN(pickedDate.getTime()) || pickedDate.getTime() >= today.getTime()) {
            setDobValueError({hasError: true, errorLabel: 'Invalid date of birth.'})
          }
        }
        break;
      case "full-name":
      default:
        const nameArray = inputValue.split(' ');
        const hasFirstAndLastName = nameArray.length > 1;

        if (inputValue === '') {
          setNameValueError({hasError: true, errorLabel: 'Required field.'});
          return;
        }
        if (!hasFirstAndLastName) {
          setNameValueError({hasError: true, errorLabel: 'Add both first and last name'});
          return;
        }
        setNameValueError(DEFAULT_VALUE_ERROR);
        break;
    }
  }, [
    setAddressValueError,
    setCityValueError,
    setDobValueError,
    setFormattedDobValue,
    setFormattedPhoneValue,
    setNameValueError,
    setPhoneValueError,
    setStateValueError,
  ]);

  return (
    <>
      <Stack
        sx={{
          backgroundColor: '#fff', 
          border: '1px solid #d1d5db',
          borderRadius: '8px',
          marginBottom: '24px',
          maxWidth: '320px',
        }}
      >
        <h3 className={styles.formHeader}>
          <BadgeIcon fontSize="small" />Your information
        </h3>
        <Divider />
        <CustomInput
          errorLabel={nameValueError?.errorLabel}
          hasError={nameValueError?.hasError}
          htmlFor="full-name"
          id="full-name"
          label="Full name"
          onBlur={handleBlur}
          onChange={handleChange}
          onFocus={handleFocus}
          value={nameValue}
        />
        <CustomInput
          errorLabel={addressValueError?.errorLabel}
          hasError={addressValueError?.hasError}
          htmlFor="address"
          id="address"
          onBlur={handleBlur}
          onChange={handleChange}
          onFocus={handleFocus}
          label="Address"
          value={addressValue}
        />
        <Stack
          direction="row"
          divider={<Divider orientation="vertical" flexItem />}
          sx={{ width: '100%' }}
        >
          <CustomInput
            errorLabel={cityValueError?.errorLabel}
            hasError={cityValueError?.hasError}
            htmlFor="city"
            id="city"
            label="City"
            onBlur={handleBlur}
            onChange={handleChange}
            onFocus={handleFocus}
            value={cityValue}
          />
          <CustomInput
            errorLabel={stateValueError?.errorLabel}
            hasError={stateValueError?.hasError}
            htmlFor="state"
            id="state"
            label="State"
            onBlur={handleBlur}
            onChange={handleChange}
            onFocus={handleFocus}
            value={stateValue}
          />
        </Stack>
        <CustomInput
          errorLabel={phoneValueError?.errorLabel}
          hasError={phoneValueError?.hasError}
          htmlFor="mobile-number"
          id="mobile-number"
          label="Mobile number"
          onBlur={handleBlur}
          onChange={handleChange}
          onFocus={handleFocus}
          placeholder="(000) 000-0000"
          type="tel"
          value={formattedPhoneValue}
        />
        <CustomInput
          errorLabel={dobValueError?.errorLabel}
          hasError={dobValueError?.hasError}
          htmlFor="date-of-birth"
          id="date-of-birth"
          label="Date of birth"
          onBlur={handleBlur}
          onChange={handleChange}
          onFocus={handleFocus}
          placeholder="MM/DD/YYYY"
          value={formattedDobValue}
        />
        <CssTextField
          id="gender"
          onChange={handleSelectChange}
          select
          slotProps={{
            input: {
              endAdornment: (
                <InputAdornment position="end" disablePointerEvents={true}>
                  <ExpandMoreOutlinedIcon />
                </InputAdornment>
              ),
              sx: {px: 2, py: 1}
            },
            inputLabel: {sx: {px: 2}},
            select: {
              MenuProps: {marginThreshold: 0},
              IconComponent: () => null,
            }
          }}
          label="Gender"
          size="small"
          variant="standard"
          value={genderValue}
        >
          <MenuItem value="Male">Male</MenuItem>
          <MenuItem value="Female">Female</MenuItem>
          <MenuItem value="Other">Other</MenuItem>
        </CssTextField>
      </Stack>
      <Stack sx={{maxWidth: '320px'}}>
        <CustomFormControl hasError={emailValueError?.hasError}>
          <CssTextField
            error={emailValueError?.hasError}
            id="email"
            onBlur={handleBlur}
            onChange={handleChange}
            onFocus={handleFocus}
            placeholder="Email"
            size="small"
            value={emailValue}
          />
          {emailValueError?.hasError ? <FormHelperText>{emailValueError?.errorLabel}</FormHelperText> : null}
        </CustomFormControl>
        <Button
          disabled={isDisabled || isEmpty}
          onClick={handleOpen}
          startIcon={<EmailOutlinedIcon />}
          sx={{
            backgroundColor: 'black',
            marginTop: '24px',
            textTransform: 'initial',
          }}
          type="button"
          variant="contained"
        >
          Continue with email
        </Button>
      </Stack>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className={styles.modalContentWrapper}>
          <h3>Submission payload</h3>
          <pre className={styles.modalContent}>
            {`{ name: ${nameValue}, address: ${addressValue}, city: ${cityValue}, state: ${stateValue}, mobile number: ${formattedPhoneValue}, dob: ${formattedDobValue}, gender: ${genderValue}, email: ${emailValue}}`}
          </pre>
        </div>
      </Modal>
    </>
  );
}
