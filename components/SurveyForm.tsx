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
      <div className="bg-white p-8 rounded-lg shadow-md max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold text-green-600 mb-4">Thank You!</h2>
        <p className="mb-4">
          Your cosmic fits survey has been submitted successfully. We appreciate
          your time and insights!
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-3xl mx-auto">
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Question 1: Birthdate */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700 required">
            Full Birthdate (If time is unknown, put 00:00am)
          </label>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="w-full sm:w-1/2">
              <input
                type="date"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                {...register("birthdate", { required: true })}
              />
              {errors.birthdate && (
                <span className="text-red-500 text-xs">
                  This field is required
                </span>
              )}
            </div>
            <div className="w-full sm:w-1/2">
              <input
                type="time"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                {...register("birthtime", { required: true })}
              />
              {errors.birthtime && (
                <span className="text-red-500 text-xs">
                  This field is required
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Question 2: Birthplace */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700 required">
            Place of Birth (City, Country)
          </label>
          <input
            type="text"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            {...register("birthplace", { required: true })}
          />
          {errors.birthplace && (
            <span className="text-red-500 text-xs">This field is required</span>
          )}
        </div>

        {/* Question 3: Music Genres */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700 required">
            What music genres meant the most to you between ages 10–20? (Choose
            up to 3)
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
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
              <div key={genre} className="flex items-start">
                <input
                  type="checkbox"
                  id={`genre-${genre}`}
                  value={genre}
                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 mt-1"
                  {...register("musicGenres")}
                />
                <label
                  htmlFor={`genre-${genre}`}
                  className="ml-2 block text-sm text-gray-700"
                >
                  {genre}
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Question 4: Artists */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700 required">
            Which artists or bands shaped your identity as a teen? (add up to 5)
          </label>
          <textarea
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            rows={3}
            {...register("artists", { required: true })}
          ></textarea>
          {errors.artists && (
            <span className="text-red-500 text-xs">This field is required</span>
          )}
        </div>

        {/* Question 5: Movies/Shows */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700 required">
            What kind of movies or shows were you drawn to growing up? (Add up
            to 5)
          </label>
          <textarea
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            rows={3}
            {...register("moviesShows", { required: true })}
          ></textarea>
          {errors.moviesShows && (
            <span className="text-red-500 text-xs">This field is required</span>
          )}
        </div>

        {/* Question 6: Subcultures */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700 required">
            Were you part of any subcultures or style scenes as a teen?
            Describe.
          </label>
          <textarea
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            rows={3}
            {...register("subcultures", { required: true })}
          ></textarea>
          {errors.subcultures && (
            <span className="text-red-500 text-xs">This field is required</span>
          )}
        </div>

        {/* Question 7: Fashion Attitude */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700 required">
            How did you feel about mainstream fashion growing up?
          </label>
          <div className="space-y-2">
            {[
              "Loved it",
              "Followed it loosely",
              "Rejected it",
              "Didn't care",
            ].map((option) => (
              <div key={option} className="flex items-center">
                <input
                  type="radio"
                  id={`fashion-${option}`}
                  value={option}
                  className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  {...register("fashionAttitude", { required: true })}
                />
                <label
                  htmlFor={`fashion-${option}`}
                  className="ml-2 block text-sm text-gray-700"
                >
                  {option}
                </label>
              </div>
            ))}
            <div className="flex items-center">
              <input
                type="radio"
                id="fashion-other"
                value="Other"
                className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                {...register("fashionAttitude", { required: true })}
              />
              <label
                htmlFor="fashion-other"
                className="ml-2 block text-sm text-gray-700"
              >
                Other
              </label>
            </div>
            <input
              type="text"
              placeholder="Please specify"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              {...register("fashionAttitudeOther")}
            />
          </div>
          {errors.fashionAttitude && (
            <span className="text-red-500 text-xs">This field is required</span>
          )}
        </div>

        {/* Question 8: Style Icons */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700 required">
            Who were your early style icons (real, fictional, celebrity,
            friend)?
          </label>
          <textarea
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            rows={3}
            {...register("styleIcons", { required: true })}
          ></textarea>
          {errors.styleIcons && (
            <span className="text-red-500 text-xs">This field is required</span>
          )}
        </div>

        {/* Question 9: Style Words */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700 required">
            Describe your current style in 3 words.
          </label>
          <div className="space-y-3">
            <div className="flex items-center">
              <label className="w-8 text-sm text-gray-600">1</label>
              <input
                type="text"
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                {...register("styleWords.word1", { required: true })}
              />
            </div>
            <div className="flex items-center">
              <label className="w-8 text-sm text-gray-600">2</label>
              <input
                type="text"
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                {...register("styleWords.word2", { required: true })}
              />
            </div>
            <div className="flex items-center">
              <label className="w-8 text-sm text-gray-600">3</label>
              <input
                type="text"
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                {...register("styleWords.word3", { required: true })}
              />
            </div>
          </div>
          {(errors.styleWords?.word1 ||
            errors.styleWords?.word2 ||
            errors.styleWords?.word3) && (
            <span className="text-red-500 text-xs">
              All three words are required
            </span>
          )}
        </div>

        {/* Question 10: Fabric Preferences */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700 required">
            What types of fabrics or textures do you love wearing?
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
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
              <div key={fabric} className="flex items-start">
                <input
                  type="checkbox"
                  id={`fabric-${fabric}`}
                  value={fabric}
                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 mt-1"
                  {...register("fabricPreferences")}
                />
                <label
                  htmlFor={`fabric-${fabric}`}
                  className="ml-2 block text-sm text-gray-700"
                >
                  {fabric}
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Question 11: Preferences */}
        <div className="space-y-4">
          <label className="block text-sm font-medium text-gray-700 required">
            Which do you prefer?
          </label>

          <div className="space-y-2">
            <div className="flex justify-between text-xs text-gray-500 mb-1">
              <span>Comfort</span>
              <span>Structure</span>
            </div>
            <div className="flex items-center space-x-4">
              <input
                type="radio"
                id="comfort"
                value="Comfort"
                className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                {...register("comfortVsStructure", { required: true })}
              />
              <div className="flex-1 h-1 bg-gray-200 rounded"></div>
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
            <div className="flex justify-between text-xs text-gray-500 mb-1">
              <span>Simple</span>
              <span>Layered</span>
            </div>
            <div className="flex items-center space-x-4">
              <input
                type="radio"
                id="simple"
                value="Simple"
                className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                {...register("simpleVsLayered", { required: true })}
              />
              <div className="flex-1 h-1 bg-gray-200 rounded"></div>
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
            <div className="flex justify-between text-xs text-gray-500 mb-1">
              <span>Neutrals</span>
              <span>Color</span>
            </div>
            <div className="flex items-center space-x-4">
              <input
                type="radio"
                id="neutrals"
                value="Neutrals"
                className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                {...register("neutralsVsColor", { required: true })}
              />
              <div className="flex-1 h-1 bg-gray-200 rounded"></div>
              <input
                type="radio"
                id="color"
                value="Color"
                className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                {...register("neutralsVsColor", { required: true })}
              />
            </div>
          </div>

          {(errors.comfortVsStructure ||
            errors.simpleVsLayered ||
            errors.neutralsVsColor) && (
            <span className="text-red-500 text-xs">
              Please make all three selections
            </span>
          )}
        </div>

        {/* Question 12: Outfit Building */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700 required">
            How do you usually build an outfit?
          </label>
          <div className="space-y-2">
            {[
              "Based on mood",
              "Based on utility",
              "Around one statement piece",
              "To match a vibe",
            ].map((option) => (
              <div key={option} className="flex items-center">
                <input
                  type="radio"
                  id={`outfit-${option}`}
                  value={option}
                  className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  {...register("outfitBuilding", { required: true })}
                />
                <label
                  htmlFor={`outfit-${option}`}
                  className="ml-2 block text-sm text-gray-700"
                >
                  {option}
                </label>
              </div>
            ))}
            <div className="flex items-center">
              <input
                type="radio"
                id="outfit-other"
                value="Other"
                className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                {...register("outfitBuilding")}
              />
              <label
                htmlFor="outfit-other"
                className="ml-2 block text-sm text-gray-700"
              >
                Other
              </label>
            </div>
            <input
              type="text"
              placeholder="Please specify"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              {...register("outfitBuildingOther")}
            />
          </div>
          {errors.outfitBuilding && (
            <span className="text-red-500 text-xs">This field is required</span>
          )}
        </div>

        {/* Question 13: Style Evolution */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700 required">
            How has your style changed over the years? What's stayed the same?
          </label>
          <textarea
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            rows={3}
            {...register("styleEvolution", { required: true })}
          ></textarea>
          {errors.styleEvolution && (
            <span className="text-red-500 text-xs">This field is required</span>
          )}
        </div>

        {/* Question 14: Blend vs Standout */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700 required">
            Do you feel more like yourself when you blend in or stand out?
          </label>
          <div className="space-y-2">
            <div className="flex items-center">
              <input
                type="radio"
                id="blend"
                value="Blend in"
                className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                {...register("blendVsStandout", { required: true })}
              />
              <label
                htmlFor="blend"
                className="ml-2 block text-sm text-gray-700"
              >
                Blend in
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="radio"
                id="standout"
                value="Stand out"
                className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                {...register("blendVsStandout", { required: true })}
              />
              <label
                htmlFor="standout"
                className="ml-2 block text-sm text-gray-700"
              >
                Stand out
              </label>
            </div>
          </div>
          {errors.blendVsStandout && (
            <span className="text-red-500 text-xs">This field is required</span>
          )}
        </div>

        {/* Question 15: Express vs Shift */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700 required">
            Do you dress to express how you feel, or to shift how you feel?
          </label>
          <div className="space-y-2">
            <div className="flex items-center">
              <input
                type="radio"
                id="express"
                value="Express"
                className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                {...register("expressVsShift", { required: true })}
              />
              <label
                htmlFor="express"
                className="ml-2 block text-sm text-gray-700"
              >
                Express
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="radio"
                id="shift"
                value="Shift"
                className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                {...register("expressVsShift", { required: true })}
              />
              <label
                htmlFor="shift"
                className="ml-2 block text-sm text-gray-700"
              >
                Shift
              </label>
            </div>
          </div>
          {errors.expressVsShift && (
            <span className="text-red-500 text-xs">This field is required</span>
          )}
        </div>

        {/* Question 16: Style Feedback */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700 required">
            What kind of feedback do you get on your style from others?
          </label>
          <textarea
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            rows={3}
            {...register("styleFeedback", { required: true })}
          ></textarea>
          {errors.styleFeedback && (
            <span className="text-red-500 text-xs">This field is required</span>
          )}
        </div>

        {/* Question 17: Feeling Powerful */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700 required">
            What makes you feel powerful in your clothing?
          </label>
          <textarea
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            rows={3}
            {...register("feelingPowerful", { required: true })}
          ></textarea>
          {errors.feelingPowerful && (
            <span className="text-red-500 text-xs">This field is required</span>
          )}
        </div>

        {/* Question 18: Style Avoidance */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700 required">
            What do you avoid wearing—no matter how trendy or flattering?
          </label>
          <textarea
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            rows={3}
            {...register("styleAvoidance", { required: true })}
          ></textarea>
          {errors.styleAvoidance && (
            <span className="text-red-500 text-xs">This field is required</span>
          )}
        </div>

        {/* Question 19: Style Ruts */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700 required">
            Do you go through style "ruts" or phases where nothing feels right?
            Describe.
          </label>
          <textarea
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            rows={3}
            {...register("styleRuts", { required: true })}
          ></textarea>
          {errors.styleRuts && (
            <span className="text-red-500 text-xs">This field is required</span>
          )}
        </div>

        {/* Question 20: Wardrobe Story */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700 required">
            If your wardrobe told a story, what would it be about?
          </label>
          <textarea
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            rows={3}
            {...register("wardrobeStory", { required: true })}
          ></textarea>
          {errors.wardrobeStory && (
            <span className="text-red-500 text-xs">This field is required</span>
          )}
        </div>

        {/* Question 21: Color Palettes */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700 required">
            What color palettes feel most natural to you?
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {[
              "Warm earth tones (olive, rust, camel)",
              "Jewel tones (emerald, ruby, sapphire)",
              "Neutrals (beige, grey, navy)",
              "Bright saturated colors (red, cobalt, citrus)",
              "Pastels (lavender, mint, blush)",
            ].map((palette) => (
              <div key={palette} className="flex items-start">
                <input
                  type="checkbox"
                  id={`palette-${palette}`}
                  value={palette}
                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 mt-1"
                  {...register("colorPalettes")}
                />
                <label
                  htmlFor={`palette-${palette}`}
                  className="ml-2 block text-sm text-gray-700"
                >
                  {palette}
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Question 22: Fabric Dislikes */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700 required">
            Are there any textures or materials you dislike wearing? Why?
          </label>
          <textarea
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            rows={3}
            {...register("fabricDislikes", { required: true })}
          ></textarea>
          {errors.fabricDislikes && (
            <span className="text-red-500 text-xs">This field is required</span>
          )}
        </div>

        {/* Question 23: Fabric Importance */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700 required">
            On a scale of 1–10, how important is the feel of fabric to you?
          </label>
          <div className="relative pt-1">
            <div className="flex justify-between text-xs text-gray-500 mb-1">
              <span>Not important</span>
              <span>Extremely important</span>
            </div>
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
            <div className="flex justify-between w-full px-2 text-xs text-gray-500">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                <span key={num} className="px-1">
                  {num}
                </span>
              ))}
            </div>
          </div>
          {errors.fabricImportance && (
            <span className="text-red-500 text-xs">This field is required</span>
          )}
        </div>

        {/* Question 24: Style Communication */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700 required">
            What do you wish your style communicated about you?
          </label>
          <textarea
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            rows={3}
            {...register("styleCommunication", { required: true })}
          ></textarea>
          {errors.styleCommunication && (
            <span className="text-red-500 text-xs">This field is required</span>
          )}
        </div>

        {/* Question 25: Becoming Person */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700 required">
            What kind of person are you becoming—and how does that influence
            your wardrobe?
          </label>
          <textarea
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            rows={3}
            {...register("becomingPerson", { required: true })}
          ></textarea>
          {errors.becomingPerson && (
            <span className="text-red-500 text-xs">This field is required</span>
          )}
        </div>

        {/* Question 26: Past Style */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700 required">
            Is there a version of you from the past you'd like to channel again
            through fashion?
          </label>
          <textarea
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            rows={3}
            {...register("pastStyle", { required: true })}
          ></textarea>
          {errors.pastStyle && (
            <span className="text-red-500 text-xs">This field is required</span>
          )}
        </div>

        {/* Question 27: Dream Wardrobe */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700 required">
            Describe your dream wardrobe. No limits.
          </label>
          <textarea
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            rows={3}
            {...register("dreamWardrobe", { required: true })}
          ></textarea>
          {errors.dreamWardrobe && (
            <span className="text-red-500 text-xs">This field is required</span>
          )}
        </div>

        <div className="flex justify-end pt-5">
          <button
            type="submit"
            disabled={submitting}
            className="px-4 py-2 bg-indigo-600 text-white rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
          >
            {submitting ? "Submitting..." : "Submit Survey"}
          </button>
        </div>
      </form>
    </div>
  );
}
