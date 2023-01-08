import { Button } from '@mui/material';
import { getSession, signOut, useSession } from 'next-auth/react';
import Image from 'next/image';

const IndexPage = () => {
  const session = useSession();
  return (
    <div>
      <div>User: {session?.data?.user.name}</div>
      <div>Email: {session?.data?.user.email}</div>
      <Image src={session?.data?.user.image} alt={session?.data?.user.name} width={200} height={200} />
      <div>{JSON.stringify(session)}</div>
      <Button sx={{ mt: 2 }} onClick={() => signOut()}>
        Logout
      </Button>
    </div>
  );
};

export default IndexPage;

export async function getServerSideProps(context: { req: any }) {
  const { req } = context;
  const session = await getSession({ req });

  if (!session) {
    return {
      redirect: { destination: '/login' }
    };
  }

  return {
    props: {}
  };
}
