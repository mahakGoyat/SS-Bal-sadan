import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ZoomIn, ChevronLeft, ChevronRight } from "lucide-react";

const categories = ["All", "Annual Function", "Republic Day", "Independence Day", "Cultural", "Prize Distribution", "Sports Day"];

const photos = [
  { id: 1,  src: "/gallery/img0.webp",  thumb: "/gallery/img0_thumb.webp",  category: "Cultural",           title: "Rajasthani Folk Dance" },
  { id: 2,  src: "/gallery/img1.webp",  thumb: "/gallery/img1_thumb.webp",  category: "Cultural",           title: "Garba Dance Performance" },
  { id: 3,  src: "/gallery/img11.webp", thumb: "/gallery/img11_thumb.webp", category: "Prize Distribution", title: "Teacher Felicitation" },
  { id: 12, src: "/gallery/img12.webp", thumb: "/gallery/img12_thumb.webp", category: "Annual Function",    title: "Parent Teacher Meeting" },
  { id: 13, src: "/gallery/img13.webp", thumb: "/gallery/img13_thumb.webp", category: "Annual Function",    title: "Admission Day" },
  { id: 22, src: "/gallery/img16.webp", thumb: "/gallery/img16_thumb.webp", category: "Annual Function",    title: "School Assembly" },
  { id: 4,  src: "/gallery/img3.webp",  thumb: "/gallery/img3_thumb.webp",  category: "Prize Distribution", title: "Sports Achievement Awards" },
  { id: 5,  src: "/gallery/img4.webp",  thumb: "/gallery/img4_thumb.webp",  category: "Prize Distribution", title: "Merit Prize Distribution" },
  { id: 6,  src: "/gallery/img5.webp",  thumb: "/gallery/img5_thumb.webp",  category: "Cultural",           title: "Classical Dance Recital" },
  { id: 7,  src: "/gallery/img6.webp",  thumb: "/gallery/img6_thumb.webp",  category: "Annual Function",    title: "Back to School Welcome" },
  { id: 8,  src: "/gallery/img7.webp",  thumb: "/gallery/img7_thumb.webp",  category: "Cultural",           title: "Annual Function Dance" },
  { id: 9,  src: "/gallery/img8.webp",  thumb: "/gallery/img8_thumb.webp",  category: "Annual Function",    title: "Fancy Dress — Army Parade" },
  { id: 10, src: "/gallery/img9.webp",  thumb: "/gallery/img9_thumb.webp",  category: "Independence Day",   title: "Independence Day Dance" },
  { id: 11, src: "/gallery/img10.webp", thumb: "/gallery/img10_thumb.webp", category: "Republic Day",       title: "Republic Day Cultural Program" },
  { id: 20, src: "/gallery/img14.webp", thumb: "/gallery/img14_thumb.webp", category: "Cultural",           title: "Mother's Day Celebration" },
  { id: 21, src: "/gallery/img15.webp", thumb: "/gallery/img15_thumb.webp", category: "Prize Distribution", title: "Award Ceremony" },
  { id: 17, src: "/gallery/sports2.webp", thumb: "/gallery/sports2_thumb.webp", category: "Sports Day",     title: "Sports Day Activities" },
];


export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [lightbox, setLightbox] = useState<number | null>(null);

  useEffect(() => {
    document.title = "Gallery — SS Bal Sadan School Siwan, Kaithal";
  }, []);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(null);
      if (e.key === "ArrowRight" && lightbox !== null) setLightbox((i) => (i! + 1) % filtered.length);
      if (e.key === "ArrowLeft" && lightbox !== null) setLightbox((i) => (i! - 1 + filtered.length) % filtered.length);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  });

  const filtered = activeCategory === "All" ? photos : photos.filter((p) => p.category === activeCategory);

  return (
    <div className="pt-16 lg:pt-20">
      {/* Hero */}
      <div className="relative py-12 sm:py-20 lg:py-28 text-white text-center overflow-hidden">
        <div className="absolute inset-0">
          <img src="/school-event.webp" alt="Gallery" className="w-full h-full object-cover object-center" loading="lazy" />
          <div className="absolute inset-0 bg-[#000000]/65"></div>
        </div>
        <div className="relative z-10">
          <p className="text-gray-200 text-sm font-semibold uppercase tracking-widest mb-2">Visual Stories</p>
          <h1 className="font-heading font-bold text-2xl sm:text-4xl lg:text-6xl">Photo Gallery</h1>
        </div>
      </div>

      {/* Category Filter */}
      <section className="py-10 bg-white border-b border-gray-100 sticky top-16 lg:top-20 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                data-testid={`tab-gallery-${cat.toLowerCase().replace(" ", "-")}`}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${activeCategory === cat ? "bg-[#111111] text-white shadow-md" : "bg-[#f5f5f5] text-gray-600 hover:bg-[#111111]/10 hover:text-[#111111]"}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Photo Grid */}
      <section className="py-14 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4"
            >
              {filtered.map((photo, idx) => (
                <motion.div
                  key={photo.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: idx * 0.04 }}
                  className="relative group overflow-hidden rounded-xl cursor-pointer shadow-sm hover:shadow-lg transition-shadow"
                  onClick={() => setLightbox(idx)}
                  data-testid={`img-gallery-${photo.id}`}
                >
                  <img
                    src={photo.thumb}
                    alt={photo.title}
                    className="w-full h-44 object-cover group-hover:scale-110 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-[#111111]/0 group-hover:bg-[#111111]/70 transition-all duration-300 flex items-center justify-center">
                    <ZoomIn className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/70 to-transparent p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <p className="text-white text-xs font-medium">{photo.title}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-black/95 flex items-center justify-center p-4"
            onClick={() => setLightbox(null)}
          >
            {/* Close */}
            <button
              className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors z-10"
              onClick={() => setLightbox(null)}
            >
              <X className="w-8 h-8" />
            </button>

            {/* Prev Button */}
            <button
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white rounded-full p-3 transition-all z-10"
              onClick={(e) => { e.stopPropagation(); setLightbox((lightbox - 1 + filtered.length) % filtered.length); }}
            >
              <ChevronLeft className="w-7 h-7" />
            </button>

            {/* Next Button */}
            <button
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white rounded-full p-3 transition-all z-10"
              onClick={(e) => { e.stopPropagation(); setLightbox((lightbox + 1) % filtered.length); }}
            >
              <ChevronRight className="w-7 h-7" />
            </button>

            {/* Image */}
            <motion.img
              key={lightbox}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              src={filtered[lightbox].src}
              alt={filtered[lightbox].title}
              className="max-w-4xl max-h-[85vh] w-full object-contain rounded-xl"
              onClick={(e) => e.stopPropagation()}
            />

            {/* Caption */}
            <div className="absolute bottom-6 text-white text-center">
              <p className="font-semibold">{filtered[lightbox].title}</p>
              <p className="text-sm text-white/60">{lightbox + 1} / {filtered.length}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
