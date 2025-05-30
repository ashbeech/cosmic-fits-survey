"use client";

import { useState } from "react";
import DateTimeInput from "./DateTimeInput";

type FormData = {
  name: string;
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
  comfortVsStructure: number;
  simpleVsLayered: number;
  neutralsVsColor: number;
  outfitBuilding: string;
  outfitBuildingOther: string;
  styleEvolution: string;
  blendVsStandout: number;
  expressVsShift: number;
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
  name?: string;
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
    name: "",
    birthdate: "",
    birthtime: "00:00",
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
    comfortVsStructure: 5,
    simpleVsLayered: 5,
    neutralsVsColor: 5,
    outfitBuilding: "",
    outfitBuildingOther: "",
    styleEvolution: "",
    blendVsStandout: 5,
    expressVsShift: 5,
    styleFeedback: "",
    feelingPowerful: "",
    styleAvoidance: "",
    styleRuts: "",
    wardrobeStory: "",
    colorPalettes: [],
    fabricDislikes: "",
    fabricImportance: 1,
    styleCommunication: "",
    becomingPerson: "",
    pastStyle: "",
    dreamWardrobe: "",
  });

  // Form error state
  const [errors, setErrors] = useState<ErrorState>({});

  // Track if user has attempted to submit the form
  const [submissionAttempted, setSubmissionAttempted] = useState(false);

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

    // Handle the case where the time is unknown
    if (name === "birthtime" && value === "unknown") {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
      return;
    }

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
    if (!formData.name) {
      newErrors.name = "Your name is key to your cosmic fit";
    }

    // Validate birthdate
    if (!formData.birthdate) {
      newErrors.birthdate = "Your date of birth is key to your cosmic fit";
    } else {
      // Check if the date is valid (YYYY-MM-DD format)
      const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
      if (!dateRegex.test(formData.birthdate)) {
        newErrors.birthdate = "Please enter a valid date";
      }
    }

    // Validate birthtime
    if (!formData.birthtime) {
      newErrors.birthtime = "Your birth time is key to your cosmic fit";
    } else if (formData.birthtime !== "unknown") {
      // Check if the time is valid (HH:MM format)
      const timeRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;
      if (!timeRegex.test(formData.birthtime)) {
        newErrors.birthtime = "Please enter a valid time";
      }
    }

    if (!formData.birthplace) {
      newErrors.birthplace = "Your birth place is key to your cosmic fit";
    }

    if (!formData.artists) {
      newErrors.artists = "Artists are key to your cosmic fit";
    }

    if (!formData.moviesShows) {
      newErrors.moviesShows = "Movies and shows are key to your cosmic fit";
    }

    if (!formData.subcultures) {
      newErrors.subcultures = "Subcultures are key to your cosmic fit";
    }

    if (!formData.fashionAttitude) {
      newErrors.fashionAttitude = "Fashion attitude is key to your cosmic fit";
    }

    if (!formData.styleIcons) {
      newErrors.styleIcons = "Style icons are key to your cosmic fit";
    }

    // Style words validation
    const styleWordsErrors: { word1?: string; word2?: string; word3?: string } =
      {};

    if (!formData.styleWords.word1) {
      styleWordsErrors.word1 = "Please think of a word";
    }

    if (!formData.styleWords.word2) {
      styleWordsErrors.word2 = "Please think of a word";
    }

    if (!formData.styleWords.word3) {
      styleWordsErrors.word3 = "Please think of a word";
    }

    if (Object.keys(styleWordsErrors).length > 0) {
      newErrors.styleWords = styleWordsErrors;
    }

    // Preference selections are now optional sliders, no validation needed

    if (!formData.outfitBuilding) {
      newErrors.outfitBuilding = "Outfit building is key to your cosmic fit";
    }

    if (!formData.styleEvolution) {
      newErrors.styleEvolution = "Style evolution is key to your cosmic fit";
    }

    if (!formData.styleFeedback) {
      newErrors.styleFeedback = "This is key to your cosmic fit";
    }

    if (!formData.feelingPowerful) {
      newErrors.feelingPowerful = "This is key to your cosmic fit";
    }

    if (!formData.styleAvoidance) {
      newErrors.styleAvoidance = "This is key to your cosmic fit";
    }

    if (!formData.styleRuts) {
      newErrors.styleRuts = "This is key to your cosmic fit";
    }

    if (!formData.wardrobeStory) {
      newErrors.wardrobeStory = "Your wardrobe story is key to your cosmic fit";
    }

    if (!formData.fabricDislikes) {
      newErrors.fabricDislikes =
        "Your fabric dislikes are key to your cosmic fit";
    }

    if (!formData.styleCommunication) {
      newErrors.styleCommunication = "This is key to your cosmic fit";
    }

    if (!formData.becomingPerson) {
      newErrors.becomingPerson = "This is key to your cosmic fit";
    }

    if (!formData.pastStyle) {
      newErrors.pastStyle = "Your past style is key to your cosmic fit";
    }

    if (!formData.dreamWardrobe) {
      newErrors.dreamWardrobe = "Your dream wardrobe is key to your cosmic fit";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Set that user has attempted to submit
    setSubmissionAttempted(true);

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

  // Generate human-readable error summary
  const getErrorSummary = () => {
    const errorFields = Object.keys(errors);
    if (errorFields.length === 0) return null;

    // Map field names to more user-friendly labels
    const fieldLabels: Record<string, string> = {
      name: "Your Name",
      birthdate: "Birth Date",
      birthtime: "Birth Time",
      birthplace: "Place of Birth",
      musicGenres: "Music Genres",
      artists: "Artists or Bands",
      moviesShows: "Movies or Shows",
      subcultures: "Subcultures",
      fashionAttitude: "Fashion Attitude",
      styleIcons: "Style Icons",
      styleWords: "Style Words",
      outfitBuilding: "Outfit Building",
      styleEvolution: "Style Evolution",
      blendVsStandout: "Blend vs Standout Preference",
      expressVsShift: "Express vs Shift Preference",
      styleFeedback: "Style Feedback",
      feelingPowerful: "Feeling Powerful",
      styleAvoidance: "Style Avoidance",
      styleRuts: "Style Ruts",
      wardrobeStory: "Wardrobe Story",
      fabricDislikes: "Fabric Dislikes",
      fabricImportance: "Fabric Importance",
      styleCommunication: "Style Communication",
      becomingPerson: "The Person You're Becoming",
      pastStyle: "Past Style",
      dreamWardrobe: "Dream Wardrobe",
    };

    // Function to scroll to a specific field
    const scrollToField = (field: string) => {
      // Handle special case for birthdate/birthtime
      if (field === "birthdate" || field === "birthtime") {
        field = "birthdate"; // Both are in the DateTimeInput component
      }

      // First try to find an element with the field name as id or name
      let selector = `[name="${field}"]`;

      // Special handling for nested fields
      if (field === "styleWords") {
        selector = `[name="styleWords.word1"]`;
      }

      const element = document.querySelector(selector);
      if (element) {
        element.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }
    };

    const errorItems = errorFields.map((field) => {
      // Handle the special case of styleWords which is an object
      if (field === "styleWords") {
        return {
          id: field,
          label: "Style Words (all three words are required)",
        };
      }
      return { id: field, label: fieldLabels[field] || field };
    });

    return (
      <div className="error-summary">
        <h3>Great so far, but there's a few things that got missed out:</h3>
        <ul>
          {errorItems.map((item) => (
            <li key={item.id} className="mb-1">
              <button
                type="button"
                onClick={() => scrollToField(item.id)}
                className="text-red-600 hover:text-red-800 underline focus:outline-none text-left"
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </div>
    );
  };

  if (submitted) {
    return (
      <div className="bg-white p-8 rounded-lg shadow-md max-w-2xl mx-auto my-12">
        <h2 className="text-2xl font-bold text-green-600 mb-4 text-center">
          Thank You!
        </h2>
        <p className="mb-4 text-center">
          Your cosmic fits survey has been submitted successfully. I really
          appreciate your time and insights!
        </p>
      </div>
    );
  }

  return (
    <div className="content">
      <div className="survey-container">
        <div className="survey-form">
          <div className="survey-header">
            <h1>✨Cosmic Fits Survey✨</h1>
          </div>

          {error && (
            <div className="form-error-alert">
              <p className="font-medium">Submission Error</p>
              <p>{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {/* Question 0: Name */}
            <div className="question-section">
              <label className="question-label required">Your Name 👋</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-0"
                placeholder="e.g. Maria"
              />
              {errors.name && (
                <span className="text-red-500 text-xs mt-2 block text-center">
                  {errors.name}
                </span>
              )}
            </div>

            {/* Question 1: Birthdate */}
            <div className="question-section">
              <DateTimeInput
                dateValue={formData.birthdate}
                timeValue={formData.birthtime}
                onDateChange={handleInputChange}
                onTimeChange={handleInputChange}
                dateError={errors.birthdate}
                timeError={errors.birthtime}
                dateName="birthdate"
                timeName="birthtime"
              />
            </div>

            {/* Question 2: Birthplace */}
            <div className="question-section">
              <label className="question-label required">
                Place of Birth (City, Country)
              </label>
              <input
                type="text"
                name="birthplace"
                value={formData.birthplace}
                onChange={handleInputChange}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-0"
                placeholder="e.g. New York, USA"
              />
              {errors.birthplace && (
                <span className="text-red-500 text-xs mt-2 block text-center">
                  {errors.birthplace}
                </span>
              )}
            </div>

            {/* Question 3: Music Genres */}
            <div className="question-section">
              <label className="question-label required">
                What music genres meant the most to you between ages 10–20?
                (Choose up to 3)
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {[
                  "Pop",
                  "Rock (Classic, Metal, Punk etc)",
                  "Hip-Hop",
                  "Electronic Dance Music (EDM)",
                  "R&B",
                  "Latin",
                  "Country",
                  "Classical",
                  "Traditional",
                ].map((genre) => (
                  <div
                    key={genre}
                    className="flex items-center space-x-2 py-2 bg-white p-3 rounded border border-gray-200 hover:border-indigo-300 transition"
                  >
                    <input
                      type="checkbox"
                      id={`genre-${genre}`}
                      name="musicGenres"
                      value={genre}
                      checked={formData.musicGenres.includes(genre)}
                      onChange={handleCheckboxChange}
                      className="form-checkbox h-4 w-4"
                      disabled={
                        !formData.musicGenres.includes(genre) &&
                        formData.musicGenres.length >= 3
                      }
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
            <div className="question-section">
              <label className="question-label required">
                Which artists or bands shaped your identity as a teen? (add up
                to 5)
              </label>
              <textarea
                name="artists"
                value={formData.artists}
                onChange={handleInputChange}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-0"
                rows={3}
                placeholder="e.g. Radiohead, Beyoncé, The Beatles..."
              ></textarea>
              {errors.artists && (
                <span className="text-red-500 text-xs mt-2 block text-center">
                  {errors.artists}
                </span>
              )}
            </div>

            {/* Question 5: Movies/Shows */}
            <div className="question-section">
              <label className="question-label required">
                What kind of movies or shows were you drawn to growing up? (Add
                up to 5)
              </label>
              <textarea
                name="moviesShows"
                value={formData.moviesShows}
                onChange={handleInputChange}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-0"
                rows={3}
                placeholder="e.g. Science Fiction, Romantic Comedies, Anime, Seinfeld, Tarantino Movies..."
              ></textarea>
              {errors.moviesShows && (
                <span className="text-red-500 text-xs mt-2 block text-center">
                  {errors.moviesShows}
                </span>
              )}
            </div>

            {/* Question 6: Subcultures */}
            <div className="question-section">
              <label className="question-label required">
                Were you part of any subcultures or style scenes as a teen?
                Describe.
              </label>
              <textarea
                name="subcultures"
                value={formData.subcultures}
                onChange={handleInputChange}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-0"
                rows={3}
                placeholder="e.g. Punk, skater, goth, preppy, mod..."
              ></textarea>
              {errors.subcultures && (
                <span className="text-red-500 text-xs mt-2 block text-center">
                  {errors.subcultures}
                </span>
              )}
            </div>

            {/* Question 7: Fashion Attitude */}
            <div className="question-section">
              <label className="question-label required">
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
                    className="flex items-center space-x-2 py-2 bg-white p-3 rounded border border-gray-200 hover:border-indigo-300 transition"
                  >
                    <input
                      type="radio"
                      id={`fashion-${option}`}
                      name="fashionAttitude"
                      value={option}
                      checked={formData.fashionAttitude === option}
                      onChange={handleInputChange}
                      className="form-radio h-4 w-4"
                    />
                    <label
                      htmlFor={`fashion-${option}`}
                      className="text-sm text-gray-700"
                    >
                      {option}
                    </label>
                  </div>
                ))}
                <div className="flex items-center space-x-2 py-2 bg-white p-3 rounded border border-gray-200 hover:border-indigo-300 transition">
                  <input
                    type="radio"
                    id="fashion-other"
                    name="fashionAttitude"
                    value="Other"
                    checked={formData.fashionAttitude === "Other"}
                    onChange={handleInputChange}
                    className="form-radio h-4 w-4"
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
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-0 mt-1"
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
            <div className="question-section">
              <label className="question-label required">
                Who were your early style icons (real, fictional, celebrity,
                friend)?
              </label>
              <textarea
                name="styleIcons"
                value={formData.styleIcons}
                onChange={handleInputChange}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-0"
                rows={3}
                placeholder="e.g. Princess Diana, David Bowie, Rihanna, Phoebe from Friends..."
              ></textarea>
              {errors.styleIcons && (
                <span className="text-red-500 text-xs mt-2 block text-center">
                  {errors.styleIcons}
                </span>
              )}
            </div>

            {/* Question 9: Style Words */}
            <div className="question-section">
              <label className="question-label required">
                Describe your current style in 3 words.
              </label>
              <div className="space-y-4 max-w-md mx-auto">
                <div className="flex items-center py-2">
                  <input
                    type="text"
                    name="styleWords.word1"
                    value={formData.styleWords.word1}
                    onChange={handleInputChange}
                    className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-0"
                    placeholder="First word"
                  />
                </div>
                <div className="flex items-center py-2">
                  <input
                    type="text"
                    name="styleWords.word2"
                    value={formData.styleWords.word2}
                    onChange={handleInputChange}
                    className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-0"
                    placeholder="Second word"
                  />
                </div>
                <div className="flex items-center py-2">
                  <input
                    type="text"
                    name="styleWords.word3"
                    value={formData.styleWords.word3}
                    onChange={handleInputChange}
                    className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-0"
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
            <div className="question-section">
              <label className="question-label required">
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
                    className="flex items-center space-x-2 py-2 bg-white p-3 rounded border border-gray-200 hover:border-indigo-300 transition"
                  >
                    <input
                      type="checkbox"
                      id={`fabric-${fabric}`}
                      name="fabricPreferences"
                      value={fabric}
                      checked={formData.fabricPreferences.includes(fabric)}
                      onChange={handleCheckboxChange}
                      className="form-checkbox h-4 w-4"
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
            <div className="question-section">
              <label className="question-label">
                Which do you prefer? (Slide to indicate your preference)
              </label>

              <div className="preference-sliders max-w-2xl mx-auto">
                <div className="slider-container mb-8">
                  <div className="slider-labels" style={{ width: "100%" }}>
                    <span>Comfort</span>
                    <span>Structure</span>
                  </div>
                  <div className="slider-track">
                    <input
                      type="range"
                      min="1"
                      max="10"
                      name="comfortVsStructure"
                      value={formData.comfortVsStructure}
                      onChange={handleRangeChange}
                      className="slider-input"
                    />
                  </div>
                </div>

                <div className="slider-container mb-8">
                  <div className="slider-labels" style={{ width: "100%" }}>
                    <span>Simple</span>
                    <span>Layered</span>
                  </div>
                  <div className="slider-track">
                    <input
                      type="range"
                      min="1"
                      max="10"
                      name="simpleVsLayered"
                      value={formData.simpleVsLayered}
                      onChange={handleRangeChange}
                      className="slider-input"
                    />
                  </div>
                </div>

                <div className="slider-container mb-8">
                  <div className="slider-labels" style={{ width: "100%" }}>
                    <span>Neutrals</span>
                    <span>Colour</span>
                  </div>
                  <div className="slider-track">
                    <input
                      type="range"
                      min="1"
                      max="10"
                      name="neutralsVsColor"
                      value={formData.neutralsVsColor}
                      onChange={handleRangeChange}
                      className="slider-input"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Question 12: Outfit Building */}
            <div className="question-section">
              <label className="question-label required">
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
                    className="flex items-center space-x-2 py-2 bg-white p-3 rounded border border-gray-200 hover:border-indigo-300 transition"
                  >
                    <input
                      type="radio"
                      id={`outfit-${option}`}
                      name="outfitBuilding"
                      value={option}
                      checked={formData.outfitBuilding === option}
                      onChange={handleInputChange}
                      className="form-radio h-4 w-4"
                    />
                    <label
                      htmlFor={`outfit-${option}`}
                      className="text-sm text-gray-700"
                    >
                      {option}
                    </label>
                  </div>
                ))}
                <div className="flex items-center space-x-2 py-2 bg-white p-3 rounded border border-gray-200 hover:border-indigo-300 transition">
                  <input
                    type="radio"
                    id="outfit-other"
                    name="outfitBuilding"
                    value="Other"
                    checked={formData.outfitBuilding === "Other"}
                    onChange={handleInputChange}
                    className="form-radio h-4 w-4"
                  />
                  <label
                    htmlFor="outfit-other"
                    className="text-sm text-gray-700"
                  >
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
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-0 mt-1"
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
            <div className="question-section">
              <label className="question-label required">
                How has your style changed over the years? What's stayed the
                same?
              </label>
              <textarea
                name="styleEvolution"
                value={formData.styleEvolution}
                onChange={handleInputChange}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-0"
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
            <div className="question-section">
              <label className="question-label">
                Do you feel more like yourself when you blend in or stand out?
              </label>
              <div className="slider-container mb-8">
                <div className="slider-labels" style={{ width: "100%" }}>
                  <span style={{ width: "50%", textAlign: "left" }}>
                    Blend in
                  </span>
                  <span style={{ width: "50%", textAlign: "right" }}>
                    Stand out
                  </span>
                </div>
                <div className="slider-track">
                  <input
                    type="range"
                    min="1"
                    max="10"
                    name="blendVsStandout"
                    value={formData.blendVsStandout}
                    onChange={handleRangeChange}
                    className="slider-input"
                  />
                </div>
              </div>
              <div className="max-w-2xl mx-auto">
                <table className="w-full text-xs text-gray-500">
                  <tbody>
                    <tr>
                      <td width="33%" className="align-top text-left pr-2">
                        I prefer to look appropriate and harmonious with my
                        surroundings
                      </td>
                      <td width="33%"></td>
                      <td width="33%" className="align-top text-right pl-2">
                        I prefer to express my uniqueness and individuality
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Question 15: Express vs Shift */}
            <div className="question-section">
              <label className="question-label">
                Do you dress to express how you feel, or to shift how you feel?
              </label>
              <div className="slider-container mb-8">
                <div className="slider-labels" style={{ width: "100%" }}>
                  <span style={{ width: "50%", textAlign: "left" }}>
                    Express
                  </span>
                  <span style={{ width: "50%", textAlign: "right" }}>
                    Shift
                  </span>
                </div>
                <div className="slider-track">
                  <input
                    type="range"
                    min="1"
                    max="10"
                    name="expressVsShift"
                    value={formData.expressVsShift}
                    onChange={handleRangeChange}
                    className="slider-input"
                  />
                </div>
              </div>
              <div className="max-w-2xl mx-auto">
                <table className="w-full text-xs text-gray-500">
                  <tbody>
                    <tr>
                      <td width="33%" className="align-top text-left pr-2">
                        My clothes reflect my current emotions and state of mind
                      </td>
                      <td width="33%"></td>
                      <td width="33%" className="align-top text-right pl-2">
                        I use clothes to change how I feel or want to feel
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Question 16: Style Feedback */}
            <div className="question-section">
              <label className="question-label required">
                What kind of feedback do you get on your style from others?
              </label>
              <textarea
                name="styleFeedback"
                value={formData.styleFeedback}
                onChange={handleInputChange}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-0"
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
            <div className="question-section">
              <label className="question-label required">
                What makes you feel powerful in your clothing?
              </label>
              <textarea
                name="feelingPowerful"
                value={formData.feelingPowerful}
                onChange={handleInputChange}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-0"
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
            <div className="question-section">
              <label className="question-label required">
                What do you avoid wearing—no matter how trendy or flattering?
              </label>
              <textarea
                name="styleAvoidance"
                value={formData.styleAvoidance}
                onChange={handleInputChange}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-0"
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
            <div className="question-section">
              <label className="question-label required">
                Do you go through style "ruts" or phases where nothing feels
                right? Describe.
              </label>
              <textarea
                name="styleRuts"
                value={formData.styleRuts}
                onChange={handleInputChange}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-0"
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
            <div className="question-section">
              <label className="question-label required">
                If your wardrobe told a story, what would it be about?
              </label>
              <textarea
                name="wardrobeStory"
                value={formData.wardrobeStory}
                onChange={handleInputChange}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-0"
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
            <div className="question-section">
              <label className="question-label required">
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
                    className="flex items-center space-x-2 py-2 bg-white p-3 rounded border border-gray-200 hover:border-indigo-300 transition"
                  >
                    <input
                      type="checkbox"
                      id={`palette-${palette}`}
                      name="colorPalettes"
                      value={palette}
                      checked={formData.colorPalettes.includes(palette)}
                      onChange={handleCheckboxChange}
                      className="form-checkbox h-4 w-4"
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
            <div className="question-section">
              <label className="question-label required">
                Are there any textures or materials you dislike wearing? Why?
              </label>
              <textarea
                name="fabricDislikes"
                value={formData.fabricDislikes}
                onChange={handleInputChange}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-0"
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
            <div className="question-section">
              <label className="question-label required">
                On a scale of 1–10, how important is the feel of fabric to you?
              </label>
              <div className="slider-container">
                <div className="slider-labels">
                  <span>Not important</span>
                  <span>Extremely important</span>
                </div>
                <div className="slider-track">
                  <input
                    type="range"
                    min="1"
                    max="10"
                    name="fabricImportance"
                    value={formData.fabricImportance}
                    onChange={handleRangeChange}
                    className="slider-input"
                  />
                </div>
              </div>
              {errors.fabricImportance && (
                <span className="text-red-500 text-xs mt-2 block text-center">
                  {errors.fabricImportance}
                </span>
              )}
            </div>

            {/* Question 24: Style Communication */}
            <div className="question-section">
              <label className="question-label required">
                What do you wish your style communicated about you?
              </label>
              <textarea
                name="styleCommunication"
                value={formData.styleCommunication}
                onChange={handleInputChange}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-0"
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
            <div className="question-section">
              <label className="question-label required">
                What kind of person are you becoming—and how does that influence
                your wardrobe?
              </label>
              <textarea
                name="becomingPerson"
                value={formData.becomingPerson}
                onChange={handleInputChange}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-0"
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
            <div className="question-section">
              <label className="question-label required">
                Is there a version of you from the past you'd like to channel
                again through fashion?
              </label>
              <textarea
                name="pastStyle"
                value={formData.pastStyle}
                onChange={handleInputChange}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-0"
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
            <div className="question-section">
              <label className="question-label required">
                Describe your dream wardrobe. No limits.
              </label>
              <textarea
                name="dreamWardrobe"
                value={formData.dreamWardrobe}
                onChange={handleInputChange}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-0"
                rows={3}
                placeholder="Let your imagination run wild—what would your ideal wardrobe include?"
              ></textarea>
              {errors.dreamWardrobe && (
                <span className="text-red-500 text-xs mt-2 block text-center">
                  {errors.dreamWardrobe}
                </span>
              )}
            </div>

            <div className="end-message p-8">
              <div className="bg-indigo-50 rounded-md p-6 mb-8 border border-indigo-100 text-center">
                <p className="text-sm text-indigo-700">
                  Thank you for taking the time to complete this survey. Your
                  answers will help me understand your unique cosmic style -
                  with the goal to help you effortlessly look your very best
                  everyday, simultaneously saving you time, and money through
                  your wardrobe.
                </p>
              </div>
              {submissionAttempted &&
                Object.keys(errors).length > 0 &&
                getErrorSummary()}
              <button
                type="submit"
                disabled={submitting}
                className="submit-button"
              >
                {submitting ? "Submitting..." : "Submit"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
