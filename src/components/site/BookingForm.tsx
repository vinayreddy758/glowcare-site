import { useState, useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { CheckCircle2, MessageCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { whatsappHref } from "@/data/clinic";
import { useServices, useBusinessHours, useBlockedDates, useAppointments, useCreateAppointment } from "@/lib/cms-store";
import { format, parse, addMinutes, isBefore, startOfDay } from "date-fns";

const schema = z.object({
  name: z.string().trim().min(2, "Please enter your full name").max(80),
  phone: z.string().trim().regex(/^[+0-9\s-]{7,15}$/, "Enter a valid phone number"),
  email: z.string().trim().email("Enter a valid email").max(120),
  treatment: z.string().min(1, "Choose a treatment"),
  date: z.string().min(1, "Pick a preferred date"),
  time: z.string().min(1, "Pick a preferred time"),
  message: z.string().max(1000).optional(),
});

type FormData = z.infer<typeof schema>;

export function BookingForm() {
  const [done, setDone] = useState(false);
  
  // Data queries
  const { data: services = [] } = useServices();
  const { data: businessHours = [] } = useBusinessHours();
  const { data: blockedDates = [] } = useBlockedDates();
  const { data: appointments = [] } = useAppointments();
  const createAppointment = useCreateAppointment();

  const { register, handleSubmit, formState: { errors, isSubmitting }, setValue, watch, reset } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { treatment: "", time: "" },
  });
  
  const treatment = watch("treatment");
  const selectedDate = watch("date");
  const time = watch("time");

  // Filter active services
  const activeServices = services.filter(s => s.is_active);

  // Generate available time slots based on selected date
  const availableSlots = useMemo(() => {
    if (!selectedDate || !businessHours.length) return [];
    
    const dateObj = new Date(selectedDate);
    const dayOfWeek = dateObj.getDay();
    const dayHours = businessHours.find(h => h.day_of_week === dayOfWeek);
    
    if (!dayHours || !dayHours.is_open) return [];

    // Also check if date is blocked
    if (blockedDates.some(bd => bd.date === selectedDate)) return [];

    // Parse open/close times
    const openTime = parse(dayHours.open_time, 'HH:mm:ss', dateObj);
    const closeTime = parse(dayHours.close_time, 'HH:mm:ss', dateObj);
    
    const slots: string[] = [];
    let currentSlot = openTime;
    
    // Appointments on this date
    const bookedAppointments = appointments.filter(
      a => a.appointment_date === selectedDate && (a.status === 'pending' || a.status === 'confirmed')
    );

    const now = new Date();

    while (isBefore(currentSlot, closeTime)) {
      const slotStr = format(currentSlot, 'hh:mm a'); // e.g. "10:00 AM"
      
      // Check if slot is already booked
      const isBooked = bookedAppointments.some(a => a.appointment_time === slotStr);
      
      // If it's today, filter out past slots
      const isPast = isBefore(currentSlot, now);

      if (!isBooked && !isPast) {
        slots.push(slotStr);
      }
      currentSlot = addMinutes(currentSlot, dayHours.slot_duration_mins);
    }
    
    return slots;
  }, [selectedDate, businessHours, appointments, blockedDates]);

  const onSubmit = async (data: FormData) => {
    try {
      const selectedService = activeServices.find(s => s.title === data.treatment);
      
      await createAppointment.mutateAsync({
        patient_name: data.name,
        patient_phone: data.phone,
        patient_email: data.email,
        service_title: data.treatment,
        service_id: selectedService?.id,
        appointment_date: data.date,
        appointment_time: data.time,
        notes: data.message,
        status: 'pending',
      });
      
      setDone(true);
      toast.success("Appointment request received!", {
        description: "Our team will confirm your slot within 30 minutes.",
      });
      reset();
    } catch (error) {
      toast.error("Failed to submit request", {
        description: "Please try again or contact us via WhatsApp."
      });
    }
  };

  if (done) {
    return (
      <div className="rounded-3xl border border-success/30 bg-success/5 p-10 text-center">
        <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-success text-success-foreground">
          <CheckCircle2 className="h-7 w-7" />
        </div>
        <h3 className="mt-4 font-display text-2xl font-semibold text-foreground">Appointment Requested</h3>
        <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
          Thank you! Our care team will call you within 30 minutes to confirm your preferred slot.
        </p>
        <Button onClick={() => setDone(false)} variant="outline" className="mt-6 rounded-full">Book another</Button>
      </div>
    );
  }

  // Calculate min date (today)
  const todayStr = format(new Date(), 'yyyy-MM-dd');

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="rounded-3xl border border-border bg-card p-6 shadow-soft sm:p-8" noValidate>
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-1.5">
          <Label htmlFor="name">Full Name</Label>
          <Input id="name" placeholder="e.g. Ananya Iyer" {...register("name")} aria-invalid={!!errors.name} />
          {errors.name && <p className="text-xs text-destructive">{errors.name.message}</p>}
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="phone">Phone Number</Label>
          <Input id="phone" type="tel" placeholder="+91 98765 43210" {...register("phone")} aria-invalid={!!errors.phone} />
          {errors.phone && <p className="text-xs text-destructive">{errors.phone.message}</p>}
        </div>
        <div className="space-y-1.5 sm:col-span-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="you@email.com" {...register("email")} aria-invalid={!!errors.email} />
          {errors.email && <p className="text-xs text-destructive">{errors.email.message}</p>}
        </div>
        <div className="space-y-1.5">
          <Label>Treatment Required</Label>
          <Select value={treatment} onValueChange={(v) => setValue("treatment", v, { shouldValidate: true })}>
            <SelectTrigger><SelectValue placeholder="Select a treatment" /></SelectTrigger>
            <SelectContent>
              {activeServices.map((s) => (
                <SelectItem key={s.slug} value={s.title}>{s.title}</SelectItem>
              ))}
              <SelectItem value="General Consultation">General Consultation</SelectItem>
            </SelectContent>
          </Select>
          {errors.treatment && <p className="text-xs text-destructive">{errors.treatment.message}</p>}
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="date">Preferred Date</Label>
          <Input 
            id="date" 
            type="date" 
            min={todayStr} 
            {...register("date")} 
            onChange={(e) => {
              setValue("date", e.target.value, { shouldValidate: true });
              setValue("time", ""); // Reset time when date changes
            }}
            aria-invalid={!!errors.date} 
          />
          {errors.date && <p className="text-xs text-destructive">{errors.date.message}</p>}
        </div>
        <div className="space-y-1.5 sm:col-span-2">
          <Label>Preferred Time</Label>
          <Select 
            value={time} 
            onValueChange={(v) => setValue("time", v, { shouldValidate: true })}
            disabled={!selectedDate || availableSlots.length === 0}
          >
            <SelectTrigger>
              <SelectValue placeholder={!selectedDate ? "Select date first" : availableSlots.length === 0 ? "No slots available" : "Pick a time slot"} />
            </SelectTrigger>
            <SelectContent>
              {availableSlots.map((t) => (
                <SelectItem key={t} value={t}>{t}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.time && <p className="text-xs text-destructive">{errors.time.message}</p>}
        </div>
        <div className="space-y-1.5 sm:col-span-2">
          <Label htmlFor="message">Message (optional)</Label>
          <Textarea id="message" rows={4} placeholder="Tell us about your skin or hair concerns..." {...register("message")} />
        </div>
      </div>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <Button type="submit" disabled={isSubmitting || createAppointment.isPending} size="lg" className="h-12 flex-1 rounded-full text-base font-semibold shadow-soft">
          {isSubmitting || createAppointment.isPending ? <><Loader2 className="h-4 w-4 animate-spin" /> Sending...</> : "Book Appointment"}
        </Button>
        <Button asChild type="button" variant="outline" size="lg" className="h-12 flex-1 rounded-full border-2 text-base font-semibold">
          <a href={whatsappHref("Hi, I'd like to book an appointment.")} target="_blank" rel="noopener noreferrer">
            <MessageCircle className="h-4 w-4" /> WhatsApp Booking
          </a>
        </Button>
      </div>
      <p className="mt-4 text-center text-xs text-muted-foreground">
        We respect your privacy. Your details are only used to confirm your appointment.
      </p>
    </form>
  );
}
