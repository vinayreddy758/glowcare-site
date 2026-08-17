import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useServices, useCreateService, useUpdateService, useDeleteService, type Service } from "@/lib/cms-store";
import { Plus, Edit, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";

export const Route = createFileRoute("/admin/services")({
  component: AdminServices,
});

function AdminServices() {
  const { data: services = [] } = useServices();
  const createService = useCreateService();
  const updateService = useUpdateService();
  const deleteService = useDeleteService();

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);

  // Form State
  const [formData, setFormData] = useState<Partial<Service>>({
    title: '', slug: '', description: '', icon_name: 'sparkles', duration_mins: 30, price: null, is_active: true, benefits: []
  });

  const handleOpenAdd = () => {
    setEditingService(null);
    setFormData({ title: '', slug: '', description: '', icon_name: 'sparkles', duration_mins: 30, price: null, is_active: true, benefits: [] });
    setIsDialogOpen(true);
  };

  const handleOpenEdit = (service: Service) => {
    setEditingService(service);
    setFormData(service);
    setIsDialogOpen(true);
  };

  const handleSave = () => {
    if (editingService) {
      updateService.mutate(formData as Service, { onSuccess: () => setIsDialogOpen(false) });
    } else {
      createService.mutate(formData as Service, { onSuccess: () => setIsDialogOpen(false) });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Services</h1>
          <p className="text-muted-foreground mt-1">Manage treatments and pricing</p>
        </div>
        <Button className="gap-2" onClick={handleOpenAdd}>
          <Plus className="h-4 w-4" /> Add Service
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {services.map((service) => (
          <div key={service.id || service.slug} className={`rounded-xl border ${service.is_active ? 'border-border' : 'border-dashed border-border opacity-60'} bg-card p-6 shadow-sm flex flex-col`}>
            <div className="flex justify-between items-start mb-4">
              <div className="bg-primary/10 p-2.5 rounded-lg text-primary">
                <div className="h-6 w-6 grid place-items-center font-bold text-xs bg-primary/20 rounded">
                  {service.icon_name.substring(0, 2).toUpperCase()}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Switch 
                  checked={service.is_active} 
                  onCheckedChange={(checked) => updateService.mutate({ ...service, is_active: checked })}
                />
              </div>
            </div>
            
            <h3 className="font-semibold text-lg text-foreground mb-2">{service.title}</h3>
            <p className="text-sm text-muted-foreground mb-4 flex-1 line-clamp-3">{service.description}</p>
            
            <div className="flex items-center justify-between mt-auto pt-4 border-t border-border">
              <div className="text-sm font-medium">
                {service.price ? `₹${service.price}` : 'Consultation'}
                <span className="text-muted-foreground font-normal ml-2">({service.duration_mins}m)</span>
              </div>
              <div className="flex gap-1">
                <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground" onClick={() => handleOpenEdit(service)}>
                  <Edit className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-destructive" onClick={() => deleteService.mutate(service.id!)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{editingService ? 'Edit Service' : 'Add Service'}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-1.5">
              <Label>Title</Label>
              <Input 
                value={formData.title} 
                onChange={e => setFormData({ ...formData, title: e.target.value, slug: e.target.value.toLowerCase().replace(/\s+/g, '-') })}
              />
            </div>
            <div className="space-y-1.5">
              <Label>Slug</Label>
              <Input value={formData.slug} onChange={e => setFormData({ ...formData, slug: e.target.value })} />
            </div>
            <div className="space-y-1.5">
              <Label>Description</Label>
              <Textarea value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label>Duration (mins)</Label>
                <Input type="number" value={formData.duration_mins} onChange={e => setFormData({ ...formData, duration_mins: parseInt(e.target.value) })} />
              </div>
              <div className="space-y-1.5">
                <Label>Price (₹)</Label>
                <Input type="number" value={formData.price || ''} onChange={e => setFormData({ ...formData, price: e.target.value ? parseInt(e.target.value) : null })} placeholder="Consultation" />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleSave} disabled={createService.isPending || updateService.isPending}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
