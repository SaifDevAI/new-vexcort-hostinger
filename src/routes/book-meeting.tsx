import { createFileRoute } from "@tanstack/react-router";
import { Upload, X, Check } from "lucide-react";
import { useEffect, useState } from "react";
import { SiteLayout } from "@/components/SiteLayout";
import { supabase } from "@/lib/supabase";

declare global {
  interface Window {
    Cal?: (...args: any[]) => void;
  }
}

export const Route = createFileRoute("/book-meeting")({
  head: () => ({
    meta: [
      { title: "Book a Meeting - Cortvex" },
      {
        name: "description",
        content:
          "Tell us about your company and service needs before your Cortvex strategy meeting.",
      },
    ],
    links: [{ rel: "canonical", href: "https://cortvex.com/book-meeting" }],
  }),
  component: BookMeetingPage,
});

const serviceOptions = [
  {
    code: "web_development",
    name: "Web Development",
    logo: "https://cdn.simpleicons.org/react/61DAFB",
  },
  { code: "web_design", name: "Web Design", logo: "https://cdn.simpleicons.org/figma/F24E1E" },
  {
    code: "ai_automation",
    name: "AI Automation",
    logo: "https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/openai.svg",
  },
  {
    code: "web_chatbots",
    name: "Web Chatbots",
    logo: "https://cdn.simpleicons.org/dialogflow/FF9800",
  },
  { code: "voice_bots", name: "Voice Bots", logo: "/voice-agent-logo.png" },
  {
    code: "app_development",
    name: "App Development",
    logo: "https://cdn.simpleicons.org/flutter/02569B",
  },
  { code: "seo", name: "SEO", logo: "https://cdn.simpleicons.org/google/4285F4" },
  { code: "marketing", name: "Marketing", logo: "https://cdn.simpleicons.org/hubspot/FF7A59" },
  {
    code: "social_media",
    name: "Social Media",
    logo: "https://cdn.simpleicons.org/instagram/E4405F",
  },
] as const;

function BookMeetingPage() {
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [priceRange, setPriceRange] = useState("");
  const [companyDescription, setCompanyDescription] = useState("");
  const [selectedServiceCodes, setSelectedServiceCodes] = useState<string[]>([]);
  const [supportingFiles, setSupportingFiles] = useState<File[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [showScheduler, setShowScheduler] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [submitMessage, setSubmitMessage] = useState("");

  useEffect(() => {
    const verifySession = async () => {
      const { data } = await supabase.auth.getSession();
      if (!data.session) {
        window.location.href = "/signin?mode=login";
        return;
      }
      setCheckingAuth(false);
    };

    verifySession();
  }, []);

  const toggleService = (serviceCode: string) => {
    setSelectedServiceCodes((current) =>
      current.includes(serviceCode)
        ? current.filter((item) => item !== serviceCode)
        : [...current, serviceCode],
    );
  };

  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files ? Array.from(event.target.files) : [];
    if (files.length === 0) return;

    setSupportingFiles((current) => {
      const existing = new Set(current.map((file) => `${file.name}-${file.size}`));
      const next = [...current];

      for (const file of files) {
        const key = `${file.name}-${file.size}`;
        if (!existing.has(key)) {
          existing.add(key);
          next.push(file);
        }
      }

      return next;
    });

    event.target.value = "";
  };

  const removeFile = (target: File) => {
    setSupportingFiles((current) =>
      current.filter((file) => !(file.name === target.name && file.size === target.size)),
    );
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitError("");
    setSubmitMessage("");

    if (
      !firstName.trim() ||
      !lastName.trim() ||
      !contactNumber.trim() ||
      !emailAddress.trim() ||
      !companyName.trim() ||
      !priceRange ||
      !companyDescription.trim() ||
      selectedServiceCodes.length === 0
    ) {
      setSubmitError("Please fill all required fields and select at least one service.");
      return;
    }

    setIsSubmitting(true);

    try {
      const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
      if (sessionError || !sessionData.session?.user) {
        setSubmitError("Your session expired. Please sign in again.");
        return;
      }

      const userId = sessionData.session.user.id;
      const contactEmail = emailAddress.trim().toLowerCase();

      const { data: booking, error: bookingError } = await supabase
        .from("meeting_bookings")
        .insert({
          user_id: userId,
          first_name: firstName.trim(),
          last_name: lastName.trim(),
          contact_number: contactNumber.trim(),
          contact_email: contactEmail,
          company_name: companyName.trim(),
          price_range: priceRange,
          company_description: companyDescription.trim(),
          status: "pending",
        })
        .select("id")
        .single();

      if (bookingError || !booking) {
        setSubmitError(bookingError?.message ?? "Failed to save booking.");
        return;
      }

      const bookingId = booking.id as string;

      const { data: catalogRows, error: catalogError } = await supabase
        .from("service_catalog")
        .select("id, code")
        .in("code", selectedServiceCodes);

      if (catalogError) {
        setSubmitError(catalogError.message);
        return;
      }

      const serviceRows = (catalogRows ?? []).map((row) => ({
        booking_id: bookingId,
        service_id: row.id as number,
      }));

      if (serviceRows.length > 0) {
        const { error: serviceInsertError } = await supabase
          .from("meeting_booking_services")
          .insert(serviceRows);
        if (serviceInsertError) {
          setSubmitError(serviceInsertError.message);
          return;
        }
      }

      const documentRows: Array<{
        booking_id: string;
        user_id: string;
        file_name: string;
        file_path: string;
        file_size: number;
        mime_type: string;
      }> = [];

      for (const file of supportingFiles) {
        const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "_");
        const filePath = `${userId}/${bookingId}/${Date.now()}-${safeName}`;

        const { error: uploadError } = await supabase.storage
          .from("meeting-docs")
          .upload(filePath, file, { upsert: false });

        if (uploadError) {
          setSubmitError(uploadError.message);
          return;
        }

        documentRows.push({
          booking_id: bookingId,
          user_id: userId,
          file_name: file.name,
          file_path: filePath,
          file_size: file.size,
          mime_type: file.type || "application/octet-stream",
        });
      }

      if (documentRows.length > 0) {
        const { error: documentInsertError } = await supabase
          .from("meeting_booking_documents")
          .insert(documentRows);
        if (documentInsertError) {
          setSubmitError(documentInsertError.message);
          return;
        }
      }

      setSubmitted(true);
      setSubmitMessage(
        "Booking submitted successfully. We will review your brief before the call.",
      );
      setSupportingFiles([]);
      setSelectedServiceCodes([]);
      setShowScheduler(true);
    } catch {
      setSubmitError("Something went wrong while submitting. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (!showScheduler) return;

    const setupInlineCal = () => {
      if (!window.Cal) return;

      window.Cal("init", "strategy-call-30-min", { origin: "https://app.cal.com" });
      window.Cal.ns?.["strategy-call-30-min"]?.("inline", {
        elementOrSelector: "#cortvex-cal-inline",
        calLink: "saif-fljsmg/strategy-call-30-min",
        config: { name: `${firstName} ${lastName}`.trim(), email: emailAddress.trim().toLowerCase() },
      });
      window.Cal.ns?.["strategy-call-30-min"]?.("ui", {
        hideEventTypeDetails: true,
        layout: "month_view",
      });
    };

    if (window.Cal) {
      setupInlineCal();
      return;
    }

    const script = document.createElement("script");
    script.src = "https://app.cal.com/embed/embed.js";
    script.async = true;
    script.onload = setupInlineCal;
    document.head.appendChild(script);

    return () => {
      script.onload = null;
    };
  }, [emailAddress, firstName, lastName, showScheduler]);

  if (checkingAuth) {
    return (
      <SiteLayout>
        <section className="container-x pb-16 pt-36">
          <p className="text-base text-foreground/70">Checking your session...</p>
        </section>
      </SiteLayout>
    );
  }

  return (
    <SiteLayout>
      <section className="container-x pb-8 pt-32">
        <div className="service-card-glass">
          <p className="eyebrow">Book a Meeting</p>
          <h1 className="h-display mt-3 text-4xl md:text-5xl">
            Help us prepare before your strategy call.
          </h1>
          <p className="mt-4 max-w-3xl text-base text-foreground/75 md:text-lg">
            Share your company context, choose the services you need, and upload any helpful
            documents so our team can review before the meeting.
          </p>
        </div>
      </section>

      <section className="container-x pb-16">
        <form onSubmit={onSubmit} className="service-detail-pop">
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label htmlFor="first-name" className="text-lg font-semibold md:text-xl">
                First Name
              </label>
              <input
                id="first-name"
                type="text"
                required
                value={firstName}
                onChange={(event) => setFirstName(event.target.value)}
                placeholder="Your first name"
                className="mt-2 w-full rounded-2xl border border-[color:var(--color-border)] bg-white/88 px-4 py-3 text-sm outline-none focus:border-[color:var(--brand)]"
              />
            </div>

            <div>
              <label htmlFor="last-name" className="text-lg font-semibold md:text-xl">
                Last Name
              </label>
              <input
                id="last-name"
                type="text"
                required
                value={lastName}
                onChange={(event) => setLastName(event.target.value)}
                placeholder="Your last name"
                className="mt-2 w-full rounded-2xl border border-[color:var(--color-border)] bg-white/88 px-4 py-3 text-sm outline-none focus:border-[color:var(--brand)]"
              />
            </div>
          </div>

          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <div>
              <label htmlFor="contact-number" className="text-lg font-semibold md:text-xl">
                Contact No
              </label>
              <input
                id="contact-number"
                type="tel"
                required
                value={contactNumber}
                onChange={(event) => setContactNumber(event.target.value)}
                placeholder="+1 234 567 890"
                className="mt-2 w-full rounded-2xl border border-[color:var(--color-border)] bg-white/88 px-4 py-3 text-sm outline-none focus:border-[color:var(--brand)]"
              />
            </div>

            <div>
              <label htmlFor="email-address" className="text-lg font-semibold md:text-xl">
                Email Address
              </label>
              <input
                id="email-address"
                type="email"
                required
                value={emailAddress}
                onChange={(event) => setEmailAddress(event.target.value)}
                placeholder="you@company.com"
                className="mt-2 w-full rounded-2xl border border-[color:var(--color-border)] bg-white/88 px-4 py-3 text-sm outline-none focus:border-[color:var(--brand)]"
              />
            </div>
          </div>

          <div className="mt-4">
            <div>
              <label htmlFor="company-name" className="text-lg font-semibold md:text-xl">
                Company Name
              </label>
              <input
                id="company-name"
                type="text"
                required
                value={companyName}
                onChange={(event) => setCompanyName(event.target.value)}
                placeholder="Your company name"
                className="mt-2 w-full rounded-2xl border border-[color:var(--color-border)] bg-white/88 px-4 py-3 text-sm outline-none focus:border-[color:var(--brand)]"
              />
            </div>
          </div>

          <div className="mt-5">
            <label htmlFor="price-range" className="text-lg font-semibold md:text-xl">
              Price Range
            </label>
            <select
              id="price-range"
              required
              value={priceRange}
              onChange={(event) => setPriceRange(event.target.value)}
              className="mt-2 w-full rounded-2xl border border-[color:var(--color-border)] bg-white/88 px-4 py-3 text-sm outline-none focus:border-[color:var(--brand)]"
            >
              <option value="" disabled>
                Select your budget range
              </option>
              <option value="<2k">Less than $2k</option>
              <option value="2k-5k">$2k - $5k</option>
              <option value="5k-15k">$5k - $15k</option>
              <option value="15k-50k">$15k - $50k</option>
              <option value="50k+">$50k+</option>
            </select>
          </div>

          <div>
            <label htmlFor="company-description" className="text-xl font-semibold md:text-2xl">
              Company Description
            </label>
            <textarea
              id="company-description"
              required
              rows={6}
              value={companyDescription}
              onChange={(event) => setCompanyDescription(event.target.value)}
              placeholder="Tell us what your company does, your audience, and current growth goals."
              className="mt-3 w-full rounded-2xl border border-[color:var(--color-border)] bg-white/88 px-4 py-3 text-sm outline-none focus:border-[color:var(--brand)]"
            />
          </div>

          <div className="mt-7">
            <p className="text-xl font-semibold md:text-2xl">What services do you need?</p>
            <p className="mt-1 text-sm text-foreground/70">Select one or more options.</p>

            <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {serviceOptions.map((service) => (
                <label
                  key={service.name}
                  className={`relative flex cursor-pointer items-center gap-3 rounded-2xl border px-3 py-3 text-sm transition-all ${
                    selectedServiceCodes.includes(service.code)
                      ? "border-[color:var(--brand)] bg-white shadow-[0_14px_26px_-20px_rgba(24,0,173,0.6)]"
                      : "border-[color:var(--color-border)] bg-white/88 hover:border-[color:var(--brand)]"
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={selectedServiceCodes.includes(service.code)}
                    onChange={() => toggleService(service.code)}
                    className="h-4 w-4 rounded border-[color:var(--color-border)]"
                  />
                  <img
                    src={service.logo}
                    alt={`${service.name} logo`}
                    className="h-5 w-5 object-contain"
                    loading="lazy"
                  />
                  <span>{service.name}</span>
                  {selectedServiceCodes.includes(service.code) ? (
                    <Check className="absolute right-3 h-4 w-4 text-[color:var(--brand)]" />
                  ) : null}
                </label>
              ))}
            </div>
          </div>

          <div className="mt-7">
            <label htmlFor="supporting-docs" className="text-xl font-semibold md:text-2xl">
              Supporting Documents (Optional)
            </label>
            <p className="mt-1 text-sm text-foreground/70">
              Upload files we can study before the meeting (brief, pitch deck, requirements, etc.).
            </p>
            <div className="mt-3 rounded-2xl border border-dashed border-[color:var(--color-border)] bg-white/70 p-4">
              <input
                id="supporting-docs"
                type="file"
                multiple
                onChange={onFileChange}
                className="hidden"
                accept=".pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx,.txt,.csv,.md"
              />
              <label
                htmlFor="supporting-docs"
                className="btn cursor-pointer border border-[color:var(--color-border)] bg-white text-foreground/90 hover:border-[color:var(--brand)] hover:text-[color:var(--brand)]"
              >
                <Upload className="h-4 w-4" />
                Upload documents
              </label>
              <p className="mt-2 text-xs text-foreground/65">
                You can add files multiple times. Duplicate files are ignored.
              </p>
            </div>
            {supportingFiles.length > 0 ? (
              <ul className="mt-3 space-y-2 text-sm text-foreground/80">
                {supportingFiles.map((file) => (
                  <li
                    key={`${file.name}-${file.size}`}
                    className="flex items-center justify-between gap-3 rounded-xl bg-white/85 px-3 py-2"
                  >
                    <span className="truncate">{file.name}</span>
                    <button
                      type="button"
                      onClick={() => removeFile(file)}
                      className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-[color:var(--color-border)] text-foreground/70 transition-colors hover:border-red-400 hover:text-red-600"
                      aria-label={`Remove ${file.name}`}
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>

          {submitted ? (
            <p className="mt-6 rounded-xl border border-emerald-300/35 bg-emerald-500/12 px-4 py-3 text-sm text-emerald-700">
              Perfect. Your meeting details are saved for review. We will use this context before
              your call.
            </p>
          ) : null}

          {submitError ? (
            <p className="mt-4 rounded-xl border border-red-300/40 bg-red-500/12 px-4 py-3 text-sm text-red-700">
              {submitError}
            </p>
          ) : null}

          {submitMessage ? (
            <p className="mt-4 rounded-xl border border-emerald-300/40 bg-emerald-500/12 px-4 py-3 text-sm text-emerald-700">
              {submitMessage}
            </p>
          ) : null}

          <button type="submit" disabled={isSubmitting} className="btn btn-primary mt-7">
            {isSubmitting ? "Submitting..." : "Submit Meeting Brief"}
          </button>
        </form>
      </section>

      {showScheduler ? (
        <section className="container-x pb-16">
          <div className="service-detail-pop">
            <p className="eyebrow">Step 2</p>
            <h2 className="h-display mt-2 text-3xl md:text-4xl">Choose Meeting Date & Time</h2>
            <p className="mt-3 text-sm text-foreground/75">
              Pick a suitable slot below. This is inline scheduling with no popup.
            </p>
            <div className="mt-5 overflow-hidden rounded-2xl border border-[color:var(--color-border)] bg-white">
              <div id="cortvex-cal-inline" className="h-[760px] w-full overflow-auto" />
            </div>
          </div>
        </section>
      ) : null}
    </SiteLayout>
  );
}
