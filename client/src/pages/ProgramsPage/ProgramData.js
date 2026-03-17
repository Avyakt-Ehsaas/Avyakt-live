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



const  programsTabData = {

  school: {
    firstPage: {
      title: "Student Wellness Programs Designed for Focus, Calm & Emotional Growth",
      description:
        "Structured, neuroscience-backed programs that combine meditation, cognitive experiments, and emotional development, built specifically for Indian schools.",
      buttonText: "Bring Avyakt to Your School",
      image: ProgramSectionsImage,
    },

    secondPage: {
      title: "India’s Students Are Under ",
      spanTitle: "Unprecedented Pressure",
      description:
        "Academic stress, exam anxiety, digital distraction, and emotional overload are affecting students across age groups. Research from India shows:",
      cards: [
        {
          cardTitle: "Academic Stress",
          number: "78%",
          cardDescription:
            "Students reporting high level of exam stress and anxiety",
        },
        {
          cardTitle: "Digital Distraction",
          number: "65%",
          cardDescription:
            "Reduction in sustained attention span over the last decade.",
        },
        {
          cardTitle: "Mental Health Gap",
          number: "1 in 5",
          cardDescription:
            "Students require professional emotional support but lacks access to institutional resources.",
        },
      ],
    },

    thirdPage: {
      title: "A ",
      greenTitle : "Structured System ",
      postTitle: "Not Just Random Sessions",
      description:
        "Avyakt Student Programs are built on three integrated pillars:",
      cards: [
        {
          image: brainIcon,
          cardTitle: "Neuroscience-Inspired Meditation Experience",
          cardDescription:
            "Guided practices built on how the brain regulates attention, emotions, and stress.",
        },
        {
          image: yoga,
          cardTitle: "Live Meditation Workshops & Programs",
          cardDescription:
            "Structured group sessions and workshops that teach practical tools for focus and calm.",
        },
        {
          image: graph,
          cardTitle: "Personalized Trackers & Growth Insights",
          cardDescription:
            "Monitor focus, emotional wellbeing, and consistency through progress tracking.",
        },
        {
          image: watch,
          cardTitle: "Easily Fits Real Life Routines",
          cardDescription:
            "Short, flexible practices designed to blend into school, work, and home schedules.",
        },
      ],
    },

    fourthPage: {
      title: "Designed for ",
      greenTitle: "Every Stage",
      postTitle: " of a Student’s Growth",
      description:
        "Each program adapts meditation practices and activities for different age groups.",
      cards: [
        {
          image: TreeLeft,
          cardTitle: "Foundations (6–9 Years)",
          cardDescription:
            "Playful stories and breathing games that build calm and emotional awareness.",
          keyPoints: ["Foundation", "Body awareness", "Emotional Expression"],
        },
        {
          image: TreeCenter,
          cardTitle: "Growth (10–14 Years)",
          cardDescription:
            "Guided meditation and brain-based activities for attention and regulation.",
          keyPoints: ["Focus Building", "Stress awareness", "Habit Formation"],
        },
        {
          image: TreeRight,
          cardTitle: "Mastery (15–18 Years)",
          cardDescription:
            "Advanced focus training and stress control for exam readiness.",
          keyPoints: ["Sustain Focus", "Anxiety Control", "Performance readiness"],
        },
      ],
    },

    fifthPage: {
      title: "Structured Programs for ",
      spanTitle: "Mental & Emotional ",
      title2: "Growth",
      description:
        "Each program combines meditation, cognitive experiments, and practical tools.",
      cards: [
            {
                id: "dhyan",
                weeks: "8 weeks",
                title: "Dhyan Shakti — Attention Lab",
                subtitle:
                    "Strengthening sustained attention, reducing distraction, and improving deep focus.",
                activities: [
                    "Attention experiments (before & after meditation)",
                    "Breath-counting practices",
                    "Focus games & cognitive tasks",
                    "Digital distraction awareness",
                ],
                tags: ["Improved concentration", "Classroom Engagement", "Stronger Learning readiness"],
                image: schoolFirst,
                imageSide: "right",
            },
            {
                id: "shanti",
                weeks: "8 weeks",
                title: "Shanti Path — Anxiety & Calm",
                subtitle: "Managing stress, exam anxiety, and emotional overwhelm.",
                activities: [
                    "Breath regulation techniques",
                    "Calm response training",
                    "Thought awareness exercises",
                    "Relaxation practices",
                ],
                tags: ["Reduced anxiety", "Emotional control", "Increased resilience under pressure"],
                image: schoolSecond,
                imageSide: "left",
            },
            {
                id: "Manas",
                weeks: "10 weeks",
                title: "Manas Vigyan — Know Your Brain",
                subtitle: "Understanding how attention, memory, and emotions work.",
                activities: [
                    "Brain-based experiments",
                    "Meditation Science labs",
                    "Cognitive games",
                    "Self-obervation exercises"
                ],
                tags: ["Greater self awareness", "Curiosity", "Owner of mental habits."],
                image: schoolThird,
                imageSide: "right",
            }
        ],
    },

    sixthPage: {
      title: "Tracking Growth beyond Classroom",
      description:
        "Through Cognitive Labs, students explore attention, memory, emotions, and focus.",


      cards: [
        


        {
    title: "Student Dashboard",
    subtitle: "Daily wellness pulse",
    metricLabel: "Focus Score",
    value: 88,
    chartType: "progressBar"
  },
  {
    title: "Parents Dashboard",
    subtitle: "Daily wellness pulse",
    items: [
      "Daily practice: 5/7 Days",
      "Consistency: Improved"
    ],
    chartType: "info"
  },
  {
    title: "Teacher Dashboard",
    subtitle: "Classroom emotional climate",
    chartType: "barChart",
    data: [
      { value: 30 },
      { value: 55 },
      { value: 35 },
      { value: 70 },
      { value: 60 },
      { value: 50 },
      { value: 35 }
    ]
  },
  {
    title: "Admin Dashboard",
    subtitle: "Whole school wellness",
    chartType: "radialChart",
    value: 92,
    metricLabel: "Participation",
    metricStatus: "High (4%)"
  }




      ],


      bottomCard: {
        title: "Aligned with ",
        greenTitle: "NEP 2020 ",
        postTitle: "Guidelines",
        description:
          "Avyakt fulfills the mandate for socio-emotional learning in Indian schools.",
        keyPoints: [
          {
            title: "Holistic Development",
            description:
              "Nurturing mind, body, and spirit beyond academics.",
          },
          {
            title: "Socio-emotional Learning",
            description:
              "Building empathy, resilience, and emotional intelligence.",
          },
          {
            title: "Ethical Reasoning",
            description:
              "Fostering value-based decision making in students.",
          },
          {
            title: "Mental Wellbeing",
            description:
              "Providing tools for stress management and focus.",
          },
        ],
      },
    },
  },

  organisation: {
    firstPage: {
      title: "Workplace Wellness Programs for Focused & Resilient Teams ",
      description:
        "Structured mindfulness and cognitive programs designed to reduce workplace stress, improve focus, and enhance emotional intelligence across teams.",
      buttonText: "Bring Avyakt to Your Organisation",
      image: ProgramSectionsImage,
    },

    secondPage: {
      title: "Workplace Stress Is ",
      spanTitle: "Rising Rapidly",
      description:
        "Modern workplaces demand constant productivity, multitasking, and digital engagement. Studies across India show:",
      cards: [
        {
          cardTitle: "Workplace Stress",
          number: "70%",
          cardDescription:
            "Employees report experiencing high stress due to workload and deadlines.",
        },
        {
          cardTitle: "Burnout Risk",
          number: "60%",
          cardDescription:
            "Employees feel emotionally exhausted due to prolonged work pressure.",
        },
        {
          cardTitle: "Focus Loss",
          number: "50%",
          cardDescription:
            "Frequent digital interruptions reduce deep work productivity.",
        },
      ],
    },

    thirdPage: {
      title: "A ",
      greenTitle: "Science-Based ",
      postTitle: "Workplace Wellness System",
      description:
        "Avyakt workplace programs combine neuroscience, mindfulness, and practical exercises:",
      cards: [
        {
          image: brainIcon,
          cardTitle: "Mindfulness & Focus Training",
          cardDescription:
            "Techniques designed to improve concentration and cognitive clarity at work.",
        },
        {
          image: yoga,
          cardTitle: "Stress & Burnout Management",
          cardDescription:
            "Guided practices that help employees regulate stress and emotional pressure.",
        },
        {
          image: graph,
          cardTitle: "Team Emotional Intelligence",
          cardDescription:
            "Exercises that improve communication, empathy, and collaboration.",
        },
        {
          image: watch,
          cardTitle: "Flexible Workplace Integration",
          cardDescription:
            "Short, adaptable practices that fit easily into daily work routines.",
        },
      ],
    },

    fourthPage: {
      title: "Programs Designed for",
      greenTitle: "Different Workplace Roles",
      postTitle: "",
      description:
        "Different roles experience different pressures. Our programs adapt accordingly.",
      cards: [
        {
          image: TreeLeft,
          cardTitle: "Team Members",
          cardDescription:
            "Focus and emotional resilience for everyday work challenges.",
          keyPoints: ["Focus", "Stress Balance", "Productivity"],
        },
        {
          image: TreeCenter,
          cardTitle: "Managers",
          cardDescription:
            "Leadership calmness and decision clarity under pressure.",
          keyPoints: ["Decision Clarity", "Conflict Handling", "Team Awareness"],
        },
        {
          image: TreeRight,
          cardTitle: "Leadership",
          cardDescription:
            "Advanced mindfulness practices for strategic thinking and leadership wellbeing.",
          keyPoints: ["Strategic Thinking","Vision Clarity", "Emotional Leadership", ],
        },
      ],
    },

    fifthPage: {
      title: "Building Healthier and More Productive Teams",
      description:
        "Our programs combine meditation, cognitive tools, and behavioural insights to create sustainable workplace wellbeing.",
    },

    sixthPage: {
      title: "Measuring Workplace Wellbeing",
      description:
        "Track improvements in focus, stress levels, and emotional balance across teams.",
      cards: [
  {
    title: "Organisation Dashboard",
    subtitle: "Workplace wellbeing overview",
    metricLabel: "Employee Engagement",
    value: 84,
    chartType: "progressBar"
  },
  {
    title: "HR Insights",
    subtitle: "Employee participation",
    items: [
      "Weekly wellness sessions: 4/5",
      "Stress levels: Reduced"
    ],
    chartType: "info"
  },
  {
    title: "Team Climate",
    subtitle: "Department wellbeing trends",
    chartType: "barChart",
    data: [
      { value: 40 },
      { value: 65 },
      { value: 55 },
      { value: 70 },
      { value: 60 },
      { value: 50 },
      { value: 45 }
    ]
  },
  {
    title: "Management Dashboard",
    subtitle: "Company wellness score",
    chartType: "radialChart",
    value: 89,
    metricLabel: "Participation",
    metricStatus: "Very High (6%)"
  }
],
      bottomCard: {
        title: "Aligned with Modern Workplace Wellbeing Standards",
        description:
          "Programs designed to support employee wellbeing initiatives in organisations.",
        keyPoints: [
          {
            title: "Employee Wellbeing",
            description: "Improving mental clarity and emotional balance.",
          },
          {
            title: "Productivity",
            description: "Helping teams work with deeper focus and energy.",
          },
          {
            title: "Leadership Growth",
            description: "Strengthening mindful and emotionally intelligent leadership.",
          },
          {
            title: "Sustainable Work Culture",
            description: "Creating healthier and more balanced workplaces.",
          },
        ],
      },
    },
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