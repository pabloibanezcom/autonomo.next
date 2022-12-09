import { User } from '@autonomo/common';
import type { NextApiRequest, NextApiResponse } from 'next';
import connectDB from '../../src/api/middleware/mongodb';
import { getUser } from '../../src/api/services/user';

const handler = async (req: NextApiRequest, res: NextApiResponse<User>) => {
  const {
    query: { id, name },
    headers: { authorization },
    method
  } = req;

  switch (method) {
    case 'GET':
      const userResponse = await getUser(authorization as string);

      res.status(200).json(userResponse);
      break;
    default:
      res.setHeader('Allow', ['GET']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
};

export default connectDB(handler);
