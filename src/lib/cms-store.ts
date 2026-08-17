import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase, isDemoMode } from "./supabase";
import { SERVICES as defaultServices, CLINIC as defaultClinic, WHY_US, RESULTS, TESTIMONIALS, STATS, FAQ, GALLERY } from "@/data/clinic";
import { toast } from "sonner";

// --- Types ---

export type Service = {
  id?: string;
  slug: string;
  title: string;
  description: string;
  icon_name: string;
  benefits: string[];
  duration_mins: number;
  price: number | null;
  is_active: boolean;
  sort_order?: number;
};

export type BusinessHour = {
  id?: string;
  day_of_week: number;
  day_name: string;
  is_open: boolean;
  open_time: string;
  close_time: string;
  slot_duration_mins: number;
};

export type BlockedDate = {
  id?: string;
  date: string;
  reason: string | null;
};

export type Appointment = {
  id?: string;
  patient_name: string;
  patient_phone: string;
  patient_email: string;
  service_title: string;
  service_id?: string | null;
  appointment_date: string;
  appointment_time: string;
  notes?: string;
  admin_notes?: string;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  created_at?: string;
};

export type ClinicSettings = {
  [key: string]: any;
};

export type WebsiteContent = {
  [key: string]: any;
};

// --- Fallback Data ---

const fallbackBusinessHours: BusinessHour[] = [
  { day_of_week: 0, day_name: 'Sunday', is_open: false, open_time: '09:00:00', close_time: '20:00:00', slot_duration_mins: 30 },
  { day_of_week: 1, day_name: 'Monday', is_open: true, open_time: '09:00:00', close_time: '20:00:00', slot_duration_mins: 30 },
  { day_of_week: 2, day_name: 'Tuesday', is_open: true, open_time: '09:00:00', close_time: '20:00:00', slot_duration_mins: 30 },
  { day_of_week: 3, day_name: 'Wednesday', is_open: true, open_time: '09:00:00', close_time: '20:00:00', slot_duration_mins: 30 },
  { day_of_week: 4, day_name: 'Thursday', is_open: true, open_time: '09:00:00', close_time: '20:00:00', slot_duration_mins: 30 },
  { day_of_week: 5, day_name: 'Friday', is_open: true, open_time: '09:00:00', close_time: '20:00:00', slot_duration_mins: 30 },
  { day_of_week: 6, day_name: 'Saturday', is_open: true, open_time: '09:00:00', close_time: '20:00:00', slot_duration_mins: 30 },
];

let fallbackAppointments: Appointment[] = [];
let fallbackBlockedDates: BlockedDate[] = [];

const fallbackServices: Service[] = defaultServices.map((s, i) => ({
  id: `demo-${i}`,
  slug: s.slug,
  title: s.title,
  description: s.description,
  icon_name: 'sparkles',
  benefits: s.benefits || [],
  duration_mins: 30,
  price: 1500,
  is_active: true,
  sort_order: i
}));

let memoryServices: Service[] = [...fallbackServices];

const fallbackClinicSettings: ClinicSettings = {
  consultation_fee: 500,
  name: defaultClinic.name,
  phone: defaultClinic.phone,
  email: defaultClinic.email,
  address: defaultClinic.address,
  tagline: defaultClinic.tagline,
  whatsapp_message: defaultClinic.whatsappMessage
};

const fallbackWebsiteContent: Record<string, WebsiteContent> = {
  hero: {
    eyebrow: "Welcome to GlowCare",
    title: "Expert Dermatology for Healthy, Glowing Skin",
    subtitle: "Advanced clinical treatments for acne, pigmentation, hair loss, and anti-aging in Whitefield, Bangalore.",
    button_text: "Book Consultation"
  },
  gallery: {
    images: GALLERY.map(g => ({ label: g.alt, url: g.url }))
  },
  testimonials: {
    reviews: TESTIMONIALS
  },
  faq: {
    questions: FAQ
  }
};

// --- Error Handler ---
const handleError = (error: any) => {
  console.error("CMS Store Error:", error);
  toast.error(error.message || "Failed to save data. Please check admin permissions.");
};

// --- Hooks ---

export function useServices() {
  return useQuery({
    queryKey: ['services'],
    queryFn: async (): Promise<Service[]> => {
      if (isDemoMode) return memoryServices;
      
      const { data, error } = await supabase.from('services').select('*').order('sort_order');
      if (error) throw error;
      
      if (!data || data.length === 0) {
        return memoryServices;
      }
      return data || [];
    }
  });
}

export function useUpdateService() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (service: Service) => {
      if (isDemoMode) {
        memoryServices = memoryServices.map(s => s.id === service.id || s.slug === service.slug ? service : s);
        return service;
      }

      const payload = { ...service };
      // CRITICAL FIX: If ID is temporary demo ID, remove it and upsert by slug so Postgres generates a real UUID!
      if (!payload.id || payload.id.startsWith('demo-')) {
        delete payload.id;
        const { data, error } = await supabase.from('services').upsert(payload, { onConflict: 'slug' }).select().single();
        if (error) throw error;
        return data;
      } else {
        const { data, error } = await supabase.from('services').update(payload).eq('id', payload.id).select().single();
        if (error) throw error;
        return data;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['services'] });
      toast.success("Service updated successfully");
    },
    onError: handleError
  });
}

export function useCreateService() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (service: Service) => {
      const newService = { ...service };
      delete newService.id;
      if (isDemoMode) {
        newService.id = `demo-svc-${Date.now()}`;
        memoryServices = [...memoryServices, newService];
        return newService;
      }
      const { data, error } = await supabase.from('services').upsert([newService], { onConflict: 'slug' }).select().single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['services'] });
      toast.success("Service added successfully");
    },
    onError: handleError
  });
}

export function useDeleteService() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      if (isDemoMode || id.startsWith('demo-')) {
        memoryServices = memoryServices.filter(s => s.id !== id);
        queryClient.invalidateQueries({ queryKey: ['services'] });
        toast.success("Service deleted");
        return;
      }
      const { error } = await supabase.from('services').delete().eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['services'] });
      toast.success("Service deleted");
    },
    onError: handleError
  });
}


export function useBusinessHours() {
  return useQuery({
    queryKey: ['business_hours'],
    queryFn: async (): Promise<BusinessHour[]> => {
      if (isDemoMode) return fallbackBusinessHours;
      const { data, error } = await supabase.from('business_hours').select('*').order('day_of_week');
      if (error) throw error;
      return data && data.length > 0 ? data : fallbackBusinessHours;
    }
  });
}

export function useUpdateBusinessHours() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (hours: BusinessHour[]) => {
      if (isDemoMode) {
        return hours;
      }
      const payload = hours.map(h => {
        const item = { ...h };
        if (item.id && item.id.startsWith('demo-')) delete item.id;
        return item;
      });
      const { error } = await supabase.from('business_hours').upsert(payload, { onConflict: 'day_of_week' });
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['business_hours'] });
      toast.success("Business hours saved");
    },
    onError: handleError
  });
}

export function useBlockedDates() {
  return useQuery({
    queryKey: ['blocked_dates'],
    queryFn: async (): Promise<BlockedDate[]> => {
      if (isDemoMode) return fallbackBlockedDates;
      const { data, error } = await supabase.from('blocked_dates').select('*').order('date');
      if (error) throw error;
      return data || [];
    }
  });
}

export function useAddBlockedDate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (blockedDate: BlockedDate) => {
      if (isDemoMode) {
        fallbackBlockedDates.push({ ...blockedDate, id: `demo-bd-${Date.now()}` });
        return;
      }
      const payload = { ...blockedDate };
      if (payload.id && payload.id.startsWith('demo-')) delete payload.id;
      const { error } = await supabase.from('blocked_dates').upsert([payload], { onConflict: 'date' });
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blocked_dates'] });
      toast.success("Date blocked successfully");
    },
    onError: handleError
  });
}

export function useDeleteBlockedDate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      if (isDemoMode || id.startsWith('demo-')) {
        fallbackBlockedDates = fallbackBlockedDates.filter(b => b.id !== id);
        queryClient.invalidateQueries({ queryKey: ['blocked_dates'] });
        toast.success("Blocked date removed");
        return;
      }
      const { error } = await supabase.from('blocked_dates').delete().eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blocked_dates'] });
      toast.success("Blocked date removed");
    },
    onError: handleError
  });
}


export function useClinicSettings() {
  return useQuery({
    queryKey: ['clinic_settings'],
    queryFn: async (): Promise<ClinicSettings> => {
      if (isDemoMode) return fallbackClinicSettings;
      
      const { data, error } = await supabase.from('clinic_settings').select('*');
      if (error) throw error;
      const settings: any = { ...fallbackClinicSettings };
      data?.forEach(d => settings[d.key] = d.value);
      return settings;
    }
  });
}

export function useUpdateClinicSettings() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (settings: ClinicSettings) => {
      if (isDemoMode) {
        Object.assign(fallbackClinicSettings, settings);
        return;
      }
      const upsertData = Object.entries(settings).map(([key, value]) => ({ key, value }));
      const { error } = await supabase.from('clinic_settings').upsert(upsertData, { onConflict: 'key' });
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['clinic_settings'] });
      toast.success("Clinic settings saved successfully");
    },
    onError: handleError
  });
}

export function useWebsiteContent() {
  return useQuery({
    queryKey: ['website_content'],
    queryFn: async (): Promise<Record<string, any>> => {
      if (isDemoMode) return fallbackWebsiteContent;
      
      const { data, error } = await supabase.from('website_content').select('*');
      if (error) throw error;
      const contentMap: any = { ...fallbackWebsiteContent };
      data?.forEach(d => contentMap[d.section_key] = d.content);
      return contentMap;
    }
  });
}

export function useUpdateWebsiteContent() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (content: Record<string, any>) => {
      if (isDemoMode) {
        Object.assign(fallbackWebsiteContent, content);
        return;
      }
      const upsertData = Object.entries(content).map(([section_key, content_value]) => ({ section_key, content: content_value }));
      const { error } = await supabase.from('website_content').upsert(upsertData, { onConflict: 'section_key' });
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['website_content'] });
      toast.success("Website content saved successfully");
    },
    onError: handleError
  });
}


export function useAppointments() {
  return useQuery({
    queryKey: ['appointments'],
    queryFn: async (): Promise<Appointment[]> => {
      if (isDemoMode) return fallbackAppointments;
      const { data, error } = await supabase.from('appointments').select('*').order('appointment_date', { ascending: false });
      if (error) throw error;
      return data || [];
    }
  });
}

export function useCreateAppointment() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (appointment: Appointment) => {
      const payload = { ...appointment };
      if (payload.service_id && payload.service_id.startsWith('demo-')) {
        payload.service_id = null;
      }

      if (isDemoMode) {
        const newAppt = { ...payload, id: `demo-${Date.now()}`, created_at: new Date().toISOString(), status: 'pending' as const };
        fallbackAppointments = [newAppt, ...fallbackAppointments];
        return newAppt;
      }
      
      const { data, error } = await supabase.from('appointments').insert([payload]).select().single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['appointments'] });
    },
    onError: handleError
  });
}

export function useUpdateAppointmentStatus() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, status, admin_notes }: { id: string; status: Appointment['status'], admin_notes?: string }) => {
      if (isDemoMode) {
        fallbackAppointments = fallbackAppointments.map(a => 
          a.id === id ? { ...a, status, admin_notes: admin_notes ?? a.admin_notes } : a
        );
        return;
      }
      const updateData: any = { status };
      if (admin_notes !== undefined) updateData.admin_notes = admin_notes;
      const { error } = await supabase.from('appointments').update(updateData).eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['appointments'] });
      toast.success("Appointment updated");
    },
    onError: handleError
  });
}
