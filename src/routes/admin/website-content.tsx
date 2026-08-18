import { useState, useEffect, useRef } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useWebsiteContent, useUpdateWebsiteContent } from "@/lib/cms-store";
import { uploadClinicAsset } from "@/lib/storage";
import {
  Save, Image as ImageIcon, MessageSquare, Quote, FileText,
  Trash2, Plus, Upload, Loader2, User, Camera
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/website-content")({
  component: AdminWebsiteContent,
});

function AdminWebsiteContent() {
  const { data: contentMap = {} } = useWebsiteContent();
  const updateContent = useUpdateWebsiteContent();

  const [hero, setHero] = useState<any>({});
  const [aboutDoctor, setAboutDoctor] = useState<any>({});
  const [gallery, setGallery] = useState<any[]>([]);
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [faq, setFaq] = useState<any[]>([]);
  const [uploadingIndex, setUploadingIndex] = useState<number | null>(null);
  const [uploadingDoctorPhoto, setUploadingDoctorPhoto] = useState(false);
  const doctorPhotoRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (Object.keys(contentMap).length > 0) {
      setHero(contentMap.hero || {});
      setAboutDoctor(contentMap.about_doctor || {});
      setGallery(contentMap.gallery?.images || []);
      setTestimonials(contentMap.testimonials?.reviews || []);
      setFaq(contentMap.faq?.questions || []);
    }
  }, [contentMap]);

  const handleSave = () => {
    const payload = {
      hero,
      about_doctor: aboutDoctor,
      gallery: { images: gallery },
      testimonials: { reviews: testimonials },
      faq: { questions: faq }
    };
    updateContent.mutate(payload);
  };

  const handleFileUpload = async (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      setUploadingIndex(index);
      toast.info("Uploading image...");
      const publicUrl = await uploadClinicAsset(file);
      const newGallery = [...gallery];
      newGallery[index].url = publicUrl;
      setGallery(newGallery);
      toast.success("Image uploaded!");
    } catch (error: any) {
      toast.error(error.message || "Upload failed.");
    } finally {
      setUploadingIndex(null);
    }
  };

  const handleDoctorPhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      setUploadingDoctorPhoto(true);
      toast.info("Uploading doctor photo...");
      const publicUrl = await uploadClinicAsset(file);
      setAboutDoctor({ ...aboutDoctor, photo_url: publicUrl });
      toast.success("Doctor photo uploaded!");
    } catch (error: any) {
      toast.error(error.message || "Upload failed.");
    } finally {
      setUploadingDoctorPhoto(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Website Content</h1>
          <p className="text-muted-foreground mt-1">Manage text, photos, and testimonials shown on the public site</p>
        </div>
        <Button className="gap-2" onClick={handleSave} disabled={updateContent.isPending}>
          {updateContent.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
          Save All Changes
        </Button>
      </div>

      <Tabs defaultValue="hero" className="w-full">
        <TabsList className="mb-6 overflow-x-auto flex-nowrap justify-start w-full sm:w-auto p-1 bg-muted/50 border border-border gap-1">
          <TabsTrigger value="hero" className="gap-2 px-4"><FileText className="h-4 w-4" /> Hero</TabsTrigger>
          <TabsTrigger value="doctor" className="gap-2 px-4"><User className="h-4 w-4" /> About Doctor</TabsTrigger>
          <TabsTrigger value="gallery" className="gap-2 px-4"><ImageIcon className="h-4 w-4" /> Gallery</TabsTrigger>
          <TabsTrigger value="testimonials" className="gap-2 px-4"><Quote className="h-4 w-4" /> Testimonials</TabsTrigger>
          <TabsTrigger value="faq" className="gap-2 px-4"><MessageSquare className="h-4 w-4" /> FAQ</TabsTrigger>
        </TabsList>

        {/* ── HERO ── */}
        <TabsContent value="hero" className="space-y-6 mt-0">
          <div className="rounded-xl border border-border bg-card shadow-sm p-6">
            <h3 className="font-semibold text-lg text-foreground mb-6">Hero Section</h3>
            <div className="space-y-5">
              <div className="space-y-1.5">
                <Label>Eyebrow Text (Small text above title)</Label>
                <Input value={hero.eyebrow || ''} onChange={e => setHero({ ...hero, eyebrow: e.target.value })} placeholder="e.g. Trusted dermatology since 2013" />
              </div>
              <div className="space-y-1.5">
                <Label>Hero Title</Label>
                <Input value={hero.title || ''} onChange={e => setHero({ ...hero, title: e.target.value })} placeholder="e.g. Radiant Skin Starts With Expert Care" />
              </div>
              <div className="space-y-1.5">
                <Label>Hero Subtitle</Label>
                <Textarea rows={3} value={hero.subtitle || ''} onChange={e => setHero({ ...hero, subtitle: e.target.value })} placeholder="Short description below the title" />
              </div>
              <div className="space-y-1.5">
                <Label>CTA Button Text</Label>
                <Input value={hero.button_text || ''} onChange={e => setHero({ ...hero, button_text: e.target.value })} placeholder="e.g. Book Appointment" />
              </div>
            </div>
          </div>
        </TabsContent>

        {/* ── ABOUT DOCTOR ── */}
        <TabsContent value="doctor" className="space-y-6 mt-0">
          <div className="rounded-xl border border-border bg-card shadow-sm p-6">
            <h3 className="font-semibold text-lg text-foreground mb-6">Doctor Profile</h3>

            {/* Photo upload */}
            <div className="mb-8 flex flex-col sm:flex-row gap-6 items-start">
              <div className="relative shrink-0">
                <div className="h-36 w-36 overflow-hidden rounded-2xl border-2 border-border bg-muted">
                  {aboutDoctor.photo_url ? (
                    <img src={aboutDoctor.photo_url} alt="Doctor" className="h-full w-full object-cover object-top" />
                  ) : (
                    <div className="flex h-full items-center justify-center">
                      <User className="h-14 w-14 text-muted-foreground/40" />
                    </div>
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => doctorPhotoRef.current?.click()}
                  className="absolute -bottom-2 -right-2 grid h-9 w-9 place-items-center rounded-full border-2 border-background bg-primary text-primary-foreground shadow-sm transition-transform hover:scale-110"
                >
                  {uploadingDoctorPhoto ? <Loader2 className="h-4 w-4 animate-spin" /> : <Camera className="h-4 w-4" />}
                </button>
                <input ref={doctorPhotoRef} type="file" accept="image/*" className="hidden" onChange={handleDoctorPhotoUpload} />
              </div>
              <div className="flex-1 space-y-3">
                <div className="space-y-1.5">
                  <Label>Photo URL (or upload via button)</Label>
                  <Input
                    value={aboutDoctor.photo_url || ''}
                    onChange={e => setAboutDoctor({ ...aboutDoctor, photo_url: e.target.value })}
                    placeholder="https://..."
                  />
                </div>
                <p className="text-xs text-muted-foreground">
                  Click the camera button on the photo to upload a new image. This photo is also used on the Hero section of the homepage.
                </p>
              </div>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div className="space-y-1.5">
                <Label>Doctor Name</Label>
                <Input value={aboutDoctor.name || ''} onChange={e => setAboutDoctor({ ...aboutDoctor, name: e.target.value })} placeholder="e.g. Dr. Priya Sharma" />
              </div>
              <div className="space-y-1.5">
                <Label>Credentials / Qualifications</Label>
                <Input value={aboutDoctor.credentials || ''} onChange={e => setAboutDoctor({ ...aboutDoctor, credentials: e.target.value })} placeholder="e.g. MBBS, MD Dermatology · 12+ yrs" />
              </div>
              <div className="space-y-1.5">
                <Label>Years of Experience</Label>
                <Input value={aboutDoctor.years_experience || ''} onChange={e => setAboutDoctor({ ...aboutDoctor, years_experience: e.target.value })} placeholder="e.g. 12+" />
              </div>
              <div className="space-y-1.5">
                <Label>Patients Treated</Label>
                <Input value={aboutDoctor.patients_treated || ''} onChange={e => setAboutDoctor({ ...aboutDoctor, patients_treated: e.target.value })} placeholder="e.g. 5000+" />
              </div>
            </div>

            <div className="mt-5 space-y-5">
              <div className="space-y-1.5">
                <Label>Bio (Paragraph 1)</Label>
                <Textarea rows={3} value={aboutDoctor.bio || ''} onChange={e => setAboutDoctor({ ...aboutDoctor, bio: e.target.value })} placeholder="Short introduction about the doctor..." />
              </div>
              <div className="space-y-1.5">
                <Label>Bio (Paragraph 2)</Label>
                <Textarea rows={3} value={aboutDoctor.bio2 || ''} onChange={e => setAboutDoctor({ ...aboutDoctor, bio2: e.target.value })} placeholder="More details about philosophy, training, approach..." />
              </div>
              <div className="space-y-1.5">
                <Label>Doctor Quote</Label>
                <Textarea rows={2} value={aboutDoctor.quote || ''} onChange={e => setAboutDoctor({ ...aboutDoctor, quote: e.target.value })} placeholder="A memorable quote from the doctor..." />
              </div>
            </div>
          </div>
        </TabsContent>

        {/* ── GALLERY ── */}
        <TabsContent value="gallery" className="mt-0">
          <div className="rounded-xl border border-border bg-card shadow-sm p-6">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="font-semibold text-lg text-foreground">Gallery &amp; Clinic Photos</h3>
                <p className="text-sm text-muted-foreground">Upload photo files directly or provide image URLs</p>
              </div>
              <Button variant="outline" size="sm" onClick={() => setGallery([...gallery, { label: "New Photo", url: "" }])}>
                <Plus className="h-4 w-4 mr-2" /> Add Photo
              </Button>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {gallery.map((img, i) => (
                <div key={i} className="rounded-xl border border-border bg-card overflow-hidden flex flex-col shadow-sm">
                  <div className="relative aspect-video bg-muted flex items-center justify-center border-b border-border overflow-hidden">
                    {img.url ? (
                      <img src={img.url} alt={img.label} className="w-full h-full object-cover" />
                    ) : (
                      <div className="flex flex-col items-center justify-center p-4 text-muted-foreground">
                        <ImageIcon className="h-8 w-8 mb-1 opacity-40" />
                        <span className="text-xs">No image selected</span>
                      </div>
                    )}
                    {uploadingIndex === i && (
                      <div className="absolute inset-0 bg-background/80 flex flex-col items-center justify-center gap-2">
                        <Loader2 className="h-6 w-6 animate-spin text-primary" />
                        <span className="text-xs font-medium">Uploading...</span>
                      </div>
                    )}
                  </div>

                  <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
                    <div className="space-y-2">
                      <div className="space-y-1">
                        <Label className="text-xs font-medium">Title / Label</Label>
                        <Input value={img.label} onChange={e => { const newG = [...gallery]; newG[i].label = e.target.value; setGallery(newG); }} placeholder="e.g. Treatment Room" />
                      </div>
                      <div className="space-y-1">
                        <Label className="text-xs font-medium">Upload Image File</Label>
                        <label className="cursor-pointer flex items-center justify-center gap-2 h-9 px-3 rounded-md border border-input bg-background hover:bg-accent text-xs font-medium transition-colors">
                          <Upload className="h-3.5 w-3.5" />
                          Choose Image...
                          <input type="file" accept="image/*" className="hidden" onChange={e => handleFileUpload(i, e)} />
                        </label>
                      </div>
                      <div className="space-y-1">
                        <Label className="text-xs font-medium text-muted-foreground">Or paste Image URL</Label>
                        <Input value={img.url || ''} onChange={e => { const newG = [...gallery]; newG[i].url = e.target.value; setGallery(newG); }} placeholder="https://..." className="text-xs" />
                      </div>
                    </div>
                    <Button variant="ghost" size="sm" className="w-full text-destructive hover:bg-destructive/10 text-xs mt-2" onClick={() => setGallery(gallery.filter((_, idx) => idx !== i))}>
                      <Trash2 className="h-3.5 w-3.5 mr-1.5" /> Remove
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>

        {/* ── TESTIMONIALS ── */}
        <TabsContent value="testimonials" className="mt-0">
          <div className="rounded-xl border border-border bg-card shadow-sm p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-semibold text-lg text-foreground">Patient Reviews</h3>
              <Button variant="outline" size="sm" onClick={() => setTestimonials([...testimonials, { name: "Patient Name", role: "Acne Treatment", quote: "" }])}>
                <Plus className="h-4 w-4 mr-2" /> Add Review
              </Button>
            </div>
            <div className="space-y-4">
              {testimonials.map((t, i) => (
                <div key={i} className="p-5 border border-border rounded-xl bg-background flex flex-col gap-3">
                  <div className="flex justify-between items-start gap-4">
                    <div className="grid gap-3 sm:grid-cols-2 flex-1">
                      <div className="space-y-1">
                        <Label className="text-xs">Patient Name</Label>
                        <Input value={t.name || t.author || ''} onChange={e => { const newT = [...testimonials]; newT[i].name = e.target.value; newT[i].author = e.target.value; setTestimonials(newT); }} />
                      </div>
                      <div className="space-y-1">
                        <Label className="text-xs">Treatment Received</Label>
                        <Input value={t.role || t.treatment || ''} onChange={e => { const newT = [...testimonials]; newT[i].role = e.target.value; newT[i].treatment = e.target.value; setTestimonials(newT); }} />
                      </div>
                    </div>
                    <Button variant="ghost" size="icon" className="text-destructive shrink-0" onClick={() => setTestimonials(testimonials.filter((_, idx) => idx !== i))}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs">Review Content</Label>
                    <Textarea rows={2} value={t.quote || t.text || ''} onChange={e => { const newT = [...testimonials]; newT[i].quote = e.target.value; newT[i].text = e.target.value; setTestimonials(newT); }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>

        {/* ── FAQ ── */}
        <TabsContent value="faq" className="mt-0">
          <div className="rounded-xl border border-border bg-card shadow-sm p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-semibold text-lg text-foreground">Frequently Asked Questions</h3>
              <Button variant="outline" size="sm" onClick={() => setFaq([...faq, { q: "New Question?", a: "" }])}>
                <Plus className="h-4 w-4 mr-2" /> Add FAQ
              </Button>
            </div>
            <div className="space-y-4">
              {faq.map((f, i) => (
                <div key={i} className="p-5 border border-border rounded-xl bg-background space-y-3">
                  <div className="flex justify-between items-start gap-4">
                    <div className="flex-1 space-y-1">
                      <Label className="text-xs">Question</Label>
                      <Input value={f.q || f.question || ''} onChange={e => { const newF = [...faq]; newF[i].q = e.target.value; newF[i].question = e.target.value; setFaq(newF); }} className="font-medium" />
                    </div>
                    <Button variant="ghost" size="icon" className="text-destructive shrink-0 mt-6" onClick={() => setFaq(faq.filter((_, idx) => idx !== i))}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs">Answer</Label>
                    <Textarea rows={2} value={f.a || f.answer || ''} onChange={e => { const newF = [...faq]; newF[i].a = e.target.value; newF[i].answer = e.target.value; setFaq(newF); }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
