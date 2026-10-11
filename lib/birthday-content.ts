/**
 * ============================================================
 *  EVERYTHING PERSONAL LIVES IN THIS ONE FILE.
 *  Edit the text between the quotes. Anything in [square brackets]
 *  is a placeholder waiting for your own words.
 * ============================================================
 */

import image1 from "@/public/images/photo-1.jpeg";
import image2 from "@/public/images/photo-2.jpeg";
import image3 from "@/public/images/photo-3.jpeg";
import image4 from "@/public/images/photo-4.jpeg";
import image5 from "@/public/images/photo-5.jpeg";
import image6 from "@/public/images/photo-6.jpeg";
import { StaticImageData } from "next/image";

export type FlowerKind = "sunflower" | "lily" | "rose" | "daisy" | "bud" | "leaf";
export type MemoryLayout = "polaroid" | "featured" | "taped" | "framed";

export interface Memory {
  id: string;
  /** Path inside /public, e.g. "/images/photo-01.jpg". Missing files show a cute placeholder. */
  image: StaticImageData;
  caption: string;
  date?: string;
  description?: string;
  /** Alt text for the real photo (falls back to the caption). */
  alt?: string;
  layout: MemoryLayout;
  /** Resting tilt in degrees. */
  rotate: number;
  sticker?: FlowerKind;
}

export const content = {
  recipient: "Anshika",

  /**
   * Birthday date as YYYY-MM-DD (unambiguous).
   * Timezone strategy: the visitor's own local calendar date is compared with
   * this date, so "today" flips at the visitor's local midnight. No timezone is assumed.
   */
  birthday: { date: "2026-10-11" },

  intro: {
    greeting: "Ayeee!!!! Anshika, something special is waiting for you.",
    scrollHint: "A little surprise awaits ↓",
    tapLabel: "Tap to open",
    reducedMotionHint: "Your letter is just below ↓",
  },

  letter: {
    heading: "Wishing you a veryyyy happyyy birthdayyy Anshika!",
    paragraphs: [
      "Happy Birthday meri pyaari bhaiyuu ❤️ ",
      "Hamesha hasti rahe tu yahi vinti hai thakurji se.😁",
      "Wishing a year full of success, love, joy and kitkatss for you.🍫",
    ],
    closing: "With all my love,",
    signature: "Shreyansh",
    heartHint: "Tap the little heart",
    heartMessage: "You deserve the best 💐",
    nextHint: "Keep scrolling for our little scrapbook ↓",
  },

  scrapbook: {
    title: "Our little scrapbook",
    subtitle: "",
    stickerHint: "Psst... you can drag these flowers around, and tap them too ✿",
    tapHint: "Tap a photo to see it bigger",
    placeholderText: "Our photo goes here",
    memories: [
      {
        id: "memory-01",
        image: image1,
        caption: "",
        date: "",
        description: "",
        layout: "polaroid",
        rotate: -3,
        sticker: "sunflower",
      },
      {
        id: "memory-02",
        image: image2,
        caption: "",
        date: "",
        description: "",
        layout: "polaroid",
        rotate: 2.5,
        sticker: "lily",
      },
      {
        id: "memory-03",
        image: image3,
        caption: "",
        date: "",
        description: "",
        layout: "featured",
        rotate: -1,
        sticker: "rose",
      },
      {
        id: "memory-05",
        image: image5,
        caption: "",
        date: "",
        description: "",
        layout: "framed",
        rotate: -2,
        sticker: "sunflower",
      },
      {
        id: "memory-04",
        image: image4,
        caption: "",
        date: "",
        description: "",
        layout: "taped",
        rotate: 3,
        sticker: "daisy",
      },
      {
        id: "memory-06",
        image: image6,
        caption: "",
        date: "",
        description: "",
        layout: "polaroid",
        rotate: 2,
        sticker: "bud",
      },
    ] as Memory[],
  },

  /** Short messages that pop up when a flower sticker is tapped (they take turns). */
  flowerMessages: [
    "Blooming just for you",
    "You make things brighter",
    "Happy birthday!",
    "Hello, birthday girl!",
    "Petals of happiness",
  ],

  surprises: {
    title: "Little surprises",
    heartsTitle: "Pop the hearts",
    heartsHint: "Tap the hearts. Pop 7 for a surprise!",
    heartsCount: (n: number) => (n === 1 ? "1 heart popped" : `${n} hearts popped`),
    heartsReward: "Kabhi bhi khud pe doubt ho na, toh yaad rakhna ki there's someone out here who's genuinely proud of you. Always rooting for you, idiot. ❤️",
    heartsGoal: 7,

    notesTitle: "Little things I appreciate about you",
    notesHint: "Tap a note to open it",
    notes: [
      { front: "Note 1", back: "The way you tell pata hai aaj kya hua, and tell me the whole story, I genuinely enjoy it alot." },
      { front: "Note 2", back: "You make even the most ordinary days feel a little more special just by being in them." },
      { front: "Note 3", back: "Bhagwan sabko ek achha dost de... but tere jaisa namoona sirf limited edition mein hi theek hai. " },
      { front: "Note 4", back: "Thank you for being someone I can talk to about literally anything, even the most random things."},
      { front: "Note 5", back: "Duniya mein itne normal log hain, achha hai tu unmein se nahi hai." },
      { front: "Note 6", back: "I appreciate how you can be so smart and so dumb at the exact same time." },
    ],

  giftHint: "Psst... tap the little gift 🎁",
giftMessage: "Just a little reminder that you're genuinely one of my favourite people. I'm really glad life gave me you. 💗",

secretButton: "One more little secret... 🤫",

secrets: [
  "You're one of those people I didn't know I needed until you became a part of my life.",
  "Kabhi kabhi tera ek random message bhi mood theek kar deta hai. Obviously, ye baat tujhe bataunga toh tu hawa mein uddne lagegi.",
  "I am sure ki jab thakur ji upar sabko buddhi baat rhe the tu pakka soo rahi hogi us time."
],

secretsDone: "That's all the secrets... for now 💕"
  },

  cake: {
    heading: "Make a wish, Anshika!",
    button: "Make a wish!",
    relight: "Light the candles again",
    holdHint: "Or press and hold the cake to blow out the candles",
    message: "Your wish is on its way. Happy birthday!",
    candleCount: 3,
  },

  funny: {
    heading: "Okay, but before you go...",
    button: "Click for a surprise",
    nextButton: "Another one?",
    lines: [
      "Congratulations! 🏆 You've officially won the award for tolerating me and still being my friend. No refunds, no exchanges, lifetime membership hai ab. 😂 But seriously, I'm really lucky to have you.",
       "Scientists are still trying to figure out ki tujhe itni neend aati kaha se hai. Unhone haar maan li hai.🤣",
       "Maine tere liye itna special surprise banaya hai. Emotional ho jaana allowed hai, lekin zyada udd mat jaana."],
  },

  finale: {
    wish: "Janamdin ki khub khub mangal badhai , Devi ji! 🌷",
    message: "Aur last secret... agar mujhe apni life ki kuch favourite memories dobara jeene ka chance mile, toh I know some of them would have you in them. Thanks for being my person, Anshika. 🫶",
    signature: "Shreyansh",
    replay: "Start our little story again",
    bouquetHint: "Tap the flowers",
  },

  nav: {
    letterButton: "Re-read the letter",
  },

  /**
   * Optional background music. Put a properly licensed file at public/music/birthday-song.mp3
   * (see public/music/README.md). Set enabled to false to hide the control completely.
   */
  music: {
    enabled: true,
    src: "/music/song.mpeg",
    playLabel: "Play background music",
    pauseLabel: "Pause background music",
    missingMessage: "Music can be added later (see public/music/README.md)",
  },
};
