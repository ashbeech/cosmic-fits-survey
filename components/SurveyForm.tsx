"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";

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

export default function SurveyForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (data: FormData) => {
    setSubmitting(true);
    setError(null);

    try {
      const response = await fetch("/api/submit-survey", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to submit form");
      }

      setSubmitted(true);
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
        <h2 className="text-2xl font-bold text-green-600 mb-4">Thank You!</h2>
        <p className="mb-4">
          Your cosmic fits survey has been submitted successfully. We appreciate
          your time and insights!
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-lg max-w-3xl mx-auto mb-16 w-full">
      <div className="bg-indigo-600 text-white px-6 py-4 rounded-t-lg">
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

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="p-6 space-y-12 md:space-y-16"
      >
        {/* Question 1: Birthdate */}
        <div className="p-6 bg-gray-50 rounded-md shadow-sm">
          <label className="block text-gray-700 text-lg font-medium mb-4 required">
            Full Birthdate (If time is unknown, put 00:00am)
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-500 mb-2">
                Date
              </label>
              <input
                type="date"
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                {...register("birthdate", { required: true })}
              />
              {errors.birthdate && (
                <span className="text-red-500 text-xs mt-2 block">
                  This field is required
                </span>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-500 mb-2">
                Time
              </label>
              <input
                type="time"
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                {...register("birthtime", { required: true })}
              />
              {errors.birthtime && (
                <span className="text-red-500 text-xs mt-2 block">
                  This field is required
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Question 2: Birthplace */}
        <div className="p-6 bg-gray-50 rounded-md shadow-sm">
          <label className="block text-gray-700 text-lg font-medium mb-4 required">
            Place of Birth (City, Country)
          </label>
          <input
            type="text"
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            placeholder="e.g., New York, USA"
            {...register("birthplace", { required: true })}
          />
          {errors.birthplace && (
            <span className="text-red-500 text-xs mt-2 block">
              This field is required
            </span>
          )}
        </div>

        {/* Question 3: Music Genres */}
        <div className="p-6 bg-gray-50 rounded-md shadow-sm">
          <label className="block text-gray-700 text-lg font-medium mb-4 required">
            What music genres meant the most to you between ages 10–20? (Choose
            up to 3)
          </label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
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
                  value={genre}
                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  {...register("musicGenres")}
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
        </div>

        {/* Question 4: Artists */}
        <div className="p-6 bg-gray-50 rounded-md shadow-sm">
          <label className="block text-gray-700 text-lg font-medium mb-4 required">
            Which artists or bands shaped your identity as a teen? (add up to 5)
          </label>
          <textarea
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            rows={3}
            placeholder="e.g., Radiohead, Beyoncé, Taylor Swift..."
            {...register("artists", { required: true })}
          ></textarea>
          {errors.artists && (
            <span className="text-red-500 text-xs mt-2 block">
              This field is required
            </span>
          )}
        </div>

        {/* Question 5: Movies/Shows */}
        <div className="p-6 bg-gray-50 rounded-md shadow-sm">
          <label className="block text-gray-700 text-lg font-medium mb-4 required">
            What kind of movies or shows were you drawn to growing up? (Add up
            to 5)
          </label>
          <textarea
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            rows={3}
            placeholder="e.g., Science fiction, romantic comedies, anime..."
            {...register("moviesShows", { required: true })}
          ></textarea>
          {errors.moviesShows && (
            <span className="text-red-500 text-xs mt-2 block">
              This field is required
            </span>
          )}
        </div>

        {/* Question 6: Subcultures */}
        <div className="p-6 bg-gray-50 rounded-md shadow-sm">
          <label className="block text-gray-700 text-lg font-medium mb-4 required">
            Were you part of any subcultures or style scenes as a teen?
            Describe.
          </label>
          <textarea
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            rows={3}
            placeholder="e.g., Punk, skater, goth, preppy..."
            {...register("subcultures", { required: true })}
          ></textarea>
          {errors.subcultures && (
            <span className="text-red-500 text-xs mt-2 block">
              This field is required
            </span>
          )}
        </div>

        {/* Question 7: Fashion Attitude */}
        <div className="p-6 bg-gray-50 rounded-md shadow-sm">
          <label className="block text-gray-700 text-lg font-medium mb-4 required">
            How did you feel about mainstream fashion growing up?
          </label>
          <div className="space-y-4">
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
                  value={option}
                  className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  {...register("fashionAttitude", { required: true })}
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
                value="Other"
                className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                {...register("fashionAttitude", { required: true })}
              />
              <label htmlFor="fashion-other" className="text-sm text-gray-700">
                Other
              </label>
            </div>
            <div className="pl-6">
              <input
                type="text"
                placeholder="Please specify"
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 mt-1"
                {...register("fashionAttitudeOther")}
              />
            </div>
          </div>
          {errors.fashionAttitude && (
            <span className="text-red-500 text-xs mt-2 block">
              This field is required
            </span>
          )}
        </div>

        {/* Question 8: Style Icons */}
        <div className="p-6 bg-gray-50 rounded-md shadow-sm">
          <label className="block text-gray-700 text-lg font-medium mb-4 required">
            Who were your early style icons (real, fictional, celebrity,
            friend)?
          </label>
          <textarea
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            rows={3}
            placeholder="e.g., Princess Diana, David Bowie, Rihanna..."
            {...register("styleIcons", { required: true })}
          ></textarea>
          {errors.styleIcons && (
            <span className="text-red-500 text-xs mt-2 block">
              This field is required
            </span>
          )}
        </div>

        {/* Question 9: Style Words */}
        <div className="p-6 bg-gray-50 rounded-md shadow-sm">
          <label className="block text-gray-700 text-lg font-medium mb-4 required">
            Describe your current style in 3 words.
          </label>
          <div className="space-y-4">
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center font-medium mr-3">
                1
              </div>
              <input
                type="text"
                className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                placeholder="First word"
                {...register("styleWords.word1", { required: true })}
              />
            </div>
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center font-medium mr-3">
                2
              </div>
              <input
                type="text"
                className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                placeholder="Second word"
                {...register("styleWords.word2", { required: true })}
              />
            </div>
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center font-medium mr-3">
                3
              </div>
              <input
                type="text"
                className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                placeholder="Third word"
                {...register("styleWords.word3", { required: true })}
              />
            </div>
          </div>
          {(errors.styleWords?.word1 ||
            errors.styleWords?.word2 ||
            errors.styleWords?.word3) && (
            <span className="text-red-500 text-xs mt-2 block">
              All three words are required
            </span>
          )}
        </div>

        {/* Question 10: Fabric Preferences */}
        <div className="p-6 bg-gray-50 rounded-md shadow-sm">
          <label className="block text-gray-700 text-lg font-medium mb-4 required">
            What types of fabrics or textures do you love wearing?
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
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
                  value={fabric}
                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  {...register("fabricPreferences")}
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
        <div className="p-6 bg-gray-50 rounded-md shadow-sm">
          <label className="block text-gray-700 text-lg font-medium mb-4 required">
            Which do you prefer?
          </label>

          <div className="space-y-8">
            <div className="space-y-2">
              <div className="flex justify-between text-sm text-gray-600 mb-2">
                <span>Comfort</span>
                <span>Structure</span>
              </div>
              <div className="flex items-center space-x-4 bg-white p-4 rounded border border-gray-200">
                <input
                  type="radio"
                  id="comfort"
                  value="Comfort"
                  className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  {...register("comfortVsStructure", { required: true })}
                />
                <div className="flex-1 h-2 bg-gray-200 rounded relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="w-px h-full bg-gray-400"></span>
                  </div>
                </div>
                <input
                  type="radio"
                  id="structure"
                  value="Structure"
                  className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  {...register("comfortVsStructure", { required: true })}
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
                  value="Simple"
                  className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  {...register("simpleVsLayered", { required: true })}
                />
                <div className="flex-1 h-2 bg-gray-200 rounded relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="w-px h-full bg-gray-400"></span>
                  </div>
                </div>
                <input
                  type="radio"
                  id="layered"
                  value="Layered"
                  className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  {...register("simpleVsLayered", { required: true })}
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
                  value="Neutrals"
                  className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  {...register("neutralsVsColor", { required: true })}
                />
                <div className="flex-1 h-2 bg-gray-200 rounded relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="w-px h-full bg-gray-400"></span>
                  </div>
                </div>
                <input
                  type="radio"
                  id="color"
                  value="Color"
                  className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  {...register("neutralsVsColor", { required: true })}
                />
              </div>
            </div>
          </div>

          {(errors.comfortVsStructure ||
            errors.simpleVsLayered ||
            errors.neutralsVsColor) && (
            <span className="text-red-500 text-xs mt-2 block">
              Please make all three selections
            </span>
          )}
        </div>

        {/* Question 12: Outfit Building */}
        <div className="p-6 bg-gray-50 rounded-md shadow-sm">
          <label className="block text-gray-700 text-lg font-medium mb-4 required">
            How do you usually build an outfit?
          </label>
          <div className="space-y-4">
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
                  value={option}
                  className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  {...register("outfitBuilding", { required: true })}
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
                value="Other"
                className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                {...register("outfitBuilding")}
              />
              <label htmlFor="outfit-other" className="text-sm text-gray-700">
                Other
              </label>
            </div>
            <div className="pl-6">
              <input
                type="text"
                placeholder="Please specify"
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 mt-1"
                {...register("outfitBuildingOther")}
              />
            </div>
          </div>
          {errors.outfitBuilding && (
            <span className="text-red-500 text-xs mt-2 block">
              This field is required
            </span>
          )}
        </div>

        {/* Question 13: Style Evolution */}
        <div className="p-6 bg-gray-50 rounded-md shadow-sm">
          <label className="block text-gray-700 text-lg font-medium mb-4 required">
            How has your style changed over the years? What's stayed the same?
          </label>
          <textarea
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            rows={3}
            placeholder="Describe your style journey..."
            {...register("styleEvolution", { required: true })}
          ></textarea>
          {errors.styleEvolution && (
            <span className="text-red-500 text-xs mt-2 block">
              This field is required
            </span>
          )}
        </div>

        {/* Question 14: Blend vs Standout */}
        <div className="p-6 bg-gray-50 rounded-md shadow-sm">
          <label className="block text-gray-700 text-lg font-medium mb-4 required">
            Do you feel more like yourself when you blend in or stand out?
          </label>
          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
            <div className="flex-1 bg-white p-4 rounded border border-gray-200 hover:border-indigo-300 transition">
              <div className="flex items-center space-x-3">
                <input
                  type="radio"
                  id="blend"
                  value="Blend in"
                  className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  {...register("blendVsStandout", { required: true })}
                />
                <label htmlFor="blend" className="text-gray-700 font-medium">
                  Blend in
                </label>
              </div>
              <p className="text-xs text-gray-500 mt-2 ml-7">
                I prefer to look appropriate and harmonious with my surroundings
              </p>
            </div>
            <div className="flex-1 bg-white p-4 rounded border border-gray-200 hover:border-indigo-300 transition">
              <div className="flex items-center space-x-3">
                <input
                  type="radio"
                  id="standout"
                  value="Stand out"
                  className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  {...register("blendVsStandout", { required: true })}
                />
                <label htmlFor="standout" className="text-gray-700 font-medium">
                  Stand out
                </label>
              </div>
              <p className="text-xs text-gray-500 mt-2 ml-7">
                I prefer to express my uniqueness and individuality
              </p>
            </div>
          </div>
          {errors.blendVsStandout && (
            <span className="text-red-500 text-xs mt-2 block">
              This field is required
            </span>
          )}
        </div>

        {/* Question 15: Express vs Shift */}
        <div className="p-6 bg-gray-50 rounded-md shadow-sm">
          <label className="block text-gray-700 text-lg font-medium mb-4 required">
            Do you dress to express how you feel, or to shift how you feel?
          </label>
          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
            <div className="flex-1 bg-white p-4 rounded border border-gray-200 hover:border-indigo-300 transition">
              <div className="flex items-center space-x-3">
                <input
                  type="radio"
                  id="express"
                  value="Express"
                  className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  {...register("expressVsShift", { required: true })}
                />
                <label htmlFor="express" className="text-gray-700 font-medium">
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
                  value="Shift"
                  className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  {...register("expressVsShift", { required: true })}
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
            <span className="text-red-500 text-xs mt-2 block">
              This field is required
            </span>
          )}
        </div>

        {/* Question 16: Style Feedback */}
        <div className="p-6 bg-gray-50 rounded-md shadow-sm">
          <label className="block text-gray-700 text-lg font-medium mb-4 required">
            What kind of feedback do you get on your style from others?
          </label>
          <textarea
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            rows={3}
            placeholder="Share the compliments or comments you often receive..."
            {...register("styleFeedback", { required: true })}
          ></textarea>
          {errors.styleFeedback && (
            <span className="text-red-500 text-xs mt-2 block">
              This field is required
            </span>
          )}
        </div>

        {/* Question 17: Feeling Powerful */}
        <div className="p-6 bg-gray-50 rounded-md shadow-sm">
          <label className="block text-gray-700 text-lg font-medium mb-4 required">
            What makes you feel powerful in your clothing?
          </label>
          <textarea
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            rows={3}
            placeholder="Describe what elements give you confidence..."
            {...register("feelingPowerful", { required: true })}
          ></textarea>
          {errors.feelingPowerful && (
            <span className="text-red-500 text-xs mt-2 block">
              This field is required
            </span>
          )}
        </div>

        {/* Question 18: Style Avoidance */}
        <div className="p-6 bg-gray-50 rounded-md shadow-sm">
          <label className="block text-gray-700 text-lg font-medium mb-4 required">
            What do you avoid wearing—no matter how trendy or flattering?
          </label>
          <textarea
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            rows={3}
            placeholder="Share your fashion boundaries..."
            {...register("styleAvoidance", { required: true })}
          ></textarea>
          {errors.styleAvoidance && (
            <span className="text-red-500 text-xs mt-2 block">
              This field is required
            </span>
          )}
        </div>

        {/* Question 19: Style Ruts */}
        <div className="p-6 bg-gray-50 rounded-md shadow-sm">
          <label className="block text-gray-700 text-lg font-medium mb-4 required">
            Do you go through style "ruts" or phases where nothing feels right?
            Describe.
          </label>
          <textarea
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            rows={3}
            placeholder="Tell us about your style challenges..."
            {...register("styleRuts", { required: true })}
          ></textarea>
          {errors.styleRuts && (
            <span className="text-red-500 text-xs mt-2 block">
              This field is required
            </span>
          )}
        </div>

        {/* Question 20: Wardrobe Story */}
        <div className="p-6 bg-gray-50 rounded-md shadow-sm">
          <label className="block text-gray-700 text-lg font-medium mb-4 required">
            If your wardrobe told a story, what would it be about?
          </label>
          <textarea
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            rows={3}
            placeholder="Get creative with your wardrobe narrative..."
            {...register("wardrobeStory", { required: true })}
          ></textarea>
          {errors.wardrobeStory && (
            <span className="text-red-500 text-xs mt-2 block">
              This field is required
            </span>
          )}
        </div>

        {/* Question 21: Color Palettes */}
        <div className="p-6 bg-gray-50 rounded-md shadow-sm">
          <label className="block text-gray-700 text-lg font-medium mb-4 required">
            What color palettes feel most natural to you?
          </label>
          <div className="grid grid-cols-1 gap-3">
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
                  value={palette}
                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  {...register("colorPalettes")}
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
        <div className="p-6 bg-gray-50 rounded-md shadow-sm">
          <label className="block text-gray-700 text-lg font-medium mb-4 required">
            Are there any textures or materials you dislike wearing? Why?
          </label>
          <textarea
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            rows={3}
            placeholder="Explain what fabrics you avoid and why..."
            {...register("fabricDislikes", { required: true })}
          ></textarea>
          {errors.fabricDislikes && (
            <span className="text-red-500 text-xs mt-2 block">
              This field is required
            </span>
          )}
        </div>

        {/* Question 23: Fabric Importance */}
        <div className="p-6 bg-gray-50 rounded-md shadow-sm">
          <label className="block text-gray-700 text-lg font-medium mb-4 required">
            On a scale of 1–10, how important is the feel of fabric to you?
          </label>
          <div className="relative pt-1 px-2">
            <div className="flex justify-between text-xs text-gray-500 mb-3">
              <span>Not important</span>
              <span>Extremely important</span>
            </div>
            <div className="bg-white p-4 rounded border border-gray-200">
              <input
                type="range"
                min="1"
                max="10"
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                {...register("fabricImportance", {
                  required: true,
                  valueAsNumber: true,
                })}
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
            <span className="text-red-500 text-xs mt-2 block">
              This field is required
            </span>
          )}
        </div>

        {/* Question 24: Style Communication */}
        <div className="p-6 bg-gray-50 rounded-md shadow-sm">
          <label className="block text-gray-700 text-lg font-medium mb-4 required">
            What do you wish your style communicated about you?
          </label>
          <textarea
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            rows={3}
            placeholder="Share the message you want your style to convey..."
            {...register("styleCommunication", { required: true })}
          ></textarea>
          {errors.styleCommunication && (
            <span className="text-red-500 text-xs mt-2 block">
              This field is required
            </span>
          )}
        </div>

        {/* Question 25: Becoming Person */}
        <div className="p-6 bg-gray-50 rounded-md shadow-sm">
          <label className="block text-gray-700 text-lg font-medium mb-4 required">
            What kind of person are you becoming—and how does that influence
            your wardrobe?
          </label>
          <textarea
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            rows={3}
            placeholder="Reflect on your personal growth and style evolution..."
            {...register("becomingPerson", { required: true })}
          ></textarea>
          {errors.becomingPerson && (
            <span className="text-red-500 text-xs mt-2 block">
              This field is required
            </span>
          )}
        </div>

        {/* Question 26: Past Style */}
        <div className="p-6 bg-gray-50 rounded-md shadow-sm">
          <label className="block text-gray-700 text-lg font-medium mb-4 required">
            Is there a version of you from the past you'd like to channel again
            through fashion?
          </label>
          <textarea
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            rows={3}
            placeholder="Describe a past style era you might want to revisit..."
            {...register("pastStyle", { required: true })}
          ></textarea>
          {errors.pastStyle && (
            <span className="text-red-500 text-xs mt-2 block">
              This field is required
            </span>
          )}
        </div>

        {/* Question 27: Dream Wardrobe */}
        <div className="p-6 bg-gray-50 rounded-md shadow-sm">
          <label className="block text-gray-700 text-lg font-medium mb-4 required">
            Describe your dream wardrobe. No limits.
          </label>
          <textarea
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            rows={3}
            placeholder="Let your imagination run wild—what would your ideal wardrobe include?"
            {...register("dreamWardrobe", { required: true })}
          ></textarea>
          {errors.dreamWardrobe && (
            <span className="text-red-500 text-xs mt-2 block">
              This field is required
            </span>
          )}
        </div>

        <div className="pt-6">
          <div className="bg-indigo-50 rounded-md p-6 mb-8 border border-indigo-100">
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
  );
}
