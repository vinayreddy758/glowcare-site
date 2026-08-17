import { useState, useEffect } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useClinicSettings, useUpdateClinicSettings } from "@/lib/cms-store";
import { Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export const Route = createFileRoute("/admin/clinic-settings")({
  component: AdminClinicSettings,
});

function AdminClinicSettings() {
  const { data: settings = {} } = useClinicSettings();
  const updateSettings = useUpdateClinicSettings();

  const [formData, setFormData] = useState<Record<string, any>>({});

  useEffect(() => {
    if (Object.keys(settings).length > 0) {
      setFormData(settings);
    }
  }, [settings]);

  const handleChange = (key: string, value: any) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    updateSettings.mutate(formData);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Clinic Settings</h1>
          <p className="text-muted-foreground mt-1">Manage contact details and core clinic information</p>
        </div>
        <Button className="gap-2" onClick={handleSave} disabled={updateSettings.isPending}>
          <Save className="h-4 w-4" /> Save Settings
        </Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Contact Info */}
        <div className="rounded-xl border border-border bg-card shadow-sm p-6">
          <h3 className="font-semibold text-lg text-foreground mb-6">Contact Information</h3>
          <div className="space-y-5">
            <div className="space-y-1.5">
              <Label htmlFor="clinic_name">Clinic Name</Label>
              <Input 
                id="clinic_name" 
                value={formData.name || ''} 
                onChange={(e) => handleChange('name', e.target.value)} 
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="clinic_phone">Phone Number</Label>
              <Input 
                id="clinic_phone" 
                value={formData.phone || ''} 
                onChange={(e) => handleChange('phone', e.target.value)} 
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="clinic_email">Email Address</Label>
              <Input 
                id="clinic_email" 
                value={formData.email || ''} 
                onChange={(e) => handleChange('email', e.target.value)} 
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="clinic_address">Full Address</Label>
              <Textarea 
                id="clinic_address" 
                rows={3} 
                value={formData.address || ''} 
                onChange={(e) => handleChange('address', e.target.value)} 
              />
            </div>
          </div>
        </div>

        {/* Brand & Financials */}
        <div className="space-y-6">
          <div className="rounded-xl border border-border bg-card shadow-sm p-6">
            <h3 className="font-semibold text-lg text-foreground mb-6">Brand Identity</h3>
            <div className="space-y-5">
              <div className="space-y-1.5">
                <Label htmlFor="clinic_tagline">Tagline</Label>
                <Input 
                  id="clinic_tagline" 
                  value={formData.tagline || ''} 
                  onChange={(e) => handleChange('tagline', e.target.value)} 
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="whatsapp_message">Default WhatsApp Message</Label>
                <Textarea 
                  id="whatsapp_message" 
                  rows={2} 
                  value={formData.whatsapp_message || ''} 
                  onChange={(e) => handleChange('whatsapp_message', e.target.value)} 
                />
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-border bg-card shadow-sm p-6">
            <h3 className="font-semibold text-lg text-foreground mb-6">Financials</h3>
            <div className="space-y-5">
              <div className="space-y-1.5">
                <Label htmlFor="consultation_fee">First Consultation Fee (₹)</Label>
                <Input 
                  id="consultation_fee" 
                  type="number" 
                  value={formData.consultation_fee || ''} 
                  onChange={(e) => handleChange('consultation_fee', parseInt(e.target.value))} 
                />
                <p className="text-xs text-muted-foreground">This fee is displayed on the booking page.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
