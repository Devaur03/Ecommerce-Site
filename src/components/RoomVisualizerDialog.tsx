'use client';

import { useState } from 'react';
import Image from 'next/image';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { roomVisualization } from '@/ai/flows/room-visualization';
import type { Product } from '@/types';
import { toDataURL } from '@/lib/utils';
import { Loader2, Upload, Sparkles } from 'lucide-react';

interface RoomVisualizerDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  product: Product;
}

export default function RoomVisualizerDialog({
  open,
  onOpenChange,
  product,
}: RoomVisualizerDialogProps) {
  const [roomPhoto, setRoomPhoto] = useState<File | null>(null);
  const [roomPhotoPreview, setRoomPhotoPreview] = useState<string | null>(null);
  const [visualizedRoom, setVisualizedRoom] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setRoomPhoto(file);
      setRoomPhotoPreview(URL.createObjectURL(file));
      setVisualizedRoom(null);
    }
  };

  const handleVisualize = async () => {
    if (!roomPhoto) {
      toast({
        variant: 'destructive',
        title: 'No room photo selected',
        description: 'Please upload a photo of your room first.',
      });
      return;
    }

    setIsLoading(true);
    setVisualizedRoom(null);

    try {
      const roomPhotoDataUri = await toDataURL(URL.createObjectURL(roomPhoto));
      const furniturePhotoDataUri = await toDataURL(product.images[0]);

      const result = await roomVisualization({
        roomPhotoDataUri,
        furniturePhotoDataUri,
        description: `A ${product.name}.`,
      });

      if (result.visualizedRoom) {
        setVisualizedRoom(result.visualizedRoom);
        toast({
          title: 'Visualization Complete!',
          description: 'Here is how the furniture looks in your room.',
        });
      } else {
        throw new Error('AI did not return an image.');
      }
    } catch (error) {
      console.error('Visualization failed:', error);
      toast({
        variant: 'destructive',
        title: 'Visualization Failed',
        description:
          'Something went wrong while generating the image. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const reset = () => {
    setRoomPhoto(null);
    setRoomPhotoPreview(null);
    setVisualizedRoom(null);
    setIsLoading(false);
  }

  const handleOpenChange = (isOpen: boolean) => {
    if(!isOpen) {
      reset();
    }
    onOpenChange(isOpen);
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-4xl">
        <DialogHeader>
          <DialogTitle className="font-headline text-2xl">AI Room Visualizer</DialogTitle>
          <DialogDescription>
            See how the "{product.name}" looks in your own space. Upload a
            photo of your room to get started.
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="flex flex-col items-center justify-center space-y-4 rounded-lg border-2 border-dashed p-6">
            <h3 className="font-semibold text-lg">Your Room</h3>
            {roomPhotoPreview ? (
              <Image
                src={roomPhotoPreview}
                alt="Your room"
                width={400}
                height={400}
                className="max-h-[300px] w-auto rounded-md object-contain"
              />
            ) : (
              <div className="flex flex-col items-center text-center text-muted-foreground">
                <Upload className="h-12 w-12" />
                <p>Upload a photo to begin</p>
              </div>
            )}
             <Input id="room-photo" type="file" accept="image/*" onChange={handleFileChange} className="w-full max-w-sm" />
          </div>

          <div className="flex flex-col items-center justify-center space-y-4 rounded-lg border-2 border-dashed p-6 bg-muted/20">
             <h3 className="font-semibold text-lg">Visualized Room</h3>
            {isLoading ? (
                <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
                    <Loader2 className="h-12 w-12 animate-spin" />
                    <p className="mt-4">Visualizing... this may take a moment.</p>
                </div>
            ) : visualizedRoom ? (
               <Image
                src={visualizedRoom}
                alt="Room with new furniture"
                width={400}
                height={400}
                className="max-h-[300px] w-auto rounded-md object-contain"
              />
            ) : (
              <div className="flex flex-col items-center text-center text-muted-foreground">
                <Sparkles className="h-12 w-12" />
                <p>Your visualized room will appear here.</p>
              </div>
            )}
          </div>
        </div>
        
        <DialogFooter>
          {visualizedRoom ? (
            <Button onClick={reset} variant="outline">Start Over</Button>
          ) : (
            <Button onClick={handleVisualize} disabled={isLoading || !roomPhoto}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Visualizing...
              </>
            ) : (
              <>
                <Sparkles className="mr-2 h-4 w-4" />
                Visualize
              </>
            )}
          </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
