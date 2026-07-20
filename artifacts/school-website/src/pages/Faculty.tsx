import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};


const allStaff = [
  { name: "Dr. Ramesh Kumar Sharma", subject: "Principal", dept: "Administration", qual: "Ph.D., M.Ed.", exp: "20 years", tab: "Non-Teaching", img: "https://picsum.photos/seed/fac0/150/150", hod: true, bio: "Visionary leader with 20 years of educational administration." },
  { name: "Mrs. Kamla Devi", subject: "Mathematics", dept: "Primary", qual: "B.Ed., M.Sc.", exp: "12 years", tab: "Primary", img: "https://picsum.photos/seed/fac1/150/150", hod: false, bio: "Expert in foundational math education with 12 years of experience." },
  { name: "Mr. Suresh Yadav", subject: "Hindi", dept: "Primary", qual: "B.Ed., M.A. Hindi", exp: "9 years", tab: "Primary", img: "https://picsum.photos/seed/fac2/150/150", hod: false, bio: "Passionate about Hindi literature and grammar." },
  { name: "Mrs. Anita Sharma", subject: "EVS", dept: "Primary", qual: "B.Ed., B.Sc.", exp: "7 years", tab: "Primary", img: "https://picsum.photos/seed/fac3/150/150", hod: false, bio: "Makes environmental science engaging for young learners." },
  { name: "Mrs. Preeti Rani", subject: "English", dept: "Primary", qual: "B.Ed., M.A. English", exp: "8 years", tab: "Primary", img: "https://picsum.photos/seed/fac4/150/150", hod: true, bio: "HOD Primary English. Fluent communicator and storyteller." },
  { name: "Mr. Vijay Kumar", subject: "Science", dept: "Middle", qual: "B.Ed., M.Sc.", exp: "15 years", tab: "Middle", img: "https://picsum.photos/seed/fac5/150/150", hod: true, bio: "HOD Science (Middle). State award winner in teaching excellence." },
  { name: "Mrs. Rekha Singh", subject: "English", dept: "Middle", qual: "B.Ed., M.A. English", exp: "11 years", tab: "Middle", img: "https://picsum.photos/seed/fac6/150/150", hod: false, bio: "Builds strong communication and comprehension skills." },
  { name: "Mr. Pawan Malik", subject: "Social Science", dept: "Middle", qual: "B.Ed., M.A. History", exp: "8 years", tab: "Middle", img: "https://picsum.photos/seed/fac7/150/150", hod: false, bio: "History enthusiast and inter-school debate coach." },
  { name: "Mrs. Sunita Kaur", subject: "Math", dept: "Middle", qual: "B.Ed., M.Sc. Math", exp: "10 years", tab: "Middle", img: "https://picsum.photos/seed/fac8/150/150", hod: false, bio: "Makes algebra and geometry accessible to all students." },
  { name: "Dr. Sunita Agarwal", subject: "Physics", dept: "Senior", qual: "Ph.D., M.Sc. Physics", exp: "18 years", tab: "Senior", img: "https://picsum.photos/seed/fac9/150/150", hod: true, bio: "HOD Physics. Published researcher and HBSE evaluator." },
  { name: "Mr. Rohit Verma", subject: "Chemistry", dept: "Senior", qual: "B.Ed., M.Sc. Chem", exp: "14 years", tab: "Senior", img: "https://picsum.photos/seed/fac10/150/150", hod: false, bio: "Specialist in competitive exam coaching (JEE/NEET)." },
  { name: "Mrs. Neelam Gupta", subject: "Biology", dept: "Senior", qual: "B.Ed., M.Sc. Bio", exp: "10 years", tab: "Senior", img: "https://picsum.photos/seed/fac11/150/150", hod: true, bio: "HOD Biology. NEET specialist with 95% success rate." },
  { name: "Mr. Dinesh Bansal", subject: "Accountancy", dept: "Senior", qual: "B.Ed., M.Com.", exp: "13 years", tab: "Senior", img: "https://picsum.photos/seed/fac12/150/150", hod: false, bio: "Commerce expert guiding students to top commerce colleges." },
  { name: "Mr. Hari Om", subject: "Sports Coach", dept: "Physical", qual: "B.P.Ed.", exp: "12 years", tab: "Non-Teaching", img: "https://picsum.photos/seed/fac13/150/150", hod: false, bio: "National-level kabaddi player. Coaches 5 sports disciplines." },
  { name: "Mr. Naresh Garg", subject: "Office Manager", dept: "Admin", qual: "B.Com.", exp: "15 years", tab: "Non-Teaching", img: "https://picsum.photos/seed/fac14/150/150", hod: false, bio: "Manages all administrative operations efficiently." },
  { name: "Mrs. Priya Bhatia", subject: "Counselor", dept: "Support", qual: "M.Sc. Psychology", exp: "6 years", tab: "Special Educators", img: "https://picsum.photos/seed/fac15/150/150", hod: false, bio: "Child psychologist and student wellness specialist." },
  { name: "Mr. Rajan Kumar", subject: "Librarian", dept: "Library", qual: "B.Lib.", exp: "10 years", tab: "Special Educators", img: "https://picsum.photos/seed/fac16/150/150", hod: false, bio: "Manages 8,000+ book collection with digital catalog." },
  { name: "Mrs. Suman Lata", subject: "Lab Assistant (Science)", dept: "Lab", qual: "B.Sc.", exp: "8 years", tab: "Special Educators", img: "https://picsum.photos/seed/fac17/150/150", hod: false, bio: "Manages science lab and supports practical demonstrations." },
  { name: "Mr. Govind Das", subject: "Computer Lab In-charge", dept: "IT", qual: "B.Tech.", exp: "5 years", tab: "Special Educators", img: "https://picsum.photos/seed/fac18/150/150", hod: false, bio: "IT expert managing all digital infrastructure and labs." },
];

export default function Faculty() {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  useEffect(() => {
    document.title = "Faculty — SS Bal Sadan School Siwan, Kaithal";
  }, []);

  return (
    <div className="pt-16 lg:pt-20">
      <div className="relative py-12 sm:py-20 lg:py-28 text-white text-center overflow-hidden">
        <div className="absolute inset-0">
          <img src="/school-yellow.webp" alt="Faculty" className="w-full h-full object-cover object-center" loading="lazy" />
          <div className="absolute inset-0 bg-[#000000]/65"></div>
        </div>
        <div className="relative z-10">
          <p className="text-gray-200 text-sm font-semibold uppercase tracking-widest mb-2">Our Educators</p>
          <h1 className="font-heading font-bold text-2xl sm:text-4xl lg:text-6xl">Faculty & Staff</h1>
          <p className="text-white/70 mt-3">45+ dedicated professionals shaping young minds</p>
        </div>
      </div>

      <section className="py-14 bg-[#f5f5f5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-10">
            <p className="text-gray-600 max-w-2xl mx-auto text-sm leading-relaxed">
              Our school is powered by a team of 45+ highly qualified and passionate educators committed to nurturing every student's potential. Each member brings years of experience, subject expertise, and a genuine care for student growth.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {allStaff.map((member) => (
              <motion.div
                key={member.name}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all cursor-pointer"
                onMouseEnter={() => setHoveredCard(member.name)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div className="h-44 overflow-hidden">
                  <img src={member.img} alt={member.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-5">
                  <h3 className="font-heading font-semibold text-[#111111] text-sm">{member.name}</h3>
                  <p className="text-gray-500 text-xs font-medium mt-0.5">{member.subject}</p>
                  <div className="flex gap-2 mt-2 text-xs text-gray-400">
                    <span>{member.qual}</span>
                    <span>·</span>
                    <span>{member.exp}</span>
                  </div>
                </div>
                <AnimatePresence>
                  {hoveredCard === member.name && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 bg-[#111111]/95 flex items-center justify-center p-5"
                    >
                      <div className="text-center text-white">
                        <p className="font-heading font-bold text-sm mb-1">{member.name}</p>
                        <p className="text-white/60 text-xs mb-2">{member.subject} · {member.dept}</p>
                        <p className="text-white/80 text-xs leading-relaxed">{member.bio}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
