import React, { useState, useEffect, useMemo } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Loader,
  Search,
  AlertCircle,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { BlogCard } from "./BlogCard";
import { Input } from "./Input";
import { Button } from "./Button";
import { Select } from "./Select";
import { fetchBlogList, fetchCategoryList } from "../features/blog/blogApi";
import type { AppDispatch, RootState } from "../redux/store";
import { cn } from "../lib/utils";

export const Blog = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { blogList, categories, loading, error } = useSelector(
    (state: RootState) => state.blog,
  );

  const [searchInput, setSearchInput] = useState("");
  const [activeSearch, setActiveSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const itemsPerPage = 8;

  useEffect(() => {
    dispatch(fetchBlogList());
    dispatch(fetchCategoryList());
  }, [dispatch]);

  // Transform dynamic blog posts to BlogCard props
  const transformedPosts = useMemo(() => {
    return blogList.map((post) => {
      const categoryName =
        categories.find((c) => c._id === post.categoryId)?.categoryName ||
        "General";
      const formattedDate = new Date(post.createdAt).toLocaleDateString(
        "en-US",
        {
          year: "numeric",
          month: "short",
          day: "numeric",
        },
      );

      return {
        image: post.image,
        category: categoryName,
        date: formattedDate,
        author: "Batuk Advisor",
        title: post.title || "Untitled",
        description: post.description || "",
        link: `/blog/${post.title_url || ""}`,
      };
    });
  }, [blogList, categories]);

  // Filter posts based on active search and category
  const filteredPosts = useMemo(() => {
    return transformedPosts.filter((post) => {
      const matchesSearch =
        (post.title || "").toLowerCase().includes(activeSearch.toLowerCase()) ||
        (post.description || "")
          .toLowerCase()
          .includes(activeSearch.toLowerCase());
      const matchesCategory =
        selectedCategory === "All" || post.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [transformedPosts, activeSearch, selectedCategory]);

  // Pagination logic from Table.tsx
  const totalPages = Math.ceil(filteredPosts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentPosts = filteredPosts.slice(
    startIndex,
    startIndex + itemsPerPage,
  );

  const handleSearchClick = () => {
    setActiveSearch(searchInput);
    setCurrentPage(1);
  };

  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value);
    setCurrentPage(1);
  };

  const categoryOptions = useMemo(() => {
    const options = [{ value: "All", label: "All Categories" }];
    categories.forEach((cat) => {
      options.push({ value: cat.categoryName, label: cat.categoryName });
    });
    return options;
  }, [categories]);

  // Pagination helpers from Table.tsx
  const handlePrev = () => setCurrentPage((prev) => Math.max(1, prev - 1));
  const handleNext = () =>
    setCurrentPage((prev) => Math.min(totalPages, prev + 1));
  const goToPage = (page: number) => setCurrentPage(page);

  const getPageNumbers = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 ||
        i === totalPages ||
        (i >= currentPage - 1 && i <= currentPage + 1)
      ) {
        pages.push(i);
      } else if (i === currentPage - 2 || i === currentPage + 2) {
        pages.push(-1); // indicator for ellipsis
      }
    }
    return pages.filter((page, index, self) => self.indexOf(page) === index);
  };

  return (
    <section className="pt-24 pb-10  bg-bg-light">
      <div className="container-custom">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mt-10 lg:mt-0 mb-10">
          <h2 className="text-2xl font-semibold text-slate-900 leading-tight text-center md:text-left whitespace-nowrap">
            Insights & Updates
          </h2>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto flex-1 lg:max-w-[850px] lg:justify-end">
            <div className="w-full sm:w-50 shrink-0">
              <Input
                placeholder="Search articles..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearchClick()}
                size="md"
              />
            </div>
            <div className="w-full sm:w-40 shrink-0">
              <Select
                options={categoryOptions}
                value={selectedCategory}
                onChange={handleCategoryChange}
                placeholder="All Categories"
                size="md"
                className="w-full"
                containerClassName="w-full"
              />
            </div>
            <Button
              size="md"
              onClick={handleSearchClick}
              variant="primary"
              className="h-[38px] font-semibold  w-full sm:w-auto shrink-0"
              shimmer={false}
            >
              Search
            </Button>
          </div>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-24 sm:py-32 gap-4">
            <Loader className="animate-spin text-primary" size={40} />
            <p className="text-[10px] font-black text-primary animate-pulse">
              FETCHING INSIGHTS
            </p>
          </div>
        ) : error ? (
          <div className="text-center py-16 sm:py-20 px-6 sm:px-8 bg-white rounded-2xl border border-slate-100 shadow-sm flex flex-col items-center gap-4">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-red-50 flex items-center justify-center text-red-500">
              <AlertCircle size={32} />
            </div>
            <div>
              <p className="text-slate-900 font-black text-lg mb-1">
                Unable to load blogs
              </p>
              <p className="text-slate-600 text-sm max-w-sm mx-auto">{error}</p>
            </div>
            <Button
              onClick={() => dispatch(fetchBlogList())}
              variant="primary"
              size="sm"
              className="mt-2 rounded-xl"
            >
              Try Again
            </Button>
          </div>
        ) : currentPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {currentPosts.map((post, index) => (
              <BlogCard key={index} {...post} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 sm:py-24 bg-white rounded-2xl border border-slate-100 px-6">
            <Search
              size={48}
              className="mx-auto text-slate-200 mb-4 opacity-50"
            />
            <p className="text-xl font-black text-slate-900 mb-2">
              No articles found
            </p>
            <p className="text-slate-400 text-sm max-w-sm mx-auto">
              We couldn't find any articles matching {activeSearch}.
            </p>
            <div className="flex justify-center item-center">
              <Button
                variant="primary"
                size="sm"
                onClick={() => {
                  setSearchInput("");
                  setActiveSearch("");
                  setSelectedCategory("All");
                }}
                className="mt-6 text-white font-bold"
              >
                Clear all filters
              </Button>
            </div>
          </div>
        )}

        {/* Pagination Section - Table.tsx Style Full Responsive */}
        {!loading && filteredPosts.length > 0 && (
          <div className="mt-10 flex flex-col lg:flex-row items-center justify-between px-2 gap-4">
            <p className="text-sm font-bold text-slate-600  text-center lg:text-left">
              Showing {Math.min(startIndex + 1, filteredPosts.length)}-
              {Math.min(startIndex + itemsPerPage, filteredPosts.length)} of{" "}
              {filteredPosts.length} insights
            </p>

            <div className="flex flex-wrap items-center justify-center gap-2">
              <div className="flex gap-1.5 p-1 bg-slate-50 rounded-xl border border-slate-100 overflow-x-auto max-w-[calc(100vw-40px)] no-scrollbar">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handlePrev}
                  disabled={currentPage === 1}
                  className="size-8 p-0 rounded-lg hover:bg-white hover:shadow-sm flex-shrink-0"
                  aria-label="Previous Page"
                  shimmer={false}
                >
                  <ChevronLeft size={16} />
                </Button>

                {getPageNumbers().map((page, idx) => {
                  if (page === -1) {
                    return (
                      <span
                        key={`ellipsis-${idx}`}
                        className="w-8 h-8 flex items-center justify-center text-slate-300 flex-shrink-0"
                      >
                        ...
                      </span>
                    );
                  }
                  return (
                    <Button
                      key={page}
                      variant={page === currentPage ? "primary" : "white"}
                      size="sm"
                      onClick={() => goToPage(page)}
                      className={cn(
                        "size-8 p-0 rounded-lg font-black text-xs transition-all cursor-pointer flex-shrink-0",
                        page === currentPage
                          ? "shadow-md shadow-primary/20 scale-110"
                          : "hover:bg-white hover:shadow-sm",
                      )}
                    >
                      {page}
                    </Button>
                  );
                })}

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleNext}
                  disabled={currentPage === totalPages}
                  className="size-8 p-0 rounded-lg hover:bg-white hover:shadow-sm cursor-pointer flex-shrink-0"
                  aria-label="Next Page"
                  shimmer={false}
                >
                  <ChevronRight size={16} />
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
