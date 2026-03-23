"use client";

import { useState } from "react";
import Image from "next/image";
import { FiX, FiChevronLeft, FiChevronRight, FiMaximize2, FiCamera } from "react-icons/fi";
import SectionReveal from "@/components/ui/SectionReveal";

type GalleryCategory = "All" | "Worship" | "Events" | "Community" | "Youth";

interface GalleryImage {
  id: number;
  src: string;
  alt: string;
  category: Exclude<GalleryCategory, "All">;
  span?: "tall" | "wide" | "normal";
}

const IMAGES: GalleryImage[] = [
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1438232992991-995b671e6a5b?w=800&h=600&fit=crop",
    alt: "Sunday morning worship service",
    category: "Worship",
    span: "wide",
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1491438590914-bc09fcaaf77a?w=600&h=800&fit=crop",
    alt: "Congregation in prayer",
    category: "Worship",
    span: "tall",
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600&h=400&fit=crop",
    alt: "Community fellowship meal",
    category: "Community",
    span: "normal",
  },
  {
    id: 4,
    src: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=800&h=500&fit=crop",
    alt: "Youth group outdoor retreat",
    category: "Youth",
    span: "wide",
  },
  {
    id: 5,
    src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=700&fit=crop",
    alt: "Gospel meeting speaker",
    category: "Events",
    span: "tall",
  },
  {
    id: 6,
    src: "https://images.unsplash.com/photo-1519671282429-b8f8e1f6b1e7?w=600&h=400&fit=crop",
    alt: "Baptism celebration",
    category: "Worship",
    span: "normal",
  },
  {
    id: 7,
    src: "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=600&h=400&fit=crop",
    alt: "Food pantry outreach",
    category: "Community",
    span: "normal",
  },
  {
    id: 8,
    src: "https://images.unsplash.com/photo-1560541919-eb5c2da6a5a3?w=800&h=550&fit=crop",
    alt: "Annual congregation picnic",
    category: "Events",
    span: "wide",
  },
  {
    id: 9,
    src: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600&h=700&fit=crop",
    alt: "Children's Bible class",
    category: "Youth",
    span: "tall",
  },
];

const CATEGORIES: GalleryCategory[] = ["All", "Worship", "Events", "Community", "Youth"];

const CATEGORY_COLORS: Record<Exclude<GalleryCategory, "All">, string> = {
  Worship: "#1e3a5f",
  Events: "#c9a84c",
  Community: "#2d5a9e",
  Youth: "#e8c97a",
};

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState<GalleryCategory>("All");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filtered =
    activeCategory === "All"
      ? IMAGES
      : IMAGES.filter((img) => img.category === activeCategory);

  function openLightbox(id: number) {
    const idx = filtered.findIndex((img) => img.id === id);
    setLightboxIndex(idx);
  }

  function closeLightbox() {
    setLightboxIndex(null);
  }

  function prevImage() {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex - 1 + filtered.length) % filtered.length);
  }

  function nextImage() {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex + 1) % filtered.length);
  }

  const activeLightboxImage = lightboxIndex !== null ? filtered[lightboxIndex] : null;

  return (
    <div className="min-h-screen">
      {/* Hero Header */}
      <section className="relative min-h-[360px] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(135deg, #1e3a5f 0%, #2d5a9e 50%, #1a2e4a 100%)" }}
        />
        <div
          className="absolute top-[-80px] right-[-80px] w-[320px] h-[320px] rounded-full opacity-10"
          style={{ background: "radial-gradient(circle, #c9a84c 0%, transparent 70%)" }}
        />
        <div className="relative z-10 text-center px-6 py-16">
          <p className="text-[#c9a84c] font-semibold tracking-widest uppercase text-sm mb-4">
            Our Story in Pictures
          </p>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">Gallery</h1>
          <div className="gold-divider mx-auto mb-6" />
          <p className="text-blue-100 text-lg max-w-xl mx-auto">
            A glimpse into the life and ministry of West Gilmore St Church of Christ.
          </p>
        </div>
      </section>

      {/* Category Filter Tabs */}
      <section className="bg-white border-b border-gray-100 shadow-sm sticky top-0 z-30">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-center gap-1 overflow-x-auto py-4 scrollbar-none">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-all flex-shrink-0 ${
                  activeCategory === cat
                    ? "text-white shadow-md"
                    : "text-gray-600 bg-gray-100 hover:bg-gray-200"
                }`}
                style={
                  activeCategory === cat
                    ? { background: "linear-gradient(135deg, #1e3a5f, #2d5a9e)" }
                    : {}
                }
              >
                {cat}
                <span className="ml-1.5 text-xs opacity-70">
                  ({cat === "All" ? IMAGES.length : IMAGES.filter((i) => i.category === cat).length})
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Masonry Grid */}
      <section className="py-14 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          {filtered.length === 0 ? (
            <div className="text-center py-20">
              <FiCamera className="text-5xl text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-lg">No images in this category yet.</p>
            </div>
          ) : (
            <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
              {filtered.map((img, i) => {
                const heightClass =
                  img.span === "tall" ? "h-80" : img.span === "wide" ? "h-52" : "h-64";
                const catColor =
                  CATEGORY_COLORS[img.category as Exclude<GalleryCategory, "All">];
                return (
                  <SectionReveal key={img.id} direction="fade" delay={i * 0.05}>
                    <div
                      className={`relative ${heightClass} w-full rounded-2xl overflow-hidden cursor-pointer group card-hover shadow-sm break-inside-avoid`}
                      onClick={() => openLightbox(img.id)}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => e.key === "Enter" && openLightbox(img.id)}
                      aria-label={`View ${img.alt}`}
                    >
                      <Image
                        src={img.src}
                        alt={img.alt}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                      {/* Overlay */}
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center">
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/20 backdrop-blur-sm rounded-full p-3">
                          <FiMaximize2 className="text-white text-xl" />
                        </div>
                      </div>
                      {/* Category badge */}
                      <div className="absolute top-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <span
                          className="text-xs font-semibold px-2.5 py-1 rounded-full"
                          style={{
                            background: catColor,
                            color: img.category === "Youth" || img.category === "Events" ? "#1a1a2e" : "white",
                          }}
                        >
                          {img.category}
                        </span>
                      </div>
                      {/* Caption */}
                      <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300"
                        style={{ background: "linear-gradient(to top, rgba(30,58,95,0.9), transparent)" }}>
                        <p className="text-white text-sm font-medium">{img.alt}</p>
                      </div>
                    </div>
                  </SectionReveal>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Lightbox Modal */}
      {activeLightboxImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          style={{ background: "rgba(0,0,0,0.92)" }}
          onClick={closeLightbox}
        >
          {/* Close */}
          <button
            className="absolute top-5 right-5 w-10 h-10 rounded-full flex items-center justify-center text-white hover:text-[#c9a84c] transition-colors z-10"
            style={{ background: "rgba(255,255,255,0.1)" }}
            onClick={closeLightbox}
            aria-label="Close lightbox"
          >
            <FiX size={20} />
          </button>

          {/* Counter */}
          <div className="absolute top-5 left-1/2 -translate-x-1/2 text-white/70 text-sm">
            {(lightboxIndex ?? 0) + 1} / {filtered.length}
          </div>

          {/* Prev */}
          <button
            className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full flex items-center justify-center text-white hover:text-[#c9a84c] transition-colors z-10"
            style={{ background: "rgba(255,255,255,0.1)" }}
            onClick={(e) => { e.stopPropagation(); prevImage(); }}
            aria-label="Previous image"
          >
            <FiChevronLeft size={22} />
          </button>

          {/* Image */}
          <div
            className="relative max-w-4xl w-full mx-16 rounded-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
            style={{ maxHeight: "85vh" }}
          >
            <div className="relative w-full" style={{ paddingBottom: "60%" }}>
              <Image
                src={activeLightboxImage.src.replace(/w=\d+&h=\d+/, "w=1200&h=800")}
                alt={activeLightboxImage.alt}
                fill
                className="object-cover"
                sizes="(max-width: 1200px) 100vw, 1200px"
                priority
              />
            </div>
            {/* Caption bar */}
            <div
              className="px-6 py-4 flex items-center justify-between"
              style={{ background: "linear-gradient(135deg, #1e3a5f, #2d5a9e)" }}
            >
              <p className="text-white font-medium">{activeLightboxImage.alt}</p>
              <span
                className="text-xs font-semibold px-3 py-1 rounded-full text-white"
                style={{ background: CATEGORY_COLORS[activeLightboxImage.category as Exclude<GalleryCategory, "All">] }}
              >
                {activeLightboxImage.category}
              </span>
            </div>
          </div>

          {/* Next */}
          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full flex items-center justify-center text-white hover:text-[#c9a84c] transition-colors z-10"
            style={{ background: "rgba(255,255,255,0.1)" }}
            onClick={(e) => { e.stopPropagation(); nextImage(); }}
            aria-label="Next image"
          >
            <FiChevronRight size={22} />
          </button>

          {/* Thumbnail strip */}
          <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex items-center gap-2 overflow-x-auto max-w-[90vw] px-2">
            {filtered.map((img, i) => (
              <button
                key={img.id}
                onClick={(e) => { e.stopPropagation(); setLightboxIndex(i); }}
                className={`flex-shrink-0 relative w-12 h-12 rounded-lg overflow-hidden transition-all ${
                  i === lightboxIndex ? "ring-2 ring-[#c9a84c] scale-110" : "opacity-60 hover:opacity-90"
                }`}
                aria-label={`Go to image ${i + 1}`}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover"
                  sizes="48px"
                />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
