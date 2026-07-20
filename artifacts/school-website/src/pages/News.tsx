import { useEffect } from "react";
import { motion } from "framer-motion";
import { Calendar, Tag, ArrowRight } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};
const stagger = { visible: { transition: { staggerChildren: 0.1 } } };

const news = [
  { id: 1, title: "SS Bal Sadan Students Shine in HBSE Class 12 Board Exams 2025", date: "Jun 5, 2025", category: "Results", excerpt: "100% pass rate with 32 students scoring above 90%. Priya Sharma tops with 98.6% in Science stream, highest in Kaithal district.", img: "https://picsum.photos/seed/news1/600/350" },
  { id: 2, title: "School Wins Best School Award at District Education Summit", date: "May 20, 2025", category: "Achievement", excerpt: "SS Bal Sadan School was honoured with the Best School Award at the annual Kaithal District Education Summit 2025.", img: "https://picsum.photos/seed/news2/600/350" },
  { id: 3, title: "New Smart Classrooms Inaugurated by District Collector", date: "Apr 15, 2025", category: "Infrastructure", excerpt: "5 new smart classrooms equipped with digital boards and high-speed Wi-Fi were inaugurated, taking our total to 20.", img: "https://picsum.photos/seed/news3/600/350" },
  { id: 4, title: "Annual Sports Meet 2025 — Students Break 3 School Records", date: "Mar 28, 2025", category: "Sports", excerpt: "Over 500 students participated in 22 events. Athletes broke school records in 100m sprint, long jump, and shot put.", img: "https://picsum.photos/seed/news4/600/350" },
  { id: 5, title: "Science Exhibition: Students Present Solar-Powered Vehicles", date: "Feb 10, 2025", category: "Academics", excerpt: "Class 8 and 9 students dazzled judges with working solar car models, water purifiers, and earthquake alert systems.", img: "https://picsum.photos/seed/news5/600/350" },
  { id: 6, title: "Admissions Open for 2025-26 Academic Session", date: "Jan 15, 2025", category: "Admissions", excerpt: "Applications are now being accepted for all classes from Nursery to Class 12. Limited seats available — apply early.", img: "https://picsum.photos/seed/news6/600/350" },
];

const announcements = [
  { text: "PTM for Class 10 & 12 — July 15, 2025", date: "Jul 8" },
  { text: "Summer vacation ends — School reopens July 1", date: "Jun 25" },
  { text: "Last date for Q1 fee payment: April 15", date: "Apr 5" },
  { text: "Republic Day celebration — Jan 26, 8:00 AM", date: "Jan 20" },
];

export default function News() {
  useEffect(() => {
    document.title = "News & Updates — SS Bal Sadan School Siwan, Kaithal";
  }, []);

  return (
    <div className="pt-16 lg:pt-20">
      <div className="relative py-12 sm:py-20 lg:py-28 text-white text-center overflow-hidden">
        <div className="absolute inset-0">
          <img src="/school-front.webp" alt="News" className="w-full h-full object-cover object-center" loading="lazy" />
          <div className="absolute inset-0 bg-[#000000]/65"></div>
        </div>
        <div className="relative z-10">
          <p className="text-gray-200 text-sm font-semibold uppercase tracking-widest mb-2">Stay Informed</p>
          <h1 className="font-heading font-bold text-2xl sm:text-4xl lg:text-6xl">News & Updates</h1>
        </div>
      </div>

      <section className="py-20 bg-[#f5f5f5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-10">
            {/* Main News */}
            <div className="lg:col-span-2">
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="space-y-8">
                {/* Featured */}
                <motion.div variants={fadeUp} className="bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition-all group">
                  <div className="overflow-hidden h-64">
                    <img src={news[0].img} alt={news[0].title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="p-8">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="bg-[#ffffff]/10 text-[#ffffff] text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
                        <Tag className="w-3 h-3" />{news[0].category}
                      </span>
                      <span className="text-gray-400 text-xs flex items-center gap-1">
                        <Calendar className="w-3 h-3" />{news[0].date}
                      </span>
                    </div>
                    <h2 className="font-heading font-bold text-[#111111] text-xl mb-3">{news[0].title}</h2>
                    <p className="text-gray-600 leading-relaxed text-sm">{news[0].excerpt}</p>
                    <button className="mt-5 inline-flex items-center gap-2 text-[#111111] font-semibold text-sm hover:text-[#ffffff] transition-colors">
                      Read More <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>

                {/* Other news */}
                {news.slice(1).map((item) => (
                  <motion.div key={item.id} variants={fadeUp} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all group flex gap-0">
                    <div className="w-32 sm:w-44 flex-shrink-0 overflow-hidden">
                      <img src={item.img} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    </div>
                    <div className="p-6 flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="bg-[#111111]/10 text-[#111111] text-xs font-bold px-2 py-0.5 rounded-full">{item.category}</span>
                        <span className="text-gray-400 text-xs">{item.date}</span>
                      </div>
                      <h3 className="font-heading font-semibold text-[#111111] text-base mb-2 leading-tight">{item.title}</h3>
                      <p className="text-gray-500 text-sm leading-relaxed line-clamp-2">{item.excerpt}</p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Announcements */}
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <h3 className="font-heading font-bold text-[#111111] text-lg mb-5 flex items-center gap-2">
                  <span className="w-2 h-6 bg-[#ffffff] rounded-full"></span>
                  Announcements
                </h3>
                <div className="space-y-4">
                  {announcements.map((ann) => (
                    <div key={ann.text} className="flex gap-4 items-start border-b border-gray-50 pb-4 last:border-0">
                      <div className="bg-[#111111] text-white text-xs font-bold px-2 py-1.5 rounded-lg text-center min-w-[40px]">
                        {ann.date}
                      </div>
                      <p className="text-gray-700 text-sm leading-relaxed">{ann.text}</p>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Categories */}
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <h3 className="font-heading font-bold text-[#111111] text-lg mb-4">Categories</h3>
                {["Results", "Achievement", "Infrastructure", "Sports", "Academics", "Admissions", "Events"].map((cat) => (
                  <button key={cat} className="flex items-center justify-between w-full py-2.5 border-b border-gray-50 last:border-0 text-sm text-gray-600 hover:text-[#ffffff] transition-colors group">
                    <span className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#ffffff] group-hover:scale-125 transition-transform"></span>{cat}</span>
                    <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>
                ))}
              </motion.div>

              {/* Achievement Highlight */}
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="bg-[#111111] rounded-2xl p-6 text-white">
                <p className="text-[#ffffff] text-xs font-bold uppercase tracking-widest mb-3">Achievement Spotlight</p>
                <p className="font-heading font-bold text-lg mb-2">100% Board Results</p>
                <p className="text-white/70 text-sm leading-relaxed">All Class 10 and 12 students passed their HBSE board exams in 2025 with 32 students scoring above 90%.</p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
