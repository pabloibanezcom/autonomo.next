import { LoginResponse } from '@autonomo/common';
import type { NextApiRequest, NextApiResponse } from 'next';
import connectDB from '../../../src/api/middleware/mongodb';
import { login } from '../../../src/api/services/user';

const handler = async (req: NextApiRequest, res: NextApiResponse<LoginResponse>) => {
  const {
    method,
    body: { email, password }
  } = req;

  switch (method) {
    case 'POST':
      const loginResponse = await login({
        email,
        password
      });

      res.status(200).json(loginResponse);
      break;
    default:
      res.setHeader('Allow', ['POST']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
};

export default connectDB(handler);
