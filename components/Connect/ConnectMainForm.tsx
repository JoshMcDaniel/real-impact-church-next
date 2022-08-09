import {
  Box,
  Fab,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import React, { ChangeEvent, useState } from 'react';
import CheckIcon from '@mui/icons-material/Check';
import {
  isValidName,
  isValidEmail,
  isValidPhoneNumber,
  nameInputProps,
  emailInputProps,
  phoneNumberInputProps,
} from '../../constants/validation';

export interface ConnectMainFormContent {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
}

type Props = {
  disabled: boolean;
  onSubmit: (form: ConnectMainFormContent) => any;
};

const ConnectMainForm = (props: Props) => {
  const { onSubmit, disabled } = props;
  const initialForm: ConnectMainFormContent = {
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
  };

  const [form, setForm] = useState<ConnectMainFormContent>(initialForm);

  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    const { name, value } = event.target;
    setForm((previousFormValue) => ({
      ...previousFormValue,
      [name]: value,
    }));
  };

  const handleFormSubmit = (event: any): void => {
    event.preventDefault();
    onSubmit(form);
    setForm(() => initialForm);
  };

  const isFormValid = (form: ConnectMainFormContent): boolean => {
    return (
      isValidName(form.firstName) &&
      isValidName(form.lastName) &&
      isValidEmail(form.email) &&
      isValidPhoneNumber(form.phoneNumber)
    );
  };

  const isMediumView = useMediaQuery(useTheme().breakpoints.up('md'));

  return (
    <Box component="form" display="grid" gap="1rem" gridAutoFlow="row">
      <Typography component="label" variant="h5">
        Contact Info
      </Typography>
      <Box
        display="grid"
        gap="1rem"
        gridTemplateColumns={isMediumView ? '1fr 1fr' : '1fr'}
      >
        <TextField
          id="firstName"
          name="firstName"
          value={form.firstName}
          disabled={disabled}
          type="text"
          label="First Name"
          variant="filled"
          color="primary"
          required
          inputProps={nameInputProps}
          onChange={handleInputChange}
          error={!!form.firstName && !isValidName(form.firstName)}
        />
        <TextField
          id="lastName"
          name="lastName"
          value={form.lastName}
          disabled={disabled}
          type="text"
          label="Last Name"
          variant="filled"
          color="primary"
          required
          inputProps={nameInputProps}
          onChange={handleInputChange}
          error={!!form.lastName && !isValidName(form.lastName)}
        />
        <TextField
          id="email"
          name="email"
          value={form.email}
          disabled={disabled}
          type="email"
          label="Email"
          variant="filled"
          color="primary"
          required
          inputProps={emailInputProps}
          error={!!form.email && !isValidEmail(form.email)}
          onChange={handleInputChange}
        />
        <TextField
          id="phoneNumber"
          name="phoneNumber"
          value={form.phoneNumber}
          disabled={disabled}
          type="tel"
          label="Phone Number"
          variant="filled"
          color="primary"
          required
          inputProps={phoneNumberInputProps}
          onChange={handleInputChange}
          error={!!form.phoneNumber && !isValidPhoneNumber(form.phoneNumber)}
        />
      </Box>
      <Fab
        variant="extended"
        type="submit"
        color="secondary"
        size="large"
        sx={{
          width: 'fit-content',
          justifySelf: 'center',
          marginTop: '2rem',
        }}
        disabled={disabled || !isFormValid(form)}
        onClick={(event) => handleFormSubmit(event)}
      >
        <CheckIcon sx={{ mr: 1 }} />
        Submit
      </Fab>
    </Box>
  );
};

export default ConnectMainForm;
