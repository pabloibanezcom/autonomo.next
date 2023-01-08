import GitHubIcon from '@mui/icons-material/GitHub';
import GoogleIcon from '@mui/icons-material/Google';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import TextField from '@mui/material/TextField';
import { signIn } from 'next-auth/react';
import { Controller, useForm } from 'react-hook-form';

type LoginFormProps = {
  providers: any;
  onSubmit: (data: any) => void;
};

const LoginForm = ({ providers, onSubmit }: LoginFormProps) => {
  const { handleSubmit, control } = useForm();

  const handleGoogleClick = (e: any) => {
    e.preventDefault();
    signIn('google');
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ minWidth: 300 }}>
      <Controller
        control={control}
        name="email"
        defaultValue=""
        render={({ field }) => (
          <TextField
            {...field}
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            autoComplete="email"
            autoFocus
          />
        )}
      />
      <Controller
        control={control}
        name="password"
        defaultValue=""
        render={({ field }) => (
          <TextField
            {...field}
            margin="normal"
            required
            fullWidth
            id="password"
            type="password"
            label="Password"
            autoComplete="current-password"
            autoFocus
          />
        )}
      />
      <FormControlLabel control={<Checkbox value="remember" color="primary" />} label="Remember me" />
      <Button type="submit" fullWidth sx={{ mt: 3, mb: 2 }}>
        Sign In
      </Button>
      <Box sx={{ mt: 4, display: 'flex', flexDirection: 'row', justifyContent: 'center', gap: 2 }}>
        <Button
          size="small"
          color="inherit"
          variant="outlined"
          endIcon={<GoogleIcon />}
          onClick={() => signIn('google')}
        >
          Sign in with Google
        </Button>
        <Button size="small" color="inherit" variant="outlined" endIcon={<GitHubIcon />}>
          Sign in with Github
        </Button>
      </Box>
    </Box>
  );
};

export default LoginForm;
