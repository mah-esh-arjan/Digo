import { FadeIn } from "@/components/animations/FadeIn";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function ContactForm() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Message sent!");
  };

  return (
    <FadeIn delay={0.2} className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100">
      <h3 className="text-2xl font-bold text-navy mb-6">Send us a Message</h3>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">First Name</label>
            <Input required placeholder="John" className="bg-surface border-transparent focus:border-primary" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Last Name</label>
            <Input required placeholder="Doe" className="bg-surface border-transparent focus:border-primary" />
          </div>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Email Address</label>
          <Input type="email" required placeholder="john@example.com" className="bg-surface border-transparent" />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Your Message</label>
          <Textarea required placeholder="How can we help you?" className="min-h-[150px] bg-surface border-transparent" />
        </div>
        <Button type="submit" className="w-full bg-primary hover:bg-primary-dark h-12 text-lg rounded-xl">
          Send Message
        </Button>
      </form>
    </FadeIn>
  );
}