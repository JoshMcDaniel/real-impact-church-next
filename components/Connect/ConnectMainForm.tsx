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
  getNameError,
  getEmailError,
  getPhoneError,
  getCommentsError,
  nameInputProps,
  emailInputProps,
  phoneNumberInputProps,
  commentsInputProps,
  formatPhoneNumber,
  toTitleCase,
} from '../../constants/validation';

export interface ConnectMainFormContent {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  comments: string;
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
    comments: '',
  };

  const [form, setForm] = useState<ConnectMainFormContent>(initialForm);

  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    const { name, value } = event.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === 'phoneNumber' ? formatPhoneNumber(value) : value,
    }));
  };

  const handleNameBlur = (field: 'firstName' | 'lastName') => () => {
    setForm((prev) => ({
      ...prev,
      [field]: toTitleCase(prev[field].trim()),
    }));
  };

  const handleFormSubmit = (event: any): void => {
    event.preventDefault();
    onSubmit(form);
    setForm(initialForm);
  };

  const isFormValid = (form: ConnectMainFormContent): boolean =>
    isValidName(form.firstName) &&
    isValidName(form.lastName) &&
    isValidEmail(form.email) &&
    isValidPhoneNumber(form.phoneNumber);

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
          onBlur={handleNameBlur('firstName')}
          error={!!form.firstName && !isValidName(form.firstName)}
          helperText={!!form.firstName ? getNameError(form.firstName) : ' '}
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
          onBlur={handleNameBlur('lastName')}
          error={!!form.lastName && !isValidName(form.lastName)}
          helperText={!!form.lastName ? getNameError(form.lastName) : ' '}
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
          onChange={handleInputChange}
          error={!!form.email && !isValidEmail(form.email)}
          helperText={!!form.email ? getEmailError(form.email) : ' '}
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
          placeholder="(555) 555-5555"
          inputProps={phoneNumberInputProps}
          onChange={handleInputChange}
          error={!!form.phoneNumber && !isValidPhoneNumber(form.phoneNumber)}
          helperText={!!form.phoneNumber ? getPhoneError(form.phoneNumber) : ' '}
        />
      </Box>
      <TextField
        id="comments"
        name="comments"
        value={form.comments}
        disabled={disabled}
        type="text"
        label="Anything you'd like us to know? (optional)"
        variant="filled"
        color="primary"
        multiline
        rows={4}
        inputProps={commentsInputProps}
        onChange={handleInputChange}
        error={!!form.comments && !!getCommentsError(form.comments)}
        helperText={
          form.comments
            ? getCommentsError(form.comments) ?? `${form.comments.length} / ${commentsInputProps.maxLength}`
            : ' '
        }
      />
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
