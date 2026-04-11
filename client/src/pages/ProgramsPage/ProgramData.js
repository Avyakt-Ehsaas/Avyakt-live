import ProgramSectionsImage from "../../assets/images/ProgramSectionBg.png";
import schoolFirst from "../../assets/images/sixth.png"
import schoolThird from "../../assets/images/third.png"
import schoolSecond from "../../assets/images/schoolsecond.png"
import seniorFirst from "../../assets/images/seniorfirst.png"
import seniorSecond from "../../assets/images/seniorsecond.png"
import seniorThird from "../../assets/images/seniorthird.png"
import SeniorTab from '../../assets/images/seniorsTab.png'
import TreeLeft from "../../assets/images/treeleft.png";
import TreeCenter from "../../assets/images/treemiddle.png";
import TreeRight from "../../assets/images/treeright.png";
import seniorLeft from "../../assets/images/seniorLeft.png";
import seniorCenter from "../../assets/images/seniorCenter.png";
import seniorRight from "../../assets/images/seniorRight.png";

import brainIcon from "../../assets/brainicon.png";
import graph from "../../assets/graph.png";
import watch from "../../assets/watch.png";
import yoga from "../../assets/wyoga.png";

// new images
import ProgramOrganization from "../../assets/images/ProgramOrganization.png";
import ProgramSchool from "../../assets/images/ProgramSchool.png";

import SchoolProgram1 from "../../assets/images/SchoolProgram1.png";

import OrganisationProgram1 from "../../assets/images/OrganisationProgram1.png"
import OrganisationProgram2 from "../../assets/images/OrganisationProgram2.png"
import OrganisationProgram3 from "../../assets/images/OrganisationProgram3.png"
import OrganisationProgram4 from "../../assets/images/OrganisationProgram4.png"
import brain from "../../assets/images/brain.png"




const  programsTabData = {

  school: {
    firstPage: {
      tag: "ACADEMIC STRESS IN INDIAN SCHOOLS",
      title: "75% of school students report high academic stress. Not some students, the majority. Exam anxiety, digital distraction, emotional overload. These aren't edge cases. They're the classroom.",
      buttonText: "Bring Avyakt to Your School",
      image: ProgramSchool,
    },

   secondPage: {
  title: "Dhyan Shakti: Attention Lab",

  description:
    "Eight weeks. Grades 4–12. The core curriculum trains sustained attention, reduces exam anxiety, and builds emotional regulation. Then we layer the specific challenges your school is actually dealing with on top of it.",

  tags: [
    "8 weeks",
    "Grades 4–12",
    "NEP 2020 aligned",
    "On-site or hybrid",
  ],

  weeks: [
    {
      title: "Weeks 1–2",
      desc: "Stillness and breath-anchoring. Students learn what focused attention actually feels like.",
    },
    {
      title: "Weeks 3–4",
      desc: "Sustained attention training. Breath-counting, body scan, and cognitive tasks.",
    },
    {
      title: "Weeks 5–6",
      desc: "Emotional observation. Identifying triggers and building pause before response.",
    },
    {
      title: "Weeks 7–8",
      desc: "Stress tools for high-stakes moments. Practical techniques for exams.",
    },
  ],

  image: SchoolProgram1,

  customSection: {
    title: "What gets customised for your school",

    subtitle: "We listen before we design.",

    description:
      "A discovery call with school leadership and a baseline assessment with students tell us where the real pressure points are. Weeks 5–8 are shaped by that.",

    points: [
      "Board exam stress and preparation anxiety",
      "Digital distraction and phone dependency",
      "Classroom emotional climate issues",
      "Age-specific language and engagement format",
    ],
  },
},

researchShows : {
    image : brain,
    tag : "WHAT THE RESEARCH SHOWS",
     heading: "Meditation works in the classroom.",

  cards: [
    {
      tags : ["Attention", "Children" ,"8 Weeks"],
      title: "Preserved",
      description: "Children who completed an 8-week mindfulness program maintained sustained attention, while the control group's attention measurably declined over the same period.",
    },
    {
      tags: ["Exam anxiety" , "Schools"],
      title: "Reduced",
      description: "Mindfulness-based programs in school settings consistently show significant reductions in exam anxiety and stress-related cognitive interference across multiple RCTs.",
    },
    {
      tags: ["Prefrontal cortex", "Focus"],
      title: "8 weeks",
      description: "fMRI studies show increased grey matter in the dorsolateral prefrontal cortex, the brain's attention control hub, after 8 weeks of structured meditation. In people with zero prior experience.",}
  ],
},
footer: {
  tag: "WHAT YOU RECEIVE",

  title: "A report that shows what changed.",

  description:
    "Not a participation certificate. A proper before-and-after impact report, with cognitive scores, attendance data, and a summary your principal can take to the board.",

  textCard: [
    "Cohort attention and wellbeing data",
    "Individual student summaries (opt-in)",
    "Delivered within 7 days of program close",
  ],

  progressCard: {
    title: "Sample impact data — Dhyan Shakti",

    progressData: [
      { label: "Attention", points: "24" },
      { label: "Exam anxiety", points: "27" },
      { label: "Emotional Calm", points: "28" },
      { label: "Attendance", points: "88" },
    ],
  },
    CTA: {
    title : "Let's talk about your classrooms.",
    description: "Tell us what you're dealing with. We'll tell you how the program would be shaped for your students.",
     button: "Download Program Brochure"
  }
}
  },

  organisation: {
    firstPage: {
      tag: "BURNOUT AT INDIAN WORKPLACES",
      title: "Pick the problem. We build the session.",
      description : "Each workshop targets a specific performance problem your team is already dealing with. Standalone 90-minute sessions. Science backed. Measurement built in every time. Or stack them across a quarter for compounding impact.",
      buttonText: "Bring Avyakt to Your Workplace",
      image: ProgramOrganization,
    },

    secondPage: {
  title: "The Nervous System CEO",

  description:
    "For teams where the pressure never fully switches off and people are running on adrenaline more than they realise. This session teaches the brain to regulate on demand, not just recover on weekends.",

  tags: [
    "90 minutes",
    "Team or full org",
    "On-site or online",
  ],

  weeks: [
    {
      title: "Weeks 1–2",
      desc: "Stress anatomy. What chronic cortisol actually does to memory, decision-making, and the quality of work your team produces. Most people have never been told this.",
    },
    {
      title: "Weeks 3–4",
      desc: "Regulation practice. Three evidence-based tools your team can use between meetings, not just inside a session room.",
    },
    {
      title: "Weeks 5–6",
      desc: "Integration. Building a personal recovery ritual that fits inside a real workday. Not aspirational. Practical and repeatable.",
    },
  ],

  image: OrganisationProgram1,

  customSection: {
    title: "What gets customised for your organisation",

    subtitle: "We ask before we build.",

    description:
      "A short conversation with HR tells us where the pressure is actually coming from. The session is shaped around that.",

    points: [
      "High-pressure delivery cycles and deadlines",
      "Leadership stress cascading down to teams",
      "Always-on culture and after-hours expectations",
      "Specific roles carrying disproportionate load",
    ],
  },
},

    thirdPage: {
  title: "Sustainable Excellence",

  description:
    "For high-performing teams where the output looks fine on the outside but the cost of producing it keeps rising. Burnout here is quiet, not dramatic. This session names it and works at the root.",

  tags: [
    "90 minutes",
    "Team or full org",
    "On-site or online",
  ],

  weeks: [
    {
      title: "Weeks 1–2",
      desc: "Burnout anatomy. The three dimensions most organizations miss until it is too late, and how to spot them before someone hands in their notice.",
    },
    {
      title: "Weeks 3–4",
      desc: "The perfectionism trap. Why the standards that drive your best people are also quietly working against them and what to do about it.",
    },
    {
      title: "Weeks 5–6",
      desc: "Recovery design. Building the rituals and boundaries that make sustained performance actually sustainable over quarters, not just days.",
    },
  ],

  image: OrganisationProgram2,

  customSection: {
    title: "What gets customised for your organisation",

    subtitle: "We ask before we build.",

    description:
      "We look at where your high performers are in the burnout cycle before the session is designed.",

    points: [
      "Performance review cycles and their aftermath",
      "Roles where identity is heavily tied to output",
      "Teams recovering from a particularly hard quarter",
      "Managers carrying both delivery and people responsibility",
    ],
  },
},


    fourthPage: {
  title: "Collaborative Intelligence",

  description:
  "For teams that are technically strong but losing something in how they work together. Meetings that feel unproductive. Communication that feels careful rather than honest. This session works at that layer.",

  tags: [
    "90 minutes",
    "Teams or cross-functional groups",
    "On-site or online",
  ],

  weeks: [
    {
      title: "Weeks 1–2",
      desc: "The team brain. What Google's Project Aristotle found about what actually predicts team performance, and why psychological safety is trainable, not just aspirational.",
    },
    {
      title: "Weeks 3–4",
      desc: "Listening and presence practice. The specific skills that build trust from the ground up, not from a values deck or a team offsite.",
    },
    {
      title: "Weeks 5–6",
      desc: "Team rituals. Designing practices the team actually commits to using in their regular meetings, built in the room by the people who will use them.",
    },
  ],

  image: OrganisationProgram3,

  customSection: {
    title: "What gets customised for your organisation",

    subtitle: "We ask before we build.",

    description:
      "We look at where your high performers are in the burnout cycle before the session is designed.",

    points: [
     "Mixed-hierarchy dynamics and speaking-up gaps",
     "Cross-functional teams with low shared context",
     "Teams coming out of conflict or restructuring",
     "New managers building trust with existing teams"
    ],
  },
},

    fifthPage: {
  title: "The Science of Silence",

  description:
    "For teams that are always on, always connected, and quietly running out of the cognitive capacity to do their best work. This session gives the brain actual recovery time, not just a break.",

  tags: [
    "90 minutes",
    "All levels, tech-heavy teams ",
    "On-site or online",
  ],

  weeks: [
    {
      title: "Weeks 1–2",
      desc: "Digital overload anatomy. What chronic notification exposure does to the brain's ability to focus, decide, and recover. The numbers here are harder to ignore than most people expect.",
    },
    {
      title: "Weeks 3–4",
      desc: "Silence practice. Structured, guided sessions that give the prefrontal cortex genuine recovery time. Not a break from work. A neurological reset.",
    },
    {
      title: "Weeks 5–6",
      desc: "Protocol design. Building a personal digital detox routine and proposing a team-level quiet window that fits the way you actually work.",
    },
  ],

  image: OrganisationProgram4,

  customSection: {
    title: "What gets customised for your organisation",

    subtitle: "We ask before we build.",

    description:
      "We map your team's specific digital load before designing the session.",

    points: [
    "Meeting density and back-to-back calendar patterns",
    "Slack and notification culture",
    "Remote vs in-person attention differences",
    "Roles needing deep work but structured for constant interruption"
    ],
  },
  },

  researchShows : {
    image : brain,
    tag : "WHAT THE RESEARCH SHOWS",
     heading: "Meditation works in the organisation.",

  cards: [
    {
      tags : ["Attention", "Children" ,"8 Weeks"],
      title: "Preserved",
      description: "Children who completed an 8-week mindfulness program maintained sustained attention, while the control group's attention measurably declined over the same period.",
    },
    {
      tags: ["Exam anxiety" , "Schools"],
      title: "Reduced",
      description: "Mindfulness-based programs in school settings consistently show significant reductions in exam anxiety and stress-related cognitive interference across multiple RCTs.",
    },
    {
      tags: ["Prefrontal cortex", "Focus"],
      title: "8 weeks",
      description: "fMRI studies show increased grey matter in the dorsolateral prefrontal cortex, the brain's attention control hub, after 8 weeks of structured meditation. In people with zero prior experience.",}
  ],
},


footer: {
  tag: "WHAT YOU RECEIVE",

  title: "An HR report worth presenting.",

  description:
    "Before-and-after attention and stress scores, engagement data, and a clean leadership summary. Built around what HR needs to show ROI, not what's easiest to produce.",

  textCard: [
    "Team-level attention and stress before-after",
    "Individual summaries available (opt-in)",
    "Delivered within 7 days of close"
  ],

  progressCard: {
    title: "Sample HR data — Stress Reset cohort",

    progressData: [
      { label: "Stress Score", points: "24" },
      { label: "Focus Quality", points: "27" },
      { label: "Emotional Calm", points: "28" },
      { label: "Participation", points: "88" },
    ],
  },
  CTA: {
    title : "Tell us what's happening in your team.",
    description: "We'll figure out which program fits and what the customized layer should look like for your people.",
    button: "Download Corporate Brochure"

  }
}


  },

  senior: {
    firstPage: {
      title: "Senior Wellness Programs for Calm, Clarity & Cognitive Wellbeing",
      description:
        "Structured meditation and cognitive wellness programs that support emotional balance, memory health, and peaceful aging.",
      buttonText: "Start Wellness Program",
      image: SeniorTab,
    },

    secondPage: {
      title: "Aging Minds Face Growing ",
      spanTitle: "Emotional & Cognitive Challenges",
      description:
        "As people age, emotional wellbeing, memory, and social connection become essential for quality of life.",
      cards: [
        {
          cardTitle: "Loneliness & Isolation",
          number: "1 in 4",
          cardDescription:
            "Social isolation increases risks of depression and cognitive decline.",
        },
        {
          cardTitle: "Cognitive Decline",
          number: "15%",
          cardDescription:
            "Adults over 60 experience mild cognitive impairment.",
        },
        {
          cardTitle: "Emotional Wellbeing",
          number: "30%",
          cardDescription:
            "Seniors report experiencing persistent stress or anxiety.",
        },
      ],
    },

    thirdPage: {
      title: "A Structured System for",
      hyphen : "",
      greenTitle : "Peaceful Aging",
      postTitle: "",
      description:
        "Avyakt Senior Programs combine meditation, cognitive exercises, and emotional wellbeing practices designed specifically for older adults.",
      cards: [
        {
          image: brainIcon,
          cardTitle: "Neuroscience-Inspired Meditation Experience",
          cardDescription:
            "Gentle guided practices that help regulate emotions, reduce stress, and support mental clarity.",
        },
        {
          image: yoga,
          cardTitle: "Group Meditation & Wellness Sessions",
          cardDescription:
            "Structured sessions designed to encourage relaxation, reflection, and community connection.",
        },
        {
          image: graph,
          cardTitle: "Personalized Wellbeing Tracking",
          cardDescription:
            "Track mood, cognitive activity, and mindfulness practice over time."
        },
        {
          image: watch,
          cardTitle: "Flexible Program Integration",
          cardDescription:
            "Programs can be easily integrated into senior clubs, community centers, and wellness homes.",
        },
      ],
    },

  fourthPage: {
  title: "Programs Designed for ",
  greenTitle: "Different Senior Needs",
  postTitle: "",
  description:
    "Each program adapts meditation practices, activities, and cognitive experiments to support mental clarity, emotional wellbeing, and cognitive health in seniors.",
  cards: [
    {
      image: seniorLeft,
      cardTitle: "Active Aging",
      cardDescription:
        "For seniors who want to maintain mental sharpness, emotional wellbeing, and a calm daily routine.",
      keyPoints: [
        "Mental clarity",
        "Memory strength",
        "Stress reduction"
      ]
    },
    {
      image : seniorCenter,
      cardTitle: "Mindful Living",
      cardDescription:
        "Programs designed to deepen awareness, emotional peace, and meaningful daily habits.",
      keyPoints: [
        "Emotional balance",
        "Relaxation",
        "Inner calm"
      ]
    },
    {
      image: seniorRight,
      cardTitle: "Cognitive Support",
      cardDescription:
        "Practices and cognitive activities that support memory, attention, and mental engagement.",
      keyPoints: [
        "Memory exercises",
        "Attention training",
        "Cognitive stimulation"
      ]
    }
  ]
},

    fifthPage: {
      title: "Structured Programs for ",
      spanTitle: "Cognitive & Emotional ",
      title2: "Wellbeing",
      description:
        "Each program combines meditation, cognitive experiments, and practical tools to build lifelong focus, calm, and resilience.",
      cards: [
          {
              id: "ShantiPath",
              weeks: "8 weeks",
              title: "Shanti Path- Calm & Emotional Balance",
              subtitle:
                  "Supporting emotional peace and stress reduction through guided meditation.",
              activities: [
                  "Gentle Breathing practices",
                  "Relaxation exercises",
                  "Emotional reflection sessions",
              ],
              tags: ["Improved emotional calm", "Better Stress Regulations", "Enhanced wellbeing"],
              image: seniorFirst,
              imageSide: "right",
          },
          {
              id: "ManasShanti",
              weeks: "8 weeks",
              title: "Manas Shakti- Cognitive Vitality",
              subtitle: "Exercises and mindfulness practices designed to support attention and memory.",
              activities: [
                  "Memory exercises",
                  "Calm response training",
                  "Focus activities",
                  
              ],
              tags: ["Improved attention", "Cognitive engagement", "Mentalclarity"],
              image: seniorSecond,
              imageSide: "left",
          },
          {
              id: "Samvedna",
              weeks: "6 weeks",
              title: "Samvedna- Connection & Emotional Wellness",
              subtitle: "Encouraging empathy, social connection, and emotional wellbeing in senior communities.",
              activities: [
                  "Group reflections sessions",
                  "Gratitude practices",
                  "Guided conversations",
                  
              ],
              tags: ["Reduced loneliness", "Stronger community bonds", "Positive emotional habits."],
              image: seniorThird,
              imageSide: "right",
          }
          
      ],
    },

    sixthPage: {
      title: "Tracking Wellbeing Beyond Daily Life",
      description:
        "Through guided meditation and cognitive wellness programs, seniors can track emotional balance, mental clarity, and overall wellbeing over time.",
     cards: [
  {
    title: "Senior Dashboard",
    subtitle: "Daily wellbeing pulse",
    metricLabel: "Calmness score",
    value: 88,
    chartType: "progressBar"
  },
  {
    title: "Caregiver Dashboard",
    subtitle: "Wellbeing updates",
    items: [
      "Group meditation: 5/7 Days",
      "Emotional wellbeing stable"
    ],
    chartType: "info"
  },

  {
    title: "Senior Center Dashboard",
    subtitle: "Community wellbeing insights",
    chartType: "radialChart",
    value: 92,
    metricLabel: "Participation",
    metricStatus: "High (4%)"
  }
],
      bottomCard: {
        title: "Supporting Healthy & Active Aging",
        description:
          "Avyakt fulfills the mandate for mandatory socio-emotional learning in Indian schools.",
        keyPoints: [
          { title: "Social Connection", description: "Encouraging community interaction and reducing loneliness" },
          { title: "Emotional Wellbeing", description: "Supporting calm, resilience, and emotional balance in later life." },
          { title: "Mind-Body Balance", description: "Gentle mindfulness practices that support overall wellbeing." },
          { title: "Cognitive Health", description: "Activities that help maintain memory, attention, and mental clarity." },
        ],
      },
    },
  },

  individual: {
    firstPage: {
      title: "Personal Mindfulness Journey for Focus & Emotional Balance",
      description:
        "Personal meditation programs designed to help individuals manage stress, build focus, and develop emotional clarity.",
      buttonText: "Start Your Mindfulness Journey",
      image: ProgramSectionsImage,
    },

    secondPage: {
      title: "Modern Life Creates Constant ",
      spanTitle: "Mental Noise",
      description:
        "Fast lifestyles, digital overload, and constant demands affect mental wellbeing.",
      cards: [
        {
          cardTitle: "Stress",
          number: "80%",
          cardDescription:
            "Individuals experience daily stress due to lifestyle pressure.",
        },
        {
          cardTitle: "Attention Fragmentation",
          number: "60%",
          cardDescription:
            "Constant digital exposure reduces sustained focus.",
        },
        {
          cardTitle: "Emotional Overload",
          number: "1 in 3",
          cardDescription:
            "People report feeling emotionally overwhelmed frequently.",
        },
      ],
    },

    thirdPage: {
      title: "A Personal System for Mental Clarity",
      hyphen : "",
      description:
        "Programs designed to build focus, calm, and emotional intelligence.",
      cards: [
        {
          image: brainIcon,
          cardTitle: "Daily Guided Meditation",
          cardDescription: "Short sessions that build calm and focus.",
        },
        {
          image: yoga,
          cardTitle: "Stress Reset Practices",
          cardDescription: "Tools to release tension and restore balance.",
        },
        {
          image: graph,
          cardTitle: "Mind Awareness Exercises",
          cardDescription: "Practices to observe thoughts and emotions clearly.",
        },
        {
          image: watch,
          cardTitle: "Habit Building Tools",
          cardDescription: "Simple routines that make mindfulness consistent.",
        },
      ],
    },

    fourthPage: {
      title: "Programs Designed for Your ",
      greenTitle: "Individual Needs",
      postTitle: "",
      description:
        "Different practices support different aspects of personal wellbeing.",
      cards: [
        {
          image: TreeLeft,
          cardTitle: "Focus Training",
          cardDescription: "Strengthen attention and concentration.",
          keyPoints: ["Attention", "Clarity", "Productivity"],
        },
        {
          image: TreeCenter,
          cardTitle: "Emotional Balance",
          cardDescription: "Learn to manage emotions with awareness.",
          keyPoints: ["Calm", "Self-awareness", "Resilience"],
        },
        {
          image: TreeRight,
          cardTitle: "Inner Growth",
          cardDescription: "Develop deeper mindfulness and insight.",
          keyPoints: ["Reflection", "Clarity", "Personal growth"],
        },
      ],
    },

    fifthPage: {
      title: "Build a Life of Focus, Calm, and Clarity",
      description:
        "Structured meditation practices that support long-term emotional and mental wellbeing.",
    },

    sixthPage: {
      title: "Track Your Mindfulness Journey",
      description:
        "Observe improvements in focus, emotional balance, and daily calmness.",
      cards: [
  {
    title: "Personal Dashboard",
    subtitle: "Daily mindfulness pulse",
    metricLabel: "Focus Score",
    value: 91,
    chartType: "progressBar"
  },
  {
    title: "Daily Habits",
    subtitle: "Mindfulness activities",
    items: [
      "Meditation: 6/7 Days",
      "Stress level: Improved"
    ],
    chartType: "info"
  },
  {
    title: "Mood Tracker",
    subtitle: "Weekly emotional balance",
    chartType: "barChart",
    data: [
      { value: 50 },
      { value: 65 },
      { value: 70 },
      { value: 75 },
      { value: 68 },
      { value: 72 },
      { value: 80 }
    ]
  },
  {
    title: "Wellness Score",
    subtitle: "Overall wellbeing",
    chartType: "radialChart",
    value: 94,
    metricLabel: "Progress",
    metricStatus: "Excellent"
  }
],
      bottomCard: {
        title: "Your Personal Growth Companion",
        description:
          "Tools and practices designed to support lifelong mindfulness.",
        keyPoints: [
          { title: "Mental Clarity", description: "Strengthening awareness and focus." },
          { title: "Emotional Balance", description: "Managing stress and emotions." },
          { title: "Consistent Practice", description: "Building healthy mindfulness habits." },
          { title: "Self Growth", description: "Encouraging deeper personal understanding." },
        ],
      },
    },
  },
};

export default programsTabData;