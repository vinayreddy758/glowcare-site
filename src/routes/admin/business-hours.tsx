import { useState, useEffect } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useBusinessHours, useUpdateBusinessHours, type BusinessHour } from "@/lib/cms-store";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Save } from "lucide-react";

export const Route = createFileRoute("/admin/business-hours")({
  component: AdminBusinessHours,
});

function AdminBusinessHours() {
  const { data: initialHours = [] } = useBusinessHours();
  const updateBusinessHours = useUpdateBusinessHours();
  const [hours, setHours] = useState<BusinessHour[]>([]);

  useEffect(() => {
    if (initialHours.length > 0) {
      setHours(initialHours);
    }
  }, [initialHours]);

  const handleUpdate = (dayOfWeek: number, field: keyof BusinessHour, value: any) => {
    setHours(prev => prev.map(h => h.day_of_week === dayOfWeek ? { ...h, [field]: value } : h));
  };

  const handleSave = () => {
    updateBusinessHours.mutate(hours);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Business Hours</h1>
          <p className="text-muted-foreground mt-1">Configure clinic opening times and slot durations</p>
        </div>
        <Button className="gap-2" onClick={handleSave} disabled={updateBusinessHours.isPending}>
          <Save className="h-4 w-4" /> Save Changes
        </Button>
      </div>

      <div className="rounded-xl border border-border bg-card shadow-sm p-6">
        <h3 className="font-semibold text-lg text-foreground mb-6">Weekly Schedule</h3>
        
        <div className="space-y-4">
          {hours.map((day) => (
            <div key={day.day_of_week} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-lg border border-border bg-background">
              <div className="flex items-center gap-4 min-w-[150px]">
                <Switch 
                  checked={day.is_open} 
                  onCheckedChange={(checked) => handleUpdate(day.day_of_week, 'is_open', checked)}
                />
                <Label className="font-medium text-base">{day.day_name}</Label>
              </div>
              
              <div className="flex flex-1 items-center gap-4 opacity-100">
                {day.is_open ? (
                  <>
                    <div className="flex items-center gap-2">
                      <Input 
                        type="time" 
                        value={day.open_time.slice(0, 5)} 
                        onChange={(e) => handleUpdate(day.day_of_week, 'open_time', `${e.target.value}:00`)}
                        className="w-auto" 
                      />
                      <span className="text-muted-foreground text-sm">to</span>
                      <Input 
                        type="time" 
                        value={day.close_time.slice(0, 5)} 
                        onChange={(e) => handleUpdate(day.day_of_week, 'close_time', `${e.target.value}:00`)}
                        className="w-auto" 
                      />
                    </div>
                    
                    <div className="hidden md:block h-8 w-px bg-border mx-4" />
                    
                    <div className="hidden md:flex items-center gap-2">
                      <span className="text-sm text-muted-foreground whitespace-nowrap">Slot size:</span>
                      <select 
                        className="flex h-10 w-24 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        value={day.slot_duration_mins}
                        onChange={(e) => handleUpdate(day.day_of_week, 'slot_duration_mins', parseInt(e.target.value))}
                      >
                        <option value="15">15 min</option>
                        <option value="30">30 min</option>
                        <option value="45">45 min</option>
                        <option value="60">60 min</option>
                      </select>
                    </div>
                  </>
                ) : (
                  <span className="text-sm font-medium text-muted-foreground bg-muted/50 px-3 py-1.5 rounded-md">Closed</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
