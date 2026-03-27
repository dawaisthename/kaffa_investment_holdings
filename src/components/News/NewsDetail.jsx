import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Calendar, Tag, Loader2 } from "lucide-react";
import axios from "axios";

export default function NewsDetail() {
  const { id } = useParams(); // Changed from 'slug' to 'id' to match database _id
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        console.log("Fetching article with ID:", id);
        // Calling your backend for a specific news item
        const response = await axios.get(
          `http://localhost:5000/api/news/${id}`,
        );
        setArticle(response.data);
      } catch (err) {
        console.error("Error fetching article:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchArticle();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0a1622]">
        <Loader2 className="animate-spin text-[#c5a35d]" size={48} />
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#f8f9fa]">
        <h2 className="text-2xl font-serif text-[#0a1622] mb-4">
          Article not found
        </h2>
        <Link
          to="/news"
          className="text-[#c5a35d] font-bold underline underline-offset-4"
        >
          Return to News
        </Link>
      </div>
    );
  }

  return (
    <article className="min-h-screen bg-white">
      {/* 1. Header Hero */}
      <header className="bg-[#0a1622] pt-48 pb-28 px-8 md:px-16">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-white font-serif text-4xl md:text-6xl lg:text-[64px] font-bold leading-[1.1] tracking-tight">
            {article.title}
          </h1>
        </div>
      </header>

      {/* 2. Main Content Area */}
      <div className="max-w-3xl mx-auto px-8 py-20">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 border-b border-gray-100 pb-8 gap-6">
          <Link
            to="/news"
            className="flex items-center gap-2 text-gray-400 hover:text-[#0a1622] font-bold text-[13px] transition-colors group"
          >
            <ArrowLeft
              size={16}
              className="group-hover:-translate-x-1 transition-transform"
            />
            All News & Insights
          </Link>

          <div className="flex gap-6 text-[13px] font-bold">
            <div className="flex items-center gap-2 text-gray-500">
              <Calendar size={15} className="text-[#c5a35d]" />
              {new Date(article.createdAt).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </div>
            <div className="flex items-center gap-2 text-gray-500">
              <Tag size={15} className="text-[#c5a35d]" /> {article.category}
            </div>
          </div>
        </div>

        {/* Article Body */}
        <div className="space-y-8">
          {/* We use whitespace-pre-wrap to preserve paragraphs from the textarea in the admin dashboard */}
          <p className="text-gray-600 text-[18px] leading-[1.8] font-medium whitespace-pre-wrap">
            {article.content}
          </p>
        </div>

        {/* Bottom Navigation */}
        <div className="mt-24 pt-10 border-t border-gray-100">
          <Link
            to="/news"
            className="inline-flex items-center gap-3 bg-white border border-gray-200 px-8 py-4 rounded-md text-[#0a1622] font-bold text-[13px] uppercase tracking-widest hover:bg-gray-50 transition-all shadow-sm"
          >
            <ArrowLeft size={18} /> Back to News & Insights
          </Link>
        </div>
      </div>
    </article>
  );
}
