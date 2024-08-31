"use client";
import React, { useState, useEffect } from 'react';

const imgs = [
  "https://img.freepik.com/free-vector/cute-cool-monkey-riding-rocket-with-peace-hand-cartoon-vector-icon-illustration-animal-science-flat_138676-11164.jpg",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_6w9FTEjHG-7qF_RUNWmWRUL7V-EBUME3-Q&s",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7VMkolxxX1ZOd-hw0lZnysgOTWop4OYztIg&s",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQKVY2kOMMmXv4J6Zs2l5DfBvGxdXvoLJwzw&s",
  "https://i.pinimg.com/736x/bf/d7/b6/bfd7b6d5ac999ccd5f9466d5ee3a092e.jpg",
];

// Function to get a random image based on index
const getRandomImage = (index) => {
  return imgs[index % imgs.length];
}

const AvatarStack = ({ avatars }) => {
  const [avatarImages, setAvatarImages] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false); // Add state for dropdown visibility

  useEffect(() => {
    // Initialize avatarImages with random images for each avatar
    const newImages = avatars.map((_, index) => getRandomImage(index));
    setAvatarImages(newImages);
  }, [avatars]);

  const displayedAvatars = avatars.slice(0, 3);
  const remainingAvatars = avatars.slice(3);

  return (
    <div className="relative flex items-center -space-x-4 rtl:space-x-reverse">
      {displayedAvatars.map((avatar, index) => (
        <img
          key={avatar.id}  // Use avatar.id as key
          className="w-10 h-10 border-2 border-white rounded-full dark:border-gray-800"
          src={avatarImages[index]} // Use pre-generated random images
          alt={avatar.name}
        />
      ))}

      {/* Button for remaining avatars */}
      {remainingAvatars.length > 0 && (
        <button
          onClick={() => setShowDropdown(!showDropdown)} // Toggle dropdown visibility
          className="w-10 h-10 flex items-center justify-center border-2 border-white rounded-full dark:border-gray-800 bg-gray-200 dark:bg-gray-600 text-gray-600 dark:text-gray-200"
        >
          +{remainingAvatars.length}
        </button>
      )}

      {/* Dropdown for remaining avatars */}
      {showDropdown && remainingAvatars.length > 0 && (
        <div className="absolute top-12 left-0 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg shadow-lg">
          <ul>
            {remainingAvatars.map((avatar, index) => (
              <li key={avatar.id} className="border-t-2 border-gray-200/10 flex items-center p-2 hover:bg-gray-200 dark:hover:bg-gray-700">
                <img
                  className="w-8 h-8 border-2 border-white rounded-full dark:border-gray-800"
                  src={avatarImages[index + 3]} // Use index-based random image for dropdown avatars
                  alt={avatar.name}
                />
                <span className="ml-2">{avatar.name}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default AvatarStack;
