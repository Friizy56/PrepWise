# PrepWise

PrepWise is a personalized coding prep tracker for DSA and LeetCode practice. It helps users log solved problems, track streaks, analyze weak topics, generate study plans, and fetch LeetCode performance stats.

## Key Features

- Firebase Authentication and Firestore for user and task data
- Task tracker with CRUD support for coding problems
- Dynamic streak calculation based on solved tasks
- Dashboard analytics with topic distributions and weak-topic detection
- LeetCode stats integration with progress trend and difficulty breakdown
- Study planner that suggests problem sets and topics
- Reusable hooks and utilities for cleaner state logic

## Tech Stack

- React + Vite
- Tailwind CSS
- React Router
- Firebase Auth + Firestore
- Recharts for charts

## Project Structure

```
src/
 ├── components/
 ├── context/
 ├── hooks/
 ├── pages/
 ├── services/
 ├── utils/
```

## Setup

1. Clone the repository:

```bash
git clone <repo-url>
cd PrepWise
```

2. Install dependencies:

```bash
npm install
```

3. Set up environment variables:

   - Copy `.env.example` to `.env`
   - Fill in your Firebase configuration values in `.env`

4. Add Firebase config in `src/services/firebase.js` if not already configured.

5. Start the development server:

```bash
npm run dev
```

6. Open the app in your browser at the URL shown by Vite.

## Scripts

- `npm run dev` - start the development server
- `npm run build` - build the production bundle
- `npm run preview` - preview the production build locally
- `npm run lint` - run ESLint checks

## Firebase Configuration

The project uses Firebase for authentication and Firestore data storage. Confirm the Firebase config in `src/services/firebase.js` and that the following services are enabled in your Firebase project:

- Authentication
- Firestore Database

## Deployment

### Vercel

1. Push the repository to GitHub.
2. Connect the repo to Vercel.
3. Use:
   - Build command: `npm run build`
   - Output directory: `dist`

