import { GoogleGenerativeAI } from "@google/generative-ai";
import {
  announcements,
  campaign,
  donations,
  donors,
  fundBreakdown,
  masjidEvents,
  prayerTimes,
  staffMembers,
} from "../data/mockData";

// Initialize the Gemini API
const apiKey = import.meta.env.VITE_GEMINI_API_KEY || "";
const genAI = new GoogleGenerativeAI(apiKey);

// Helper to stringify context safely
const getContext = () => {
  return JSON.stringify({
    masjidName: "Masjid Al-Furqan",
    currentDate: "June 25, 2026",
    campaign,
    prayerTimes,
    fundBreakdown,
    recentAnnouncements: announcements.slice(0, 3),
    staffOverview: staffMembers.map(s => ({ name: s.name, role: s.role, department: s.department })),
    upcomingEvents: masjidEvents.filter(e => e.status === "Upcoming").map(e => ({ title: e.title, date: e.date, rsvp: e.rsvpCount })),
    totalDonors: donors.length,
    recentDonations: donations.slice(0, 5),
  }, null, 2);
};

const SYSTEM_PROMPT = `
You are the advanced AI Assistant for "MasjidPro", a modern SaaS platform for managing Islamic centers and Masjids. 
You assist the Masjid Administrators in managing their operations, generating reports, writing announcements, and answering queries.

Here is the LIVE CONTEXT of the Masjid you are managing right now:
${getContext()}

INSTRUCTIONS:
1. Always be helpful, respectful, and professional.
2. Use the live context provided above to answer specific questions accurately (e.g., if asked about donations, use the data provided).
3. If generating announcements, ensure the tone is appropriate for a diverse Muslim community.
4. If you don't know something or the data isn't in the context, politely explain that you don't have that information.
`;

/**
 * Generates text content using Gemini 1.5 Flash.
 */
export async function generateAIContent(prompt: string, systemInstruction?: string): Promise<string> {
  if (!apiKey) {
    return [
      "Here is a MasjidPro draft based on your current dashboard data:",
      "",
      prompt.toLowerCase().includes("donation")
        ? "Donations are strongest in Zakat and recurring Sadaqah. A focused Friday reminder with a clear recurring-gift CTA is recommended."
        : "Use a calm, community-first message with the date, action needed, and a short dua or gratitude note.",
      "",
      "This is a local prototype response. Add VITE_GEMINI_API_KEY to enable live Gemini responses.",
    ].join("\n");
  }

  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash",
      systemInstruction: systemInstruction || SYSTEM_PROMPT,
    });

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    throw new Error(error.message || "Failed to generate AI content.");
  }
}

/**
 * Generates JSON content using Gemini 1.5 Flash by enforcing JSON output format.
 */
export async function generateAIJson<T>(prompt: string, jsonSchemaDescription: string, systemInstruction?: string): Promise<T> {
  if (!apiKey) {
    if (jsonSchemaDescription.includes('"sms"')) {
      return {
        title: "Support Our Masjid Campaign",
        description: "Help the masjid keep essential community services strong through consistent donations and transparent reporting.",
        email: "Assalamu alaikum. Your support helps fund daily operations, community care, and worship services. Please consider giving today.",
        sms: "Support your masjid today. Every gift helps sustain daily services and community care.",
        push: "Support the masjid campaign today.",
        social: "Help sustain our masjid services with a gift today. #Masjid #Sadaqah",
      } as T;
    }

    return {
      title: "Monthly Board Summary",
      summary: "Donations remain healthy with strong recurring support. Zakat and Sadaqah funds continue to drive community impact, while reporting visibility is improving for administrators.",
      insights: [
        "Recurring donations increased steadily across the last six months.",
        "Zakat remains the largest tracked fund category.",
        "Top donors show strong preference for transparent receipts and fund allocation.",
      ],
      recommendations: [
        "Send a Friday reminder focused on recurring Sadaqah.",
        "Share a brief campaign progress update with donors.",
        "Review pending donations before the next board report.",
      ],
    } as T;
  }

  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash",
      systemInstruction: systemInstruction || SYSTEM_PROMPT,
      generationConfig: {
        responseMimeType: "application/json",
      }
    });

    const fullPrompt = `${prompt}\n\nIMPORTANT: Return ONLY a valid JSON object matching this schema description. Do not wrap in markdown blocks.\nSchema Description: ${jsonSchemaDescription}`;

    const result = await model.generateContent(fullPrompt);
    const responseText = await result.response.text();
    
    // Attempt to parse the response
    try {
      return JSON.parse(responseText) as T;
    } catch (parseError) {
      console.error("Failed to parse AI JSON response:", responseText);
      throw new Error("AI returned invalid JSON format.");
    }
  } catch (error: any) {
    console.error("Gemini API JSON Error:", error);
    throw new Error(error.message || "Failed to generate AI JSON content.");
  }
}

