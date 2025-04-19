
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
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FeedbackFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      customer_name: "",
      product_name: "",
      wood_type: "",
      why_buy_reason: undefined,
      improvement_suggestion: "",
      customer_email: "",
      subscribe_to_newsletter: false,
    },
  });

  const onSubmit = async (values: FeedbackFormValues) => {
    if (selectedRating === 0) {
      toast({
        title: "Please select a rating",
        description: "Please let us know how you rate our product.",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsSubmitting(true);
      console.log("Submitting feedback...", { ...values, rating: selectedRating });
      
      const { error } = await supabase
        .from("customer_feedback")
        .insert({
          customer_name: values.customer_name,
          product_name: values.product_name,
          wood_type: values.wood_type,
          rating: selectedRating,
          why_buy_reason: values.why_buy_reason,
          improvement_suggestion: values.improvement_suggestion,
          customer_email: values.customer_email || null,
          subscribe_to_newsletter: values.subscribe_to_newsletter,
        });

      if (error) {
        console.error("Error submitting feedback:", error);
        throw error;
      }

      if (values.customer_email) {
        console.log("Sending thank you email...");
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
      console.error("Error in submit process:", error);
      toast({
        title: "Error submitting feedback",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
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
            {selectedRating === 0 && form.formState.isSubmitted && (
              <p className="text-sm font-medium text-destructive mt-1">
                Please select a rating
              </p>
            )}
          </div>
          
          <FeedbackFields form={form} />

          <Button 
            type="submit" 
            className="w-full" 
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Submit Feedback"}
            <Send className="ml-2 h-4 w-4" />
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default FeedbackForm;
