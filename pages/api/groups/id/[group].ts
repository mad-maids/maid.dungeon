import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '@/lib/supabase';

const groupsByID: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { group } = req.query;

  if (!group) {
    res.status(400);
    res.end(`parameter "module" is required`);
  }

  let { data: Groups, error } = await supabase.from('Groups').select('*').eq('id', group);

  if (error) throw new Error(`${error.message} (hint: ${error.hint})`);

  if (Groups.length > 1) {
    throw new Error(`Too many groups with module: "${group}"`);
  } else if (Groups.length < 1) {
    res.status(404);
    res.end(`Not Found`);
  } else {

    // No need to save things as it might get requested every second
    // res.setHeader('Cache-Control', ['public', 'maxage=21600', 's-maxage=21600', 'stale-while-revalidate=21600']);

    res.status(200);
    res.json(Groups[0]);
    res.end();
  }
};

export default groupsByID;
