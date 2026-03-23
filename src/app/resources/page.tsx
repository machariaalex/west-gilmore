"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiDownload,
  FiFileText,
  FiStar,
  FiSearch,
  FiBookOpen,
  FiUsers,
  FiAward,
} from "react-icons/fi";
import SectionReveal from "@/components/ui/SectionReveal";

type Category = "All" | "Bible Study" | "Devotional" | "Sunday School" | "Youth" | "Leadership";

const CATEGORIES: Category[] = ["All", "Bible Study", "Devotional", "Sunday School", "Youth", "Leadership"];

interface Resource {
  id: number;
  title: string;
  description: string;
  category: Category;
  fileType: "PDF";
  downloads: number;
  size: string;
  date: string;
  featured?: boolean;
}

const RESOURCES: Resource[] = [
  {
    id: 1,
    title: "Romans: The Gospel Explained",
    description: "A comprehensive 12-week study through the Book of Romans, exploring the depths of God's righteousness and grace.",
    category: "Bible Study",
    fileType: "PDF",
    downloads: 842,
    size: "3.2 MB",
    date: "2024-10-15",
    featured: true,
  },
  {
    id: 2,
    title: "Daily Devotional Guide – January 2025",
    description: "31 days of morning devotionals to start your day grounded in scripture and prayer.",
    category: "Devotional",
    fileType: "PDF",
    downloads: 614,
    size: "1.8 MB",
    date: "2025-01-01",
  },
  {
    id: 3,
    title: "Sunday School Curriculum: Q1 2025",
    description: "Full first-quarter curriculum with lessons, activities, and teacher guides for all age groups.",
    category: "Sunday School",
    fileType: "PDF",
    downloads: 389,
    size: "5.4 MB",
    date: "2024-12-20",
  },
  {
    id: 4,
    title: "Youth Discipleship Workbook",
    description: "A 10-session workbook designed to help teenagers build a solid foundation of faith.",
    category: "Youth",
    fileType: "PDF",
    downloads: 276,
    size: "2.9 MB",
    date: "2024-09-05",
  },
  {
    id: 5,
    title: "Servant Leadership Principles",
    description: "Biblical principles for church leaders and deacons, drawing from the life of Jesus and Paul's epistles.",
    category: "Leadership",
    fileType: "PDF",
    downloads: 198,
    size: "1.4 MB",
    date: "2024-11-12",
  },
  {
    id: 6,
    title: "Psalms: Songs of the Heart",
    description: "An 8-week devotional journey through selected Psalms, designed for personal or small group study.",
    category: "Bible Study",
    fileType: "PDF",
    downloads: 531,
    size: "2.6 MB",
    date: "2024-08-22",
  },
  {
    id: 7,
    title: "VBS 2024 – Take-Home Materials",
    description: "Activity sheets, memory verses, and family devotionals from this year's Vacation Bible School.",
    category: "Youth",
    fileType: "PDF",
    downloads: 447,
    size: "4.1 MB",
    date: "2024-07-18",
  },
  {
    id: 8,
    title: "New Members Orientation Guide",
    description: "Everything a new member needs to know about West Gilmore St Church of Christ, our beliefs, and ministries.",
    category: "Sunday School",
    fileType: "PDF",
    downloads: 163,
    size: "1.1 MB",
    date: "2024-06-01",
  },
];

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  "Bible Study": <FiBookOpen className="w-4 h-4" />,
  Devotional: <FiStar className="w-4 h-4" />,
  "Sunday School": <FiUsers className="w-4 h-4" />,
  Youth: <FiAward className="w-4 h-4" />,
  Leadership: <FiAward className="w-4 h-4" />,
};

const CATEGORY_COLORS: Record<string, string> = {
  "Bible Study": "bg-blue-100 text-blue-700",
  Devotional: "bg-yellow-100 text-yellow-700",
  "Sunday School": "bg-green-100 text-green-700",
  Youth: "bg-purple-100 text-purple-700",
  Leadership: "bg-orange-100 text-orange-700",
};

export default function ResourcesPage() {
  const [activeCategory, setActiveCategory] = useState<Category>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [downloadedIds, setDownloadedIds] = useState<number[]>([]);

  const featured = RESOURCES.find((r) => r.featured);

  const filtered = RESOURCES.filter((r) => {
    const matchesCategory = activeCategory === "All" || r.category === activeCategory;
    const matchesSearch =
      r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleDownload = (id: number) => {
    setDownloadedIds((prev) => [...prev, id]);
  };

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Page Header */}
      <section className="bg-[#1e3a5f] py-20 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-2 text-[#c9a84c] text-sm font-medium mb-5">
              <FiFileText className="w-4 h-4" />
              Free Downloads
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Ministry Resources
            </h1>
            <div className="gold-divider mx-auto mb-5" />
            <p className="text-white/70 text-lg max-w-2xl mx-auto">
              Grow in your faith with our library of Bible study guides, devotionals, and ministry materials — all free to download.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Featured Resource Banner */}
        {featured && (
          <SectionReveal>
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#1e3a5f] to-[#2d5a9e] p-8 mb-12 shadow-xl">
              <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-10">
                <div className="w-full h-full bg-[#c9a84c] rounded-l-full" />
              </div>
              <div className="relative flex flex-col sm:flex-row items-start sm:items-center gap-6">
                <div className="flex-shrink-0 w-16 h-16 bg-[#c9a84c] rounded-2xl flex items-center justify-center">
                  <FiStar className="w-8 h-8 text-white" />
                </div>
                <div className="flex-1">
                  <span className="inline-flex items-center gap-1 text-[#c9a84c] text-xs font-bold uppercase tracking-wider mb-2">
                    <FiStar className="w-3 h-3" /> Featured Resource
                  </span>
                  <h2 className="text-2xl font-bold text-white mb-1">{featured.title}</h2>
                  <p className="text-white/70 text-sm max-w-xl">{featured.description}</p>
                  <div className="flex items-center gap-4 mt-3 text-sm text-white/50">
                    <span>{featured.size}</span>
                    <span>•</span>
                    <span>{featured.downloads.toLocaleString()} downloads</span>
                  </div>
                </div>
                <button
                  onClick={() => handleDownload(featured.id)}
                  className="flex-shrink-0 btn-gold flex items-center gap-2 text-sm"
                >
                  <FiDownload />
                  {downloadedIds.includes(featured.id) ? "Downloaded!" : "Download Free"}
                </button>
              </div>
            </div>
          </SectionReveal>
        )}

        {/* Search + Filter */}
        <SectionReveal delay={0.1}>
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search resources..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="input-field pl-11"
              />
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex gap-2 flex-wrap mb-8">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  activeCategory === cat
                    ? "bg-[#1e3a5f] text-white shadow"
                    : "bg-white text-gray-600 border border-gray-200 hover:border-[#1e3a5f]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </SectionReveal>

        {/* Resource Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory + searchQuery}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filtered.length > 0 ? (
              filtered.map((resource, i) => (
                <motion.div
                  key={resource.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.07 }}
                  className="card-hover bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col"
                >
                  {/* File Icon & Category */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center flex-shrink-0">
                      <FiFileText className="w-6 h-6 text-red-500" />
                    </div>
                    <span
                      className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full ${
                        CATEGORY_COLORS[resource.category] || "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {CATEGORY_ICONS[resource.category]}
                      {resource.category}
                    </span>
                  </div>

                  <h3 className="font-bold text-[#1e3a5f] text-base mb-2 leading-snug">{resource.title}</h3>
                  <p className="text-gray-500 text-sm mb-4 flex-1 leading-relaxed">{resource.description}</p>

                  {/* Meta */}
                  <div className="flex items-center gap-3 text-xs text-gray-400 mb-4">
                    <span className="bg-gray-100 px-2 py-0.5 rounded font-mono">{resource.fileType}</span>
                    <span>{resource.size}</span>
                    <span className="flex items-center gap-1">
                      <FiDownload className="w-3 h-3" />
                      {resource.downloads.toLocaleString()}
                    </span>
                  </div>

                  <button
                    onClick={() => handleDownload(resource.id)}
                    className={`w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
                      downloadedIds.includes(resource.id)
                        ? "bg-green-50 text-green-700 border border-green-200"
                        : "bg-[#1e3a5f] text-white hover:bg-[#2d5a9e]"
                    }`}
                  >
                    <FiDownload className="w-4 h-4" />
                    {downloadedIds.includes(resource.id) ? "Downloaded" : "Download PDF"}
                  </button>
                </motion.div>
              ))
            ) : (
              <div className="col-span-3 text-center py-16 text-gray-400">
                <FiFileText className="w-12 h-12 mx-auto mb-3 opacity-30" />
                <p className="text-lg font-medium">No resources found</p>
                <p className="text-sm">Try adjusting your search or filter.</p>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </main>
  );
}
