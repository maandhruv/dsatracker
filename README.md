


# 🧠 DSA Tracker

A full-stack web application for tracking your progress in DSA (Data Structures & Algorithms) topics. Built with **Next.js 15 App Router**, **Supabase**, and **Tailwind CSS**.

## 🚀 Features

- ✅ User authentication with GitHub (via Supabase)
- 📊 Interactive table of DSA problems per topic
- 🔖 Mark problems as solved/starred
- 🧭 Dynamic routing (e.g. `/problems/arrays`, `/problems/linked-list`)
- 🔄 Persistent progress stored per user in Supabase
- 📱 Responsive UI with Tailwind CSS

---



## 🧑‍💻 Tech Stack

- [Next.js 15](https://nextjs.org/)
- [Supabase](https://supabase.com/) (Auth + DB)
- [React](https://reactjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Vercel](https://vercel.com/) (Hosting)

---

## 🔐 Authentication

Authentication is powered by Supabase with GitHub OAuth.

You’ll need to:

    1. Create a Supabase project
    2. Enable GitHub Auth and provide:
    - Client ID
    - Client Secret
    3. Set redirect URLs:
```

[https://your-vercel-deployment.vercel.app](https://your-vercel-deployment.vercel.app)

```

---

## ⚙️ Environment Variables

Create a `.env.local` file with the following:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
````

In Vercel: Set the same in **Project → Settings → Environment Variables**

---

## 🛠️ Running Locally

```bash
git clone https://github.com/yourusername/dsa-tracker.git
cd dsa-tracker
npm install
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000)



## 🌐 Deployment

Deployed on **Vercel**.

    1. Connect your GitHub repo
    2. Add env variables in Vercel dashboard
    3. Done! Supabase + Next.js work seamlessly on Vercel

---



## 🙌 Credits

Built by [Dhruv Maan](https://github.com/maandhruv) with ❤️ using Supabase and Next.js

---



