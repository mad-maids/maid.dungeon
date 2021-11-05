import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';

const groupsByIDIndex: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  res.status(400);
  res.end(`parameter "id/[id]" is required`);
};

export default groupsByIDIndex;
