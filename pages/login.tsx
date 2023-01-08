import KeyboardArrowRightRoundedIcon from '@mui/icons-material/KeyboardArrowRightRounded';
import { Button } from '@mui/material';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { getCsrfToken, getProviders, getSession, signIn } from 'next-auth/react';
import LoginForm from '../src/components/forms/LoginForm';

const LoginPage = ({ providers }: any) => {
  const handleNewLogin = async (data: any) => {
    signIn('credentials', null, data);
  };

  return (
    <Grid
      container
      component="main"
      sx={{ height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}
    >
      <Container maxWidth="sm" sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
        <Box sx={{ py: 2 }}>
          <LoginForm providers={providers} onSubmit={handleNewLogin} />
        </Box>
        <Divider orientation="vertical" sx={{ mx: 8 }} />
        <Box sx={{ py: 2 }}>
          <Typography variant="h1" component="h1" sx={{ mb: 4 }}>
            Track your business with <br />
            <Typography variant="h1" component="span" color="secondary">
              Autonomo
            </Typography>
          </Typography>
          <div>
            <Button size="large" endIcon={<KeyboardArrowRightRoundedIcon />} sx={{ mr: 2 }}>
              Login
            </Button>
            <Button variant="outlined" size="large" endIcon={<KeyboardArrowRightRoundedIcon />}>
              Register
            </Button>
          </div>
        </Box>
      </Container>
    </Grid>
  );
};

export default LoginPage;

export async function getServerSideProps(context: { req: any }) {
  const { req } = context;
  const session = await getSession({ req });

  if (session) {
    return {
      redirect: { destination: '/' }
    };
  }

  return {
    props: {
      providers: await getProviders(),
      csrfToken: await getCsrfToken(context)
    }
  };
}
