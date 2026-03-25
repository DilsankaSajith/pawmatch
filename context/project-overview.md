## PawMatch Project Specifications

🐾 AI-Assisted Stray Animal Rescue & Adoption Platform

---

## PawMatch Project Specifications

🐾 **AI-powered, community-driven platform** to manage stray animal rescue, adoption, and analytics in low-resource environments.

---

## 📌 Problem (Core Idea)

Stray animal management in Sri Lanka faces major issues:

- No centralized reporting system
- Fragmented communication between citizens & shelters
- Manual and inefficient adoption processes
- Lack of data-driven decision making
- Low adoption success rates

➡️ **PawMatch provides ONE intelligent platform for reporting, managing, and adopting animals efficiently.**

---

## 🧑‍💻 Users


| Persona       | Needs                               |
| ------------- | ----------------------------------- |
| Public User   | Report stray animals easily         |
| Adopter       | Find and adopt suitable pets        |
| Volunteer     | Help manage and upload pet profiles |
| Shelter Admin | Manage animals & adoption workflows |
| Developer     | Use PawMatch APIs                   |


---

## ✨ Core Features

### A) Animal Reporting System

- Report stray animals with:
  - Photos
  - GPS location
  - Description
- AI classifies urgency:
  - Urgent / High / Average / Low

---

### B) Pet Management

- Create & update pet profiles
- Track:
  - Health & vaccination
  - Behavior
  - Adoption readiness
- Manage adoption listings

---

### C) Adoption System

- Browse available pets
- Apply for adoption
- Admin review workflow
- Notifications for status updates

---

### D) AI Features

- AI urgency classification
- AI pet recommendation system
- Text similarity matching
- Explainable AI outputs

---

### E) Analytics

- Abandonment hotspot heatmaps
- Data-driven insights for shelters

---

### F) API Services (SaaS Layer)

- Text Similarity API
- Data Structuring API (text → JSON)
- Hotspot Analytics API
- API key generation system

---

### G) Offline Capability

- Submit reports without internet
- Auto-sync when online

---

## 🧱 System Modules

- Authentication & Role Management
- Reporting Module
- Pet Management Module
- Adoption Module
- AI Services Layer
- Analytics Dashboard
- API Gateway

---

## 🔄 Key Use Cases

- Register & Login
- Report stray animal
- Browse pets
- Get AI recommendations
- Submit adoption application
- Manage pet profiles
- Monitor post-adoption
- View hotspot analytics
- Generate & use API keys

---

## ⚙️ Functional Requirements (Key)

- User registration with roles
- Stray animal reporting with images & GPS
- AI-based urgency classification
- Pet profile management
- Adoption workflow system
- AI-based pet matching
- Hotspot analytics generation
- Offline form submission
- Public API services

---

## 🚫 Out of Scope

- Native mobile apps
- Payment systems
- IoT tracking (GPS collars)
- Custom AI model training
- Veterinary services
- Government DB integrations

---

## 🧠 AI Capabilities

- Image + text analysis (Gemini API)
- Text similarity scoring
- Recommendation engine
- Data structuring from raw text

---

## 🗄️ Data Model (Conceptual)

Main entities:

- User (roles: Public, Adopter, Volunteer, Admin, Developer)
- Animal Report
- Pet Profile
- Adoption Application
- API Key
- Analytics Data

---

## 🧱 Tech Stack


| Category   | Choice                   |
| ---------- | ------------------------ |
| Frontend   | Next.js (App Router)     |
| Language   | TypeScript               |
| Backend    | Node.js                  |
| Database   | PostgreSQL + Prisma      |
| AI         | Gemini API + HuggingFace |
| Auth       | Clerk                    |
| Deployment | Vercel                   |
| Storage    | Cloud storage (images)   |


---

## 📊 Non-Functional Requirements

### Usability

- Tasks completed within 5 minutes
- Responsive UI (mobile + desktop)
- Visual feedback within 1 second

### Performance

- Page load < 3s (3G network)
- API response < 500ms
- AI results < 10s

### Reliability

- 99% uptime
- Error logging enabled
- AI fallback mechanisms

### Security

- Secure authentication
- API keys protected
- Input validation (100%)
- File upload restrictions

### Offline Support

- Local storage for forms
- Auto-sync on reconnect

---

## 🔐 Constraints

- Depends on third-party AI APIs
- Limited offline features
- Requires stable internet (3G+)
- Upload size limits

---

## 🎨 UI / UX

- Mobile-first responsive design
- Simple, low-bandwidth friendly UI
- Dashboard + map-based analytics
- Accessible for low digital literacy users

