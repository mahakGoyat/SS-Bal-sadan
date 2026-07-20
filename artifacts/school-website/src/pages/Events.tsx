import { useEffect } from "react";
import { m } from "framer-motion";
import { Calendar, Clock, MapPin, ArrowRight } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};
const stagger = { visible: { transition: { staggerChildren: 0.1 } } };

const upcomingEvents = [
  { id: 1, title: "Annual Sports Meet 2025", date: "Oct 18, 2025", time: "8:00 AM – 4:00 PM", venue: "School Sports Ground", desc: "Inter-class and inter-house athletics, kabaddi, football, and indoor games. All students participate.", category: "Sports", color: "bg-orange-500" },
  { id: 2, title: "Science Exhibition & Fair", date: "Nov 5, 2025", time: "9:00 AM – 3:00 PM", venue: "School Auditorium", desc: "Students present working models, experiments, and innovative projects. Open to parents.", category: "Academics", color: "bg-blue-500" },
  { id: 3, title: "Annual Cultural Function 2025", date: "Dec 10, 2025", time: "5:00 PM – 9:00 PM", venue: "School Auditorium", desc: "Grand annual event featuring dance, drama, music, and prize distribution for academic and co-curricular excellence.", category: "Cultural", color: "bg-purple-500" },
  { id: 4, title: "Parent-Teacher Meeting — Q2", date: "Sep 20, 2025", time: "10:00 AM – 1:00 PM", venue: "Respective Classrooms", desc: "Quarter 2 PTM for sharing academic progress and individual student performance with parents.", category: "Academic", color: "bg-[#111111]" },
  { id: 5, title: "Independence Day Celebration", date: "Aug 15, 2025", time: "7:30 AM – 10:00 AM", venue: "School Ground", desc: "Flag hoisting ceremony followed by cultural performances and distribution of sweets.", category: "National", color: "bg-green-600" },
  { id: 6, title: "Career Counseling Workshop", date: "Sep 5, 2025", time: "10:00 AM – 12:00 PM", venue: "Auditorium", desc: "Expert counselors guide Class 10 & 12 students on career options, college selection, and competitive exams.", category: "Academics", color: "bg-[#ffffff]" },
];

const pastEvents = [
  { title: "Republic Day Celebration", date: "Jan 26, 2025", img: "https://picsum.photos/seed/ev1/400/250" },
  { title: "Annual Prize Distribution", date: "Feb 22, 2025", img: "https://picsum.photos/seed/ev2/400/250" },
  { title: "Inter-School Debate", date: "Mar 10, 2025", img: "https://picsum.photos/seed/ev3/400/250" },
  { title: "World Environment Day", date: "Jun 5, 2025", img: "https://picsum.photos/seed/ev4/400/250" },
  { title: "Science Olympiad", date: "Feb 5, 2025", img: "https://picsum.photos/seed/ev5/400/250" },
  { title: "Teacher's Day Celebration", date: "Sep 5, 2024", img: "https://picsum.photos/seed/ev6/400/250" },
];

export default function Events() {
  useEffect(() => {
    document.title = "Events — SS Bal Sadan School Siwan, Kaithal";
  }, []);

  return (
    <div className="pt-16 lg:pt-20">
      <div className="relative py-12 sm:py-20 lg:py-28 text-white text-center overflow-hidden">
        <div className="absolute inset-0">
          <img src="/school-event.webp" alt="Events" className="w-full h-full object-cover object-center" loading="lazy" />
          <div className="absolute inset-0 bg-[#000000]/65"></div>
        </div>
        <div className="relative z-10">
          <p className="text-gray-200 text-sm font-semibold uppercase tracking-widest mb-2">What's Happening</p>
          <h1 className="font-heading font-bold text-2xl sm:text-4xl lg:text-6xl">Events & Calendar</h1>
        </div>
      </div>

      {/* Upcoming Events */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <m.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-14">
            <span className="text-[#111111] font-semibold text-sm uppercase tracking-widest">Calendar</span>
            <h2 className="font-heading font-bold text-3xl sm:text-4xl text-[#111111] mt-2">Upcoming Events</h2>
          </m.div>
          <m.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="space-y-5">
            {upcomingEvents.map((event) => (
              <m.div
                key={event.id}
                variants={fadeUp}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-all p-6 flex gap-5 group"
              >
                <div className={`${event.color} text-white rounded-2xl w-16 h-16 flex-shrink-0 flex flex-col items-center justify-center text-center`}>
                  <span className="text-xs font-bold">{event.date.split(" ")[0]}</span>
                  <span className="text-lg font-bold leading-tight">{event.date.split(" ")[1].replace(",", "")}</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="font-heading font-bold text-[#111111] text-lg group-hover:text-[#ffffff] transition-colors">{event.title}</h3>
                    <span className={`${event.color} text-white text-xs font-bold px-3 py-1 rounded-full flex-shrink-0`}>{event.category}</span>
                  </div>
                  <p className="text-gray-600 text-sm mt-2 leading-relaxed">{event.desc}</p>
                  <div className="flex flex-wrap gap-4 mt-3">
                    <span className="flex items-center gap-1.5 text-xs text-gray-500"><Clock className="w-3.5 h-3.5 text-[#ffffff]" />{event.time}</span>
                    <span className="flex items-center gap-1.5 text-xs text-gray-500"><MapPin className="w-3.5 h-3.5 text-[#ffffff]" />{event.venue}</span>
                    <span className="flex items-center gap-1.5 text-xs text-gray-500"><Calendar className="w-3.5 h-3.5 text-[#ffffff]" />{event.date}</span>
                  </div>
                </div>
              </m.div>
            ))}
          </m.div>
        </div>
      </section>

      {/* Past Events Gallery */}
      <section className="py-20 bg-[#f5f5f5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <m.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-12">
            <span className="text-[#111111] font-semibold text-sm uppercase tracking-widest">Memories</span>
            <h2 className="font-heading font-bold text-3xl sm:text-4xl text-[#111111] mt-2">Past Events</h2>
          </m.div>
          <m.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {pastEvents.map((event) => (
              <m.div key={event.title} variants={fadeUp} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg group transition-all">
                <div className="overflow-hidden h-44">
                  <img src={event.img} alt={event.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-5">
                  <h3 className="font-heading font-semibold text-[#111111] text-base">{event.title}</h3>
                  <p className="text-gray-400 text-xs mt-1 flex items-center gap-1"><Calendar className="w-3 h-3" />{event.date}</p>
                </div>
              </m.div>
            ))}
          </m.div>
        </div>
      </section>

      {/* Event Inquiry Form */}
      <section className="py-20 bg-white">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <m.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-10">
            <span className="text-[#111111] font-semibold text-sm uppercase tracking-widest">Get Involved</span>
            <h2 className="font-heading font-bold text-3xl sm:text-4xl text-[#111111] mt-2">Event Enquiry</h2>
            <p className="text-gray-500 mt-3 text-sm">For event participation, sponsorship, or any information.</p>
          </m.div>
          <m.form
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            onSubmit={(e) => { e.preventDefault(); alert("Enquiry submitted!"); }}
            className="bg-[#f5f5f5] rounded-3xl p-8 space-y-5"
          >
            {[
              { label: "Your Name", id: "ev-name", placeholder: "Full name" },
              { label: "Mobile Number", id: "ev-phone", placeholder: "+91 XXXXX XXXXX" },
              { label: "Event of Interest", id: "ev-event", placeholder: "e.g. Sports Day, Annual Function" },
            ].map((f) => (
              <div key={f.id}>
                <label className="block text-sm font-semibold text-[#111111] mb-2">{f.label}</label>
                <input type="text" data-testid={`input-${f.id}`} placeholder={f.placeholder} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm bg-white focus:outline-none focus:border-[#111111] transition" />
              </div>
            ))}
            <div>
              <label className="block text-sm font-semibold text-[#111111] mb-2">Message</label>
              <textarea data-testid="input-ev-message" rows={4} placeholder="Your query or message..." className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm bg-white focus:outline-none focus:border-[#111111] resize-none transition"></textarea>
            </div>
            <button type="submit" data-testid="button-event-enquiry" className="w-full py-4 bg-[#111111] text-white rounded-full font-semibold text-sm hover:bg-[#000000] transition flex items-center justify-center gap-2">
              Send Enquiry <ArrowRight className="w-4 h-4" />
            </button>
          </m.form>
        </div>
      </section>
    </div>
  );
}
