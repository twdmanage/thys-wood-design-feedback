
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Star, Gift, ShoppingBag, User, Mail } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface FeedbackData {
  id: string;
  customer_name: string | null;
  customer_email: string | null;
  product_name: string;
  wood_type: string;
  rating: number;
  why_buy_reason: string | null;
  improvement_suggestion: string | null;
  subscribe_to_newsletter: boolean;
  created_at: string;
}

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [feedback, setFeedback] = useState<FeedbackData[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const ADMIN_PASSWORD = "thyswood2024"; // Change this to your preferred password

  const handleLogin = () => {
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      fetchFeedback();
      toast({
        title: "Access granted",
        description: "Welcome to the admin dashboard",
      });
    } else {
      toast({
        title: "Access denied",
        description: "Incorrect password",
        variant: "destructive",
      });
    }
  };

  const fetchFeedback = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("customer_feedback")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setFeedback(data || []);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch feedback data",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`h-4 w-4 ${
              star <= rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
            }`}
          />
        ))}
      </div>
    );
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getAverageRating = () => {
    if (feedback.length === 0) return 0;
    const sum = feedback.reduce((acc, item) => acc + item.rating, 0);
    return (sum / feedback.length).toFixed(1);
  };

  const getNewsletterSubscriptions = () => {
    return feedback.filter(item => item.subscribe_to_newsletter).length;
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Admin Access</CardTitle>
            <CardDescription>Enter the admin password to view the dashboard</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              type="password"
              placeholder="Enter admin password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleLogin()}
            />
            <Button onClick={handleLogin} className="w-full">
              Access Dashboard
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-amber-900">Admin Dashboard</h1>
          <Button 
            variant="outline" 
            onClick={() => setIsAuthenticated(false)}
          >
            Logout
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <User className="h-4 w-4 text-muted-foreground" />
                <div className="text-2xl font-bold">{feedback.length}</div>
              </div>
              <p className="text-xs text-muted-foreground">Total Feedback</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <Star className="h-4 w-4 text-yellow-400" />
                <div className="text-2xl font-bold">{getAverageRating()}</div>
              </div>
              <p className="text-xs text-muted-foreground">Average Rating</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <div className="text-2xl font-bold">{getNewsletterSubscriptions()}</div>
              </div>
              <p className="text-xs text-muted-foreground">Newsletter Subscribers</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <Gift className="h-4 w-4 text-muted-foreground" />
                <div className="text-2xl font-bold">
                  {feedback.filter(item => item.why_buy_reason === "gift").length}
                </div>
              </div>
              <p className="text-xs text-muted-foreground">Gift Purchases</p>
            </CardContent>
          </Card>
        </div>

        {/* Feedback Table */}
        <Card>
          <CardHeader>
            <CardTitle>Customer Feedback</CardTitle>
            <CardDescription>
              All feedback submissions from your customers
            </CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="text-center py-8">Loading feedback...</div>
            ) : feedback.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                No feedback submissions yet
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Customer</TableHead>
                      <TableHead>Product</TableHead>
                      <TableHead>Wood Type</TableHead>
                      <TableHead>Rating</TableHead>
                      <TableHead>Purchase Reason</TableHead>
                      <TableHead>Suggestion</TableHead>
                      <TableHead>Newsletter</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {feedback.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell className="text-sm">
                          {formatDate(item.created_at)}
                        </TableCell>
                        <TableCell>
                          <div>
                            <div className="font-medium">
                              {item.customer_name || "Anonymous"}
                            </div>
                            {item.customer_email && (
                              <div className="text-sm text-muted-foreground">
                                {item.customer_email}
                              </div>
                            )}
                          </div>
                        </TableCell>
                        <TableCell className="font-medium">
                          {item.product_name}
                        </TableCell>
                        <TableCell>{item.wood_type}</TableCell>
                        <TableCell>{renderStars(item.rating)}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="flex items-center gap-1 w-fit">
                            {item.why_buy_reason === "gift" ? (
                              <>
                                <Gift className="h-3 w-3" />
                                Gift
                              </>
                            ) : (
                              <>
                                <ShoppingBag className="h-3 w-3" />
                                Self
                              </>
                            )}
                          </Badge>
                        </TableCell>
                        <TableCell className="max-w-xs">
                          {item.improvement_suggestion ? (
                            <div className="text-sm text-muted-foreground truncate">
                              {item.improvement_suggestion}
                            </div>
                          ) : (
                            <span className="text-muted-foreground">-</span>
                          )}
                        </TableCell>
                        <TableCell>
                          <Badge 
                            variant={item.subscribe_to_newsletter ? "default" : "secondary"}
                          >
                            {item.subscribe_to_newsletter ? "Yes" : "No"}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Admin;
