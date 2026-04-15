import { Container } from "@/components/layout/Container";
import { FadeIn } from "@/components/animations/FadeIn";
import ContactForm from "@/sections/contact/ContactForm";
import ContactInfo from "@/sections/contact/ContactInfo";

export default function Contact() {
  return (
    <div className="pt-32 pb-20">
      <Container>
        <FadeIn>
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-navy mb-4">Get in Touch</h1>
            <p className="text-gray-600 text-lg">We're here to answer any questions about our projects or investment opportunities.</p>
          </div>
        </FadeIn>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <ContactInfo />
          <ContactForm />
        </div>
      </Container>
    </div>
  );
}