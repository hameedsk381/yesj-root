// Sample seed data for all models
export const users = [
  {
    name: "Admin User",
    email: "admin@yesj.org",
    password: "admin123",
    role: "admin",
    bio: "Administrator of YESJ platform"
  },
  {
    name: "John Doe",
    email: "john@yesj.org",
    password: "john123",
    role: "user",
    bio: "Regular user and course participant"
  },
  {
    name: "Jane Smith",
    email: "jane@yesj.org",
    password: "jane123",
    role: "moderator",
    bio: "Community moderator and event organizer"
  }
];

export const announcements = [
  {
    title: "New Course Launch",
    description: "We're excited to announce the launch of our new Advanced React course!",
    content: "Join our comprehensive React course covering hooks, context, and performance optimization.",
    links: [
      { url: "https://yesj.org/courses/react", text: "Learn More" }
    ],
    priority: 1
  },
  {
    title: "Community Event",
    description: "Join us for our monthly community meetup this Saturday at 2 PM.",
    content: "Monthly community gathering with guest speakers and networking opportunities.",
    links: [
      { url: "https://yesj.org/events/meetup", text: "RSVP Here" }
    ],
    priority: 2
  },
  {
    title: "Platform Update",
    description: "Our platform has been updated with new features. Check them out!",
    content: "We've added new course categories, improved search functionality, and enhanced user profiles.",
    links: [],
    priority: 0
  }
];

export const courses = [
  {
    title: "Introduction to JavaScript",
    description: "Learn the fundamentals of JavaScript programming language.",
    pageLink: "/courses/javascript",
    image: "/website/20241114_153846.jpg",
    badges: [
      { emoji: "⚡", label: "Beginner" },
      { emoji: "⏱️", label: "8 weeks" }
    ],
    duration: "8 weeks",
    category: "programming",
    level: "beginner",
    instructor: "John Doe"
  },
  {
    title: "Advanced React Development",
    description: "Master advanced React concepts including hooks, context, and performance optimization.",
    pageLink: "/courses/react",
    image: "/website/20241114_153848.jpg",
    badges: [
      { emoji: "🚀", label: "Intermediate" },
      { emoji: "⏱️", label: "10 weeks" }
    ],
    duration: "10 weeks",
    category: "programming",
    level: "intermediate",
    instructor: "Jane Smith"
  },
  {
    title: "UI/UX Design Principles",
    description: "Learn modern UI/UX design principles and create beautiful user interfaces.",
    pageLink: "/courses/design",
    image: "/website/IMG_5899.JPG",
    badges: [
      { emoji: "🎨", label: "Design" },
      { emoji: "⏱️", label: "6 weeks" }
    ],
    duration: "6 weeks",
    category: "design",
    level: "beginner",
    instructor: "Alex Johnson"
  }
];

export const events = [
  {
    title: "Tech Conference 2024",
    description: "Annual technology conference featuring industry experts and workshops.",
    date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 1 week from now
    location: "Convention Center, Downtown",
    organizer: "Tech Org",
    category: "conference",
    isPublic: true,
    maxAttendees: 200
  },
  {
    title: "React Workshop",
    description: "Hands-on workshop to learn React fundamentals.",
    date: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // 2 weeks from now
    location: "Online",
    organizer: "Dev Academy",
    category: "workshop",
    isPublic: true,
    maxAttendees: 50
  },
  {
    title: "Community Social",
    description: "Informal gathering for community members to network and socialize.",
    date: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000), // 3 weeks from now
    location: "Central Park",
    organizer: "Community Team",
    category: "social",
    isPublic: true,
    maxAttendees: 100
  }
];

export const carouselSlides = [
  {
    title: "Welcome to YESJ",
    description: "Empowering youth through education and community service",
    imageUrl: "/website/IMG_5986.JPG",
    link: "/about",
    order: 1
  },
  {
    title: "Learn New Skills",
    description: "Join our comprehensive courses and workshops",
    imageUrl: "/website/IMG_5999.JPG",
    link: "/courses",
    order: 2
  },
  {
    title: "Join Our Community",
    description: "Connect with like-minded individuals and make a difference",
    imageUrl: "/website/IMG_6787.JPG",
    link: "/community",
    order: 3
  }
];

export const programmes = [
  {
    title: "PEP",
    description: "Personal Enhancement Programme",
    imageUrl: "/website/IMG_5986.JPG",
    category: "Youth Development",
    year: "2024"
  },
  {
    title: "MAGIC",
    description: "Men & Women Aiming Greater Initiative for Change",
    imageUrl: "/website/IMG_5999.JPG",
    category: "Gender Equality",
    year: "2024"
  },
  {
    title: "MuST",
    description: "Multi SKill Training",
    imageUrl: "/website/IMG_6787.JPG",
    category: "Skills Development",
    year: "2024"
  }
];

export const galleryImages = [
  {
    title: "Community Gathering",
    description: "Annual community gathering event",
    imageUrl: "/website/IMG_5986.JPG",
    tags: ["Community", "Event"],
    category: "Events"
  },
  {
    title: "Workshop Session",
    description: "Hands-on workshop session",
    imageUrl: "/website/IMG_5999.JPG",
    tags: ["Workshop", "Learning"],
    category: "Education"
  },
  {
    title: "Team Photo",
    description: "YESJ team photo from 2024",
    imageUrl: "/website/IMG_6787.JPG",
    tags: ["Team", "2024"],
    category: "Team"
  }
];