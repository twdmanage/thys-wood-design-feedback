
import { Languages } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const LanguageSelector = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex items-center gap-2">
      <Languages className="h-4 w-4 text-muted-foreground" />
      <Select value={language} onValueChange={(value: 'en' | 'es' | 'de' | 'fr' | 'it' | 'pt' | 'nl') => setLanguage(value)}>
        <SelectTrigger className="w-[140px]">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="en">English</SelectItem>
          <SelectItem value="es">Español</SelectItem>
          <SelectItem value="de">Deutsch</SelectItem>
          <SelectItem value="fr">Français</SelectItem>
          <SelectItem value="it">Italiano</SelectItem>
          <SelectItem value="pt">Português</SelectItem>
          <SelectItem value="nl">Nederlands</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default LanguageSelector;
