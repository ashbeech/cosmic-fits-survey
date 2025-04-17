import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const data = await request.json();

    // Map the form fields to proper question texts
    const questionMap: Record<string, string> = {
      name: "Your Name 👋",
      birthdate: "Full Birthdate - Date",
      birthtime: "Full Birthdate - Time",
      birthplace: "Place of Birth (City, Country)",
      musicGenres:
        "What music genres meant the most to you between ages 10–20?",
      artists: "Which artists or bands shaped your identity as a teen?",
      moviesShows: "What kind of movies or shows were you drawn to growing up?",
      subcultures:
        "Were you part of any subcultures or style scenes as a teen?",
      fashionAttitude: "How did you feel about mainstream fashion growing up?",
      fashionAttitudeOther: "Other fashion attitude (specified)",
      styleIcons:
        "Who were your early style icons (real, fictional, celebrity, friend)?",
      styleWords: "Describe your current style in 3 words",
      fabricPreferences:
        "What types of fabrics or textures do you love wearing?",
      comfortVsStructure: "Which do you prefer: Comfort vs Structure",
      simpleVsLayered: "Which do you prefer: Simple vs Layered",
      neutralsVsColor: "Which do you prefer: Neutrals vs Colour",
      outfitBuilding: "How do you usually build an outfit?",
      outfitBuildingOther: "Other outfit building method (specified)",
      styleEvolution:
        "How has your style changed over the years? What's stayed the same?",
      blendVsStandout:
        "Do you feel more like yourself when you blend in or stand out?",
      expressVsShift:
        "Do you dress to express how you feel, or to shift how you feel?",
      styleFeedback:
        "What kind of feedback do you get on your style from others?",
      feelingPowerful: "What makes you feel powerful in your clothing?",
      styleAvoidance:
        "What do you avoid wearing—no matter how trendy or flattering?",
      styleRuts:
        'Do you go through style "ruts" or phases where nothing feels right?',
      wardrobeStory: "If your wardrobe told a story, what would it be about?",
      colorPalettes: "What color palettes feel most natural to you?",
      fabricDislikes:
        "Are there any textures or materials you dislike wearing? Why?",
      fabricImportance:
        "On a scale of 1–10, how important is the feel of fabric to you?",
      styleCommunication: "What do you wish your style communicated about you?",
      becomingPerson:
        "What kind of person are you becoming—and how does that influence your wardrobe?",
      pastStyle:
        "Is there a version of you from the past you'd like to channel again through fashion?",
      dreamWardrobe: "Describe your dream wardrobe. No limits.",
    };

    // Format the form data for email with clear question-answer pairs
    const formatData = (data: any) => {
      let formattedData = "";

      for (const [key, value] of Object.entries(data)) {
        // Skip "Other" fields if the main field wasn't selected as "Other"
        if (key === "fashionAttitudeOther" && data.fashionAttitude !== "Other")
          continue;
        if (key === "outfitBuildingOther" && data.outfitBuilding !== "Other")
          continue;

        // Handle styleWords object separately
        if (key === "styleWords" && typeof value === "object") {
          const words = `${(value as any).word1}, ${(value as any).word2}, ${(value as any).word3}`;
          formattedData += `QUESTION: ${questionMap[key] || key}\nANSWER: ${words}\n\n`;
          continue;
        }

        // Format the value based on its type
        let formattedValue = "";
        if (Array.isArray(value)) {
          formattedValue = value.join(", ");
        } else if (value !== null && value !== undefined && value !== "") {
          formattedValue = String(value);
        } else {
          // Skip empty values
          continue;
        }

        // Add the question-answer pair to the formatted data
        formattedData += `QUESTION: ${questionMap[key] || key}\nANSWER: ${formattedValue}\n\n`;
      }

      return formattedData;
    };

    // Create email content with improved formatting
    const emailHtml = `
      <h1>New Cosmic Fits Survey Submission</h1>
      <p>You've received a new survey submission with the following details:</p>
      <pre style="white-space: pre-wrap; background-color: #f5f5f5; padding: 15px; border-radius: 5px; font-family: Arial, sans-serif; font-size: 14px; line-height: 1.6;">
${formatData(data)}
      </pre>
      <p style="font-size: 13px; color: #666;">You can copy and paste the text above into an AI model for further analysis.</p>
    `;

    // Create plain text version for easier copying
    const plainText = `New Cosmic Fits Survey Submission\n\n${formatData(data)}`;

    // Send email
    await resend.emails.send({
      from: "Survey <survey@bullish.design>",
      to: "cosmicfits@bullish.design",
      subject: "New Cosmic Fits Survey Submission",
      html: emailHtml,
      text: plainText, // Adding plain text version for email clients that prefer it
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error submitting form:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
