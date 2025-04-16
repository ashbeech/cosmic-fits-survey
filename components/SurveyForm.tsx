"use client";

import { useState } from "react";

type FormData = {
  birthdate: string;
  birthtime: string;
  birthplace: string;
  musicGenres: string[];
  artists: string;
  moviesShows: string;
  subcultures: string;
  fashionAttitude: string;
  fashionAttitudeOther: string;
  styleIcons: string;
  styleWords: {
    word1: string;
    word2: string;
    word3: string;
  };
  fabricPreferences: string[];
  comfortVsStructure: string;
  simpleVsLayered: string;
  neutralsVsColor: string;
  outfitBuilding: string;
  outfitBuildingOther: string;
  styleEvolution: string;
  blendVsStandout: string;
  expressVsShift: string;
  styleFeedback: string;
  feelingPowerful: string;
  styleAvoidance: string;
  styleRuts: string;
  wardrobeStory: string;
  colorPalettes: string[];
  fabricDislikes: string;
  fabricImportance: number;
  styleCommunication: string;
  becomingPerson: string;
  pastStyle: string;
  dreamWardrobe: string;
};

type ErrorState = {
  birthdate?: string;
  birthtime?: string;
  birthplace?: string;
  musicGenres?: string;
  artists?: string;
  moviesShows?: string;
  subcultures?: string;
  fashionAttitude?: string;
  styleIcons?: string;
  styleWords?: {
    word1?: string;
    word2?: string;
    word3?: string;
  };
  comfortVsStructure?: string;
  simpleVsLayered?: string;
  neutralsVsColor?: string;
  outfitBuilding?: string;
  styleEvolution?: string;
  blendVsStandout?: string;
  expressVsShift?: string;
  styleFeedback?: string;
  feelingPowerful?: string;
  styleAvoidance?: string;
  styleRuts?: string;
  wardrobeStory?: string;
  fabricDislikes?: string;
  fabricImportance?: string;
  styleCommunication?: string;
  becomingPerson?: string;
  pastStyle?: string;
  dreamWardrobe?: string;
};

export default function SurveyForm() {
  // Initial form state
  const [formData, setFormData] = useState<FormData>({
    birthdate: "",
    birthtime: "",
    birthplace: "",
    musicGenres: [],
    artists: "",
    moviesShows: "",
    subcultures: "",
    fashionAttitude: "",
    fashionAttitudeOther: "",
    styleIcons: "",
    styleWords: {
      word1: "",
      word2: "",
      word3: "",
    },
    fabricPreferences: [],
    comfortVsStructure: "",
    simpleVsLayered: "",
    neutralsVsColor: "",
    outfitBuilding: "",
    outfitBuildingOther: "",
    styleEvolution: "",
    blendVsStandout: "",
    expressVsShift: "",
    styleFeedback: "",
    feelingPowerful: "",
    styleAvoidance: "",
    styleRuts: "",
    wardrobeStory: "",
    colorPalettes: [],
    fabricDislikes: "",
    fabricImportance: 5,
    styleCommunication: "",
    becomingPerson: "",
    pastStyle: "",
    dreamWardrobe: "",
  });

  // Form error state
  const [errors, setErrors] = useState<ErrorState>({});

  // Form submission state
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Handle input changes for text, textarea, and select inputs
  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;

    if (name.includes(".")) {
      // Handle nested objects like styleWords.word1
      const [parent, child] = name.split(".");

      setFormData((prev) => {
        // Type safe way to handle nested objects
        if (parent === "styleWords") {
          return {
            ...prev,
            styleWords: {
              ...prev.styleWords,
              [child]: value,
            },
          };
        }

        // If we need to handle other nested objects in the future
        return {
          ...prev,
          [parent]: {
            ...(prev[parent as keyof typeof prev] as Record<string, any>),
            [child]: value,
          },
        };
      });
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  // Handle checkbox changes
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked } = e.target;

    setFormData((prev) => {
      const currentArray = prev[name as keyof FormData] as string[];

      // Add or remove the value from the array
      const updatedArray = checked
        ? [...currentArray, value]
        : currentArray.filter((item) => item !== value);

      return {
        ...prev,
        [name]: updatedArray,
      };
    });
  };

  // Handle range input change
  const handleRangeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: parseInt(value),
    }));
  };

  // Validate the form
  const validateForm = () => {
    const newErrors: ErrorState = {};

    // Required fields
    if (!formData.birthdate) {
      newErrors.birthdate = "This field is required";
    }

    if (!formData.birthtime) {
      newErrors.birthtime = "This field is required";
    }

    if (!formData.birthplace) {
      newErrors.birthplace = "This field is required";
    }

    if (!formData.artists) {
      newErrors.artists = "This field is required";
    }

    if (!formData.moviesShows) {
      newErrors.moviesShows = "This field is required";
    }

    if (!formData.subcultures) {
      newErrors.subcultures = "This field is required";
    }

    if (!formData.fashionAttitude) {
      newErrors.fashionAttitude = "This field is required";
    }

    if (!formData.styleIcons) {
      newErrors.styleIcons = "This field is required";
    }

    // Style words validation
    const styleWordsErrors: { word1?: string; word2?: string; word3?: string } =
      {};

    if (!formData.styleWords.word1) {
      styleWordsErrors.word1 = "Required";
    }

    if (!formData.styleWords.word2) {
      styleWordsErrors.word2 = "Required";
    }

    if (!formData.styleWords.word3) {
      styleWordsErrors.word3 = "Required";
    }

    if (Object.keys(styleWordsErrors).length > 0) {
      newErrors.styleWords = styleWordsErrors;
    }

    // Preference selections
    if (!formData.comfortVsStructure) {
      newErrors.comfortVsStructure = "Please make a selection";
    }

    if (!formData.simpleVsLayered) {
      newErrors.simpleVsLayered = "Please make a selection";
    }

    if (!formData.neutralsVsColor) {
      newErrors.neutralsVsColor = "Please make a selection";
    }

    if (!formData.outfitBuilding) {
      newErrors.outfitBuilding = "This field is required";
    }

    if (!formData.styleEvolution) {
      newErrors.styleEvolution = "This field is required";
    }

    if (!formData.blendVsStandout) {
      newErrors.blendVsStandout = "This field is required";
    }

    if (!formData.expressVsShift) {
      newErrors.expressVsShift = "This field is required";
    }

    if (!formData.styleFeedback) {
      newErrors.styleFeedback = "This field is required";
    }

    if (!formData.feelingPowerful) {
      newErrors.feelingPowerful = "This field is required";
    }

    if (!formData.styleAvoidance) {
      newErrors.styleAvoidance = "This field is required";
    }

    if (!formData.styleRuts) {
      newErrors.styleRuts = "This field is required";
    }

    if (!formData.wardrobeStory) {
      newErrors.wardrobeStory = "This field is required";
    }

    if (!formData.fabricDislikes) {
      newErrors.fabricDislikes = "This field is required";
    }

    if (!formData.styleCommunication) {
      newErrors.styleCommunication = "This field is required";
    }

    if (!formData.becomingPerson) {
      newErrors.becomingPerson = "This field is required";
    }

    if (!formData.pastStyle) {
      newErrors.pastStyle = "This field is required";
    }

    if (!formData.dreamWardrobe) {
      newErrors.dreamWardrobe = "This field is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      // Scroll to the first error
      const firstErrorElement = document.querySelector(".text-red-500");
      if (firstErrorElement) {
        firstErrorElement.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }
      return;
    }

    setSubmitting(true);
    setError(null);

    try {
      const response = await fetch("/api/submit-survey", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to submit form");
      }

      setSubmitted(true);
      // Scroll to top to show success message
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      setError("There was an error submitting your survey. Please try again.");
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="bg-white p-8 rounded-lg shadow-md max-w-2xl mx-auto my-12">
        <h2 className="text-2xl font-bold text-green-600 mb-4 text-center">
          Thank You!
        </h2>
        <p className="mb-4 text-center">
          Your cosmic fits survey has been submitted successfully. We appreciate
          your time and insights!
        </p>
      </div>
    );
  }

  return (
    <div className="content">
      <div className="bg-white rounded-lg shadow-lg w-full mx-auto mb-16 overflow-hidden">
        <div className="bg-indigo-600 text-white px-6 py-4 text-center">
          <h2 className="text-xl font-semibold">Your Cosmic Style Journey</h2>
          <p className="text-indigo-100 text-sm mt-1">
            All fields marked with * are required
          </p>
        </div>

        {error && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4">
            <p className="font-medium">Submission Error</p>
            <p>{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="p-6 space-y-24 md:space-y-32">
          {/* Question 1: Birthdate */}
          <div className="p-8 bg-gray-50 rounded-md shadow-sm">
            <label className="block text-gray-700 text-lg font-medium mb-4 required text-center">
              Full Birthdate (If time is unknown, put 00:00am)
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-2 text-center">
                  Date
                </label>
                <input
                  type="date"
                  name="birthdate"
                  value={formData.birthdate}
                  onChange={handleInputChange}
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
                {errors.birthdate && (
                  <span className="text-red-500 text-xs mt-2 block text-center">
                    {errors.birthdate}
                  </span>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-2 text-center">
                  Time
                </label>
                <input
                  type="time"
                  name="birthtime"
                  value={formData.birthtime}
                  onChange={handleInputChange}
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
                {errors.birthtime && (
                  <span className="text-red-500 text-xs mt-2 block text-center">
                    {errors.birthtime}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Question 2: Birthplace */}
          <div className="p-8 bg-gray-50 rounded-md shadow-sm">
            <label className="block text-gray-700 text-lg font-medium mb-4 required text-center">
              Place of Birth (City, Country)
            </label>
            <input
              type="text"
              name="birthplace"
              value={formData.birthplace}
              onChange={handleInputChange}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              placeholder="e.g., New York, USA"
            />
            {errors.birthplace && (
              <span className="text-red-500 text-xs mt-2 block text-center">
                {errors.birthplace}
              </span>
            )}
          </div>

          {/* Question 3: Music Genres */}
          <div className="p-8 bg-gray-50 rounded-md shadow-sm">
            <label className="block text-gray-700 text-lg font-medium mb-4 required text-center">
              What music genres meant the most to you between ages 10–20?
              (Choose up to 3)
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {[
                "Pop",
                "Rock",
                "Hip-Hop",
                "Electronic Dance Music (EDM)",
                "R&B",
                "Latin",
                "Country",
                "Classical",
                "Metal",
              ].map((genre) => (
                <div
                  key={genre}
                  className="flex items-center space-x-2 bg-white p-3 rounded border border-gray-200 hover:border-indigo-300 transition"
                >
                  <input
                    type="checkbox"
                    id={`genre-${genre}`}
                    name="musicGenres"
                    value={genre}
                    checked={formData.musicGenres.includes(genre)}
                    onChange={handleCheckboxChange}
                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  />
                  <label
                    htmlFor={`genre-${genre}`}
                    className="text-sm text-gray-700"
                  >
                    {genre}
                  </label>
                </div>
              ))}
            </div>
            {errors.musicGenres && (
              <span className="text-red-500 text-xs mt-2 block text-center">
                {errors.musicGenres}
              </span>
            )}
          </div>

          {/* Question 4: Artists */}
          <div className="p-8 bg-gray-50 rounded-md shadow-sm">
            <label className="block text-gray-700 text-lg font-medium mb-4 required text-center">
              Which artists or bands shaped your identity as a teen? (add up to
              5)
            </label>
            <textarea
              name="artists"
              value={formData.artists}
              onChange={handleInputChange}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              rows={3}
              placeholder="e.g., Radiohead, Beyoncé, Taylor Swift..."
            ></textarea>
            {errors.artists && (
              <span className="text-red-500 text-xs mt-2 block text-center">
                {errors.artists}
              </span>
            )}
          </div>

          {/* Question 5: Movies/Shows */}
          <div className="p-8 bg-gray-50 rounded-md shadow-sm">
            <label className="block text-gray-700 text-lg font-medium mb-4 required text-center">
              What kind of movies or shows were you drawn to growing up? (Add up
              to 5)
            </label>
            <textarea
              name="moviesShows"
              value={formData.moviesShows}
              onChange={handleInputChange}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              rows={3}
              placeholder="e.g., Science fiction, romantic comedies, anime..."
            ></textarea>
            {errors.moviesShows && (
              <span className="text-red-500 text-xs mt-2 block text-center">
                {errors.moviesShows}
              </span>
            )}
          </div>

          {/* Question 6: Subcultures */}
          <div className="p-8 bg-gray-50 rounded-md shadow-sm">
            <label className="block text-gray-700 text-lg font-medium mb-4 required text-center">
              Were you part of any subcultures or style scenes as a teen?
              Describe.
            </label>
            <textarea
              name="subcultures"
              value={formData.subcultures}
              onChange={handleInputChange}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              rows={3}
              placeholder="e.g., Punk, skater, goth, preppy..."
            ></textarea>
            {errors.subcultures && (
              <span className="text-red-500 text-xs mt-2 block text-center">
                {errors.subcultures}
              </span>
            )}
          </div>

          {/* Question 7: Fashion Attitude */}
          <div className="p-8 bg-gray-50 rounded-md shadow-sm">
            <label className="block text-gray-700 text-lg font-medium mb-4 required text-center">
              How did you feel about mainstream fashion growing up?
            </label>
            <div className="space-y-4 max-w-md mx-auto">
              {[
                "Loved it",
                "Followed it loosely",
                "Rejected it",
                "Didn't care",
              ].map((option) => (
                <div
                  key={option}
                  className="flex items-center space-x-2 bg-white p-3 rounded border border-gray-200 hover:border-indigo-300 transition"
                >
                  <input
                    type="radio"
                    id={`fashion-${option}`}
                    name="fashionAttitude"
                    value={option}
                    checked={formData.fashionAttitude === option}
                    onChange={handleInputChange}
                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  />
                  <label
                    htmlFor={`fashion-${option}`}
                    className="text-sm text-gray-700"
                  >
                    {option}
                  </label>
                </div>
              ))}
              <div className="flex items-center space-x-2 bg-white p-3 rounded border border-gray-200 hover:border-indigo-300 transition">
                <input
                  type="radio"
                  id="fashion-other"
                  name="fashionAttitude"
                  value="Other"
                  checked={formData.fashionAttitude === "Other"}
                  onChange={handleInputChange}
                  className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                />
                <label
                  htmlFor="fashion-other"
                  className="text-sm text-gray-700"
                >
                  Other
                </label>
              </div>
              <div className="pl-6">
                <input
                  type="text"
                  name="fashionAttitudeOther"
                  value={formData.fashionAttitudeOther}
                  onChange={handleInputChange}
                  placeholder="Please specify"
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 mt-1"
                />
              </div>
            </div>
            {errors.fashionAttitude && (
              <span className="text-red-500 text-xs mt-2 block text-center">
                {errors.fashionAttitude}
              </span>
            )}
          </div>

          {/* Question 8: Style Icons */}
          <div className="p-8 bg-gray-50 rounded-md shadow-sm">
            <label className="block text-gray-700 text-lg font-medium mb-4 required text-center">
              Who were your early style icons (real, fictional, celebrity,
              friend)?
            </label>
            <textarea
              name="styleIcons"
              value={formData.styleIcons}
              onChange={handleInputChange}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              rows={3}
              placeholder="e.g., Princess Diana, David Bowie, Rihanna..."
            ></textarea>
            {errors.styleIcons && (
              <span className="text-red-500 text-xs mt-2 block text-center">
                {errors.styleIcons}
              </span>
            )}
          </div>

          {/* Question 9: Style Words */}
          <div className="p-8 bg-gray-50 rounded-md shadow-sm">
            <label className="block text-gray-700 text-lg font-medium mb-4 required text-center">
              Describe your current style in 3 words.
            </label>
            <div className="space-y-4 max-w-md mx-auto">
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center font-medium mr-3">
                  1
                </div>
                <input
                  type="text"
                  name="styleWords.word1"
                  value={formData.styleWords.word1}
                  onChange={handleInputChange}
                  className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  placeholder="First word"
                />
              </div>
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center font-medium mr-3">
                  2
                </div>
                <input
                  type="text"
                  name="styleWords.word2"
                  value={formData.styleWords.word2}
                  onChange={handleInputChange}
                  className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  placeholder="Second word"
                />
              </div>
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center font-medium mr-3">
                  3
                </div>
                <input
                  type="text"
                  name="styleWords.word3"
                  value={formData.styleWords.word3}
                  onChange={handleInputChange}
                  className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  placeholder="Third word"
                />
              </div>
            </div>
            {errors.styleWords && (
              <span className="text-red-500 text-xs mt-2 block text-center">
                All three words are required
              </span>
            )}
          </div>

          {/* Question 10: Fabric Preferences */}
          <div className="p-8 bg-gray-50 rounded-md shadow-sm">
            <label className="block text-gray-700 text-lg font-medium mb-4 required text-center">
              What types of fabrics or textures do you love wearing?
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 max-w-3xl mx-auto">
              {[
                "Cotton",
                "Linen",
                "Silk",
                "Leather",
                "Velvet",
                "Denim",
                "Wool",
                "Sheer",
                "Knit",
                "Other",
              ].map((fabric) => (
                <div
                  key={fabric}
                  className="flex items-center space-x-2 bg-white p-3 rounded border border-gray-200 hover:border-indigo-300 transition"
                >
                  <input
                    type="checkbox"
                    id={`fabric-${fabric}`}
                    name="fabricPreferences"
                    value={fabric}
                    checked={formData.fabricPreferences.includes(fabric)}
                    onChange={handleCheckboxChange}
                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  />
                  <label
                    htmlFor={`fabric-${fabric}`}
                    className="text-sm text-gray-700"
                  >
                    {fabric}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Question 11: Preferences */}
          <div className="p-8 bg-gray-50 rounded-md shadow-sm">
            <label className="block text-gray-700 text-lg font-medium mb-4 required text-center">
              Which do you prefer?
            </label>

            <div className="space-y-8 max-w-lg mx-auto">
              <div className="space-y-2">
                <div className="flex justify-between text-sm text-gray-600 mb-2">
                  <span>Comfort</span>
                  <span>Structure</span>
                </div>
                <div className="flex items-center space-x-4 bg-white p-4 rounded border border-gray-200">
                  <input
                    type="radio"
                    id="comfort"
                    name="comfortVsStructure"
                    value="Comfort"
                    checked={formData.comfortVsStructure === "Comfort"}
                    onChange={handleInputChange}
                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  />
                  <div className="flex-1 h-2 bg-gray-200 rounded relative">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="w-px h-full bg-gray-400"></span>
                    </div>
                  </div>
                  <input
                    type="radio"
                    id="structure"
                    name="comfortVsStructure"
                    value="Structure"
                    checked={formData.comfortVsStructure === "Structure"}
                    onChange={handleInputChange}
                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm text-gray-600 mb-2">
                  <span>Simple</span>
                  <span>Layered</span>
                </div>
                <div className="flex items-center space-x-4 bg-white p-4 rounded border border-gray-200">
                  <input
                    type="radio"
                    id="simple"
                    name="simpleVsLayered"
                    value="Simple"
                    checked={formData.simpleVsLayered === "Simple"}
                    onChange={handleInputChange}
                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  />
                  <div className="flex-1 h-2 bg-gray-200 rounded relative">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="w-px h-full bg-gray-400"></span>
                    </div>
                  </div>
                  <input
                    type="radio"
                    id="layered"
                    name="simpleVsLayered"
                    value="Layered"
                    checked={formData.simpleVsLayered === "Layered"}
                    onChange={handleInputChange}
                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm text-gray-600 mb-2">
                  <span>Neutrals</span>
                  <span>Color</span>
                </div>
                <div className="flex items-center space-x-4 bg-white p-4 rounded border border-gray-200">
                  <input
                    type="radio"
                    id="neutrals"
                    name="neutralsVsColor"
                    value="Neutrals"
                    checked={formData.neutralsVsColor === "Neutrals"}
                    onChange={handleInputChange}
                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  />
                  <div className="flex-1 h-2 bg-gray-200 rounded relative">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="w-px h-full bg-gray-400"></span>
                    </div>
                  </div>
                  <input
                    type="radio"
                    id="color"
                    name="neutralsVsColor"
                    value="Color"
                    checked={formData.neutralsVsColor === "Color"}
                    onChange={handleInputChange}
                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  />
                </div>
              </div>
            </div>

            {(errors.comfortVsStructure ||
              errors.simpleVsLayered ||
              errors.neutralsVsColor) && (
              <span className="text-red-500 text-xs mt-2 block text-center">
                Please make all three selections
              </span>
            )}
          </div>

          {/* Question 12: Outfit Building */}
          <div className="p-8 bg-gray-50 rounded-md shadow-sm">
            <label className="block text-gray-700 text-lg font-medium mb-4 required text-center">
              How do you usually build an outfit?
            </label>
            <div className="space-y-4 max-w-md mx-auto">
              {[
                "Based on mood",
                "Based on utility",
                "Around one statement piece",
                "To match a vibe",
              ].map((option) => (
                <div
                  key={option}
                  className="flex items-center space-x-2 bg-white p-3 rounded border border-gray-200 hover:border-indigo-300 transition"
                >
                  <input
                    type="radio"
                    id={`outfit-${option}`}
                    name="outfitBuilding"
                    value={option}
                    checked={formData.outfitBuilding === option}
                    onChange={handleInputChange}
                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  />
                  <label
                    htmlFor={`outfit-${option}`}
                    className="text-sm text-gray-700"
                  >
                    {option}
                  </label>
                </div>
              ))}
              <div className="flex items-center space-x-2 bg-white p-3 rounded border border-gray-200 hover:border-indigo-300 transition">
                <input
                  type="radio"
                  id="outfit-other"
                  name="outfitBuilding"
                  value="Other"
                  checked={formData.outfitBuilding === "Other"}
                  onChange={handleInputChange}
                  className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                />
                <label htmlFor="outfit-other" className="text-sm text-gray-700">
                  Other
                </label>
              </div>
              <div className="pl-6">
                <input
                  type="text"
                  name="outfitBuildingOther"
                  value={formData.outfitBuildingOther}
                  onChange={handleInputChange}
                  placeholder="Please specify"
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 mt-1"
                />
              </div>
            </div>
            {errors.outfitBuilding && (
              <span className="text-red-500 text-xs mt-2 block text-center">
                {errors.outfitBuilding}
              </span>
            )}
          </div>

          {/* Question 13: Style Evolution */}
          <div className="p-8 bg-gray-50 rounded-md shadow-sm">
            <label className="block text-gray-700 text-lg font-medium mb-4 required text-center">
              How has your style changed over the years? What's stayed the same?
            </label>
            <textarea
              name="styleEvolution"
              value={formData.styleEvolution}
              onChange={handleInputChange}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              rows={3}
              placeholder="Describe your style journey..."
            ></textarea>
            {errors.styleEvolution && (
              <span className="text-red-500 text-xs mt-2 block text-center">
                {errors.styleEvolution}
              </span>
            )}
          </div>

          {/* Question 14: Blend vs Standout */}
          <div className="p-8 bg-gray-50 rounded-md shadow-sm">
            <label className="block text-gray-700 text-lg font-medium mb-4 required text-center">
              Do you feel more like yourself when you blend in or stand out?
            </label>
            <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 max-w-2xl mx-auto">
              <div className="flex-1 bg-white p-4 rounded border border-gray-200 hover:border-indigo-300 transition">
                <div className="flex items-center space-x-3">
                  <input
                    type="radio"
                    id="blend"
                    name="blendVsStandout"
                    value="Blend in"
                    checked={formData.blendVsStandout === "Blend in"}
                    onChange={handleInputChange}
                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  />
                  <label htmlFor="blend" className="text-gray-700 font-medium">
                    Blend in
                  </label>
                </div>
                <p className="text-xs text-gray-500 mt-2 ml-7">
                  I prefer to look appropriate and harmonious with my
                  surroundings
                </p>
              </div>
              <div className="flex-1 bg-white p-4 rounded border border-gray-200 hover:border-indigo-300 transition">
                <div className="flex items-center space-x-3">
                  <input
                    type="radio"
                    id="standout"
                    name="blendVsStandout"
                    value="Stand out"
                    checked={formData.blendVsStandout === "Stand out"}
                    onChange={handleInputChange}
                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  />
                  <label
                    htmlFor="standout"
                    className="text-gray-700 font-medium"
                  >
                    Stand out
                  </label>
                </div>
                <p className="text-xs text-gray-500 mt-2 ml-7">
                  I prefer to express my uniqueness and individuality
                </p>
              </div>
            </div>
            {errors.blendVsStandout && (
              <span className="text-red-500 text-xs mt-2 block text-center">
                {errors.blendVsStandout}
              </span>
            )}
          </div>

          {/* Question 15: Express vs Shift */}
          <div className="p-8 bg-gray-50 rounded-md shadow-sm">
            <label className="block text-gray-700 text-lg font-medium mb-4 required text-center">
              Do you dress to express how you feel, or to shift how you feel?
            </label>
            <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 max-w-2xl mx-auto">
              <div className="flex-1 bg-white p-4 rounded border border-gray-200 hover:border-indigo-300 transition">
                <div className="flex items-center space-x-3">
                  <input
                    type="radio"
                    id="express"
                    name="expressVsShift"
                    value="Express"
                    checked={formData.expressVsShift === "Express"}
                    onChange={handleInputChange}
                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  />
                  <label
                    htmlFor="express"
                    className="text-gray-700 font-medium"
                  >
                    Express
                  </label>
                </div>
                <p className="text-xs text-gray-500 mt-2 ml-7">
                  My clothes reflect my current emotions and state of mind
                </p>
              </div>
              <div className="flex-1 bg-white p-4 rounded border border-gray-200 hover:border-indigo-300 transition">
                <div className="flex items-center space-x-3">
                  <input
                    type="radio"
                    id="shift"
                    name="expressVsShift"
                    value="Shift"
                    checked={formData.expressVsShift === "Shift"}
                    onChange={handleInputChange}
                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  />
                  <label htmlFor="shift" className="text-gray-700 font-medium">
                    Shift
                  </label>
                </div>
                <p className="text-xs text-gray-500 mt-2 ml-7">
                  I use clothes to change how I feel or want to feel
                </p>
              </div>
            </div>
            {errors.expressVsShift && (
              <span className="text-red-500 text-xs mt-2 block text-center">
                {errors.expressVsShift}
              </span>
            )}
          </div>

          {/* Question 16: Style Feedback */}
          <div className="p-8 bg-gray-50 rounded-md shadow-sm">
            <label className="block text-gray-700 text-lg font-medium mb-4 required text-center">
              What kind of feedback do you get on your style from others?
            </label>
            <textarea
              name="styleFeedback"
              value={formData.styleFeedback}
              onChange={handleInputChange}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              rows={3}
              placeholder="Share the compliments or comments you often receive..."
            ></textarea>
            {errors.styleFeedback && (
              <span className="text-red-500 text-xs mt-2 block text-center">
                {errors.styleFeedback}
              </span>
            )}
          </div>

          {/* Question 17: Feeling Powerful */}
          <div className="p-8 bg-gray-50 rounded-md shadow-sm">
            <label className="block text-gray-700 text-lg font-medium mb-4 required text-center">
              What makes you feel powerful in your clothing?
            </label>
            <textarea
              name="feelingPowerful"
              value={formData.feelingPowerful}
              onChange={handleInputChange}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              rows={3}
              placeholder="Describe what elements give you confidence..."
            ></textarea>
            {errors.feelingPowerful && (
              <span className="text-red-500 text-xs mt-2 block text-center">
                {errors.feelingPowerful}
              </span>
            )}
          </div>

          {/* Question 18: Style Avoidance */}
          <div className="p-8 bg-gray-50 rounded-md shadow-sm">
            <label className="block text-gray-700 text-lg font-medium mb-4 required text-center">
              What do you avoid wearing—no matter how trendy or flattering?
            </label>
            <textarea
              name="styleAvoidance"
              value={formData.styleAvoidance}
              onChange={handleInputChange}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              rows={3}
              placeholder="Share your fashion boundaries..."
            ></textarea>
            {errors.styleAvoidance && (
              <span className="text-red-500 text-xs mt-2 block text-center">
                {errors.styleAvoidance}
              </span>
            )}
          </div>

          {/* Question 19: Style Ruts */}
          <div className="p-8 bg-gray-50 rounded-md shadow-sm">
            <label className="block text-gray-700 text-lg font-medium mb-4 required text-center">
              Do you go through style "ruts" or phases where nothing feels
              right? Describe.
            </label>
            <textarea
              name="styleRuts"
              value={formData.styleRuts}
              onChange={handleInputChange}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              rows={3}
              placeholder="Tell us about your style challenges..."
            ></textarea>
            {errors.styleRuts && (
              <span className="text-red-500 text-xs mt-2 block text-center">
                {errors.styleRuts}
              </span>
            )}
          </div>

          {/* Question 20: Wardrobe Story */}
          <div className="p-8 bg-gray-50 rounded-md shadow-sm">
            <label className="block text-gray-700 text-lg font-medium mb-4 required text-center">
              If your wardrobe told a story, what would it be about?
            </label>
            <textarea
              name="wardrobeStory"
              value={formData.wardrobeStory}
              onChange={handleInputChange}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              rows={3}
              placeholder="Get creative with your wardrobe narrative..."
            ></textarea>
            {errors.wardrobeStory && (
              <span className="text-red-500 text-xs mt-2 block text-center">
                {errors.wardrobeStory}
              </span>
            )}
          </div>

          {/* Question 21: Color Palettes */}
          <div className="p-8 bg-gray-50 rounded-md shadow-sm">
            <label className="block text-gray-700 text-lg font-medium mb-4 required text-center">
              What color palettes feel most natural to you?
            </label>
            <div className="grid grid-cols-1 gap-3 max-w-xl mx-auto">
              {[
                "Warm earth tones (olive, rust, camel)",
                "Jewel tones (emerald, ruby, sapphire)",
                "Neutrals (beige, grey, navy)",
                "Bright saturated colors (red, cobalt, citrus)",
                "Pastels (lavender, mint, blush)",
              ].map((palette) => (
                <div
                  key={palette}
                  className="flex items-center space-x-2 bg-white p-3 rounded border border-gray-200 hover:border-indigo-300 transition"
                >
                  <input
                    type="checkbox"
                    id={`palette-${palette}`}
                    name="colorPalettes"
                    value={palette}
                    checked={formData.colorPalettes.includes(palette)}
                    onChange={handleCheckboxChange}
                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  />
                  <label
                    htmlFor={`palette-${palette}`}
                    className="text-sm text-gray-700"
                  >
                    {palette}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Question 22: Fabric Dislikes */}
          <div className="p-8 bg-gray-50 rounded-md shadow-sm">
            <label className="block text-gray-700 text-lg font-medium mb-4 required text-center">
              Are there any textures or materials you dislike wearing? Why?
            </label>
            <textarea
              name="fabricDislikes"
              value={formData.fabricDislikes}
              onChange={handleInputChange}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              rows={3}
              placeholder="Explain what fabrics you avoid and why..."
            ></textarea>
            {errors.fabricDislikes && (
              <span className="text-red-500 text-xs mt-2 block text-center">
                {errors.fabricDislikes}
              </span>
            )}
          </div>

          {/* Question 23: Fabric Importance */}
          <div className="p-8 bg-gray-50 rounded-md shadow-sm">
            <label className="block text-gray-700 text-lg font-medium mb-4 required text-center">
              On a scale of 1–10, how important is the feel of fabric to you?
            </label>
            <div className="relative pt-1 px-2 max-w-xl mx-auto">
              <div className="flex justify-between text-xs text-gray-500 mb-3">
                <span>Not important</span>
                <span>Extremely important</span>
              </div>
              <div className="bg-white p-4 rounded border border-gray-200">
                <input
                  type="range"
                  min="1"
                  max="10"
                  name="fabricImportance"
                  value={formData.fabricImportance}
                  onChange={handleRangeChange}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between w-full px-1 text-xs text-gray-500 mt-2">
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                    <span key={num} className="px-1">
                      {num}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            {errors.fabricImportance && (
              <span className="text-red-500 text-xs mt-2 block text-center">
                {errors.fabricImportance}
              </span>
            )}
          </div>

          {/* Question 24: Style Communication */}
          <div className="p-8 bg-gray-50 rounded-md shadow-sm">
            <label className="block text-gray-700 text-lg font-medium mb-4 required text-center">
              What do you wish your style communicated about you?
            </label>
            <textarea
              name="styleCommunication"
              value={formData.styleCommunication}
              onChange={handleInputChange}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              rows={3}
              placeholder="Share the message you want your style to convey..."
            ></textarea>
            {errors.styleCommunication && (
              <span className="text-red-500 text-xs mt-2 block text-center">
                {errors.styleCommunication}
              </span>
            )}
          </div>

          {/* Question 25: Becoming Person */}
          <div className="p-8 bg-gray-50 rounded-md shadow-sm">
            <label className="block text-gray-700 text-lg font-medium mb-4 required text-center">
              What kind of person are you becoming—and how does that influence
              your wardrobe?
            </label>
            <textarea
              name="becomingPerson"
              value={formData.becomingPerson}
              onChange={handleInputChange}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              rows={3}
              placeholder="Reflect on your personal growth and style evolution..."
            ></textarea>
            {errors.becomingPerson && (
              <span className="text-red-500 text-xs mt-2 block text-center">
                {errors.becomingPerson}
              </span>
            )}
          </div>

          {/* Question 26: Past Style */}
          <div className="p-8 bg-gray-50 rounded-md shadow-sm">
            <label className="block text-gray-700 text-lg font-medium mb-4 required text-center">
              Is there a version of you from the past you'd like to channel
              again through fashion?
            </label>
            <textarea
              name="pastStyle"
              value={formData.pastStyle}
              onChange={handleInputChange}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              rows={3}
              placeholder="Describe a past style era you might want to revisit..."
            ></textarea>
            {errors.pastStyle && (
              <span className="text-red-500 text-xs mt-2 block text-center">
                {errors.pastStyle}
              </span>
            )}
          </div>

          {/* Question 27: Dream Wardrobe */}
          <div className="p-8 bg-gray-50 rounded-md shadow-sm">
            <label className="block text-gray-700 text-lg font-medium mb-4 required text-center">
              Describe your dream wardrobe. No limits.
            </label>
            <textarea
              name="dreamWardrobe"
              value={formData.dreamWardrobe}
              onChange={handleInputChange}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              rows={3}
              placeholder="Let your imagination run wild—what would your ideal wardrobe include?"
            ></textarea>
            {errors.dreamWardrobe && (
              <span className="text-red-500 text-xs mt-2 block text-center">
                {errors.dreamWardrobe}
              </span>
            )}
          </div>

          <div className="pt-6">
            <div className="bg-indigo-50 rounded-md p-6 mb-8 border border-indigo-100 text-center">
              <p className="text-sm text-indigo-700">
                Thank you for taking the time to complete this survey. Your
                responses will help us understand your unique style journey.
              </p>
            </div>
            <button
              type="submit"
              disabled={submitting}
              className="w-full py-4 px-6 bg-indigo-600 text-white text-lg font-medium rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 transition-colors duration-200"
            >
              {submitting ? "Submitting..." : "Submit Your Cosmic Fits Survey"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
