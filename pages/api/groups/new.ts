import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '@/lib/supabase';

const newGroup: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { query } = req;
  const { id, module, link } = query;

  if (id && module && link) {
    let { data: Group, error } = await supabase.from('Groups').insert([{ id, module, link }]);

    if (error) throw new Error(`${error.message} (hint: ${error.hint})`);

    res.setHeader('Cache-Control', ['public', 'maxage=21600', 's-maxage=21600', 'stale-while-revalidate=21600']);

    res.status(200);
    res.json({ msg: 'OK!', groups: Group });
    res.end();
  } else {
    res.status(400).json({
      error: 'Missing required queries!',
    });
  }
};

export default newGroup;
