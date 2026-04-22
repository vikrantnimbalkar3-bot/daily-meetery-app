import Stripe from 'stripe';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();
  
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  const { amount, description } = req.body;

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100),
      currency: 'nzd',
      description: description,
    });
    res.status(200).json({ clientSecret: paymentIntent.client_secret });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
