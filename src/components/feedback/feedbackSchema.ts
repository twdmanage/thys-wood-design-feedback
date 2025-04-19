
import * as z from "zod";

export const formSchema = z.object({
  customer_name: z.string().min(2, "Please enter your full name"),
  product_name: z.string().min(1, "Please select a product"),
  wood_type: z.string().min(1, "Please specify the wood type"),
  why_buy_reason: z.string().min(3, "Please tell us why you chose our products"),
  improvement_suggestion: z.string().optional(),
  customer_email: z.string().email().optional().or(z.literal('')),
  subscribe_to_newsletter: z.boolean().default(false),
});

export type FeedbackFormValues = z.infer<typeof formSchema>;
