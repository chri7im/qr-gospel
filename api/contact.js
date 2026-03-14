export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { name, email, phone, lang, issue } = req.body;

  if (!name && !email) {
    return res.status(400).json({ error: 'Name or email required' });
  }

  // Validate email format if provided
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: 'Invalid email' });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.CONTACT_EMAIL;

  if (!apiKey || !toEmail) {
    // If Resend isn't configured yet, just return success
    // (so the frontend doesn't break during testing)
    console.log('Contact submission (Resend not configured):', { name, email, phone, lang, issue });
    return res.status(200).json({ ok: true });
  }

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        from: 'QR Gospel <noreply@qr-gospel.com>',
        to: toEmail,
        subject: `New contact from QR Gospel — ${name || 'Anonymous'}`,
        html: `
          <h2>New Contact Submission</h2>
          <table style="border-collapse:collapse;font-family:sans-serif;">
            <tr><td style="padding:8px;font-weight:bold;">Name</td><td style="padding:8px;">${name || '—'}</td></tr>
            <tr><td style="padding:8px;font-weight:bold;">Email</td><td style="padding:8px;">${email || '—'}</td></tr>
            <tr><td style="padding:8px;font-weight:bold;">Phone</td><td style="padding:8px;">${phone || '—'}</td></tr>
            <tr><td style="padding:8px;font-weight:bold;">Language</td><td style="padding:8px;">${lang || '—'}</td></tr>
            <tr><td style="padding:8px;font-weight:bold;">Issue</td><td style="padding:8px;">${issue || '—'}</td></tr>
          </table>
        `
      })
    });

    if (!response.ok) {
      const err = await response.text();
      console.error('Resend error:', err);
      return res.status(500).json({ error: 'Failed to send email' });
    }

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('Contact error:', err.message);
    return res.status(500).json({ error: err.message });
  }
}
