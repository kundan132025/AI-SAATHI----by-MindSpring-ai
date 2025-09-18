import React, { useEffect, useState } from "react";
import StoryCard from "../components/StoryCard";
import axios from "../utils/axios";
import FlipCard from "../components/FlipCard";
import NavbarF from "../components/NavbarF";
export default function Stories() {
  const [stories, setStories] = useState([]);
  const [categories, setCategories] = useState([
    "all",
    "healing",
    "love",
    "mood freshening",
    "motivational",
    "overcoming depression",
    "overcoming frustration",
    "overcoming sadness",
    "relaxing",
    "soothing"
  ]);
  const [selectedCategory, setSelectedCategory] = useState("all");

  useEffect(() => {
    axios.get("/api/stories").then(res => {
      if (Array.isArray(res.data)) {
        setStories(res.data);
      } else if (Array.isArray(res.data.stories)) {
        setStories(res.data.stories);
      } else {
        setStories([]);
      }
    });
  }, []);

  const filteredStories =
    selectedCategory === "all"
      ? stories
      : stories.filter(story =>
          story.category &&
          story.category.toLowerCase() === selectedCategory.toLowerCase()
        );

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 to-purple-100">
      <NavbarF />
      <div className="pt-12">
        <div className="max-w-5xl w-full py-8 px-2 sm:px-4 md:px-8 mx-auto">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-green-900 mb-2">
            Flashcard Stories
          </h1>
          <p className="text-center text-gray-600 mb-6 text-base sm:text-lg">
            Short stories to lift, soothe, and refresh your mood.
          </p>
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {categories.map(category => (
              <button
                key={category}
                className={`px-4 py-1 rounded-full border border-green-300 text-green-800 transition-colors duration-150 text-base font-medium focus:outline-none ${
                  selectedCategory === category
                    ? "bg-green-100 border-green-600 text-green-900 font-semibold"
                    : "bg-white hover:bg-green-50"
                }`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredStories.length === 0 ? (
              <div className="col-span-full text-center text-gray-500 text-lg">
                No stories found.
              </div>
            ) : (
              filteredStories.map(story => (
                <FlipCard
                  key={story._id}
                  front={story.title}
                  back={story.content}
                />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}