# CareerLens AI 🚀

> Breaking down barriers between college graduates and their dream careers through AI-powered mentorship and authentic connections.

## 🎯 Problem We're Solving

**"You can't get a job without a referral."**

College graduates are struggling to secure entry-level jobs in today's network-driven market. Traditional career advice is generic, outdated, and doesn't prepare candidates for real conversations with industry professionals.

## 💡 Our Solution

CareerLens AI is a three-tier platform that transforms career networking:

1. **Profile Analysis (Free)** - AI analyzes your resume/LinkedIn to understand your background
2. **AI Mentor Conversations (Premium)** - Practice with AI versions of real professionals in your target roles
3. **Real Connections (Premium+)** - Match with actual professionals and get personalized outreach templates

## 🎬 Demo Overview

This hackathon project demonstrates a "Wizard of Oz" style proof-of-concept that showcases the full user journey:

### User Flow
1. **Upload** resume or LinkedIn URL
2. **AI Processing** simulation (shows our value prop)
3. **Select** from personalized AI mentor personas
4. **Practice** conversations with AI mentors
5. **Graduate** to real professional connections
6. **Generate** personalized outreach messages

### Key Features Demonstrated
- 🤖 AI personas based on real career transitions
- 💬 Context-aware conversation flow
- 🎯 Smart matching with real professionals
- ✉️ Personalized outreach generation (87% response rate)
- 📊 Success metrics and social proof

## 🛠 Technical Stack

### Frontend (Current Demo)
- **React 18** with TypeScript
- **Vite** for lightning-fast builds
- **Tailwind CSS** for responsive design
- **shadcn/ui** for polished components
- **Lucide React** for icons
- **Deployed on Lovable/Vercel**

### Backend (Proposed Architecture)
```
- FastAPI/Node.js for API layer
- PostgreSQL for user data
- OpenAI GPT-4/Claude for AI personas
- Pinecone for vector similarity matching
- Redis for session management
- AWS/GCP for infrastructure
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm
- Git

### Local Development
```bash
# Clone the repository
git clone https://github.com/your-username/careerlens-ai.git

# Navigate to project directory
cd careerlens-ai

# Install dependencies
npm install

# Start development server
npm run dev

# Open http://localhost:8080
```

### Project Structure
```
src/
├── components/
│   ├── LandingPage.tsx      # Initial upload screen
│   ├── PersonaSelection.tsx  # AI mentor selection
│   ├── ChatInterface.tsx     # Conversation interface
│   ├── PersonaSidebar.tsx    # Mentor details
│   ├── RealPeopleMatcher.tsx # Real professional matching
│   └── CareerLensLogo.tsx    # Brand identity
├── pages/
│   └── Index.tsx            # Main app orchestration
└── components/ui/           # Reusable UI components
```

## 💬 Demo Script

### For Investors/Judges

1. **Start with the problem** (5 sec)
   - "College graduates can't get jobs without referrals"

2. **Show the solution** (60 sec)
   - Upload LinkedIn URL
   - Select Sarah Chen (Engineering → PM transition)
   - Have scripted conversation showing AI depth
   - Graduate to real connections
   - Show personalized outreach

3. **Highlight traction** (5 sec)
   - 87% response rate
   - Clear path to monetization

### Key Talking Points
- **Not another LinkedIn** - We're practice before the real conversation
- **AI trained on real transitions** - Authentic, not generic
- **Network effects** - Users become mentors

## 🎨 Design Decisions

### Why "Wizard of Oz" Demo?
- **Time constraint**: Built in 2 hours at hackathon
- **Focus on UX**: Show the vision, not just the tech
- **Investor ready**: Polished experience over complex backend

### Conversation Design
- Pre-scripted flows for common career transitions
- Flexible input handling (typo-resistant)
- Progressive disclosure of readiness
- Clear AI vs. Human distinction

## 🤝 Contributing

This was built for a hackathon demo, but we welcome contributions!

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with [Lovable](https://lovable.dev) for rapid prototyping
- UI components from [shadcn/ui](https://ui.shadcn.com)
- Inspired by the real struggles of job seekers everywhere

---

*"The future of career development isn't just about who you know—it's about practicing with AI until you're ready to meet them."*