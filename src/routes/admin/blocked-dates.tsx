import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useBlockedDates, useAddBlockedDate, useDeleteBlockedDate, type BlockedDate } from "@/lib/cms-store";
import { format } from "date-fns";
import { Plus, Trash2, CalendarOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";

export const Route = createFileRoute("/admin/blocked-dates")({
  component: AdminBlockedDates,
});

function AdminBlockedDates() {
  const { data: blockedDates = [] } = useBlockedDates();
  const addBlockedDate = useAddBlockedDate();
  const deleteBlockedDate = useDeleteBlockedDate();

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState<BlockedDate>({ date: '', reason: '' });

  const handleOpenAdd = () => {
    setFormData({ date: '', reason: '' });
    setIsDialogOpen(true);
  };

  const handleSave = () => {
    if (formData.date) {
      addBlockedDate.mutate(formData, { onSuccess: () => setIsDialogOpen(false) });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Blocked Dates</h1>
          <p className="text-muted-foreground mt-1">Manage clinic holidays and closure dates</p>
        </div>
        <Button className="gap-2" onClick={handleOpenAdd}>
          <Plus className="h-4 w-4" /> Add Date
        </Button>
      </div>

      <div className="rounded-xl border border-border bg-card shadow-sm overflow-hidden">
        {blockedDates.length === 0 ? (
          <div className="p-12 text-center flex flex-col items-center">
            <div className="h-12 w-12 rounded-full bg-muted/50 grid place-items-center mb-4 text-muted-foreground">
              <CalendarOff className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-semibold text-foreground">No blocked dates</h3>
            <p className="text-sm text-muted-foreground mt-1 max-w-md mx-auto">
              You haven't added any holidays or clinic closure dates yet. Users can book appointments on all regular business days.
            </p>
          </div>
        ) : (
          <div className="divide-y divide-border">
            {blockedDates.map((bd) => (
              <div key={bd.id || bd.date} className="flex items-center justify-between p-4 sm:p-6 hover:bg-muted/10 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-lg bg-red-100 text-red-600 grid place-items-center font-bold text-center leading-tight">
                    <span className="block text-xs uppercase opacity-80">{format(new Date(bd.date), "MMM")}</span>
                    <span className="block text-lg">{format(new Date(bd.date), "d")}</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground">{format(new Date(bd.date), "EEEE, MMMM do, yyyy")}</h4>
                    <p className="text-sm text-muted-foreground mt-0.5">{bd.reason || "No reason provided"}</p>
                  </div>
                </div>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="text-muted-foreground hover:text-destructive"
                  onClick={() => bd.id && deleteBlockedDate.mutate(bd.id)}
                  disabled={deleteBlockedDate.isPending}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add Blocked Date</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-1.5">
              <Label>Date</Label>
              <Input 
                type="date" 
                value={formData.date} 
                onChange={e => setFormData({ ...formData, date: e.target.value })} 
                min={new Date().toISOString().split('T')[0]}
              />
            </div>
            <div className="space-y-1.5">
              <Label>Reason (Optional)</Label>
              <Input 
                value={formData.reason || ''} 
                onChange={e => setFormData({ ...formData, reason: e.target.value })} 
                placeholder="e.g. Public Holiday, Clinic Renovation"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleSave} disabled={addBlockedDate.isPending || !formData.date}>Save Date</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
