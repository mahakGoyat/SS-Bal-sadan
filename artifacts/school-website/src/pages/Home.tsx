import { useEffect, useRef, useState } from "react";
import { Link } from "wouter";
import { motion, useInView } from "framer-motion";
import {
  Monitor, Users, Trophy, Leaf, Cpu, Music,
  Star, Quote, ArrowRight,
  BookOpen, GraduationCap, ChevronLeft, ChevronRight
} from "lucide-react";

function AnimatedCounter({ target, suffix = "", duration = 2 }: { target: number; suffix?: string; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    // requestAnimationFrame is aligned with the browser's paint cycle so the
    // browser can batch these updates with other visual work instead of firing
    // a setInterval callback that competes with rendering. It also auto-pauses
    // when the tab is hidden, avoiding wasted work.
    const startTime = performance.now();
    let rafId: number;
    const update = (now: number) => {
      const progress = Math.min((now - startTime) / (duration * 1000), 1);
      setCount(Math.floor(progress * target));
      if (progress < 1) {
        rafId = requestAnimationFrame(update);
      }
    };
    rafId = requestAnimationFrame(update);
    return () => cancelAnimationFrame(rafId);
  }, [inView, target, duration]);

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
}

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};
const stagger = { visible: { transition: { staggerChildren: 0.12 } } };

const whyChooseUs = [
  { icon: Monitor, title: "Smart Classrooms", desc: "Digital boards and tech-enabled learning in every room." },
  { icon: Users, title: "Experienced Faculty", desc: "45+ dedicated teachers with years of proven expertise." },
  { icon: Trophy, title: "Sports Facilities", desc: "Full sports ground, indoor hall, and outdoor courts." },
  { icon: Leaf, title: "Safe Environment", desc: "CCTV-monitored, secure campus with trained staff." },
  { icon: Cpu, title: "Digital Learning", desc: "Computer labs, internet access, and e-learning tools." },
  { icon: Music, title: "Co-curricular", desc: "Music, dance, art, debate, and 10+ active clubs." },
];

const achievements = [
  { title: "State Topper — Science", year: "2024", desc: "Priya Sharma scored 98.6% in HBSE Board Exams." },
  { title: "District Sports Champions", year: "2023", desc: "Won 1st place in the Kaithal District Sports Meet." },
  { title: "Best School Award", year: "2023", desc: "Awarded Best School in Kaithal by Education Dept." },
  { title: "100% Board Results", year: "2024", desc: "All Grade 10 & 12 students passed with distinction." },
  { title: "Cultural Excellence", year: "2023", desc: "Won State-level cultural competition in Chandigarh." },
];

const testimonials = [
  { name: "Sunita Devi", role: "Parent of Class 9 Student", text: "The teachers here genuinely care about every child. My daughter has grown in confidence and academics since joining.", rating: 5, img: "https://picsum.photos/seed/parent1/80/80" },
  { name: "Rajesh Kumar", role: "Parent of Class 7 Student", text: "The infrastructure is excellent and the school maintains a perfect balance of studies and extracurriculars.", rating: 5, img: "https://picsum.photos/seed/parent2/80/80" },
  { name: "Ananya Singh", role: "Class 12 Alumni", text: "SS Bal Sadan gave me the foundation for my engineering career. The faculty is truly world-class.", rating: 5, img: "https://picsum.photos/seed/alumni1/80/80" },
  { name: "Mohit Sharma", role: "Class 10 Student", text: "I love the smart classrooms and sports facilities. It is not just a school, it is a second home.", rating: 5, img: "https://picsum.photos/seed/student1/80/80" },
  { name: "Geeta Yadav", role: "Parent of Class 5 Student", text: "The mid-day meals and safety arrangements give me complete peace of mind. Highly recommend this school.", rating: 5, img: "https://picsum.photos/seed/parent3/80/80" },
  { name: "Deepak Nain", role: "Parent of Class 8 Student", text: "Excellent teaching methods and caring staff. My son's results have improved significantly this year.", rating: 5, img: "https://picsum.photos/seed/parent4/80/80" },
  { name: "Pooja Chauhan", role: "Class 11 Student", text: "The science labs and library are fantastic. I feel motivated to come to school every day.", rating: 5, img: "https://picsum.photos/seed/student2/80/80" },
];

// Gallery preview uses 400px thumbnails — full-res only loaded in lightbox on /gallery
const galleryImages = [
  { id: 1, src: "/gallery/img0_thumb.webp",    label: "Cultural Program" },
  { id: 2, src: "/gallery/img7_thumb.webp",    label: "Annual Function" },
  { id: 3, src: "/gallery/img3_thumb.webp",    label: "Prize Distribution" },
  { id: 4, src: "/gallery/img9_thumb.webp",    label: "Independence Day" },
  { id: 5, src: "/gallery/img10_thumb.webp",   label: "Republic Day" },
  { id: 6, src: "/gallery/img15_thumb.webp",   label: "Award Ceremony" },
  { id: 7, src: "/gallery/img14_thumb.webp",   label: "Mother's Day" },
  { id: 8, src: "/gallery/sports2_thumb.webp", label: "Sports Day" },
];

const heroImages = [
  {
    src: "/school-front.webp",
    alt: "SS Bal Sadan School Front",
    srcSet: "/school-front-480w.webp 480w, /school-front-800w.webp 800w, /school-front.webp 1600w",
  },
  {
    src: "/school-building.webp",
    alt: "SS Bal Sadan School Building",
    srcSet: "/school-building-800w.webp 800w, /school-building.webp 1402w",
  },
  {
    src: "/school-event.webp",
    alt: "SS Bal Sadan School Event",
    srcSet: "/school-event-480w.webp 480w, /school-event-800w.webp 800w, /school-event.webp 1600w",
  },
];

export default function Home() {
  const [heroIdx, setHeroIdx] = useState(0);

  useEffect(() => {
    document.title = "SS Bal Sadan School Siwan, Kaithal — Shaping Futures, Building Characters";
  }, []);

  useEffect(() => {
    const timer = setInterval(() => setHeroIdx((i) => (i + 1) % heroImages.length), 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="pt-16 lg:pt-20">
      {/* Hero */}
      <section className="relative min-h-[92vh] flex items-center overflow-hidden">
        {/* Background School Photos — Looping Slideshow */}
        <div className="absolute inset-0">
          {heroImages.map((img, i) => (
            <div
              key={img.src}
              className="absolute inset-0 transition-opacity duration-1000"
              style={{ opacity: i === heroIdx ? 1 : 0 }}
            >
              <img
                src={img.src}
                srcSet={img.srcSet}
                sizes="100vw"
                alt={img.alt}
                className="w-full h-full object-cover"
                fetchPriority={i === 0 ? "high" : "low"}
                loading={i === 0 ? "eager" : "lazy"}
              />
            </div>
          ))}
          <div className="absolute inset-0 bg-gradient-to-br from-[#000000]/80 via-[#111111]/70 to-[#000000]/60"></div>
        </div>

        {/* Prev Button */}
        <button
          onClick={() => setHeroIdx((heroIdx - 1 + heroImages.length) % heroImages.length)}
          className="absolute left-2 sm:left-4 bottom-16 sm:bottom-auto sm:top-1/2 sm:-translate-y-1/2 z-20 bg-white/20 hover:bg-white/40 text-white rounded-full p-2 sm:p-3 transition-all backdrop-blur-sm"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-5 h-5 sm:w-7 sm:h-7" />
        </button>

        {/* Next Button */}
        <button
          onClick={() => setHeroIdx((heroIdx + 1) % heroImages.length)}
          className="absolute right-2 sm:right-4 bottom-16 sm:bottom-auto sm:top-1/2 sm:-translate-y-1/2 z-20 bg-white/20 hover:bg-white/40 text-white rounded-full p-2 sm:p-3 transition-all backdrop-blur-sm"
          aria-label="Next slide"
        >
          <ChevronRight className="w-5 h-5 sm:w-7 sm:h-7" />
        </button>

        {/* Slide dots */}
        <div className="absolute bottom-20 left-1/2 -translate-x-1/2 flex gap-2 z-20">
          {heroImages.map((_, i) => (
            <button
              key={i}
              onClick={() => setHeroIdx(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`w-6 h-6 flex items-center justify-center rounded-full transition-all`}
            >
              <span className={`w-2.5 h-2.5 rounded-full transition-all pointer-events-none ${i === heroIdx ? "bg-white scale-125" : "bg-white/40"}`} />
            </button>
          ))}
        </div>

        <div className="relative z-10 w-full px-6 sm:px-10 lg:px-16 py-20">
          <div className="max-w-2xl text-left">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 bg-[#ffffff]/20 border border-[#ffffff]/30 text-[#ffffff] text-sm font-medium px-4 py-2 rounded-full mb-6"
            >
              <GraduationCap className="w-4 h-4" />
              Affiliated to HBSE Board, Bhiwani — Est. 2003
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="font-heading font-bold text-white text-4xl sm:text-5xl lg:text-6xl leading-tight mb-5"
            >
              SS Bal Sadan School{" "}
              <span className="text-[#ffffff]">Siwan, Kaithal</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.25 }}
              className="text-xl sm:text-2xl text-white/80 font-light mb-5 italic"
            >
              "Shaping Futures, Building Characters"
            </motion.p>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="text-white/60 mb-10 max-w-xl text-base leading-relaxed"
            >
              A premier institution in Haryana dedicated to holistic education, nurturing young minds for over two decades with excellence, integrity, and innovation.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link
                href="/about"
                data-testid="button-explore-school"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#ffffff] text-[#111111] rounded-full font-semibold text-base hover:bg-[#ffffff] transition-all shadow-lg hover:shadow-xl hover:scale-105"
              >
                Explore School
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/admissions"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-transparent border-2 border-white/40 text-white rounded-full font-semibold text-base hover:border-[#ffffff] hover:text-[#ffffff] transition-all"
              >
                Apply for Admission
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Scroll cue */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2">
            <div className="w-1 h-2 bg-[#ffffff] rounded-full"></div>
          </div>
        </motion.div>
      </section>

      {/* Stats */}
      <section className="bg-[#f5f5f5] py-14">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="grid grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {[
              { label: "Founded", value: 2003, suffix: "", isYear: true, icon: "🏫" },
              { label: "Students Enrolled", value: 1200, suffix: "+", icon: "🎓" },
              { label: "Experienced Teachers", value: 45, suffix: "+", icon: "👨‍🏫" },
              { label: "Acres of Campus", value: 5, suffix: " Acres", icon: "🌿" },
            ].map((stat) => (
              <motion.div
                key={stat.label}
                variants={fadeUp}
                className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 p-8 flex flex-col items-center text-center border border-gray-100"
              >
                <span className="text-3xl mb-3">{stat.icon}</span>
                <div className="font-heading font-extrabold text-4xl sm:text-5xl text-[#111111] mb-1 leading-tight">
                  {stat.isYear ? stat.value : <AnimatedCounter target={stat.value} suffix={stat.suffix} />}
                </div>
                <div className="w-8 h-0.5 bg-[#111111] rounded-full my-3"></div>
                <p className="text-gray-500 font-medium text-sm uppercase tracking-wider">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* About Short */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
            >
              <span className="text-[#111111] font-semibold text-sm uppercase tracking-widest">About Our School</span>
              <h2 className="font-heading font-bold text-3xl sm:text-4xl text-[#111111] mt-2 mb-5">
                Two Decades of Academic Legacy
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Since its establishment in 2003, SS Bal Sadan School has been a cornerstone of quality education in Kaithal district. Founded with the vision of providing holistic, value-based education to every child, our school has grown into one of the most trusted institutions in Haryana.
              </p>
              <p className="text-gray-600 leading-relaxed mb-6">
                We nurture over 1,200 students from pre-primary to senior secondary levels, guided by an experienced faculty that believes every child carries a unique spark waiting to be ignited.
              </p>
              <Link
                href="/about"
                data-testid="link-read-more-about"
                className="inline-flex items-center gap-2 text-[#111111] font-semibold hover:text-[#555555] transition-colors"
              >
                Read More About Us <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
            >
              <div className="rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-shadow">
                <img
                  src="/gallery/school-building.webp"
                  srcSet="/gallery/school-building_thumb.webp 400w, /gallery/school-building_800w.webp 800w, /gallery/school-building.webp 1402w"
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  alt="SS Bal Sadan School"
                  className="w-full h-80 object-cover hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-[#f5f5f5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="text-center mb-14"
          >
            <span className="text-[#111111] font-semibold text-sm uppercase tracking-widest">Why Choose Us</span>
            <h2 className="font-heading font-bold text-3xl sm:text-4xl text-[#111111] mt-2">
              What Makes Us Different
            </h2>
          </motion.div>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {whyChooseUs.map(({ icon: Icon, title, desc }) => (
              <motion.div
                key={title}
                variants={fadeUp}
                className="bg-white rounded-2xl p-7 shadow-sm hover:shadow-xl transition-all duration-300 group border border-gray-100 hover:-translate-y-1"
              >
                <div className="w-14 h-14 rounded-xl bg-[#111111]/5 group-hover:bg-[#111111] flex items-center justify-center mb-5 transition-colors">
                  <Icon className="w-7 h-7 text-[#111111] group-hover:text-white" />
                </div>
                <h3 className="font-heading font-semibold text-[#111111] text-lg mb-2">{title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Principal's Message */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="bg-gradient-to-br from-[#111111] to-[#000000] rounded-3xl overflow-hidden">
            <div className="grid lg:grid-cols-5 gap-0">
              <div className="lg:col-span-2 relative overflow-hidden">
                <img
                  src="/principal_ai.webp"
                  srcSet="/principal_ai-512w.webp 512w, /principal_ai.webp 1024w"
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  alt="Principal"
                  className="w-full h-80 lg:h-full object-cover object-center"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#111111]/60 to-transparent lg:hidden"></div>
              </div>
              <div className="lg:col-span-3 p-10 lg:p-14 flex flex-col justify-center">
                <Quote className="w-12 h-12 text-[#ffffff]/40 mb-5" />
                <span className="text-white/70 font-semibold text-sm uppercase tracking-widest mb-3">Principal's Message</span>
                <blockquote className="text-white/90 text-lg leading-relaxed mb-6 italic">
                  "Education is not the filling of a pail, but the lighting of a fire. At SS Bal Sadan, we are committed to nurturing every child's potential — academic, moral, and social. Our goal is not just to produce scholars, but responsible citizens who will contribute meaningfully to society."
                </blockquote>
                <div>
                  <p className="font-heading font-bold text-white text-xl">Dr. Ramesh Kumar Sharma</p>
                  <p className="text-[#ffffff] text-sm">Principal, SS Bal Sadan School</p>
                  <p className="text-white/60 text-xs mt-1 italic font-heading">M.Ed., Ph.D. — 20+ years in education</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Achievements */}
      <section className="py-20 bg-[#f5f5f5] overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="text-center mb-12"
          >
            <span className="text-[#111111] font-semibold text-sm uppercase tracking-widest">Achievements & Awards</span>
            <h2 className="font-heading font-bold text-3xl sm:text-4xl text-[#111111] mt-2">Our Pride & Milestones</h2>
          </motion.div>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5"
          >
            {achievements.map((ach) => (
              <motion.div
                key={ach.title}
                variants={fadeUp}
                className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 text-center"
              >
                <div className="w-12 h-12 bg-[#111111]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Trophy className="w-6 h-6 text-[#111111]" />
                </div>
                <span className="text-xs font-semibold text-white bg-[#111111] px-2.5 py-1 rounded-full">{ach.year}</span>
                <h3 className="font-heading font-semibold text-[#111111] text-sm mt-3 mb-2">{ach.title}</h3>
                <p className="text-gray-500 text-xs leading-relaxed">{ach.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Gallery Preview */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="flex items-end justify-between mb-10"
          >
            <div>
              <span className="text-[#111111] font-semibold text-sm uppercase tracking-widest">Our Gallery</span>
              <h2 className="font-heading font-bold text-3xl sm:text-4xl text-[#111111] mt-2">School Life in Pictures</h2>
            </div>
            <Link
              href="/gallery"
              data-testid="link-view-gallery"
              className="hidden sm:inline-flex items-center gap-2 text-[#111111] font-semibold border-2 border-[#111111] px-5 py-2.5 rounded-full hover:bg-[#111111] hover:text-white transition-all text-sm"
            >
              View Full Gallery <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4"
          >
            {galleryImages.map((img) => (
              <motion.div
                key={img.id}
                variants={fadeUp}
                className="relative group overflow-hidden rounded-xl shadow-sm cursor-pointer"
              >
                <img
                  src={img.src}
                  alt={img.label}
                  className="w-full h-44 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#111111]/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <span className="text-white font-semibold text-sm">{img.label}</span>
                </div>
              </motion.div>
            ))}
          </motion.div>
          <div className="text-center mt-8 sm:hidden">
            <Link href="/gallery" className="inline-flex items-center gap-2 text-[#111111] font-semibold border-2 border-[#111111] px-6 py-2.5 rounded-full text-sm">
              View Full Gallery <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials — Infinite Right-to-Left Loop */}
      <section className="py-20 bg-[#f5f5f5] overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="text-center mb-12"
          >
            <span className="text-[#111111] font-semibold text-sm uppercase tracking-widest">Testimonials</span>
            <h2 className="font-heading font-bold text-3xl sm:text-4xl text-[#111111] mt-2">What Our Community Says</h2>
          </motion.div>
        </div>

        {/* Marquee Track */}
        <div className="relative w-full overflow-hidden">
          <style>{`
            @keyframes marquee {
              0%   { transform: translateX(0); }
              100% { transform: translateX(-50%); }
            }
            .marquee-track {
              display: flex;
              width: max-content;
              animation: marquee 30s linear infinite;
            }
            .marquee-track:hover {
              animation-play-state: paused;
            }
          `}</style>
          <div className="marquee-track">
            {[...testimonials, ...testimonials].map((t, idx) => (
              <div
                key={idx}
                className="flex-shrink-0 w-80 mx-4 bg-white rounded-3xl shadow-md p-7"
              >
                <Quote className="w-8 h-8 text-[#111111]/20 mb-4" />
                <p className="text-gray-700 text-sm leading-relaxed mb-6 italic">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <img
                    src={t.img}
                    alt={t.name}
                    className="w-12 h-12 rounded-full object-cover border-2 border-[#111111]/20"
                  />
                  <div>
                    <p className="font-heading font-semibold text-[#111111] text-sm">{t.name}</p>
                    <p className="text-gray-500 text-xs">{t.role}</p>
                    <div className="flex gap-0.5 mt-1">
                      {Array(5).fill(0).map((_, i) => (
                        <Star key={i} className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-16 bg-[#111111]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            <BookOpen className="w-12 h-12 text-white/30 mx-auto mb-5" />
            <h2 className="font-heading font-bold text-3xl sm:text-4xl text-white mb-4">
              Admissions Are Now Open
            </h2>
            <p className="text-white/60 mb-8 max-w-xl mx-auto leading-relaxed">
              Secure your child's future at one of Haryana's most trusted schools. Limited seats available — apply today.
            </p>
            <Link
              href="/admissions"
              className="inline-flex items-center gap-2 px-10 py-4 bg-white text-[#111111] rounded-full font-bold text-base hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl hover:scale-105"
            >
              Apply for Admission <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
