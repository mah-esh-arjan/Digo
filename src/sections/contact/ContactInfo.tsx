import { FadeIn } from "@/components/animations/FadeIn";
import { MapPin, Phone, Mail } from "lucide-react";

export default function ContactInfo() {
  return (
    <FadeIn className="space-y-8">
      <div className="bg-primary/5 p-6 rounded-2xl flex items-start gap-4 border border-primary/10">
        <MapPin className="w-8 h-8 text-primary shrink-0" />
        <div>
          <h4 className="font-bold text-navy text-lg mb-1">Corporate Office</h4>
          <p className="text-gray-600">Kalinchowk Rural Municipality, <br />Dolakha, Nepal</p>
        </div>
      </div>

      <div className="bg-primary/5 p-6 rounded-2xl flex items-start gap-4 border border-primary/10">
        <Phone className="w-8 h-8 text-primary shrink-0" />
        <div>
          <h4 className="font-bold text-navy text-lg mb-1">Phone Number</h4>
          <p className="text-gray-600 mb-1">Office: 015924279</p>
          <p className="text-gray-600">Direct: (+977) 9854233672</p>
        </div>
      </div>

      <div className="bg-primary/5 p-6 rounded-2xl flex items-start gap-4 border border-primary/10">
        <Mail className="w-8 h-8 text-primary shrink-0" />
        <div>
          <h4 className="font-bold text-navy text-lg mb-1">Email Address</h4>
          <p className="text-gray-600">info@digourja.com.np</p>
        </div>
      </div>
    </FadeIn>
  );
}