import { User, Gift, ShoppingBag } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import { FeedbackFormValues } from "./feedbackSchema";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface FeedbackFieldsProps {
  form: UseFormReturn<FeedbackFormValues>;
}

const FeedbackFields = ({ form }: FeedbackFieldsProps) => {
  return (
    <>
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

      <FormField
        control={form.control}
        name="why_buy_reason"
        render={({ field }) => (
          <FormItem className="space-y-3">
            <FormLabel>Why did you choose our products?</FormLabel>
            <FormControl>
              <RadioGroup
                onValueChange={field.onChange}
                defaultValue={field.value}
                className="space-y-1"
              >
                <FormItem className="flex items-center space-x-3 space-y-0">
                  <FormControl>
                    <RadioGroupItem value="gift" />
                  </FormControl>
                  <FormLabel className="font-normal flex items-center gap-2">
                    <Gift className="h-4 w-4" />
                    This is a gift for someone special
                  </FormLabel>
                </FormItem>
                <FormItem className="flex items-center space-x-3 space-y-0">
                  <FormControl>
                    <RadioGroupItem value="self" />
                  </FormControl>
                  <FormLabel className="font-normal flex items-center gap-2">
                    <ShoppingBag className="h-4 w-4" />
                    I am spoiling myself
                  </FormLabel>
                </FormItem>
              </RadioGroup>
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
    </>
  );
};

export default FeedbackFields;
