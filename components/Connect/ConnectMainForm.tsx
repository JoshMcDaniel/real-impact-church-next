import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import InputBase from '@mui/material/InputBase';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import React, { ChangeEvent, FormEvent, ReactNode, useState } from 'react';
import { brand } from '../../constants/brand';
import {
  commentsInputProps,
  emailInputProps,
  formatPhoneNumber,
  getCommentsError,
  getEmailError,
  getNameError,
  getPhoneError,
  isValidEmail,
  isValidName,
  isValidOptionalPhoneNumber,
  nameInputProps,
  phoneNumberInputProps,
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
  /** Resolves true when the message was sent; the form clears only then. */
  onSubmit: (form: ConnectMainFormContent) => Promise<boolean>;
};

const initialForm: ConnectMainFormContent = {
  firstName: '',
  lastName: '',
  email: '',
  phoneNumber: '',
  comments: '',
};

type FieldProps = {
  id: keyof ConnectMainFormContent;
  label: string;
  required?: boolean;
  error?: string | null;
  hint?: string;
  fullWidth?: boolean;
  children: ReactNode;
};

/** Label above an input, with an optional error or hint below. */
const Field = ({ id, label, required, error, hint, fullWidth, children }: FieldProps) => (
  <Box sx={{ gridColumn: fullWidth ? '1 / -1' : undefined, display: 'flex', flexDirection: 'column', gap: 1 }}>
    <Box component="label" htmlFor={id} sx={{ fontSize: 14, fontWeight: 700, color: brand.charcoal }}>
      {label}
      {required ? (
        <Box component="span" aria-hidden sx={{ color: brand.red }}>
          {' '}
          *
        </Box>
      ) : (
        <Box component="span" sx={{ fontWeight: 600, color: brand.muted }}>
          {' '}
          (optional)
        </Box>
      )}
    </Box>
    {children}
    <Box
      id={`${id}-help`}
      aria-live="polite"
      sx={{ minHeight: 18, fontSize: 13, fontWeight: error ? 700 : 500, color: error ? '#b0031f' : brand.muted }}
    >
      {error || hint || ''}
    </Box>
  </Box>
);

const inputSx = (hasError: boolean) => ({
  minHeight: 52,
  border: `1.5px solid ${hasError ? brand.red : '#cfd6da'}`,
  borderRadius: '14px',
  px: 2,
  fontSize: 16,
  color: brand.charcoal,
  backgroundColor: brand.paper,
  transition: 'border-color .15s ease, box-shadow .15s ease',
  '&.Mui-focused': { borderColor: brand.charcoal, boxShadow: `0 0 0 3px ${brand.redTint}` },
  '&.Mui-disabled': { opacity: 0.6 },
  '& textarea': { py: '14px' },
});

const ConnectMainForm = ({ onSubmit, disabled }: Props) => {
  const [form, setForm] = useState<ConnectMainFormContent>(initialForm);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: name === 'phoneNumber' ? formatPhoneNumber(value) : value }));
  };

  const handleNameBlur = (field: 'firstName' | 'lastName') => () => {
    setForm((prev) => ({ ...prev, [field]: toTitleCase(prev[field].trim()) }));
  };

  const isFormValid =
    isValidName(form.firstName) &&
    isValidName(form.lastName) &&
    isValidEmail(form.email) &&
    isValidOptionalPhoneNumber(form.phoneNumber) &&
    !getCommentsError(form.comments);

  const handleFormSubmit = async (event: FormEvent): Promise<void> => {
    event.preventDefault();
    if (!isFormValid || disabled) return;
    const sent = await onSubmit(form);
    if (sent) setForm(initialForm);
  };

  const errors = {
    firstName: form.firstName ? getNameError(form.firstName) : null,
    lastName: form.lastName ? getNameError(form.lastName) : null,
    email: form.email ? getEmailError(form.email) : null,
    phoneNumber: form.phoneNumber ? getPhoneError(form.phoneNumber) : null,
    comments: form.comments ? getCommentsError(form.comments) : null,
  };

  const input = (
    id: keyof ConnectMainFormContent,
    props: { type?: string; required?: boolean; autoComplete?: string; placeholder?: string; inputProps?: object; onBlur?: () => void }
  ) => (
    <InputBase
      id={id}
      name={id}
      value={form[id]}
      onChange={handleInputChange}
      onBlur={props.onBlur}
      disabled={disabled}
      type={props.type ?? 'text'}
      required={props.required}
      autoComplete={props.autoComplete}
      placeholder={props.placeholder}
      inputProps={{ ...props.inputProps, 'aria-describedby': `${id}-help`, 'aria-invalid': !!errors[id] }}
      sx={inputSx(!!errors[id])}
    />
  );

  return (
    <Box
      component="form"
      noValidate
      onSubmit={handleFormSubmit}
      sx={{
        backgroundColor: brand.white,
        color: brand.charcoal,
        borderRadius: '20px',
        p: 'clamp(20px, 3vw, 32px)',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(min(220px, 100%), 1fr))',
        gap: '6px 18px',
      }}
    >
      <Field id="firstName" label="First name" required error={errors.firstName}>
        {input('firstName', { required: true, autoComplete: 'given-name', inputProps: nameInputProps, onBlur: handleNameBlur('firstName') })}
      </Field>
      <Field id="lastName" label="Last name" required error={errors.lastName}>
        {input('lastName', { required: true, autoComplete: 'family-name', inputProps: nameInputProps, onBlur: handleNameBlur('lastName') })}
      </Field>
      <Field id="email" label="Email" required error={errors.email}>
        {input('email', { type: 'email', required: true, autoComplete: 'email', placeholder: 'you@example.com', inputProps: emailInputProps })}
      </Field>
      <Field id="phoneNumber" label="Phone" error={errors.phoneNumber}>
        {input('phoneNumber', { type: 'tel', autoComplete: 'tel', placeholder: '(555) 555-5555', inputProps: phoneNumberInputProps })}
      </Field>
      <Field
        id="comments"
        label="Anything you’d like us to know?"
        error={errors.comments}
        hint={form.comments ? `${form.comments.length} / ${commentsInputProps.maxLength}` : undefined}
        fullWidth
      >
        <InputBase
          id="comments"
          name="comments"
          value={form.comments}
          onChange={handleInputChange}
          disabled={disabled}
          multiline
          minRows={4}
          placeholder="Prayer requests, questions, or how you heard about us"
          inputProps={{ ...commentsInputProps, 'aria-describedby': 'comments-help', 'aria-invalid': !!errors.comments }}
          sx={inputSx(!!errors.comments)}
        />
      </Field>
      <Box sx={{ gridColumn: '1 / -1', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '12px', pt: 0.5 }}>
        <Box component="p" sx={{ m: 0, fontSize: 13, color: brand.muted }}>
          <Box component="span" aria-hidden sx={{ color: brand.red }}>
            *
          </Box>{' '}
          Required
        </Box>
        <Button
          type="submit"
          disabled={disabled || !isFormValid}
          startIcon={<SendOutlinedIcon />}
          disableElevation
          sx={{
            minHeight: 56,
            px: '32px',
            borderRadius: '999px',
            backgroundColor: brand.red,
            color: brand.white,
            fontSize: 17,
            fontWeight: 700,
            textTransform: 'none',
            '&:hover': { backgroundColor: brand.redDark },
            '&.Mui-disabled': { backgroundColor: '#e7b3bd', color: brand.white },
          }}
        >
          {disabled ? 'Sending…' : 'Send Message'}
        </Button>
      </Box>
    </Box>
  );
};

export default ConnectMainForm;
