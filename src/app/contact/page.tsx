'use client'

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Mail, Phone, MapPin } from "lucide-react";

export default function ContactPage() {
    const { toast } = useToast();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        toast({
            title: "Message Sent!",
            description: "Thank you for contacting us. We'll get back to you shortly.",
        });
        (e.target as HTMLFormElement).reset();
    };

    return (
        <div className="container mx-auto px-4 py-12 md:py-24">
            <div className="text-center">
                <h1 className="font-headline text-4xl md:text-5xl font-bold">Get In Touch</h1>
                <p className="mt-4 max-w-2xl mx-auto text-muted-foreground">
                    Have a question or want to work with us? Fill out the form below or reach out through our contact details.
                </p>
            </div>

            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div className="flex items-start gap-4">
                    <div className="bg-primary/10 text-primary p-3 rounded-full">
                        <Mail className="h-6 w-6" />
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold">Email</h3>
                        <p className="text-muted-foreground">hello@furnishflow.com</p>
                    </div>
                </div>
                <div className="flex items-start gap-4">
                    <div className="bg-primary/10 text-primary p-3 rounded-full">
                        <Phone className="h-6 w-6" />
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold">Phone</h3>
                        <p className="text-muted-foreground">(123) 456-7890</p>
                    </div>
                </div>
                <div className="flex items-start gap-4">
                     <div className="bg-primary/10 text-primary p-3 rounded-full">
                        <MapPin className="h-6 w-6" />
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold">Address</h3>
                        <p className="text-muted-foreground">123 Furniture Lane, Design City, 12345</p>
                    </div>
                </div>
            </div>

            <Card className="mt-12 max-w-4xl mx-auto">
                <CardHeader>
                    <CardTitle className="font-headline">Send us a message</CardTitle>
                    <CardDescription>We're happy to help with any questions you may have.</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                             <div className="space-y-2">
                                <Label htmlFor="name">Name</Label>
                                <Input id="name" placeholder="Your Name" required />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input id="email" type="email" placeholder="your.email@example.com" required />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="subject">Subject</Label>
                            <Input id="subject" placeholder="Question about an order" required />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="message">Message</Label>
                            <Textarea id="message" placeholder="Type your message here." className="min-h-[150px]" required />
                        </div>
                        <Button type="submit" className="w-full sm:w-auto">Send Message</Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
