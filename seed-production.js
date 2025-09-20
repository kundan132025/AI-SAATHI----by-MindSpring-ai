import axios from 'axios';

const BACKEND_URL = 'https://ai-saathi-backend.onrender.com';

const seedStories = [
  {
    title: "Small Steps",
    category: "motivational",
    content: "Every mountain climb starts with one small step.",
  },
  {
    title: "Morning Calm",
    category: "relaxing",
    content: "Breathe in. Breathe out. The day will unfold.",
  },
  {
    title: "Hidden Strength",
    category: "healing",
    content: "You've survived 100% of your worst days so far.",
  },
  {
    title: "Love Letter",
    category: "love",
    content: "Dear self, you are worthy of love and belonging.",
  },
  {
    title: "Dancing in the Rain",
    category: "mood freshening",
    content: "Life isn't about waiting for the storm to pass, it's about learning to dance in the rain.",
  },
  {
    title: "Phoenix Rising",
    category: "overcoming depression",
    content: "From the ashes of your struggles, you rise stronger and more beautiful than before.",
  },
  {
    title: "Gentle Wind",
    category: "overcoming frustration",
    content: "Like a gentle wind, let your anger pass through you, not stay within you.",
  },
  {
    title: "Tomorrow's Dawn",
    category: "overcoming sadness",
    content: "The darkest nights produce the brightest stars. Your dawn is coming.",
  },
  {
    title: "Ocean Waves",
    category: "soothing",
    content: "Listen to the rhythm of the waves. They know the secret of letting go.",
  }
];

async function seedProduction() {
  try {
    console.log('Starting to seed production database...');
    
    for (const story of seedStories) {
      try {
        const response = await axios.post(`${BACKEND_URL}/api/stories`, story);
        console.log(`✅ Created story: ${story.title}`);
      } catch (error) {
        console.error(`❌ Failed to create story: ${story.title}`, error.response?.data || error.message);
      }
    }
    
    console.log('✅ Seeding complete!');
  } catch (error) {
    console.error('❌ Error during seeding:', error);
  }
}

seedProduction();