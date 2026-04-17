"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

export default function EditBlogPage() {
  const { id } = useParams();
  const router = useRouter();

  const [form, setForm] = useState({
    title: "",
    summary: "",
    category: [] as string[],
    img: "",
  });

  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await fetch(`/api/blog/${id}`);
        const data = await res.json();

        console.log("Fetched blog data:", data);

        setForm({
          title: data.title || "",
          summary: data.summary || "",
          category: data.category || [],
          img: data.img || "",
        });
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch blog:", err);
        toast.error("Failed to load blog data");
        setLoading(false);
      }
    };

    if (id) fetchBlog();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!form.title || !form.summary) {
      toast.error("Please fill in all required fields");
      setIsSubmitting(false);
      return;
    }

    try {
      const res = await fetch(`/api/blog/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        toast.success("Blog updated successfully!");
        router.push("/blog");
      } else {
        const error = await res.json();
        toast.error(error.error || "Update failed");
        console.error("Update failed");
      }
    } catch (err) {
      console.error("Error updating blog:", err);
      toast.error("Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const categories = e.target.value.split(",").map((cat) => cat.trim());
    setForm({ ...form, category: categories });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[var(--bg-primary)]">
        <Navbar />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-solid border-[var(--primary)] border-r-transparent"></div>
            <p className="mt-4 text-[var(--text-muted)]">Loading blog data...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[var(--bg-primary)] to-[var(--bg-secondary)] flex flex-col">
      <Navbar />
      
      <div className="flex-grow flex items-center justify-center py-16 px-4 mt-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-2xl"
        >
          <div
            className="rounded-2xl shadow-xl p-8 md:p-10"
            style={{
              background: 'var(--card-bg)',
              border: `1px solid var(--border-color)`,
              boxShadow: 'var(--card-shadow)',
            }}
          >
            <div className="text-center mb-8">
              <h1 className="text-3xl md:text-4xl font-bold text-[var(--text-primary)] mb-2">
                Edit <span className="text-[var(--primary)]">Blog Post</span>
              </h1>
              <p className="text-[var(--text-muted)]">
                Update your blog post information below
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-[var(--text-secondary)] font-semibold mb-2">
                  Title *
                </label>
                <input
                  className="w-full rounded-lg p-3 transition-all duration-300 focus:scale-[1.02]"
                  style={{
                    border: `2px solid var(--border-color)`,
                    background: 'var(--input-bg)',
                    color: 'var(--text-primary)',
                    outline: 'none',
                  }}
                  placeholder="Enter blog title"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  required
                />
              </div>

              <div>
                <label className="block text-[var(--text-secondary)] font-semibold mb-2">
                  Summary *
                </label>
                <textarea
                  className="w-full rounded-lg p-3 transition-all duration-300 focus:scale-[1.02]"
                  style={{
                    border: `2px solid var(--border-color)`,
                    background: 'var(--input-bg)',
                    color: 'var(--text-primary)',
                    outline: 'none',
                  }}
                  placeholder="Enter blog summary"
                  value={form.summary}
                  onChange={(e) => setForm({ ...form, summary: e.target.value })}
                  rows={5}
                  required
                />
                <p className="text-xs text-[var(--text-dim)] mt-1">
                  You can include HTML links like: {"<a href='https://example.com'>Link</a>"}
                </p>
              </div>

              <div>
                <label className="block text-[var(--text-secondary)] font-semibold mb-2">
                  Image URL
                </label>
                <input
                  className="w-full rounded-lg p-3 transition-all duration-300 focus:scale-[1.02]"
                  style={{
                    border: `2px solid var(--border-color)`,
                    background: 'var(--input-bg)',
                    color: 'var(--text-primary)',
                    outline: 'none',
                  }}
                  placeholder="Enter image URL"
                  value={form.img}
                  onChange={(e) => setForm({ ...form, img: e.target.value })}
                />
                {form.img && (
                  <div className="mt-3 rounded-lg overflow-hidden border border-[var(--border-color)]">
                    <img
                      src={form.img}
                      alt="Preview"
                      className="w-full h-48 object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = 'none';
                      }}
                    />
                  </div>
                )}
              </div>

              <div>
                <label className="block text-[var(--text-secondary)] font-semibold mb-2">
                  Categories
                </label>
                <input
                  className="w-full rounded-lg p-3 transition-all duration-300 focus:scale-[1.02]"
                  style={{
                    border: `2px solid var(--border-color)`,
                    background: 'var(--input-bg)',
                    color: 'var(--text-primary)',
                    outline: 'none',
                  }}
                  placeholder="Finance, Website, Case Study (comma separated)"
                  value={form.category.join(", ")}
                  onChange={handleCategoryChange}
                />
                {form.category.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-3">
                    {form.category.map((cat, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 rounded-full text-sm font-semibold"
                        style={{
                          background: 'var(--bg-secondary)',
                          color: 'var(--primary)',
                          border: `1px solid var(--border-color)`,
                        }}
                      >
                        {cat}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex gap-4 pt-4">
                <motion.button
                  type="button"
                  onClick={() => router.back()}
                  className="flex-1 py-3 rounded-lg font-semibold transition-all duration-300"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  style={{
                    background: 'var(--bg-secondary)',
                    color: 'var(--text-primary)',
                    border: `1px solid var(--border-color)`,
                  }}
                >
                  Cancel
                </motion.button>
                
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 py-3 rounded-lg font-semibold text-white transition-all duration-300 relative overflow-hidden group"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  style={{
                    background: 'var(--button-primary)',
                    boxShadow: 'var(--neon-glow)',
                  }}
                >
                  <span
                    className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out"
                    style={{
                      background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
                    }}
                  />
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="white" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="white" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Updating...
                      </>
                    ) : (
                      "Update Blog"
                    )}
                  </span>
                </motion.button>
              </div>
            </form>
          </div>
        </motion.div>
      </div>
      
      <Footer />
    </div>
  );
}