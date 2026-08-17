import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { FAQ as fallbackFAQ } from "@/data/clinic";
import { useWebsiteContent } from "@/lib/cms-store";

export function FAQSection() {
  const { data: contentMap = {} } = useWebsiteContent();
  const questionsList = contentMap.faq?.questions || fallbackFAQ;

  return (
    <Accordion type="single" collapsible className="mx-auto max-w-3xl space-y-3">
      {questionsList.map((f: any, i: number) => {
        const questionText = f.q || f.question;
        const answerText = f.a || f.answer;
        return (
          <AccordionItem
            key={i}
            value={`q-${i}`}
            className="rounded-2xl border border-border bg-card px-5 data-[state=open]:border-primary/30 data-[state=open]:shadow-soft"
          >
            <AccordionTrigger className="py-5 text-left font-display text-base font-semibold text-foreground hover:no-underline sm:text-lg">
              {questionText}
            </AccordionTrigger>
            <AccordionContent className="pb-5 text-sm leading-relaxed text-muted-foreground sm:text-base">
              {answerText}
            </AccordionContent>
          </AccordionItem>
        );
      })}
    </Accordion>
  );
}
