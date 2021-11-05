import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';

const groupsByModuleIndex: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  res.status(400);
  res.end(`parameter "module/[module]" is required`);
};

export default groupsByModuleIndex;
