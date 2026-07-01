import Stripe from "stripe";

let _stripe: Stripe | null = null;

// Lazily constructed so the module can be imported (e.g. during `next build`
// page-data collection) before STRIPE_SECRET_KEY is set in the environment.
export const stripe = new Proxy({} as Stripe, {
  get(_target, prop) {
    if (!_stripe) {
      if (!process.env.STRIPE_SECRET_KEY) {
        throw new Error("STRIPE_SECRET_KEY is not set");
      }
      _stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
    }
    return Reflect.get(_stripe, prop, _stripe);
  },
});
