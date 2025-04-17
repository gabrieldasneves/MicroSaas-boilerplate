import { useEffect, useState } from "react";
import { Stripe, loadStripe } from "@stripe/stripe-js";

export function useStripe() {
  const [stripe, setStripe] = useState<Stripe | null>(null);

  useEffect(() => {
    async function loadStripeAsync() {
      const stripeInstance = await loadStripe(
        process.env.NEXT_PUBLIC_STRIPE_PUB_KEY!
      );
      setStripe(stripeInstance);
    }
    loadStripeAsync();
  }, []);

  async function createPaymentStrypeCheckout(checkoutData: any) {
    if (!stripe) {
      throw new Error("Stripe is not loaded");
    }
    try {
      const response = await fetch("/api/stripe/create-pay-checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(checkoutData),
      });
      const data = await response.json();
      await stripe.redirectToCheckout({
        sessionId: data.id,
      });
    } catch (error) {
      console.error("Error creating checkout session:", error);
      throw error;
    }
  }

  async function createSubscriptionStripeCheckout(checkoutData: any) {
    if (!stripe) {
      throw new Error("Stripe is not loaded");
    }
    try {
      const response = await fetch("/api/stripe/create-subscription-checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(checkoutData),
      });
      const data = await response.json();
      await stripe.redirectToCheckout({
        sessionId: data.id,
      });
    } catch (error) {
      console.error("Error creating subscription checkout session:", error);
      throw error;
    }
  }

  async function handleCreateStripePortal() {
    const response = await fetch("/api/stripe/create-portal", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    window.location.href = data.url;
  }

  return {
    stripe,
    createPaymentStrypeCheckout,
    createSubscriptionStripeCheckout,
    handleCreateStripePortal,
  };
}
