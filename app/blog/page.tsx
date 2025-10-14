"use client";
import Image from "next/image";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import React, { useState, useRef, useEffect, useMemo } from "react";
import { toast } from "react-hot-toast";

function getFilePreviewUrl(fileUrl?: string) {
  if (!fileUrl) return "#";

  // ✅ If full Cloudinary or external URL, return as is
  if (fileUrl.startsWith("http") || fileUrl.includes("cloudinary.com")) {
    return fileUrl;
  }

  // ✅ Normalize local uploads (in /public/uploads)
  if (fileUrl.startsWith("/uploads")) {
    return fileUrl; // already public path
  }

  // ✅ Fallback for older stored paths (just filenames)
  return `/uploads/${fileUrl}`;
}

function BlogCard({
  img,
  title,
  summary,
  category,
  fileUrl,
  onEdit,
  onDelete,
  canEdit,
}: {
  img: string;
  title: string;
  summary: string;
  category: string[];
  fileUrl?: string;
  onEdit?: () => void;
  onDelete?: () => void;
  canEdit?: boolean;
}) {
  return (
    <div
      className="bg-gradient-to-br from-white via-[#f6f3ff] to-[#ede7ff] border border-[#e6e0fa] rounded-[32px] shadow-2xl w-[360px] sm:w-[380px] md:w-[400px] min-h-[480px] max-h-[480px] p-7 flex flex-col mb-8 mx-4 transition-all duration-300 hover:shadow-[0_16px_48px_#b9aaff55] hover:border-[#b9aaff] hover:-translate-y-2 hover:scale-[1.035]"
      style={{ height: "480px" }}
    >
      <Image
        src={img}
        alt="Blog"
        width={400}
        height={180}
        className="rounded-[22px] object-cover w-full h-[180px] mb-5"
        style={{ aspectRatio: "16/9" }}
      />
      <div className="flex items-center gap-2 text-[#9066F9] text-[16px] font-medium mb-2">
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="#9066F9"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <circle cx="12" cy="12" r="10" stroke="#9066F9" strokeWidth="2" />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 6v6l4 2"
            stroke="#9066F9"
            strokeWidth="2"
          />
        </svg>
        <span>5 min read</span>
      </div>
      <div
        style={{
          overflowY: "auto",
          flex: 1,
          minHeight: 0,
          marginBottom: "1rem",
          scrollbarWidth: "thin",
          scrollbarColor: "#8C5BFF #f6f3ff",
        }}
        className="blogcard-scrollbar"
      >
        <h3 className="text-[24px] font-bold text-[#3d2966] leading-tight mb-1">
          {title}
        </h3>
        <p
          className="text-[#6d6a7c] text-[17px] mb-4"
          dangerouslySetInnerHTML={{
            __html: summary.replace(
              /<a /g,
              '<a target="_blank" rel="noopener noreferrer" '
            ),
          }}
        ></p>
      </div>
      <div className="flex gap-2 flex-wrap mb-4">
        {category.map((cat, i) => (
          <span
            key={i}
            className="bg-[#e6e0fa] text-[#9066F9] rounded-[12px] px-4 py-1 font-semibold text-[15px] w-fit shadow-sm"
          >
            {cat}
          </span>
        ))}
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: "auto",
        }}
      >
        {fileUrl ? (
          <a
            href={getFilePreviewUrl(fileUrl)}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: "#8C5BFF",
              fontWeight: 600,
              fontSize: 18,
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
              gap: 6,
              cursor: "pointer",
            }}
          >
            Learn more <span style={{ fontSize: 20 }}>→</span>
          </a>
        ) : (
          <span
            style={{
              color: "#8C5BFF",
              fontWeight: 600,
              fontSize: 18,
              display: "flex",
              alignItems: "center",
              gap: 6,
              cursor: "default",
              opacity: 0.6,
            }}
          >
            Learn more <span style={{ fontSize: 20 }}>→</span>
          </span>
        )}

        {canEdit && (
          <div style={{ display: "flex", gap: 8 }}>
            <button
              style={{
                background: "#e6e0fa",
                color: "#8C5BFF",
                border: "none",
                padding: "6px 12px",
                borderRadius: 6,
                cursor: "pointer",
                fontWeight: 600,
                fontSize: 14,
              }}
              onClick={onEdit}
            >
              Edit
            </button>
            <button
              style={{
                background: "#fdecea",
                color: "#ff4d4f",
                border: "none",
                padding: "6px 12px",
                borderRadius: 6,
                cursor: "pointer",
                fontWeight: 600,
                fontSize: 14,
              }}
              onClick={onDelete}
            >
              Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default function BlogPage() {
  const [showCreate, setShowCreate] = useState(false);
  const [newBlog, setNewBlog] = useState({
    title: "",
    img: "",
    summary: "",
    category: ["Finance"],
    fileUrl: "",
  });
  const [selectedCategories, setSelectedCategories] = useState<string[]>([
    "All",
  ]);
  const [showAll, setShowAll] = useState(false);
  const [blogs, setBlogs] = useState<
    {
      id: string;
      title: string;
      img: string;
      summary: string;
      category: string[];
      fileUrl?: string;
    }[]
  >([]);
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const categoryRef = useRef<HTMLDivElement>(null);
  const [imagePreview, setImagePreview] = useState<string>("");
  const blogListRef = React.useRef<HTMLDivElement>(null);
  const [multiDropdownOpen, setMultiDropdownOpen] = useState(false);
  const multiDropdownRef = useRef<HTMLDivElement>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [fileFile, setFileFile] = useState<File | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editingBlogId, setEditingBlogId] = useState<string | null>(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await fetch("/api/blogs");
        const data = await res.json();
        setBlogs(data);
      } catch (err) {
        console.error("Error fetching blogs:", err);
      }
    };

    fetchBlogs();
  }, []);

  const handleInput = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setNewBlog({ ...newBlog, [e.target.name]: e.target.value });
  };

  const handleCategorySelect = (cat: string) => {
    if (newBlog.category.includes(cat)) {
      setNewBlog({
        ...newBlog,
        category: newBlog.category.filter((c) => c !== cat),
      });
    } else {
      setNewBlog({ ...newBlog, category: [...newBlog.category, cat] });
    }
  };

  const handleRemoveCategory = (cat: string) => {
    setNewBlog({
      ...newBlog,
      category: newBlog.category.filter((c) => c !== cat),
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!newBlog.title || !newBlog.summary || (!imageFile && !isEditing)) {
      toast.error("Please fill all required fields and select an image.");
      return;
    }

    try {
      if (isEditing && editingBlogId) {
        const formData = new FormData();
        formData.append("title", newBlog.title);
        formData.append("summary", newBlog.summary);
        formData.append("category", newBlog.category.join(","));

        if (imageFile) {
          formData.append("image", imageFile);
        } else {
          formData.append("image", newBlog.img);
        }
        if (fileFile) {
          formData.append("file", fileFile);
        } else {
          formData.append("fileUrl", newBlog.fileUrl || "");
        }

        const res = await fetch(`/api/blog/${editingBlogId}`, {
          method: "PUT",
          body: formData,
        });

        const data = await res.json();

        if (res.ok) {
          const updatedBlogs = blogs.map((b) =>
            b.id === editingBlogId ? data : b
          );
          setBlogs(updatedBlogs);
          toast.success("Blog updated!");
        } else {
          toast.error(data.error || "Update failed.");
        }
      } else {
        const formData = new FormData();
        formData.append("title", newBlog.title);
        formData.append("summary", newBlog.summary);
        formData.append("category", newBlog.category.join(","));
        if (imageFile) {
          formData.append("image", imageFile);
        }
        if (fileFile) {
          formData.append("file", fileFile);
        }

        const res = await fetch("/api/create-blog", {
          method: "POST",
          body: formData,
        });

        const data = await res.json();

        if (res.ok) {
          setBlogs([data, ...blogs]);
          toast.success("Blog created successfully!");
        } else {
          toast.error(data.error || "Creation failed.");
        }
      }

      setNewBlog({
        title: "",
        summary: "",
        category: ["Finance"],
        img: "",
        fileUrl: "",
      });
      setImagePreview("");
      setImageFile(null);
      setFileFile(null);
      setIsEditing(false);
      setEditingBlogId(null);
      setShowCreate(false);
    } catch (err) {
      console.error("Blog submit error:", err);
      toast.error("Something went wrong.");
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setImagePreview(url);
      setNewBlog({ ...newBlog, img: url });
      setImageFile(file);
    }
  };

  const filteredBlogs = selectedCategories.includes("All")
    ? blogs
    : blogs.filter((blog) =>
        blog.category.some((cat) => selectedCategories.includes(cat))
      );
  const blogsToDisplay = showAll ? blogs : filteredBlogs;

  const handleLoadMore = () => {
    setShowAll(true);
  };

  const handleDiscoverNow = () => {
    if (blogListRef.current) {
      blogListRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        categoryRef.current &&
        !categoryRef.current.contains(event.target as Node)
      ) {
        setShowCategoryDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        multiDropdownRef.current &&
        !multiDropdownRef.current.contains(event.target as Node)
      ) {
        setMultiDropdownOpen(false);
      }
    }
    if (multiDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [multiDropdownOpen]);

  const handleMultiSelect = (cat: string) => {
    if (cat === "All") {
      setSelectedCategories(["All"]);
    } else {
      let newSelected = selectedCategories.includes(cat)
        ? selectedCategories.filter((c) => c !== cat)
        : [...selectedCategories.filter((c) => c !== "All"), cat];
      if (newSelected.length === 0) newSelected = ["All"];
      setSelectedCategories(newSelected);
    }
    setShowAll(false);
  };

  const categories = [
    "Finance",
    "Website",
    "Case Study",
    "Marketing",
    "Product",
    "Tech",
    "Other",
  ];

  const allowedEmails = useMemo(
    () => [
      "ashishmishra19122000@gmail.com",
      "19122000ashishmishra@gmail.com",
      "27ashish.mishra@fostiima.org",
      "27surbhi.arora@fostiima.org",
      "27shubh.gupta@fostiima.org",
      "27anurag.sharma@fostiima.org",
      "27tanishk.ghadiya@fostiima.org",
      "27payal.naik@fostiima.org",
      "27rajat.jain@fostiima.org",
      "27kriti.jain@fostiima.org",
      "27diksha.sharma@fostiima.org",
      "27aryan.sehrawat@fostiima.org",
      "27aman1@fostiima.org",
      "27sparsh.jain@fostiima.org",
      "27prateek@fostiima.org",
      "fincomm@fostiima.org",
    ],
    []
  );
  const [canEdit, setCanEdit] = useState(false);

  useEffect(() => {
    const email = localStorage.getItem("fcUserEmail");
    setCanEdit(allowedEmails.includes(email || ""));
  }, [allowedEmails]);

  const handleEditBlog = (blog: (typeof blogs)[0]) => {
    setIsEditing(true);
    setEditingBlogId(blog.id);
    setShowCreate(true);
    setNewBlog({
      title: blog.title,
      img: blog.img,
      summary: blog.summary,
      category: blog.category,
      fileUrl: blog.fileUrl || "",
    });
  };

  const handleDeleteBlog = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this blog?")) return;
    try {
      const res = await fetch(`/api/blog/${id}`, { method: "DELETE" });
      if (res.ok) {
        setBlogs(blogs.filter((b) => b.id !== id));
        toast.success("Blog deleted!");
      } else {
        toast.error("Failed to delete blog.");
      }
    } catch {
      toast.error("Failed to delete blog.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-f6f3ff flex flex-col">
      <Navbar />
      <div className="flex-grow flex flex-col">
        <section className="w-full min-h-[70vh] bg-[#FAFEF6] flex flex-col items-center py-12 px-4 mt-12">
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl lg:text-[48px] font-bold text-[#313053] mb-4">
              Explore our{" "}
              <span className="text-[#8C5BFF]">Finance Insights</span>
            </h1>
            <p className="text-[#6d6a7c] text-lg md:text-xl lg:text-[22px] font-normal mt-2">
              Stay updated with the latest news, workshops, and events organized
              by the Finance Committee.
            </p>
          </div>

          <div className="flex flex-col lg:flex-row items-stretch bg-[#f6f3ff] rounded-[24px] lg:rounded-[32px] shadow-[0_4px_32px_#e6e0fa55] w-full max-w-[1100px] min-h-[400px] mx-auto p-6 sm:p-10 lg:p-12 gap-8 lg:gap-16">
            <div className="w-full lg:w-1/2 flex items-center justify-center">
              <Image
                src="/images/blog.jpg"
                alt="Blog visual"
                width={350}
                height={350}
                className="rounded-[24px] lg:rounded-[32px] object-cover w-full max-w-[350px] h-auto"
              />
            </div>

            <div className="w-full lg:w-1/2 flex flex-col justify-center">
              <span className="bg-[#e6e0fa] text-[#8C5BFF] rounded-[8px] px-[16px] py-1 font-semibold text-[16px] sm:text-[18px] w-fit mb-4">
                Finance Committee
              </span>

              <h2 className="text-[24px] sm:text-[28px] lg:text-[36px] font-bold text-[#4c3c4c] mb-0">
                How to Make the Most of Finance Workshops
              </h2>

              <p className="text-[#6d6a7c] text-[16px] sm:text-[18px] lg:text-[20px] mt-4 mb-8">
                Tips and insights from our Finance Committee events to help
                students understand budgeting, investing, and personal finance
                effectively.
              </p>

              <div className="flex justify-center sm:justify-start w-full mb-10">
                <button
                  className="bg-[#8C5BFF] text-white border-none rounded-[10px] px-8 sm:px-10 lg:px-12 py-3 sm:py-4 text-base sm:text-lg lg:text-[20px] font-semibold cursor-pointer shadow-[0_2px_8px_#8C5BFF22] transition hover:bg-[#7a4eea]"
                  onClick={handleDiscoverNow}
                >
                  Discover Now
                </button>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center gap-4 mt-auto w-full">
                <div className="flex items-center gap-3">
                  <Image
                    src="/images/joyamathur.jpg"
                    alt="Joya Mathur"
                    width={40}
                    height={40}
                    className="rounded-full object-cover"
                  />
                  <div className="text-[#4c3c4c]">
                    <div className="font-semibold text-sm sm:text-base">
                      Joya Mathur
                    </div>
                    <div className="text-[#a1a1b5] text-xs sm:text-sm">
                      23 September 2025
                    </div>
                  </div>
                </div>

                <div className="flex-1" />

                <span className="text-[#a1a1b5] flex items-center gap-1.5 text-sm sm:text-base">
                  <svg
                    width="20"
                    height="20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M10 18.333A8.333 8.333 0 1 1 10 1.667a8.333 8.333 0 0 1 0 16.666Zm0-7.5a1.667 1.667 0 1 0 0-3.333 1.667 1.667 0 0 0 0 3.333Zm0 0V10"
                      stroke="#a1a1b5"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  5 min read
                </span>
              </div>
            </div>
          </div>
        </section>
        <section
          ref={blogListRef}
          className="w-full bg-gradient-to-b from-white to-f6f3ff flex flex-col items-center py-24"
        >
          <div className="blog-header-row flex flex-row justify-between items-center mb-12 w-full max-w-[1400px] mx-auto px-4">
            <h2 className="text-[48px] font-bold text-[#313053] mb-0 text-left">
              All <span className="text-[#8C5BFF]">Blog Posts</span>
            </h2>
            <div className="blog-header-controls flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 ml-0 sm:ml-auto w-full sm:w-auto">
              <span className="text-[#4c3c4c] text-[18px] sm:text-[22px]">
                Sort By :
              </span>
              <div
                className="relative min-w-full sm:min-w-[180px] w-full sm:w-auto"
                ref={multiDropdownRef}
              >
                <button
                  type="button"
                  className="bg-[#9066F9] text-white border-none rounded-[14px] font-semibold text-[18px] sm:text-[20px] px-6 sm:px-8 py-3 shadow-[0_2px_8px_#9066F955] outline-none cursor-pointer flex justify-between items-center w-full transition hover:bg-[#7a4eea] focus:ring-2 focus:ring-[#b9aaff]"
                  onClick={() => setMultiDropdownOpen((v) => !v)}
                >
                  <span className="truncate text-white text-[16px] sm:text-[18px] font-semibold text-left">
                    {selectedCategories[0] === "All"
                      ? "All"
                      : selectedCategories.join(", ")}
                  </span>
                  <svg
                    className={`w-5 h-5 transition-transform ${
                      multiDropdownOpen ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="white"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
                {multiDropdownOpen && (
                  <div className="absolute left-0 top-14 w-full bg-white border border-[#b9aaff] rounded-[12px] shadow-[0_4px_24px_#e6e0fa33] z-20 p-2 flex flex-col gap-1 animate-fade-in">
                    <div
                      className="flex items-center gap-2 px-3 py-2 rounded cursor-pointer hover:bg-[#f6f3ff]"
                      onClick={() => handleMultiSelect("All")}
                    >
                      <input
                        type="checkbox"
                        checked={selectedCategories[0] === "All"}
                        readOnly
                        className="accent-[#8C5BFF] w-4 h-4"
                      />
                      <span className="text-[#8C5BFF] font-semibold">All</span>
                    </div>
                    {categories.map((cat) => (
                      <div
                        key={cat}
                        className="flex items-center gap-2 px-3 py-2 rounded cursor-pointer hover:bg-[#f6f3ff]"
                        onClick={() => handleMultiSelect(cat)}
                      >
                        <input
                          type="checkbox"
                          checked={selectedCategories.includes(cat)}
                          readOnly
                          className="accent-[#8C5BFF] w-4 h-4"
                        />
                        <span className="text-[#4c3c4c] font-medium">
                          {cat}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              {canEdit && (
                <button
                  className="bg-[#8C5BFF] text-white border-none rounded-[12px] font-semibold text-[18px] sm:text-[20px] px-[24px] sm:px-[32px] py-3 shadow-[0_2px_8px_#8C5BFF22] cursor-pointer flex items-center gap-1.5 w-full sm:w-auto justify-center"
                  onClick={() => setShowCreate((v) => !v)}
                >
                  Create New Blog
                </button>
              )}
            </div>
          </div>
          {canEdit && showCreate && (
            <form
              onSubmit={handleSubmit}
              className="w-full max-w-md mx-auto mb-12 bg-[#f6f3ff] rounded-[24px] shadow-[0_4px_24px_#e6e0fa33] p-12 flex flex-col gap-6 items-center relative"
            >
              <button
                type="button"
                onClick={() => setShowCreate(false)}
                className="absolute top-4 right-4 bg-[#ede7ff] border border-[#b9aaff] rounded-full w-10 h-10 flex items-center justify-center font-semibold text-[22px] text-[#8C5BFF] cursor-pointer shadow-[0_2px_8px_#e6e0fa22] z-10"
                aria-label="Close"
              >
                ×
              </button>
              <h3 className="text-[28px] font-bold text-[#8C5BFF] mb-0">
                Create New Blog
              </h3>
              <input
                name="title"
                value={newBlog.title}
                onChange={handleInput}
                placeholder="Blog Title"
                required
                className="w-full px-6 py-3 text-[18px] rounded-[8px] border border-[#b9aaff] bg-[#f6f3ff]"
              />

              <input
                id="blog-image-upload"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
              <label
                htmlFor="blog-image-upload"
                className="w-full flex items-center justify-center gap-3 px-6 py-3 bg-[#f6f3ff] text-[#8C5BFF] border border-[#b9aaff] rounded-[8px] font-semibold text-[18px] cursor-pointer hover:bg-[#ede7ff] transition mb-2 shadow-sm"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="#8C5BFF"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 4v16m8-8H4"
                  />
                </svg>
                {imagePreview ? "Change Image" : "Upload Image"}
              </label>
              {imagePreview && (
                <div className="w-full h-48 bg-white rounded-[12px] flex items-center justify-center border border-[#b9aaff] mt-2">
                  <Image
                    src={imagePreview}
                    alt="Preview"
                    width={240}
                    height={240}
                    className="w-full h-full object-contain rounded-[10px] bg-transparent"
                  />
                </div>
              )}
              <div
                ref={categoryRef}
                className="w-full relative bg-[#f6f3ff] border border-[#b9aaff] rounded-[8px] min-h-[48px] px-6 py-3 cursor-pointer flex flex-wrap items-center gap-1.5"
                onClick={() => setShowCategoryDropdown((v) => !v)}
              >
                {newBlog.category.length === 0 && (
                  <span className="text-[#b9aaff] text-[18px]">
                    Select categories...
                  </span>
                )}
                {newBlog.category.map((cat) => (
                  <span
                    key={cat}
                    className="bg-[#e6e0fa] text-[#8C5BFF] rounded-[8px] px-[10px] py-1 font-semibold text-[15px] flex items-center gap-1"
                  >
                    {cat}
                    <span
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemoveCategory(cat);
                      }}
                      className="ml-1 text-[#8C5BFF] font-bold cursor-pointer text-[16px] px-1"
                    >
                      ×
                    </span>
                  </span>
                ))}
                <span className="flex-1" />
                <span className="text-[#b9aaff] text-[18px] mr-1">▼</span>
                {showCategoryDropdown && (
                  <div className="absolute left-0 top-12 w-full bg-[#f6f3ff] border border-[#b9aaff] rounded-[8px] shadow-[0_4px_24px_#e6e0fa33] z-10 p-3 flex flex-col gap-1">
                    {categories.map((cat) => (
                      <div
                        key={cat}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCategorySelect(cat);
                        }}
                        className="px-4 py-2 rounded-3 text-[#313053] font-semibold text-[17px] cursor-pointer transition-background"
                      >
                        {cat}
                        {newBlog.category.includes(cat) && (
                          <span className="ml-2 font-bold">✓</span>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <input
                id="blog-file-upload"
                type="file"
                accept=".pdf,.doc,.docx,.ppt,.pptx"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    const fileUrl = URL.createObjectURL(file);
                    setNewBlog({ ...newBlog, fileUrl });
                    setFileFile(file);
                  }
                }}
                className="hidden"
              />
              <label
                htmlFor="blog-file-upload"
                className="w-full flex items-center justify-center gap-3 px-6 py-3 bg-[#f6f3ff] text-[#8C5BFF] border border-[#b9aaff] rounded-[8px] font-semibold text-[18px] cursor-pointer hover:bg-[#ede7ff] transition mb-2 shadow-sm"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="#8C5BFF"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 4v16m8-8H4"
                  />
                </svg>
                {newBlog.fileUrl ? "Change File" : "Upload File (PDF/DOC)"}
              </label>

              {newBlog.fileUrl && (
                <div className="w-full bg-white rounded-[12px] border border-[#b9aaff] px-4 py-3 mt-2 text-[#6d6a7c] text-[16px] flex justify-between items-center">
                  <span className="truncate">
                    {newBlog.fileUrl.split("/").pop()}
                  </span>
                  <a
                    href={newBlog.fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#8C5BFF] font-semibold underline"
                  >
                    View
                  </a>
                </div>
              )}

              <textarea
                name="summary"
                value={newBlog.summary}
                onChange={handleInput}
                placeholder="Short Summary — You can include links like <a href='https://fc-fbs.vercel.app/'>Finance Committee, FOSTIIMA Chapter</a>"
                required
                rows={3}
                className="w-full px-6 py-3 text-[18px] rounded-[8px] border border-[#b9aaff] bg-[#f6f3ff]"
              />
              <button
                type="submit"
                className="bg-[#8C5BFF] text-white border-none rounded-[10px] font-semibold text-[20px] px-[40px] py-3 cursor-pointer shadow-[0_2px_8px_#8C5BFF22] mt-2"
              >
                Publish Blog
              </button>
            </form>
          )}
          <div
            className="w-full max-w-[1400px] grid gap-12 justify-items-center items-stretch"
            style={{
              gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))",
            }}
          >
            {blogsToDisplay.map((blog, idx) => (
              <BlogCard
                key={idx}
                img={blog.img}
                title={blog.title}
                summary={blog.summary}
                category={blog.category}
                fileUrl={blog.fileUrl}
                onEdit={blog.id ? () => handleEditBlog(blog) : undefined}
                onDelete={blog.id ? () => handleDeleteBlog(blog.id) : undefined}
                canEdit={canEdit}
              />
            ))}
          </div>
          <div className="w-full flex justify-center mt-6">
            <button
              className="bg-[#8C5BFF] text-white border-none rounded-[16px] font-semibold text-[24px] px-[80px] py-[18px] shadow-[0_2px_8px_#8C5BFF22] cursor-pointer flex items-center gap-3 transition-background"
              onClick={handleLoadMore}
            >
              Load More
              <svg
                className="w-7 h-7 ml-2 -mt-0.5"
                fill="none"
                stroke="white"
                strokeWidth="2.5"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M7 17L17 7M7 7h10v10"
                />
              </svg>
            </button>
          </div>
        </section>
        <section
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            margin: "48px 0 0 0",
          }}
        >
          <div
            style={{
              width: "90%",
              maxWidth: 1400,
              background: "linear-gradient(135deg, #fff 60%, #f6f3ff 100%)",
              borderRadius: 48,
              boxShadow: "0 4px 32px #e6e0fa33",
              padding: "64px 32px 48px 32px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <h2
              style={{
                fontSize: 56,
                fontWeight: 800,
                color: "#313053",
                margin: 0,
                textAlign: "center",
              }}
            >
              Stay Updated{" "}
              <span style={{ color: "#8C5BFF" }}>With Our Newsletter</span>
            </h2>
            <p
              style={{
                color: "#6d6a7c",
                fontSize: 28,
                fontWeight: 400,
                margin: "32px 0 40px 0",
                textAlign: "center",
                maxWidth: 800,
              }}
            >
              Subscribe to our newsletter for the latest updates and insights
              <br />
              on no-code / low code development.
            </p>
            <form
              className="newsletter-form"
              onSubmit={(e) => {
                e.preventDefault();
                const email = (
                  e.currentTarget.elements.namedItem(
                    "newsletterEmail"
                  ) as HTMLInputElement
                )?.value;
                if (email) {
                  window.location.href = `/?waitlist=${encodeURIComponent(
                    email
                  )}#waitlist-form-section`;
                }
              }}
              style={{
                display: "flex",
                flexDirection: "row",
                gap: 24,
                width: "100%",
                maxWidth: 700,
                marginBottom: 24,
              }}
            >
              <input
                name="newsletterEmail"
                type="email"
                placeholder="Enter Your Email"
                required
                style={{
                  flex: 1,
                  padding: "18px 24px",
                  fontSize: 22,
                  borderRadius: 12,
                  border: "2px solid #e6e0fa",
                  outline: "none",
                  background: "#fff",
                  color: "#313053",
                  fontWeight: 500,
                  transition: "border 0.2s",
                }}
              />
              <button
                type="submit"
                style={{
                  background: "#8C5BFF",
                  color: "#fff",
                  border: "none",
                  borderRadius: 12,
                  fontSize: 24,
                  fontWeight: 600,
                  padding: "0 48px",
                  cursor: "pointer",
                  boxShadow: "0 2px 8px #8C5BFF22",
                  transition: "background 0.2s",
                }}
              >
                Join Now
              </button>
            </form>
            <div
              style={{
                color: "#8C5BFF",
                fontSize: 18,
                marginTop: 8,
                textAlign: "center",
              }}
            >
              By joining you Agree to our{" "}
              <span style={{ textDecoration: "underline", cursor: "pointer" }}>
                Terms and Conditions
              </span>
              .
            </div>
          </div>
        </section>
        <section className="faq-section-container flex justify-center items-start mt-24">
          <div className="w-full max-w-[1400px] flex flex-row gap-24 items-start justify-center">
            <div className="flex-1 min-w-[340px]">
              <h2 className="text-[48px] font-bold text-[#313053] mb-0">
                Frequently Asked{" "}
                <span className="text-[#8C5BFF]">Questions</span>
              </h2>
              <p className="text-[#6d6a7c] text-[24px] font-normal mt-8 max-w-[400px]">
                Find answers to common questions about the Finance Committee’s
                events, workshops, and student initiatives.
              </p>
              <div className="mt-16">
                <div className="text-[#a1a1b5] font-bold text-[22px] mb-3">
                  Committee Contact
                </div>
                <div className="text-[#313053] text-[18px] mb-2">
                  Address: Plot No. HAF-1, Pocket 2, Dwarka Sector 9, Dwarka,
                  New Delhi, Delhi, 110077
                </div>
                <div className="text-[#313053] text-[18px] mb-2">
                  Email: fincomm@fostiima.org
                </div>
                {/* <div className="text-[#313053] text-[18px] mb-2">Phone:</div> */}
              </div>
            </div>
            <div className="flex-2 min-w-[400px]">
              <div className="bg-[#f6f3ff] rounded-[32px] shadow-[0_4px_32px_#e6e0fa33] p-12">
                <div className="font-bold text-[26px] mb-8">
                  What does the Finance Committee do?
                </div>
                <div className="text-[#6d6a7c] font-normal text-[22px]">
                  The Finance Committee organizes finance-focused workshops,
                  seminars, interactive events, and competitions. We plan
                  budgets responsibly and help students gain practical
                  experience in financial management.
                </div>
                <span
                  className="absolute top-6 right-12 text-[36px] text-[#c2b6e6] cursor-pointer user-select-none"
                  aria-label="Close"
                >
                  ×
                </span>
              </div>
              <div className="mt-10">
                {[
                  "How can I participate in finance workshops?",
                  "What types of events does the committee organize?",
                  "Do I need prior finance knowledge to join?",
                  "How do I propose a new student event?",
                ].map((q) => (
                  <div
                    key={q}
                    className="bg-white border border-[#e6e0fa] rounded-[18px] py-5 px-6 mb-4 transition-colors duration-200 hover:border-[#a689ff]"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[#6d6a7c] font-medium text-[18px]">
                        {q}
                      </span>
                      <span className="text-[#b4afd0] text-[22px] font-light">
                        +
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
      <style jsx global>{`
        @media (max-width: 900px) {
          .blog-card-grid {
            grid-template-columns: repeat(
              auto-fit,
              minmax(260px, 1fr)
            ) !important;
            gap: 20px !important;
          }
          .blog-form,
          .newsletter-form {
            max-width: 98vw !important;
            padding: 18px !important;
          }
          .blog-section,
          .newsletter-section {
            padding: 24px 0 !important;
          }
          .blog-card {
            min-width: 0 !important;
            width: 100% !important;
            padding: 12px !important;
          }
        }
        @media (max-width: 600px) {
          .blog-card-grid {
            grid-template-columns: 1fr !important;
            gap: 12px !important;
          }
          .blog-form,
          .newsletter-form {
            max-width: 100vw !important;
            padding: 8px !important;
          }
          .blog-section,
          .newsletter-section {
            padding: 12px 0 !important;
          }
          .blog-card {
            min-width: 0 !important;
            width: 95vw !important;
            max-width: 95vw !important;
            padding: 12px 8px !important;
            border-radius: 18px !important;
            margin: 0 auto 18px auto !important;
            box-sizing: border-box !important;
            display: flex !important;
            flex-direction: column !important;
            align-items: stretch !important;
          }
          .blog-card img {
            order: 0 !important;
            width: 100% !important;
            height: auto !important;
            aspect-ratio: 4/3 !important;
            border-radius: 12px !important;
            margin-bottom: 10px !important;
            object-fit: cover !important;
          }
          .blog-card > *:not(img) {
            order: 1 !important;
          }
          .blog-card h3,
          .blog-card p {
            font-size: 1rem !important;
          }
          .blog-btn,
          .newsletter-btn {
            width: 100% !important;
            font-size: 1rem !important;
            padding: 12px 0 !important;
          }
          .blog-card > * {
            margin-left: 0 !important;
            margin-right: 0 !important;
          }
          .blog-feature-section {
            flex-direction: column !important;
            gap: 18px !important;
            padding: 16px !important;
            min-height: unset !important;
          }
          .blog-feature-section img {
            width: 100% !important;
            height: auto !important;
            border-radius: 18px !important;
            margin-bottom: 12px !important;
          }
          .blog-feature-section {
            flex-direction: column !important;
            gap: 12px !important;
            padding: 12px 4px !important;
            min-height: unset !important;
            max-width: 98vw !important;
            width: 98vw !important;
            border-radius: 18px !important;
            box-shadow: 0 2px 12px #e6e0fa33 !important;
            margin: 0 auto 18px auto !important;
          }
          .blog-feature-section > div:first-child img {
            width: 100% !important;
            height: auto !important;
            aspect-ratio: 16/9 !important;
            border-radius: 14px !important;
            margin-bottom: 10px !important;
            object-fit: cover !important;
            display: block !important;
            max-width: 100% !important;
          }
          .blog-feature-section h2 {
            font-size: 1.2rem !important;
            margin: 8px 0 4px 0 !important;
          }
          .blog-feature-section p,
          .blog-feature-section span,
          .blog-feature-section button {
            font-size: 1rem !important;
          }
          .blog-feature-section button {
            width: 100% !important;
            font-size: 1rem !important;
            padding: 12px 0 !important;
            margin: 10px 0 !important;
          }
          .blog-header-row {
            flex-direction: column !important;
            align-items: flex-start !important;
            gap: 10px !important;
            width: 98vw !important;
            max-width: 98vw !important;
            margin-bottom: 18px !important;
          }
          .blog-header-row > * {
            width: 100% !important;
            margin: 0 0 6px 0 !important;
            font-size: 1.1rem !important;
          }
          .blog-header-row h2 {
            font-size: 1.4rem !important;
            margin-bottom: 2px !important;
          }
          .blog-header-row select,
          .blog-header-row button {
            font-size: 1rem !important;
            padding: 10px 0 !important;
            width: 100% !important;
            margin-bottom: 6px !important;
          }
          .blog-header-row {
            flex-direction: column !important;
            align-items: flex-start !important;
            gap: 18px !important;
            width: 98vw !important;
            max-width: 98vw !important;
            margin-bottom: 18px !important;
            border-bottom: 1.5px solid #ece6ff;
            padding-bottom: 10px;
          }
          .blog-header-row h2 {
            font-size: 2rem !important;
            margin-bottom: 6px !important;
            color: #7c55d7 !important;
            letter-spacing: 0.5px;
            text-shadow: 0 2px 8px #e6e0fa33;
          }
          .blog-header-controls {
            width: 100% !important;
            background: #f6f3ff !important;
            border-radius: 16px !important;
            box-shadow: 0 2px 8px #e6e0fa22 !important;
            padding: 12px 10px !important;
            display: flex !important;
            flex-direction: column !important;
            align-items: stretch !important;
            gap: 10px !important;
            margin-top: 4px !important;
          }
          .blog-header-controls > * {
            width: 100% !important;
            font-size: 1.1rem !important;
            margin: 0 0 4px 0 !important;
          }
          .blog-header-controls select,
          .blog-header-controls button {
            font-size: 1rem !important;
            padding: 12px 0 !important;
            width: 100% !important;
            margin-bottom: 4px !important;
          }
          .newsletter-outer {
            flex-direction: column !important;
            width: 100vw !important;
            margin: 18px 0 0 0 !important;
            align-items: stretch !important;
            justifycontent: flex-start !important;
            padding: 0 !important;
          }
          .newsletter-outer > * {
            width: 100% !important;
            max-width: 100vw !important;
          }
          .newsletter-form {
            flex-direction: column !important;
            gap: 10px !important;
            width: 100% !important;
            max-width: 100vw !important;
            align-items: stretch !important;
          }
          .newsletter-form input,
          .newsletter-form button {
            width: 100% !important;
            font-size: 1rem !important;
            padding: 14px 0 !important;
            margin: 0 !important;
            box-sizing: border-box !important;
          }
          .faq-section-container {
            flex-direction: column !important;
            gap: 0 !important;
            width: 98vw !important;
            max-width: 98vw !important;
            align-items: stretch !important;
            justify-content: flex-start !important;
            margin: 0 auto !important;
            padding: 0 !important;
          }
          .faq-section-container > *,
          .faq-section-container > * > *,
          .faq-section-container > * > * > * {
            width: 100% !important;
            min-width: 0 !important;
            max-width: 100vw !important;
            box-sizing: border-box !important;
            float: none !important;
            display: block !important;
          }
          .faq-section-container > *:first-child {
            margin-bottom: 24px !important;
          }
          .faq-section-container .faq-card,
          .faq-section-container .faq-item {
            margin-bottom: 10px !important;
            border-radius: 14px !important;
            font-size: 1rem !important;
            padding: 16px 10px !important;
          }
        .blogcard-scrollbar::-webkit-scrollbar {
          width: 8px;
          background: #f6f3ff;
          border-radius: 8px;
        }
        .blogcard-scrollbar::-webkit-scrollbar-thumb {
          background: #8C5BFF;
          border-radius: 8px;
        }
        .blogcard-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #6A4EFF;
        }
      `}</style>
    </div>
  );
}
