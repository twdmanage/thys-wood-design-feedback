
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";

interface StarRatingProps {
  selectedRating: number;
  onRatingChange: (rating: number) => void;
}

const StarRating = ({ selectedRating, onRatingChange }: StarRatingProps) => {
  return (
    <div className="space-y-2">
      <p className="text-sm text-muted-foreground mb-2">
        Rate your new product from 1 (Not so great) to 5 (Loving it)
      </p>
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((rating) => (
          <Button
            key={rating}
            type="button"
            variant={selectedRating >= rating ? "default" : "outline"}
            size="icon"
            className="h-8 w-8"
            onClick={() => onRatingChange(rating)}
          >
            <Star className={selectedRating >= rating ? "fill-current" : ""} />
          </Button>
        ))}
      </div>
    </div>
  );
};

export default StarRating;
