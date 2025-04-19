
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Star, Send, User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";

// Update the form schema to include wood_type field
const formSchema = z.object({
  customer_name: z.string().min(2, "Please enter your full name"),
  product_name: z.string().min(1, "Please select a product"),
  wood_type: z.string().min(1, "Please specify the wood type"),
  rating: z.number().min(1).max(5),
  why_buy_reason: z.string().min(3, "Please tell us why you chose our products"),
  improvement_suggestion: z.string().optional(),
  customer_email: z.string().email().optional(),
  subscribe_to_newsletter: z.boolean().default(false),
});

const FeedbackForm = () => {
  const { toast } = useToast();
  const [selectedRating, setSelectedRating] = useState(0);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      customer_name: "",
      product_name: "",
      wood_type: "",
      why_buy_reason: "",
      improvement_suggestion: "",
      customer_email: "",
      subscribe_to_newsletter: false,
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const { error } = await supabase
        .from("customer_feedback")
        .insert({
          customer_name: values.customer_name,
          product_name: values.product_name,
          wood_type: values.wood_type, // Add wood_type to the insert
          rating: selectedRating,
          why_buy_reason: values.why_buy_reason,
          improvement_suggestion: values.improvement_suggestion,
          customer_email: values.customer_email,
          subscribe_to_newsletter: values.subscribe_to_newsletter,
        });

      if (error) throw error;

      toast({
        title: "Thank you for your feedback!",
        description: "We really appreciate your input.",
      });

      form.reset();
      setSelectedRating(0);
    } catch (error) {
      toast({
        title: "Error submitting feedback",
        description: "Please try again later.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-8">
      <div className="text-center">
        <img
          src="/logo.png"
          alt="Thys Wood Design Logo"
          className="mx-auto h-24 mb-4"
        />
        <h1 className="text-3xl font-semibold mb-2">Share Your Feedback</h1>
        <p className="text-muted-foreground">
          Help us improve our wooden jewellery products
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="customer_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Your Full Name</FormLabel>
                <FormControl>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input 
                      placeholder="Enter your full name" 
                      className="pl-9"
                      {...field} 
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid gap-4 sm:grid-cols-2">
            <FormField
              control={form.control}
              name="product_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Name</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. Forest Pendant" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="wood_type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Wood Type</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. Oak, Maple, Walnut" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="space-y-2">
            <FormLabel>How would you rate this product?</FormLabel>
            <p className="text-sm text-muted-foreground mb-2">
              Rate from 1 (Very Dissatisfied) to 5 (Very Satisfied)
            </p>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((rating) => (
                <Button
                  key={rating}
                  type="button"
                  variant={selectedRating >= rating ? "default" : "outline"}
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => setSelectedRating(rating)}
                >
                  <Star
                    className={selectedRating >= rating ? "fill-current" : ""}
                  />
                </Button>
              ))}
            </div>
            <div className="flex justify-between text-sm text-muted-foreground mt-1">
              <span>Very Dissatisfied</span>
              <span>Very Satisfied</span>
            </div>
          </div>

          <FormField
            control={form.control}
            name="why_buy_reason"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Why did you choose our products?</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Tell us what attracted you to our wooden jewellery..."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="improvement_suggestion"
            render={({ field }) => (
              <FormItem>
                <FormLabel>How can we improve our products?</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Share your suggestions for improvement (optional)"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="customer_email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email (optional)</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="your@email.com"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="subscribe_to_newsletter"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>
                    Keep me updated about new products and special offers
                  </FormLabel>
                </div>
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full">
            Submit Feedback
            <Send className="ml-2 h-4 w-4" />
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default FeedbackForm;
