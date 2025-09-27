"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

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

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await fetch(`/api/blog/${id}`);
        const data = await res.json();

        console.log("Fetched blog data:", data); 

        setForm({
          title: data.title || "the title",
          summary: data.summary || "the summary",
          category: data.category || [],
          img: data.img || "",
        });
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch blog:", err);
      }
    };

    if (id) fetchBlog();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log("Sending data:", form);

    const res = await fetch(`/api/blog/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      router.push("/blog"); 
    } else {
      console.error("Update failed");
    }
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const categories = e.target.value.split(",").map((cat) => cat.trim());
    setForm({ ...form, category: categories });
  };

  if (loading) return <p>Loading blog data...</p>;

  return (
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto space-y-4">
      <input
        className="w-full border rounded p-2"
        placeholder="Title"
        value={form.title}
        onChange={(e) => setForm({ ...form, title: e.target.value })}
      />
      <textarea
        className="w-full border rounded p-2"
        placeholder="Summary"
        value={form.summary}
        onChange={(e) => setForm({ ...form, summary: e.target.value })}
      />
      <input
        className="w-full border rounded p-2"
        placeholder="Image URL"
        value={form.img}
        onChange={(e) => setForm({ ...form, img: e.target.value })}
      />
      <input
        className="w-full border rounded p-2"
        placeholder="Categories (comma separated)"
        value={form.category.join(", ")}
        onChange={handleCategoryChange}
      />
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Update Blog
      </button>
    </form>
  );
}
