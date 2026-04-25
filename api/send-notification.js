import { initializeApp, cert, getApps } from 'firebase-admin/app';
import { getMessaging } from 'firebase-admin/messaging';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { tokens, title, body, type } = req.body;
  if (!tokens || !tokens.length) return res.status(400).json({ error: 'No tokens provided' });

  try {
    // Initialize Firebase Admin if not already done
    if (!getApps().length) {
      initializeApp({
        credential: cert({
          projectId: process.env.FIREBASE_PROJECT_ID,
          clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
          privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
        }),
      });
    }

    const messaging = getMessaging();

    // Send to all tokens
    const message = {
      notification: { title, body },
      data: { type: type || 'manual' },
      tokens,
    };

    const response = await messaging.sendEachForMulticast(message);
    res.status(200).json({
      success: response.successCount,
      failed: response.failureCount,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
