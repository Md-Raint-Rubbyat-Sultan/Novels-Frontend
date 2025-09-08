import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQ = () => {
  return (
    <section className="py-10 container">
      <h2 className="text-foreground text-4xl md:text-5xl font-bold underline underline-offset-8 decoration-primary mb-6 hidden md:block">
        Frequently Asked Questions
      </h2>

      <h2 className="text-foreground text-4xl md:text-5xl font-bold underline underline-offset-8 decoration-primary mb-6 block md:hidden">
        FAQ
      </h2>
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger>How does the subscription work?</AccordionTrigger>
          <AccordionContent>
            Users can subscribe monthly or yearly. Once you purchase a package,
            you cannot buy another until the current subscription ends.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-2">
          <AccordionTrigger>
            Can writers read books without a subscription?
          </AccordionTrigger>
          <AccordionContent>
            Writers can read only their own books for free. To read other books,
            they need a subscription like normal users.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-3">
          <AccordionTrigger>
            What payment methods are supported?
          </AccordionTrigger>
          <AccordionContent>
            We support multiple payment methods (credit/debit card, mobile
            banking, etc.) depending on your region.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-4">
          <AccordionTrigger>Can I cancel my subscription?</AccordionTrigger>
          <AccordionContent>
            No, you can&apos;t cancel anytime.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </section>
  );
};

export default FAQ;
