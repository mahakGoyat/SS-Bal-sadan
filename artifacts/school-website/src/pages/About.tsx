import { useEffect, useState } from "react";
import { m } from "framer-motion";
import { Shield, Star, Lightbulb, Heart, Users, Target, Quote, Clock, CheckCircle, BookOpen, Award } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};
const stagger = { visible: { transition: { staggerChildren: 0.1 } } };

const staff: { tab: string; members: { name: string; subject: string; qual: string; exp: string; img: string; bio: string }[] }[] = [
  {
    tab: "Primary",
    members: [
      { name: "Mrs. Kamla Devi", subject: "Mathematics", qual: "B.Ed., M.Sc.", exp: "12 years", img: "https://picsum.photos/seed/staff1/150/150", bio: "Expert in foundational math education." },
      { name: "Mr. Suresh Yadav", subject: "Hindi", qual: "B.Ed., M.A. Hindi", exp: "9 years", img: "https://picsum.photos/seed/staff2/150/150", bio: "Passionate about Hindi literature." },
      { name: "Mrs. Anita Sharma", subject: "EVS", qual: "B.Ed., B.Sc.", exp: "7 years", img: "https://picsum.photos/seed/staff3/150/150", bio: "Makes science fun for young learners." },
    ],
  },
  {
    tab: "Middle",
    members: [
      { name: "Mr. Vijay Kumar", subject: "Science", qual: "B.Ed., M.Sc.", exp: "15 years", img: "https://picsum.photos/seed/staff4/150/150", bio: "HOD Science — State award winner." },
      { name: "Mrs. Rekha Singh", subject: "English", qual: "B.Ed., M.A. English", exp: "11 years", img: "https://picsum.photos/seed/staff5/150/150", bio: "Builds strong communication skills." },
      { name: "Mr. Pawan Malik", subject: "Social Science", qual: "B.Ed., M.A. History", exp: "8 years", img: "https://picsum.photos/seed/staff6/150/150", bio: "History enthusiast and debate coach." },
    ],
  },
  {
    tab: "Senior",
    members: [
      { name: "Dr. Sunita Agarwal", subject: "Physics", qual: "Ph.D., M.Sc. Physics", exp: "18 years", img: "https://picsum.photos/seed/staff7/150/150", bio: "HOD Physics. Published researcher." },
      { name: "Mr. Rohit Verma", subject: "Chemistry", qual: "B.Ed., M.Sc. Chem", exp: "14 years", img: "https://picsum.photos/seed/staff8/150/150", bio: "Specialist in competitive exam coaching." },
      { name: "Mrs. Neelam Gupta", subject: "Biology", qual: "B.Ed., M.Sc. Bio", exp: "10 years", img: "https://picsum.photos/seed/staff9/150/150", bio: "Biology HOD and CBSE evaluator." },
    ],
  },
  {
    tab: "Non-Teaching",
    members: [
      { name: "Mr. Hari Om", subject: "Sports Coach", qual: "B.P.Ed.", exp: "12 years", img: "https://picsum.photos/seed/staff10/150/150", bio: "National level kabaddi player. Coaches 5 sports." },
      { name: "Mrs. Priya Bhatia", subject: "Counselor", qual: "M.Sc. Psychology", exp: "6 years", img: "https://picsum.photos/seed/staff11/150/150", bio: "Child psychologist and student wellness expert." },
      { name: "Mr. Rajan Kumar", subject: "Librarian", qual: "B.Lib.", exp: "10 years", img: "https://picsum.photos/seed/staff12/150/150", bio: "Manages 8,000+ book collection." },
    ],
  },
];

export default function About() {
  const [activeTab, setActiveTab] = useState("Primary");
  const [hoveredStaff, setHoveredStaff] = useState<string | null>(null);

  useEffect(() => {
    document.title = "About Us — SS Bal Sadan School Siwan, Kaithal";
  }, []);

  const currentStaff = staff.find((s) => s.tab === activeTab)?.members || [];

  return (
    <div className="pt-16 lg:pt-20">
      {/* Page Hero */}
      <div className="relative py-12 sm:py-20 lg:py-28 text-white text-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/school-yellow.webp"
            srcSet="/school-yellow-480w.webp 480w, /school-yellow-800w.webp 800w, /school-yellow.webp 1402w"
            sizes="100vw"
            alt="About"
            className="w-full h-full object-cover object-center"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-[#000000]/55"></div>
        </div>
        <div className="relative z-10">
          <p className="text-gray-200 text-sm font-semibold uppercase tracking-widest mb-2">Get To Know Us</p>
          <h1 className="font-heading font-bold text-2xl sm:text-4xl lg:text-6xl">About Our School</h1>
        </div>
      </div>

      {/* History */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            <m.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              <span className="text-[#111111] font-semibold text-sm uppercase tracking-widest">Our History</span>
              <h2 className="font-heading font-bold text-3xl sm:text-4xl text-[#111111] mt-2 mb-5">
                Founded with a Vision, Built on Values
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                SS Bal Sadan School was established in 2003 by Shri Satpal Singh, a visionary educator who believed that quality education must be accessible to every child in rural Haryana. Starting with just 180 students and 12 teachers, the school has grown into a full-fledged secondary institution.
              </p>
              <p className="text-gray-600 leading-relaxed mb-4">
                Affiliated to the Haryana Board of School Education (HBSE), Bhiwani, the school is recognized for its consistent academic results, exemplary discipline, and rich co-curricular culture.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Today, with over 1,200 students, 45+ faculty members, and a sprawling 5-acre campus, SS Bal Sadan stands as a symbol of educational excellence in Kaithal district.
              </p>
            </m.div>
            <m.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="relative">
              <img
                src="/school-building.webp"
                srcSet="/school-building-800w.webp 800w, /school-building.webp 1402w"
                sizes="(min-width: 1024px) 50vw, 100vw"
                alt="School History"
                className="rounded-2xl shadow-xl w-full object-cover h-80"
                loading="lazy"
              />
              <div className="absolute -bottom-5 -left-5 bg-[#ffffff] rounded-2xl p-5 shadow-xl border border-gray-100">
                <p className="font-heading font-bold text-3xl text-[#111111]">21+</p>
                <p className="text-[#111111]/70 text-sm font-medium">Years of Excellence</p>
              </div>
            </m.div>
          </div>
        </div>
      </section>

      {/* Mission & Vision — Expanded */}
      <section className="py-20 bg-[#f5f5f5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <m.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-14">
            <span className="text-[#111111] font-semibold text-sm uppercase tracking-widest">Our Purpose</span>
            <h2 className="font-heading font-bold text-3xl sm:text-4xl text-[#111111] mt-2">Mission & Vision</h2>
            <p className="text-gray-500 mt-3 max-w-2xl mx-auto">
              Every great institution is built on a clear purpose. Ours is rooted in the belief that education transforms lives — and communities.
            </p>
          </m.div>

          {/* Mission & Vision Cards */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <m.div
              initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
              className="bg-[#111111] rounded-3xl p-10 text-white relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
              <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center mb-6">
                <Target className="w-7 h-7 text-white" />
              </div>
              <h3 className="font-heading font-bold text-2xl mb-4">Our Mission</h3>
              <p className="text-white/80 leading-relaxed mb-6">
                To provide quality, holistic education that empowers every student — academically, morally, and socially. We foster a nurturing, inclusive environment where curiosity thrives, potential is unlocked, and character is built alongside knowledge.
              </p>
              <ul className="space-y-3">
                {[
                  "Deliver rigorous, concept-based academic learning",
                  "Cultivate critical thinking and problem-solving skills",
                  "Nurture values of honesty, empathy, and discipline",
                  "Create equal opportunities for every learner",
                  "Prepare students for higher education and life",
                ].map((point) => (
                  <li key={point} className="flex items-start gap-3 text-white/70 text-sm">
                    <CheckCircle className="w-4 h-4 text-white mt-0.5 flex-shrink-0" />
                    {point}
                  </li>
                ))}
              </ul>
            </m.div>

            <m.div
              initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
              className="bg-white rounded-3xl p-10 border border-gray-100 shadow-md relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-40 h-40 bg-[#111111]/3 rounded-full -translate-y-1/2 translate-x-1/2"></div>
              <div className="w-14 h-14 bg-[#111111]/10 rounded-2xl flex items-center justify-center mb-6">
                <Star className="w-7 h-7 text-[#111111]" />
              </div>
              <h3 className="font-heading font-bold text-2xl text-[#111111] mb-4">Our Vision</h3>
              <p className="text-gray-600 leading-relaxed mb-6">
                To be Haryana's foremost institution that shapes confident, compassionate, and globally aware citizens — individuals who carry the values of excellence, integrity, and service into every walk of life.
              </p>
              <ul className="space-y-3">
                {[
                  "Be a benchmark for quality education in Haryana",
                  "Produce leaders who serve their community",
                  "Build a campus of innovation and creativity",
                  "Foster respect for culture, diversity, and environment",
                  "Create lifelong learners and responsible citizens",
                ].map((point) => (
                  <li key={point} className="flex items-start gap-3 text-gray-500 text-sm">
                    <CheckCircle className="w-4 h-4 text-[#111111] mt-0.5 flex-shrink-0" />
                    {point}
                  </li>
                ))}
              </ul>
            </m.div>
          </div>

          {/* Mission Pillars */}
          <m.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {[
              { icon: BookOpen, title: "Academic Excellence", desc: "Consistent top results in HBSE board examinations with 100% pass rate and multiple state toppers." },
              { icon: Heart, title: "Holistic Development", desc: "Sports, arts, music, debate, and community service alongside rigorous academics." },
              { icon: Award, title: "Character Building", desc: "Values-based education that builds honesty, empathy, leadership, and civic responsibility." },
            ].map(({ icon: Icon, title, desc }) => (
              <m.div key={title} variants={fadeUp} className="bg-white rounded-2xl p-7 border border-gray-100 shadow-sm text-center hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                <div className="w-14 h-14 bg-[#111111] rounded-2xl flex items-center justify-center mx-auto mb-5">
                  <Icon className="w-7 h-7 text-white" />
                </div>
                <h4 className="font-heading font-bold text-[#111111] text-lg mb-2">{title}</h4>
                <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
              </m.div>
            ))}
          </m.div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <m.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-12">
            <span className="text-[#111111] font-semibold text-sm uppercase tracking-widest">What We Believe In</span>
            <h2 className="font-heading font-bold text-3xl sm:text-4xl text-[#111111] mt-2">Our Core Values</h2>
          </m.div>
          <m.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
            {[
              { icon: Shield, label: "Discipline" },
              { icon: Heart, label: "Integrity" },
              { icon: Star, label: "Excellence" },
              { icon: Lightbulb, label: "Innovation" },
              { icon: Users, label: "Inclusivity" },
            ].map(({ icon: Icon, label }) => (
              <m.div
                key={label}
                variants={fadeUp}
                className="text-center bg-[#f5f5f5] rounded-2xl p-7 hover:bg-[#111111] group transition-all duration-300 hover:-translate-y-1"
              >
                <div className="w-14 h-14 bg-white rounded-2xl shadow flex items-center justify-center mx-auto mb-4 group-hover:bg-white/20 transition-colors">
                  <Icon className="w-6 h-6 text-[#111111] group-hover:text-white" />
                </div>
                <p className="font-heading font-bold text-[#111111] group-hover:text-white text-lg transition-colors">{label}</p>
              </m.div>
            ))}
          </m.div>
        </div>
      </section>

      {/* Affiliation */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <m.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="bg-[#111111] rounded-3xl p-10 lg:p-14 text-white">
            <div className="grid md:grid-cols-3 gap-8 text-center">
              {[
                { label: "Board Affiliation", value: "HBSE, Bhiwani" },
                { label: "School Code", value: "KTL-2003-042" },
                { label: "Recognition", value: "Govt. of Haryana" },
              ].map((item) => (
                <div key={item.label} className="border-b md:border-b-0 md:border-r border-white/20 last:border-0 pb-6 md:pb-0 md:pr-8">
                  <p className="text-gray-200 text-sm font-semibold uppercase tracking-widest mb-2">{item.label}</p>
                  <p className="font-heading font-bold text-2xl">{item.value}</p>
                </div>
              ))}
            </div>
          </m.div>
        </div>
      </section>

      {/* Principal's Full Message */}
      <section className="py-20 bg-[#f5f5f5]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <m.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-10">
            <h2 className="font-heading font-bold text-3xl sm:text-4xl text-[#111111]">Principal's Message</h2>
          </m.div>
          <m.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="bg-white rounded-3xl shadow-md overflow-hidden">
            <div className="grid md:grid-cols-3 gap-0">
              <div className="md:col-span-1">
                <img
                  src="/principal_ai.webp"
                  srcSet="/principal_ai-512w.webp 512w, /principal_ai.webp 1024w"
                  sizes="(min-width: 768px) 33vw, 100vw"
                  alt="Principal"
                  className="w-full h-56 md:h-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="md:col-span-2 p-8 lg:p-10">
                <Quote className="w-8 h-8 text-[#111111]/20 mb-4" />
                <p className="text-gray-700 leading-relaxed mb-4">
                  Dear Parents and Students, it is my immense pleasure to welcome you to SS Bal Sadan School — a place where learning is not a burden but a joy, and where every child is recognized for their unique strengths.
                </p>
                <p className="text-gray-600 leading-relaxed mb-4 text-sm">
                  We believe education is a partnership between school, parents, and students. Our dedicated faculty works tirelessly to create an environment that is academically rigorous, morally sound, and emotionally supportive. We are proud of our record in board examinations, sports, cultural events, and community service.
                </p>
                <p className="text-gray-600 leading-relaxed mb-6 text-sm">
                  As we move forward, we remain committed to innovation — introducing new teaching methods, expanding our digital infrastructure, and preparing our students to meet the challenges of a rapidly changing world with confidence and character.
                </p>
                <div className="border-t border-gray-100 pt-5">
                  <p className="font-heading font-bold text-[#111111] text-lg">Dr. Ramesh Kumar Sharma</p>
                  <p className="text-[#111111]/60 text-sm font-medium">Principal, SS Bal Sadan School</p>
                </div>
              </div>
            </div>
          </m.div>
        </div>
      </section>

      {/* School Timings */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <m.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-10">
            <span className="text-[#111111] font-semibold text-sm uppercase tracking-widest">Schedule</span>
            <h2 className="font-heading font-bold text-3xl sm:text-4xl text-[#111111] mt-2 flex items-center justify-center gap-3">
              <Clock className="w-8 h-8 text-[#111111]" />
              School Timings
            </h2>
          </m.div>
          <m.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            <div className="overflow-x-auto rounded-2xl shadow-md border border-gray-100">
              <table className="w-full text-sm">
                <thead className="bg-[#111111] text-white">
                  <tr>
                    <th className="text-left px-6 py-4 font-semibold">Class</th>
                    <th className="text-left px-6 py-4 font-semibold">Summer (Apr–Sep)</th>
                    <th className="text-left px-6 py-4 font-semibold">Winter (Oct–Mar)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 bg-white">
                  {[
                    ["Pre-Primary (Nursery–KG)", "7:30 AM – 12:00 PM", "8:00 AM – 12:30 PM"],
                    ["Primary (Class 1–5)", "7:30 AM – 1:30 PM", "8:00 AM – 2:00 PM"],
                    ["Middle (Class 6–8)", "7:30 AM – 1:30 PM", "8:00 AM – 2:00 PM"],
                    ["Secondary (Class 9–10)", "7:30 AM – 2:00 PM", "8:00 AM – 2:30 PM"],
                    ["Senior Sec. (Class 11–12)", "7:30 AM – 2:00 PM", "8:00 AM – 2:30 PM"],
                  ].map(([cls, summer, winter], i) => (
                    <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-[#f5f5f5]/50"}>
                      <td className="px-6 py-4 font-medium text-[#111111]">{cls}</td>
                      <td className="px-6 py-4 text-gray-600">{summer}</td>
                      <td className="px-6 py-4 text-gray-600">{winter}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </m.div>
        </div>
      </section>

      {/* Teaching Staff */}
      <section className="py-20 bg-[#f5f5f5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <m.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-10">
            <span className="text-[#111111] font-semibold text-sm uppercase tracking-widest">Our Educators</span>
            <h2 className="font-heading font-bold text-3xl sm:text-4xl text-[#111111] mt-2">Teaching Staff</h2>
          </m.div>
          {/* Filter Tabs */}
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {staff.map((s) => (
              <button
                key={s.tab}
                onClick={() => setActiveTab(s.tab)}
                data-testid={`tab-staff-${s.tab.toLowerCase().replace(" ", "-")}`}
                className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${activeTab === s.tab ? "bg-[#111111] text-white shadow-md" : "bg-white text-[#111111] border border-gray-200 hover:border-[#111111]"}`}
              >
                {s.tab}
              </button>
            ))}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentStaff.map((member) => (
              <m.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all group cursor-pointer"
                onMouseEnter={() => setHoveredStaff(member.name)}
                onMouseLeave={() => setHoveredStaff(null)}
              >
                <div className="h-44 overflow-hidden">
                  <img src={member.img} alt={member.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-5">
                  <h3 className="font-heading font-semibold text-[#111111] text-base">{member.name}</h3>
                  <p className="text-[#111111]/60 text-sm font-medium">{member.subject}</p>
                  <div className="flex gap-4 mt-2 text-xs text-gray-500">
                    <span>{member.qual}</span>
                    <span>·</span>
                    <span>{member.exp}</span>
                  </div>
                </div>
                {hoveredStaff === member.name && (
                  <div className="absolute inset-0 bg-[#111111]/95 flex items-center justify-center p-6">
                    <div className="text-center text-white">
                      <p className="font-heading font-bold text-lg mb-2">{member.name}</p>
                      <p className="text-white/60 text-sm mb-3">{member.subject}</p>
                      <p className="text-white/80 text-sm leading-relaxed">{member.bio}</p>
                    </div>
                  </div>
                )}
              </m.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
