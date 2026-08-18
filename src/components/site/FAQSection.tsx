import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { FAQ as fallbackFAQ } from "@/data/clinic";
import { useWebsiteContent } from "@/lib/cms-store";
import { HelpCircle } from "lucide-react";

export function FAQSection() {
  const { data: contentMap = {} } = useWebsiteContent();
  const questionsList = contentMap.faq?.questions || fallbackFAQ;

  return (
    <Accordion type="single" collapsible className="mx-auto max-w-4xl space-y-4">
      {questionsList.map((f: any, i: number) => {
        const questionText = f.q || f.question;
        const answerText = f.a || f.answer;
        return (
          <AccordionItem
            key={i}
            value={`q-${i}`}
            className="group rounded-3xl border border-border/60 bg-card px-6 sm:px-8 data-[state=open]:border-primary/40 data-[state=open]:shadow-elegant transition-all duration-300 animate-fade-in-up hover:border-border/80"
            style={{ animationDelay: `${i * 100}ms` }}
          >
            <AccordionTrigger className="py-6 text-left font-display text-lg font-bold text-foreground hover:no-underline sm:text-xl flex gap-4 transition-colors group-data-[state=open]:text-primary">
              <span className="flex-1">{questionText}</span>
            </AccordionTrigger>
            <AccordionContent className="pb-8 text-base leading-relaxed text-muted-foreground sm:text-[17px]">
              <div className="flex gap-4">
                <HelpCircle className="h-6 w-6 shrink-0 text-primary/40" />
                <span>{answerText}</span>
              </div>
            </AccordionContent>
          </AccordionItem>
        );
      })}
    </Accordion>
  );
}
