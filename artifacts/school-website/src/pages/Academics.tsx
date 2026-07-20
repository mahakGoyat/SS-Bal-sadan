import { useEffect } from "react";
import { motion } from "framer-motion";
import { BookOpen, Monitor, FlaskConical, Palette, Music, Dumbbell, MessageSquare, Code, Trophy, Star, Users, TrendingUp } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};
const stagger = { visible: { transition: { staggerChildren: 0.1 } } };

const programs = [
  { title: "Pre-Primary", range: "Nursery – KG", desc: "Play-based learning for early childhood development with focus on language, motor skills, and creativity.", icon: "🌱" },
  { title: "Primary", range: "Class 1 – 5", desc: "Strong foundation in core subjects with activity-based learning and digital tools.", icon: "📚" },
  { title: "Middle School", range: "Class 6 – 8", desc: "Concept-based curriculum with science, math, social science, and language enrichment.", icon: "🔬" },
  { title: "Secondary", range: "Class 9 – 10", desc: "HBSE-aligned rigorous curriculum preparing students for board examinations.", icon: "🎓" },
  { title: "Senior Secondary", range: "Class 11 – 12", desc: "Science and Commerce streams with expert faculty and career counseling.", icon: "🏛" },
];

const clubs = [
  { icon: FlaskConical, name: "Science Club", desc: "Weekly experiments, project competitions, and STEM workshops." },
  { icon: Dumbbell, name: "Sports Club", desc: "Cricket, kabaddi, football, badminton, and athletics." },
  { icon: Palette, name: "Art Club", desc: "Painting, craft, sculpture, and design exhibitions." },
  { icon: Music, name: "Music Club", desc: "Vocal, tabla, harmonium, and folk music." },
  { icon: MessageSquare, name: "Debate Club", desc: "Public speaking, Model UN, and inter-school debates." },
  { icon: Code, name: "Computer Club", desc: "Coding, robotics, and digital literacy projects." },
];

export default function Academics() {
  useEffect(() => {
    document.title = "Academics — SS Bal Sadan School Siwan, Kaithal";
  }, []);

  return (
    <div className="pt-16 lg:pt-20">
      <div className="relative py-12 sm:py-20 lg:py-28 text-white text-center overflow-hidden">
        <div className="absolute inset-0">
          <img src="/school-top.webp" alt="Academics" className="w-full h-full object-cover object-center" loading="lazy" />
          <div className="absolute inset-0 bg-[#000000]/65"></div>
        </div>
        <div className="relative z-10">
          <p className="text-gray-200 text-sm font-semibold uppercase tracking-widest mb-2">Learning & Growth</p>
          <h1 className="font-heading font-bold text-2xl sm:text-4xl lg:text-6xl">Academics</h1>
        </div>
      </div>

      {/* Programs */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-14">
            <span className="text-[#111111] font-semibold text-sm uppercase tracking-widest">Our Programs</span>
            <h2 className="font-heading font-bold text-3xl sm:text-4xl text-[#111111] mt-2">Academic Programs</h2>
          </motion.div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
            {programs.map((p) => (
              <motion.div key={p.title} variants={fadeUp} className="bg-[#f5f5f5] rounded-2xl p-7 hover:bg-[#111111] group transition-all duration-300 hover:-translate-y-1">
                <div className="text-4xl mb-4">{p.icon}</div>
                <h3 className="font-heading font-bold text-[#111111] group-hover:text-[#ffffff] text-lg mb-1 transition-colors">{p.title}</h3>
                <p className="text-[#111111]/50 group-hover:text-white/50 text-xs font-semibold mb-3 transition-colors">{p.range}</p>
                <p className="text-gray-600 group-hover:text-white/80 text-sm leading-relaxed transition-colors">{p.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Curriculum */}
      <section className="py-20 bg-[#f5f5f5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              <span className="text-[#111111] font-semibold text-sm uppercase tracking-widest">Curriculum</span>
              <h2 className="font-heading font-bold text-3xl sm:text-4xl text-[#111111] mt-2 mb-5">Smart Learning Environment</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Our curriculum is HBSE-aligned and enriched with CBSE best practices. We emphasize conceptual understanding over rote memorization, with regular assessments, project-based learning, and skill development activities.
              </p>
              <ul className="space-y-3">
                {[
                  "20 Smart Classrooms with digital boards",
                  "Fortnightly class tests + quarterly exams",
                  "Parent-teacher meetings every quarter",
                  "Remedial classes for struggling students",
                  "Advanced batch for competitive exam prep",
                  "Career counseling for Class 10 & 12",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-gray-700 text-sm">
                    <div className="w-5 h-5 rounded-full bg-[#111111]/10 flex items-center justify-center flex-shrink-0">
                      <div className="w-2 h-2 rounded-full bg-[#111111]"></div>
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              <img src="/gallery/classroom1.webp" alt="Smart Classroom" className="rounded-2xl shadow-xl w-full object-cover h-80" loading="lazy" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Co-curricular */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-14">
            <span className="text-[#111111] font-semibold text-sm uppercase tracking-widest">Beyond Textbooks</span>
            <h2 className="font-heading font-bold text-3xl sm:text-4xl text-[#111111] mt-2">Clubs & Activities</h2>
          </motion.div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {clubs.map(({ icon: Icon, name, desc }) => (
              <motion.div key={name} variants={fadeUp} className="bg-[#f5f5f5] rounded-2xl p-7 flex gap-5 hover:bg-[#111111] group transition-all duration-300">
                <div className="w-12 h-12 rounded-xl bg-white group-hover:bg-[#ffffff]/20 flex items-center justify-center flex-shrink-0 transition-colors">
                  <Icon className="w-6 h-6 text-[#111111] group-hover:text-[#ffffff]" />
                </div>
                <div>
                  <h3 className="font-heading font-semibold text-[#111111] group-hover:text-white text-base mb-1 transition-colors">{name}</h3>
                  <p className="text-gray-500 group-hover:text-white/70 text-sm leading-relaxed transition-colors">{desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Board Exam Excellence */}
      <section className="py-20 bg-[#111111] text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-14">
            <span className="text-white/50 font-semibold text-sm uppercase tracking-widest">Our Results</span>
            <h2 className="font-heading font-bold text-3xl sm:text-4xl mt-2">Board Exam Excellence</h2>
            <p className="text-white/60 mt-3 max-w-xl mx-auto text-sm">
              Consistently outstanding results in HBSE board examinations — a testament to our faculty's dedication and students' hard work.
            </p>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-14">
            {[
              { icon: Trophy, stat: "100%", label: "Pass Rate", sub: "Class 10 & 12 Board" },
              { icon: Star, stat: "98.6%", label: "Top Score", sub: "HBSE Science Stream" },
              { icon: Users, stat: "200+", label: "Students", sub: "Score above 85%" },
              { icon: TrendingUp, stat: "21+", label: "Years", sub: "Consistent Excellence" },
            ].map(({ icon: Icon, stat, label, sub }) => (
              <motion.div key={label} variants={fadeUp} className="bg-white/10 rounded-2xl p-7 text-center border border-white/10 hover:bg-white/15 transition-all">
                <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <p className="font-heading font-bold text-3xl text-white mb-1">{stat}</p>
                <p className="font-semibold text-white/80 text-sm">{label}</p>
                <p className="text-white/40 text-xs mt-1">{sub}</p>
              </motion.div>
            ))}
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="grid md:grid-cols-2 gap-4">
            {[
              { stream: "Class 10 — Secondary", highlights: ["100% pass rate every year", "Average score above 78%", "Multiple district toppers", "Remedial coaching for weaker students"] },
              { stream: "Class 12 — Senior Secondary", highlights: ["Science & Commerce streams", "Dedicated faculty per subject", "Regular mock exams and revision", "Career counseling included"] },
              { stream: "Competitive Exam Preparation", highlights: ["Special batches for JEE/NEET aspirants", "Weekly tests and doubt sessions", "Study material provided", "Mentorship by experienced faculty"] },
              { stream: "Scholarship & Merit Awards", highlights: ["Merit scholarships for top performers", "Fee concession for economically weak", "Sports quota admissions", "Recognition at Annual Day function"] },
            ].map((item) => (
              <motion.div key={item.stream} variants={fadeUp} className="bg-white/10 rounded-xl p-6 border border-white/10">
                <p className="font-heading font-semibold text-white mb-3">{item.stream}</p>
                {item.highlights.map((h) => (
                  <p key={h} className="text-white/70 text-sm flex items-center gap-2 mb-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-white/50 flex-shrink-0"></span>
                    {h}
                  </p>
                ))}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
}
