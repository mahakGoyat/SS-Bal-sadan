import { useEffect } from "react";
import { motion } from "framer-motion";
import { Download, FileText, Shield, Bell, CreditCard, ArrowRight } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};
const stagger = { visible: { transition: { staggerChildren: 0.08 } } };

function DocRow({ title, date }: { title: string; date: string }) {
  return (
    <div className="flex items-center justify-between py-4 border-b border-gray-100 last:border-0 group hover:bg-[#f5f5f5] -mx-6 px-6 transition rounded">
      <div className="flex items-center gap-3">
        <FileText className="w-4 h-4 text-[#ffffff] flex-shrink-0" />
        <div>
          <p className="text-[#111111] font-medium text-sm">{title}</p>
          <p className="text-gray-400 text-xs">{date}</p>
        </div>
      </div>
      <button className="flex items-center gap-1.5 text-xs font-semibold text-[#111111] hover:text-[#ffffff] transition-colors" data-testid={`button-download-${title.slice(0, 10).replace(" ", "-")}`}>
        <Download className="w-3.5 h-3.5" />
        Download
      </button>
    </div>
  );
}

export default function Documents() {
  useEffect(() => {
    document.title = "Documents — SS Bal Sadan School Siwan, Kaithal";
  }, []);

  return (
    <div className="pt-16 lg:pt-20">
      <div className="relative py-12 sm:py-20 lg:py-28 text-white text-center overflow-hidden">
        <div className="absolute inset-0">
          <img src="/school-building.webp" alt="Documents" className="w-full h-full object-cover object-center" loading="lazy" />
          <div className="absolute inset-0 bg-[#000000]/65"></div>
        </div>
        <div className="relative z-10">
          <p className="text-gray-200 text-sm font-semibold uppercase tracking-widest mb-2">Resources</p>
          <h1 className="font-heading font-bold text-2xl sm:text-4xl lg:text-6xl">Documents & Downloads</h1>
        </div>
      </div>

      <section className="py-20 bg-[#f5f5f5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8">

            {/* Academic Documents */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-[#111111]/10 rounded-xl flex items-center justify-center">
                  <FileText className="w-5 h-5 text-[#111111]" />
                </div>
                <h3 className="font-heading font-bold text-[#111111] text-xl">Academic Documents</h3>
              </div>
              <DocRow title="Syllabus — Class 1 to 5 (2025-26)" date="Apr 2025" />
              <DocRow title="Syllabus — Class 6 to 8 (2025-26)" date="Apr 2025" />
              <DocRow title="Syllabus — Class 9 to 10 (2025-26)" date="Apr 2025" />
              <DocRow title="Syllabus — Class 11 to 12 (2025-26)" date="Apr 2025" />
              <DocRow title="Holiday List 2025-26" date="Mar 2025" />
              <DocRow title="Exam Date Sheet — First Term" date="Jun 2025" />
              <DocRow title="Sample Report Card Format" date="Mar 2025" />
            </motion.div>

            {/* Certificates & Approvals */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-[#ffffff]/10 rounded-xl flex items-center justify-center">
                  <Shield className="w-5 h-5 text-[#ffffff]" />
                </div>
                <h3 className="font-heading font-bold text-[#111111] text-xl">Certificates & Approvals</h3>
              </div>
              <DocRow title="HBSE Affiliation Certificate" date="2023" />
              <DocRow title="State Govt. Recognition Certificate" date="2023" />
              <DocRow title="Building Safety Certificate" date="2024" />
              <DocRow title="Fire Safety NOC" date="2024" />
              <DocRow title="POCSO Compliance Certificate" date="2024" />
              <DocRow title="Land Records / NOC" date="2022" />
            </motion.div>

            {/* Mandatory Disclosure */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center">
                  <Shield className="w-5 h-5 text-blue-500" />
                </div>
                <h3 className="font-heading font-bold text-[#111111] text-xl">Mandatory Public Disclosure</h3>
              </div>
              <p className="text-gray-500 text-sm mb-4">As per HBSE / Govt. of Haryana norms, the following documents are publicly available:</p>
              {["Name of the Society / Trust", "Period of Affiliation", "Land Area & Ownership Documents", "Fee Structure Document", "List of Staff with Qualifications", "Enrolment Data (Class-wise)", "Infrastructure Details"].map((item) => (
                <div key={item} className="flex items-center gap-3 py-3 border-b border-gray-50 last:border-0">
                  <div className="w-2 h-2 rounded-full bg-[#ffffff] flex-shrink-0"></div>
                  <span className="text-sm text-gray-700">{item}</span>
                  <button className="ml-auto text-xs text-[#111111] hover:text-[#ffffff] font-semibold flex items-center gap-1 transition-colors">
                    <Download className="w-3 h-3" />View
                  </button>
                </div>
              ))}
            </motion.div>

            {/* Circulars */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-red-50 rounded-xl flex items-center justify-center">
                  <Bell className="w-5 h-5 text-red-400" />
                </div>
                <h3 className="font-heading font-bold text-[#111111] text-xl">Circulars & Notices</h3>
              </div>
              <DocRow title="Annual Sports Day Schedule 2025" date="23 Jan 2025" />
              <DocRow title="Fee Payment Reminder — Q1" date="15 Apr 2025" />
              <DocRow title="Summer Uniform Circular" date="1 Apr 2025" />
              <DocRow title="Parent-Teacher Meeting Notice" date="10 Mar 2025" />
              <DocRow title="Annual Function Program Details" date="28 Feb 2025" />
              <DocRow title="Board Exam Guidelines — Class 10 & 12" date="5 Jan 2025" />
            </motion.div>
          </div>

          {/* TC Request */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="mt-8 bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center">
                <ArrowRight className="w-5 h-5 text-green-500" />
              </div>
              <h3 className="font-heading font-bold text-[#111111] text-xl">Transfer Certificate (TC) Download / Request</h3>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <p className="text-gray-600 text-sm mb-4">Fill in the form to request a Transfer Certificate. The TC will be ready within 3-5 working days.</p>
                <div className="space-y-3">
                  {[
                    { label: "Student Name", id: "tc-name", placeholder: "Full name of student" },
                    { label: "Class & Roll No.", id: "tc-roll", placeholder: "e.g. Class 9 / Roll 42" },
                    { label: "Father's Name", id: "tc-father", placeholder: "Father's full name" },
                    { label: "Contact Number", id: "tc-phone", placeholder: "+91 XXXXX XXXXX" },
                    { label: "Reason for TC", id: "tc-reason", placeholder: "e.g. Change of city" },
                  ].map((f) => (
                    <div key={f.id}>
                      <label className="block text-xs font-semibold text-[#111111] mb-1">{f.label}</label>
                      <input type="text" data-testid={`input-${f.id}`} placeholder={f.placeholder} className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#111111] transition" />
                    </div>
                  ))}
                  <button data-testid="button-request-tc" className="w-full py-3 bg-[#111111] text-white rounded-xl font-semibold text-sm hover:bg-[#000000] transition mt-2">
                    Submit TC Request
                  </button>
                </div>
              </div>
              <div className="bg-[#f5f5f5] rounded-xl p-6">
                <p className="font-heading font-semibold text-[#111111] mb-3">TC Policy</p>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-start gap-2"><span className="text-[#ffffff] mt-0.5">•</span>TC is issued only after clearing all dues.</li>
                  <li className="flex items-start gap-2"><span className="text-[#ffffff] mt-0.5">•</span>Processing time: 3-5 working days.</li>
                  <li className="flex items-start gap-2"><span className="text-[#ffffff] mt-0.5">•</span>Parent/guardian must be present to collect.</li>
                  <li className="flex items-start gap-2"><span className="text-[#ffffff] mt-0.5">•</span>Carry school ID and parent's photo ID.</li>
                  <li className="flex items-start gap-2"><span className="text-[#ffffff] mt-0.5">•</span>TC fee: ₹100 (payable at accounts office).</li>
                </ul>
              </div>
            </div>
          </motion.div>

          {/* Fee Structure */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="mt-8 bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-[#ffffff]/10 rounded-xl flex items-center justify-center">
                <CreditCard className="w-5 h-5 text-[#ffffff]" />
              </div>
              <h3 className="font-heading font-bold text-[#111111] text-xl">Fee Structure — Academic Year 2025-26</h3>
            </div>
            <div className="overflow-x-auto rounded-xl border border-gray-100">
              <table className="w-full text-sm">
                <thead className="bg-[#111111] text-white">
                  <tr>
                    <th className="text-left px-5 py-3.5 font-semibold">Class</th>
                    <th className="text-right px-5 py-3.5 font-semibold">Tuition Fee</th>
                    <th className="text-right px-5 py-3.5 font-semibold">Annual Charges</th>
                    <th className="text-right px-5 py-3.5 font-semibold">Computer Fee</th>
                    <th className="text-right px-5 py-3.5 font-semibold">Sports Fee</th>
                    <th className="text-right px-5 py-3.5 font-semibold text-[#ffffff]">Total/Year</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {[
                    ["Nursery – KG", "₹6,000", "₹1,200", "₹600", "₹400", "₹8,200"],
                    ["Class 1 – 5", "₹8,400", "₹1,500", "₹800", "₹500", "₹11,200"],
                    ["Class 6 – 8", "₹10,200", "₹1,800", "₹1,000", "₹600", "₹13,600"],
                    ["Class 9 – 10", "₹12,000", "₹2,000", "₹1,200", "₹700", "₹15,900"],
                    ["Class 11 – 12 (Science)", "₹15,600", "₹2,500", "₹1,500", "₹800", "₹20,400"],
                    ["Class 11 – 12 (Commerce)", "₹13,200", "₹2,500", "₹1,200", "₹800", "₹17,700"],
                  ].map(([cls, tuit, annual, comp, sports, total], i) => (
                    <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-[#f5f5f5]/50"}>
                      <td className="px-5 py-3.5 font-medium text-[#111111]">{cls}</td>
                      <td className="px-5 py-3.5 text-right text-gray-600">{tuit}</td>
                      <td className="px-5 py-3.5 text-right text-gray-600">{annual}</td>
                      <td className="px-5 py-3.5 text-right text-gray-600">{comp}</td>
                      <td className="px-5 py-3.5 text-right text-gray-600">{sports}</td>
                      <td className="px-5 py-3.5 text-right font-bold text-[#111111]">{total}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mt-8">
              <div className="bg-[#f5f5f5] rounded-xl p-5">
                <p className="font-heading font-semibold text-[#111111] text-sm mb-3">Payment Schedule</p>
                <ul className="space-y-1.5 text-xs text-gray-600">
                  <li className="flex justify-between"><span>Quarter 1 (Apr-Jun)</span><span className="font-semibold">By Apr 15</span></li>
                  <li className="flex justify-between"><span>Quarter 2 (Jul-Sep)</span><span className="font-semibold">By Jul 15</span></li>
                  <li className="flex justify-between"><span>Quarter 3 (Oct-Dec)</span><span className="font-semibold">By Oct 15</span></li>
                  <li className="flex justify-between"><span>Quarter 4 (Jan-Mar)</span><span className="font-semibold">By Jan 15</span></li>
                  <li className="border-t border-gray-200 pt-2 text-red-500">Late fee: ₹50/day after due date</li>
                </ul>
              </div>
              <div className="bg-[#f5f5f5] rounded-xl p-5">
                <p className="font-heading font-semibold text-[#111111] text-sm mb-3">Payment Methods</p>
                <ul className="space-y-1.5 text-xs text-gray-600">
                  <li className="flex items-center gap-2"><span className="text-[#ffffff]">•</span>UPI: ssbalsadan@paytm</li>
                  <li className="flex items-center gap-2"><span className="text-[#ffffff]">•</span>Net Banking (all major banks)</li>
                  <li className="flex items-center gap-2"><span className="text-[#ffffff]">•</span>Cash at Accounts Office</li>
                  <li className="flex items-center gap-2"><span className="text-[#ffffff]">•</span>Cheque: "SS Bal Sadan School"</li>
                  <li className="flex items-center gap-2"><span className="text-[#ffffff]">•</span>A/c No: 1234567890 (PNB)</li>
                </ul>
              </div>
              <div className="bg-[#f5f5f5] rounded-xl p-5">
                <p className="font-heading font-semibold text-[#111111] text-sm mb-3">Scholarships & Concessions</p>
                <ul className="space-y-1.5 text-xs text-gray-600">
                  <li className="flex items-center gap-2"><span className="text-green-500">•</span>Merit Scholarship: 10-25% off</li>
                  <li className="flex items-center gap-2"><span className="text-green-500">•</span>SC/ST: 50% concession</li>
                  <li className="flex items-center gap-2"><span className="text-green-500">•</span>OBC: 25% concession</li>
                  <li className="flex items-center gap-2"><span className="text-green-500">•</span>Sibling discount: 10%</li>
                  <li className="flex items-center gap-2"><span className="text-green-500">•</span>Staff ward: 50% waiver</li>
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
