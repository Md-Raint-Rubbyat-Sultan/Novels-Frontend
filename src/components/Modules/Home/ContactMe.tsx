import { useRef, useState } from "react";
import emailjs from "emailjs-com";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { config } from "@/configs";
import { toast } from "sonner";

const ContactMe = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const sendEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;

    setLoading(true);
    const toastId = toast.loading("Sending email to author");

    try {
      setLoading(true);

      const result = await emailjs.sendForm(
        config.EMAIL_SERVIVE_ID,
        config.EMAIL_TAMPLATE_ID,
        formRef.current,
        config.EMAIL_PUBLIC_ID
      );

      if (result.status === 200) {
        toast.success("Thanks for reaching out! I'll get back to you soon.", {
          id: toastId,
        });
        setSent(true);
        formRef.current?.reset();
      }
    } catch (error) {
      console.log(error);
      toast.error("Faild to contact. Please manually send an email", {
        id: toastId,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-10 container">
      <h2 className="text-foreground text-4xl md:text-5xl font-bold underline underline-offset-8 decoration-primary mb-6">
        Contact Me
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Contact Info */}
        <Card>
          <CardHeader>
            <CardTitle>Get in Touch</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p>
              <strong>Email:</strong>{" "}
              <a
                href="mailto:mdranitrubbyatsultan@gmail.com"
                className="text-blue-600 underline"
              >
                mdranitrubbyatsultan@gmail.com
              </a>
            </p>
            <p>
              <strong>Phone:</strong>{" "}
              <a href="tel:+8801603266478" className="text-blue-600 underline">
                +8801603266478
              </a>
            </p>
          </CardContent>
        </Card>

        {/* Contact Form */}
        <Card>
          <CardHeader>
            <CardTitle>Send a Message</CardTitle>
          </CardHeader>
          <CardContent>
            <form ref={formRef} onSubmit={sendEmail} className="space-y-4">
              <Input name="user_name" placeholder="Your Name" required />
              <Input
                type="email"
                name="user_email"
                placeholder="Your Email"
                required
              />
              <Textarea name="message" placeholder="Your Message" required />
              <Button type="submit" disabled={loading}>
                {loading ? "Sending..." : "Send Message"}
              </Button>
              {sent && (
                <p className="text-green-600 text-sm mt-2">
                  ✅ Message sent successfully!
                </p>
              )}
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default ContactMe;
