'use client';

import { useState } from 'react';
import type { Review } from '@/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Star } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';

interface ReviewsSectionProps {
  productId: number;
  reviews: Review[];
}

export default function ReviewsSection({ productId, reviews: initialReviews }: ReviewsSectionProps) {
  const [reviews, setReviews] = useState<Review[]>(initialReviews);
  const [newReviewText, setNewReviewText] = useState('');
  const [newRating, setNewRating] = useState(0);
  const { user, signInWithGoogle } = useAuth();
  const { toast } = useToast();

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newRating) {
      toast({ variant: 'destructive', title: 'Please select a rating.' });
      return;
    }
    if (!newReviewText.trim()) {
      toast({ variant: 'destructive', title: 'Please write a review.' });
      return;
    }

    const newReview: Review = {
      id: Date.now(),
      author: user?.displayName || 'Anonymous',
      date: new Date().toISOString().split('T')[0],
      rating: newRating,
      comment: newReviewText,
    };

    // In a real app, this would be an API call
    setReviews([newReview, ...reviews]);
    setNewReviewText('');
    setNewRating(0);
    toast({ title: 'Review submitted!', description: 'Thank you for your feedback.' });
  };

  const averageRating = reviews.length > 0
    ? reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length
    : 0;

  return (
    <section>
      <div className="mb-8">
        <h2 className="font-headline text-3xl font-bold">Customer Reviews</h2>
        {reviews.length > 0 && (
            <div className="flex items-center gap-2 mt-2">
                <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`h-5 w-5 ${i < Math.round(averageRating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} />
                    ))}
                </div>
                <span className="text-muted-foreground">Based on {reviews.length} reviews</span>
            </div>
        )}
      </div>
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          {reviews.length > 0 ? (
            reviews.map((review) => (
              <Card key={review.id}>
                <CardHeader className="flex flex-row items-center gap-4">
                    <Avatar>
                        <AvatarFallback>{review.author.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                        <CardTitle className="text-base">{review.author}</CardTitle>
                        <CardDescription>{new Date(review.date).toLocaleDateString()}</CardDescription>
                    </div>
                    <div className="ml-auto flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`h-5 w-5 ${i < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} />
                    ))}
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{review.comment}</p>
                </CardContent>
              </Card>
            ))
          ) : (
            <p className="text-muted-foreground">No reviews yet. Be the first to share your thoughts!</p>
          )}
        </div>
        <div>
          <Card>
            <CardHeader>
              <CardTitle className="font-headline">Write a review</CardTitle>
            </CardHeader>
            <CardContent>
              {user ? (
                <form onSubmit={handleReviewSubmit} className="space-y-4">
                  <div>
                    <Label>Rating</Label>
                    <div className="flex items-center gap-1 mt-1">
                      {[...Array(5)].map((_, i) => (
                        <button type="button" key={i} onClick={() => setNewRating(i + 1)}>
                          <Star className={`h-6 w-6 cursor-pointer transition-colors ${i < newRating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300 hover:text-yellow-300'}`} />
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="review-text">Review</Label>
                    <Textarea
                      id="review-text"
                      placeholder={`What did you think of the product?`}
                      value={newReviewText}
                      onChange={(e) => setNewReviewText(e.target.value)}
                      rows={4}
                      required
                    />
                  </div>
                   <Button type="submit">Submit Review</Button>
                </form>
              ) : (
                <div className="text-center">
                    <p className="text-muted-foreground mb-4">You must be signed in to write a review.</p>
                    <Button onClick={signInWithGoogle}>Sign In to Continue</Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
