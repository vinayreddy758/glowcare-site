import { createFileRoute, Link } from "@tanstack/react-router";
import { useAppointments, useServices, useUpdateAppointmentStatus } from "@/lib/cms-store";
import { Users, CalendarCheck, Scissors, TrendingUp, CheckCircle, XCircle } from "lucide-react";
import { format, isToday } from "date-fns";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/admin/")({
  component: AdminDashboard,
});

function AdminDashboard() {
  const { data: appointments = [] } = useAppointments();
  const { data: services = [] } = useServices();
  const updateStatus = useUpdateAppointmentStatus();

  const todayAppointments = appointments.filter(a => isToday(new Date(a.appointment_date)));
  const pendingAppointments = appointments.filter(a => a.status === 'pending');
  const activeServicesCount = services.filter(s => s.is_active).length;
  
  // Fake revenue calculation just for the dashboard visualization
  const completedAppointments = appointments.filter(a => a.status === 'completed');
  const estimatedRevenue = completedAppointments.length * 1500;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Dashboard Overview</h1>
        <p className="mt-2 text-muted-foreground">Welcome back! Here's what's happening at GlowCare today.</p>
      </div>

      {/* Metrics Row */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[
          { title: "Today's Appointments", value: todayAppointments.length, icon: Users, color: "text-blue-500", bg: "bg-blue-50" },
          { title: "Pending Requests", value: pendingAppointments.length, icon: CalendarCheck, color: "text-amber-500", bg: "bg-amber-50" },
          { title: "Active Services", value: activeServicesCount, icon: Scissors, color: "text-emerald-500", bg: "bg-emerald-50" },
          { title: "Estimated Revenue", value: `₹${estimatedRevenue.toLocaleString()}`, icon: TrendingUp, color: "text-purple-500", bg: "bg-purple-50" },
        ].map((metric) => (
          <div key={metric.title} className="rounded-xl border border-border bg-card p-6 shadow-sm">
            <div className="flex items-center gap-4">
              <div className={`grid h-12 w-12 place-items-center rounded-lg ${metric.bg}`}>
                <metric.icon className={`h-6 w-6 ${metric.color}`} />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">{metric.title}</p>
                <h3 className="text-2xl font-bold text-foreground">{metric.value}</h3>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Action Required & Today's Schedule */}
      <div className="grid gap-8 lg:grid-cols-2">
        {/* Pending Requests */}
        <div className="rounded-xl border border-border bg-card shadow-sm">
          <div className="border-b border-border p-6 flex justify-between items-center">
            <h3 className="font-semibold text-lg text-foreground">Action Required</h3>
            <Link to="/admin/appointments" className="text-sm font-medium text-primary hover:underline">View all</Link>
          </div>
          <div className="p-0">
            {pendingAppointments.length === 0 ? (
              <div className="p-8 text-center text-muted-foreground text-sm">No pending appointments.</div>
            ) : (
              <div className="divide-y divide-border">
                {pendingAppointments.slice(0, 5).map((apt) => (
                  <div key={apt.id} className="flex items-center justify-between p-4 sm:p-6 hover:bg-muted/10 transition-colors">
                    <div>
                      <p className="font-medium text-foreground">{apt.patient_name}</p>
                      <p className="text-sm text-muted-foreground mt-1">
                        {format(new Date(apt.appointment_date), "MMM d, yyyy")} at {apt.appointment_time}
                      </p>
                      <p className="text-sm font-medium text-primary mt-1">{apt.service_title}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button 
                        size="icon" 
                        variant="outline" 
                        className="text-success hover:text-success hover:bg-success/10 border-success/20"
                        onClick={() => updateStatus.mutate({ id: apt.id!, status: 'confirmed' })}
                        title="Confirm"
                      >
                        <CheckCircle className="h-4 w-4" />
                      </Button>
                      <Button 
                        size="icon" 
                        variant="outline" 
                        className="text-destructive hover:text-destructive hover:bg-destructive/10 border-destructive/20"
                        onClick={() => updateStatus.mutate({ id: apt.id!, status: 'cancelled' })}
                        title="Cancel"
                      >
                        <XCircle className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Today's Schedule */}
        <div className="rounded-xl border border-border bg-card shadow-sm">
          <div className="border-b border-border p-6 flex justify-between items-center">
            <h3 className="font-semibold text-lg text-foreground">Today's Schedule</h3>
            <span className="text-sm text-muted-foreground">{format(new Date(), "EEEE, MMM d")}</span>
          </div>
          <div className="p-0">
            {todayAppointments.length === 0 ? (
              <div className="p-8 text-center text-muted-foreground text-sm">No appointments scheduled for today.</div>
            ) : (
              <div className="divide-y divide-border">
                {todayAppointments.sort((a, b) => a.appointment_time.localeCompare(b.appointment_time)).map((apt) => (
                  <div key={apt.id} className="flex gap-4 p-4 sm:p-6">
                    <div className="w-20 shrink-0 text-right">
                      <p className="font-semibold text-foreground text-sm">{apt.appointment_time}</p>
                    </div>
                    <div className="h-full w-px bg-border relative">
                      <div className="absolute top-1 -left-1 h-2 w-2 rounded-full bg-primary" />
                    </div>
                    <div className="flex-1 pb-4">
                      <p className="font-medium text-foreground">{apt.patient_name}</p>
                      <p className="text-sm text-muted-foreground">{apt.service_title}</p>
                      <span className={`inline-block mt-2 rounded-full px-2 py-0.5 text-xs font-medium capitalize
                        ${apt.status === 'confirmed' ? 'bg-blue-100 text-blue-700' : 
                          apt.status === 'completed' ? 'bg-green-100 text-green-700' : 
                          'bg-amber-100 text-amber-700'}`}
                      >
                        {apt.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
