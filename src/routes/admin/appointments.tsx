import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useAppointments, useUpdateAppointmentStatus } from "@/lib/cms-store";
import { format } from "date-fns";
import { 
  CheckCircle, 
  XCircle, 
  Clock, 
  CheckCircle2, 
  Search,
  Filter,
  MoreVertical
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const Route = createFileRoute("/admin/appointments")({
  component: AdminAppointments,
});

function AdminAppointments() {
  const { data: appointments = [] } = useAppointments();
  const updateStatus = useUpdateAppointmentStatus();
  
  const [filter, setFilter] = useState<'all' | 'pending' | 'confirmed' | 'completed' | 'cancelled'>('all');
  const [search, setSearch] = useState('');

  const filteredAppointments = appointments.filter(apt => {
    if (filter !== 'all' && apt.status !== filter) return false;
    if (search) {
      const s = search.toLowerCase();
      return apt.patient_name.toLowerCase().includes(s) || 
             apt.patient_phone.includes(s) || 
             apt.service_title.toLowerCase().includes(s);
    }
    return true;
  });

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'pending': return <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-medium text-amber-800"><Clock className="h-3 w-3" /> Pending</span>;
      case 'confirmed': return <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800"><CheckCircle className="h-3 w-3" /> Confirmed</span>;
      case 'completed': return <span className="inline-flex items-center gap-1.5 rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800"><CheckCircle2 className="h-3 w-3" /> Completed</span>;
      case 'cancelled': return <span className="inline-flex items-center gap-1.5 rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-800"><XCircle className="h-3 w-3" /> Cancelled</span>;
      default: return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Appointments</h1>
          <p className="text-muted-foreground mt-1">Manage patient bookings and schedule</p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between bg-card p-4 rounded-xl border border-border shadow-sm">
        <div className="flex w-full sm:w-auto items-center gap-2">
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search patients, phone, service..." 
              className="pl-9 bg-background"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
        </div>
        
        <div className="flex w-full sm:w-auto items-center gap-2 overflow-x-auto pb-2 sm:pb-0 hide-scrollbar">
          {(['all', 'pending', 'confirmed', 'completed', 'cancelled'] as const).map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                filter === f 
                  ? 'bg-primary text-primary-foreground' 
                  : 'bg-muted/50 text-muted-foreground hover:bg-muted'
              }`}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="rounded-xl border border-border bg-card shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-muted/50 text-muted-foreground">
              <tr>
                <th className="px-6 py-4 font-medium">Patient</th>
                <th className="px-6 py-4 font-medium">Service</th>
                <th className="px-6 py-4 font-medium">Date & Time</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredAppointments.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-muted-foreground">
                    No appointments found matching your criteria.
                  </td>
                </tr>
              ) : (
                filteredAppointments.map(apt => (
                  <tr key={apt.id} className="hover:bg-muted/30 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-medium text-foreground">{apt.patient_name}</div>
                      <div className="text-xs text-muted-foreground mt-1">{apt.patient_phone}</div>
                      <div className="text-xs text-muted-foreground">{apt.patient_email}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-medium text-foreground">{apt.service_title}</div>
                      {apt.notes && (
                        <div className="text-xs text-muted-foreground mt-1 max-w-[200px] truncate" title={apt.notes}>
                          Note: {apt.notes}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-medium text-foreground">{format(new Date(apt.appointment_date), "MMM d, yyyy")}</div>
                      <div className="text-sm text-muted-foreground mt-1">{apt.appointment_time}</div>
                    </td>
                    <td className="px-6 py-4">
                      {getStatusBadge(apt.status)}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Change Status</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={() => updateStatus.mutate({ id: apt.id!, status: 'confirmed' })}>
                            <CheckCircle className="mr-2 h-4 w-4 text-blue-500" /> Confirm
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => updateStatus.mutate({ id: apt.id!, status: 'completed' })}>
                            <CheckCircle2 className="mr-2 h-4 w-4 text-green-500" /> Mark Completed
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => updateStatus.mutate({ id: apt.id!, status: 'cancelled' })}>
                            <XCircle className="mr-2 h-4 w-4 text-red-500" /> Cancel
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={() => updateStatus.mutate({ id: apt.id!, status: 'pending' })}>
                            <Clock className="mr-2 h-4 w-4 text-amber-500" /> Revert to Pending
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
