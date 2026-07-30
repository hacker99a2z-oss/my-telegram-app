export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { message } = req.body;

    if (message && message.text && message.text.startsWith('/start')) {
      const chatId = message.chat.id;

      // Welcome Message & Inline Open App Button
      await fetch(`https://api.telegram.org/bot${process.env.BOT_TOKEN}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: chatId,
          text: `👋 Hello ${message.from.first_name}!\n\nWelcome to Real Earners. Click the button below to launch the app and start earning coins!`,
          reply_markup: {
            inline_keyboard: [
              [
                {
                  text: "🚀 Open App",
                  web_app: { url: "https://my-telegram-app-silk.vercel.app" }
                }
              ]
            ]
          }
        })
      });
    }
    return res.status(200).send('OK');
  }
  return res.status(405).send('Method Not Allowed');
}
