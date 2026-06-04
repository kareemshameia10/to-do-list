const BUILTIN_KEY = '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';

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin','*');
  res.setHeader('Access-Control-Allow-Methods','GET,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers','Content-Type,Authorization');
  if(req.method==='OPTIONS') return res.status(200).end();

  const auth = req.headers.authorization;
  const key = auth && auth.startsWith('Bearer ') ? auth.slice(7) : BUILTIN_KEY;
  const body = typeof req.body === 'string' ? req.body : JSON.stringify(req.body);

  try {
    const r = await fetch('https://integrate.api.nvidia.com/v1/chat/completions', {
      method:'POST',
      headers:{'Content-Type':'application/json','Authorization':'Bearer '+key},
      body
    });
    const data = await r.json();
    if(!r.ok) return res.status(r.status).json(data);
    res.json(data);
  } catch(e) {
    res.status(500).json({error:e.message});
  }
};
