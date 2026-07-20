import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import { API_BASE } from "@/lib/api";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};


type FormData = {
  studentName: string;
  gender: string;
  classApplying: string;
  fatherName: string;
  mobile: string;
  district: string;
  pincode: string;
};

type FormErrors = Partial<Record<keyof FormData, string>>;

const initialData: FormData = {
  studentName: "",
  gender: "",
  classApplying: "",
  fatherName: "",
  mobile: "",
  district: "",
  pincode: "",
};

function validate(data: FormData): FormErrors {
  const errors: FormErrors = {};

  if (!data.studentName.trim()) errors.studentName = "Student name is required.";
  else if (data.studentName.trim().length < 3) errors.studentName = "Name must be at least 3 characters.";

  if (!data.gender) errors.gender = "Please select gender.";

  if (!data.classApplying) errors.classApplying = "Please select a class.";

  if (!data.fatherName.trim()) errors.fatherName = "Father's name is required.";

  if (!data.mobile.trim()) errors.mobile = "Mobile number is required.";
  else if (!/^[6-9]\d{9}$/.test(data.mobile.replace(/\s/g, "")))
    errors.mobile = "Enter a valid 10-digit Indian mobile number.";

  if (!data.district.trim()) errors.district = "District is required.";

  if (!data.pincode.trim()) errors.pincode = "Pincode is required.";
  else if (!/^\d{6}$/.test(data.pincode)) errors.pincode = "Pincode must be 6 digits.";

  return errors;
}

function Field({
  label, error, required = true, children,
}: { label: string; error?: string; required?: boolean; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-sm font-semibold text-[#111111] mb-1.5">
        {label}{required && <span className="text-red-500 ml-0.5">*</span>}
      </label>
      {children}
      {error && (
        <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1">
          <AlertCircle className="w-3 h-3 flex-shrink-0" />{error}
        </p>
      )}
    </div>
  );
}

const inputClass = (err?: string) =>
  `w-full border rounded-xl px-4 py-3 text-sm focus:outline-none transition ${
    err ? "border-red-400 focus:border-red-500 bg-red-50" : "border-gray-200 focus:border-[#111111]"
  }`;

export default function Admissions() {
  const [form, setForm] = useState<FormData>(initialData);
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof FormData, boolean>>>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    document.title = "Admissions — SS Bal Sadan School Siwan, Kaithal";
  }, []);

  const set = (field: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const val = e.target.value;
    setForm((f) => ({ ...f, [field]: val }));
    if (touched[field]) {
      const errs = validate({ ...form, [field]: val });
      setErrors((prev) => ({ ...prev, [field]: errs[field] }));
    }
  };

  const blur = (field: keyof FormData) => () => {
    setTouched((t) => ({ ...t, [field]: true }));
    const errs = validate(form);
    setErrors((prev) => ({ ...prev, [field]: errs[field] }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitted) return;

    const errs = validate(form);
    setErrors(errs);
    setTouched(Object.fromEntries(Object.keys(form).map((k) => [k, true])));

    if (Object.keys(errs).length > 0) {
      const firstError = document.querySelector("[data-error='true']");
      firstError?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }

    setStatus("loading");
    setSubmitted(true);

    try {
      const res = await fetch(`${API_BASE}/api/admission`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          studentName: form.studentName,
          gender: form.gender,
          classApplying: form.classApplying,
          fatherName: form.fatherName,
          mobile: form.mobile,
          district: form.district,
          pincode: form.pincode,
        }),
      });

      let json: { ok: boolean; error?: string } | null = null;
      if (res.headers.get("content-type")?.includes("application/json")) {
        json = await res.json() as { ok: boolean; error?: string };
      }

      if (!res.ok || !json?.ok) {
        throw new Error(json?.error ?? "Submission failed. Please try again.");
      }

      setStatus("success");
    } catch (err) {
      setStatus("error");
      setSubmitted(false);
    }
  };

  if (status === "success") {
    return (
      <div className="pt-16 lg:pt-20 min-h-screen bg-[#f5f5f5] flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-3xl shadow-xl p-12 text-center max-w-md w-full"
        >
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>
          <h2 className="font-heading font-bold text-2xl text-[#111111] mb-3">Application Submitted!</h2>
          <p className="text-gray-600 text-sm leading-relaxed mb-2">
            Form submitted successfully! We will contact you soon.
          </p>
          <button
            onClick={() => { setStatus("idle"); setForm(initialData); setSubmitted(false); setTouched({}); setErrors({}); }}
            className="px-8 py-3 bg-[#111111] text-white rounded-full font-semibold text-sm hover:bg-[#000000] transition"
          >
            Submit Another
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="pt-16 lg:pt-20">
      {/* Hero */}
      <div className="relative py-12 sm:py-20 lg:py-28 text-white text-center overflow-hidden">
        <div className="absolute inset-0">
          <img src="/school-event.webp" alt="Admissions" className="w-full h-full object-cover object-center" loading="lazy" />
          <div className="absolute inset-0 bg-[#000000]/65"></div>
        </div>
        <div className="relative z-10">
          <p className="text-gray-200 text-sm font-semibold uppercase tracking-widest mb-2">Join Our School</p>
          <h1 className="font-heading font-bold text-2xl sm:text-4xl lg:text-6xl">Admissions Open</h1>
          <p className="text-white/70 mt-3 text-base sm:text-lg">Begin your child's journey to excellence</p>
        </div>
      </div>

      {/* Form */}
      <section className="py-16 bg-[#f5f5f5]">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-10">
            <span className="text-[#111111] font-semibold text-sm uppercase tracking-widest">Apply Online</span>
            <h2 className="font-heading font-bold text-3xl sm:text-4xl text-[#111111] mt-2">Admission Form</h2>
            <p className="text-gray-500 mt-2 text-sm">Fields marked with <span className="text-red-500">*</span> are mandatory.</p>
          </motion.div>

          <AnimatePresence>
            {status === "error" && (
              <motion.div
                initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                className="mb-6 bg-red-50 border border-red-200 rounded-2xl p-4 flex items-center gap-3"
              >
                <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
                <p className="text-red-700 text-sm">Submission failed. Please try again or contact the school directly.</p>
              </motion.div>
            )}
          </AnimatePresence>

          <motion.form
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            onSubmit={handleSubmit}
            noValidate
            className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden"
          >
            {/* Student Details */}
            <div className="bg-[#111111] px-8 py-4">
              <h3 className="font-heading font-semibold text-white text-base">Student Details</h3>
            </div>
            <div className="p-8 grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="sm:col-span-2" data-error={!!errors.studentName}>
                <Field label="Student Name" error={errors.studentName}>
                  <input
                    type="text"
                    placeholder="Full name of student"
                    value={form.studentName}
                    onChange={set("studentName")}
                    onBlur={blur("studentName")}
                    className={inputClass(errors.studentName)}
                  />
                </Field>
              </div>
              <div data-error={!!errors.gender}>
                <Field label="Gender" error={errors.gender}>
                  <select value={form.gender} onChange={set("gender")} onBlur={blur("gender")} className={inputClass(errors.gender)}>
                    <option value="">Select Gender</option>
                    <option>Male</option>
                    <option>Female</option>
                    <option>Other</option>
                  </select>
                </Field>
              </div>
              <div className="sm:col-span-2" data-error={!!errors.classApplying}>
                <Field label="Class Applying For" error={errors.classApplying}>
                  <select value={form.classApplying} onChange={set("classApplying")} onBlur={blur("classApplying")} className={inputClass(errors.classApplying)}>
                    <option value="">Select Class</option>
                    {["Nursery", "LKG", "UKG", ...Array.from({ length: 12 }, (_, i) => `Class ${i + 1}`)].map((c) => (
                      <option key={c}>{c}</option>
                    ))}
                  </select>
                </Field>
              </div>
            </div>

            {/* Parent Details */}
            <div className="bg-[#f5f5f5] px-8 py-4 border-t border-gray-100">
              <h3 className="font-heading font-semibold text-[#111111] text-base">Parent / Guardian Details</h3>
            </div>
            <div className="p-8 grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div data-error={!!errors.fatherName}>
                <Field label="Father's Name" error={errors.fatherName}>
                  <input type="text" placeholder="Father's full name" value={form.fatherName} onChange={set("fatherName")} onBlur={blur("fatherName")} className={inputClass(errors.fatherName)} />
                </Field>
              </div>
              <div data-error={!!errors.mobile}>
                <Field label="Mobile Number" error={errors.mobile}>
                  <input type="tel" placeholder="10-digit mobile number" value={form.mobile} onChange={set("mobile")} onBlur={blur("mobile")} maxLength={10} className={inputClass(errors.mobile)} />
                </Field>
              </div>
            </div>

            {/* Location */}
            <div className="bg-[#111111] px-8 py-4 border-t border-gray-100">
              <h3 className="font-heading font-semibold text-white text-base">Location</h3>
            </div>
            <div className="p-8 grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div data-error={!!errors.district}>
                <Field label="District" error={errors.district}>
                  <input type="text" placeholder="e.g. Kaithal" value={form.district} onChange={set("district")} onBlur={blur("district")} className={inputClass(errors.district)} />
                </Field>
              </div>
              <div data-error={!!errors.pincode}>
                <Field label="Pincode" error={errors.pincode}>
                  <input type="text" placeholder="6-digit pincode" value={form.pincode} onChange={set("pincode")} onBlur={blur("pincode")} maxLength={6} className={inputClass(errors.pincode)} />
                </Field>
              </div>
            </div>

            {/* Submit */}
            <div className="px-8 pb-8">
              <button
                type="submit"
                disabled={submitted}
                className="w-full py-4 bg-[#111111] text-white rounded-full font-semibold text-base transition-all shadow-lg flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed hover:bg-[#000000] hover:shadow-xl"
              >
                {status === "loading" ? (
                  <><Loader2 className="w-5 h-5 animate-spin" /> Submitting...</>
                ) : (
                  <>Submit Application <ArrowRight className="w-4 h-4" /></>
                )}
              </button>
            </div>
          </motion.form>
        </div>
      </section>
    </div>
  );
}
