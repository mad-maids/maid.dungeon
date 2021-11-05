import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';

const home: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  res.setHeader('Cache-Control', ['maxage=86400', 's-maxage=86400', 'stale-if-error=1']);
  res.status(200);
  res.json({
    groups: {
      link: '/groups',
      desc: 'get all group datas',
      child: [
        {
          link: 'id/[id]',
          desc: 'get group data by id',
          query: 'number'
        },
        {
          link: 'module/[module]',
          desc: 'get group data by module',
          query: 'string'
        },
      ],
    },
  });
  res.end();
};

export default home;
