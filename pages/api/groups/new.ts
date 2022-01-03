import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '@/lib/supabase';

const newGroup: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { query } = req;
  const { id, module, link } = query;

  // replace all spaces with plus signs
  const serialize = typeof link === 'string' ? link.replace(/\s/g, '+') : link.join('').replace(/\s/g, '+');

  if (id && module && link) {
    let { data: Group, error } = await supabase.from('Groups').insert([{ id, module, link: serialize }]);

    if (error) throw new Error(`${error.message} (hint: ${error.hint})`);

    // No need to save things as it might get requested every second
    // res.setHeader('Cache-Control', ['public', 'maxage=21600', 's-maxage=21600', 'stale-while-revalidate=21600']);

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
