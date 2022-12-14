import Stripe from 'stripe';
// const stripe = require('stripe')(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);
export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      // Create Checkout Sessions from body params.
      const params = {
         line_items: req.body.map(item => {
            const img = item.image[0].asset._ref;
            const newImage = img.replace('image-',
            'https://cdn.sanity.io/images/0de162s0/production/')
            .replace('-webp', '.webp');

            return {
               price_data: {
                  currency: 'usd',
                  product_data: {
                     name: item.name,
                     images: [newImage],
                  },
                  unit_amount: item.price * 100,
               },
               adjustable_quantity: {
                  enabled: true,
                  minimum: 1,
               },
               quantity: item.quantity,
            }
         }),
         submit_type: 'auto',
         mode: 'payment',
         payment_method_types: ['card'],
         billing_address_collection: 'auto',
         shipping_options: [
            {shipping_rate: 'shr_1Lh7gpEOhmRdp5kpDI4w5bmx'},
         ],
         success_url: `${req.headers.origin}/?success=true`,
         cancel_url: `${req.headers.origin}/?canceled=true`,
      };

      const session = await stripe.checkout.sessions.create(params);
      // res.redirect(303, session.url);
      // res.json({url: session.url});
      // console.log(res.json(session));
      res.json(session);
    } catch (err) {
      res.status(err.statusCode || 500).json(err.message);
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}