import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { formSchema, type FeedbackFormValues } from "./feedback/feedbackSchema";
import FeedbackHeader from "./feedback/FeedbackHeader";
import FeedbackFields from "./feedback/FeedbackFields";
import StarRating from "./feedback/StarRating";

const FeedbackForm = () => {
  const { toast } = useToast();
  const [selectedRating, setSelectedRating] = useState(0);

  const form = useForm<FeedbackFormValues>({
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

  const onSubmit = async (values: FeedbackFormValues) => {
    try {
      const { error } = await supabase
        .from("customer_feedback")
        .insert({
          customer_name: values.customer_name,
          product_name: values.product_name,
          wood_type: values.wood_type,
          rating: selectedRating,
          why_buy_reason: values.why_buy_reason,
          improvement_suggestion: values.improvement_suggestion,
          customer_email: values.customer_email,
          subscribe_to_newsletter: values.subscribe_to_newsletter,
        });

      if (error) throw error;

      if (values.customer_email) {
        await supabase.functions.invoke('send-thank-you', {
          body: {
            customerName: values.customer_name,
            customerEmail: values.customer_email,
            productName: values.product_name,
          }
        });
      }

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
      <FeedbackHeader />

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-2">
            <StarRating
              selectedRating={selectedRating}
              onRatingChange={setSelectedRating}
            />
          </div>
          
          <FeedbackFields form={form} />

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
