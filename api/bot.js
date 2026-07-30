export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { message } = req.body;

    if (message && message.text) {
      const chatId = message.chat.id;
      const text = message.text;

      // Check if text is /start with referral ID
      if (text.startsWith('/start')) {
        const parts = text.split(' ');
        const referrerId = parts[1]; // রেফারারের ইউজার আইডি

        let welcomeText = `👋 Hello ${message.from.first_name}!\n\nWelcome to Real Earners. Click the button below to launch the app and start earning coins!`;
        
        if (referrerId && referrerId !== String(chatId)) {
          welcomeText += `\n\n🎁 You joined via a referral link!`;
        }

        // Telegram WebApp URL - এখানে ?ref= দেওয়ার দরকার নেই
        // টেলিগ্রাম স্বয়ংক্রিয়ভাবে startapp বা initDataUnsafe-এ start parameter টি পাঠিয়ে দেয়
        await fetch(`https://api.telegram.org/bot${process.env.BOT_TOKEN}/sendMessage`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            chat_id: chatId,
            text: welcomeText,
            reply_markup: {
              inline_keyboard: [
                [
                  {
                    text: "🚀 Open App",
                    web_app: { url: "https://my-telegram-app-silk.vercel.app" }
                  }
                ],
                [
                  {
                    text: "💬 Support Group",
                    url: "https://t.me/real_eaners_supported"
                  }
                ]
              ]
            }
          })
        });
      }
    }
    return res.status(200).send('OK');
  }
  return res.status(405).send('Method Not Allowed');
}
