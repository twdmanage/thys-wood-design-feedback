
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
        Rate your experience from 1 to 5 stars
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
      <div className="flex justify-between text-sm text-muted-foreground mt-1">
        <span>Very Dissatisfied</span>
        <span>Very Satisfied</span>
      </div>
    </div>
  );
};

export default StarRating;
