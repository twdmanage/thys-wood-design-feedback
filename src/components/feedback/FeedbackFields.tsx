
import { User, Gift, ShoppingBag } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import { FeedbackFormValues } from "./feedbackSchema";
import { useLanguage } from "@/contexts/LanguageContext";
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
  const { t } = useLanguage();

  return (
    <>
      <FormField
        control={form.control}
        name="customer_name"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t('yourFullName')}</FormLabel>
            <FormControl>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder={t('enterYourFullName')}
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
              <FormLabel>{t('productName')}</FormLabel>
              <FormControl>
                <Input placeholder={t('productPlaceholder')} {...field} />
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
              <FormLabel>{t('woodType')}</FormLabel>
              <FormControl>
                <Input placeholder={t('woodTypePlaceholder')} {...field} />
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
            <FormLabel>{t('whyChooseProducts')}</FormLabel>
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
                    {t('giftForSomeone')}
                  </FormLabel>
                </FormItem>
                <FormItem className="flex items-center space-x-3 space-y-0">
                  <FormControl>
                    <RadioGroupItem value="self" />
                  </FormControl>
                  <FormLabel className="font-normal flex items-center gap-2">
                    <ShoppingBag className="h-4 w-4" />
                    {t('spoilingMyself')}
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
            <FormLabel>{t('howImprove')}</FormLabel>
            <FormControl>
              <Textarea
                placeholder={t('improvementPlaceholder')}
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
            <FormLabel>{t('email')}</FormLabel>
            <FormControl>
              <Input
                type="email"
                placeholder={t('emailPlaceholder')}
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
                {t('newsletter')}
              </FormLabel>
            </div>
          </FormItem>
        )}
      />
    </>
  );
};

export default FeedbackFields;
