export default async function handler(req, res) {
  // CORS Headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();

  const { userId } = req.query;
  const BOT_TOKEN = process.env.BOT_TOKEN; // Vercel Environment Variables এ সেট করবেন
  const CHANNEL_USERNAME = "@earners_100b"; // 👈 আপনার চ্যানেলের ইউজারনেম (উইথ @)

  if (!userId) {
    return res.status(400).json({ isMember: false, error: "User ID missing" });
  }

  try {
    const url = `https://api.telegram.org/bot${BOT_TOKEN}/getChatMember?chat_id=${CHANNEL_USERNAME}&user_id=${userId}`;
    const response = await fetch(url);
    const data = await response.json();

    if (data.ok) {
      const status = data.result.status;
      // ইউজার যদি Member, Administrator বা Creator হয়
      const isMember = ['creator', 'administrator', 'member'].includes(status);
      return res.status(200).json({ isMember });
    } else {
      return res.status(200).json({ isMember: false });
    }
  } catch (error) {
    return res.status(500).json({ isMember: false, error: error.message });
  }
}
