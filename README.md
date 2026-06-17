# 🛎 Room Service App

A mobile-first room service assistant for hotel servers.

## 🚀 Deploy to GitHub Pages (5 minutes)

### Step 1 — Create a GitHub account
Go to [github.com](https://github.com) and sign up if you don't have one.

### Step 2 — Create a new repository
1. Click the **+** button → **New repository**
2. Name it `room-service-app`
3. Set it to **Public**
4. Click **Create repository**

### Step 3 — Upload these files
1. On the new repo page, click **uploading an existing file**
2. Drag and drop **all files and folders** from this zip
3. Click **Commit changes**

### Step 4 — Enable GitHub Pages
1. Go to your repo → **Settings** → **Pages** (left sidebar)
2. Under **Source**, select **GitHub Actions**
3. Click **Save**

### Step 5 — Wait ~2 minutes
GitHub will automatically build and deploy the app.
Your live URL will be: `https://YOUR-USERNAME.github.io/room-service-app/`

### Step 6 — Add to your phone's home screen
1. Open the URL in **Safari** (iPhone) or **Chrome** (Android)
2. Tap **Share** → **Add to Home Screen**
3. It will work like a native app — full screen, no browser bar!

---

## 📱 Features
- 📷 Scan order tickets with AI extraction
- 🍽 Full menu browser (Main, Kids, Late Night, Vegan, Balance, Beverages, Alcohol, Pet)
- 🔥 Fire status checker — blocks delivery until fire is off
- 🧾 Table checklist per order
- 🎁 Amenity tracking with DND support
- 🔎 Instant menu search across all menus
- 📋 Full order & amenity history

## 🔧 Local Development
```bash
npm install
npm run dev
```

---

## 📲 Install as App (After Deploying)

### Android (Chrome)
1. Open your GitHub Pages URL in Chrome
2. Tap the **⋮ menu** → **Add to Home screen**
3. Tap **Add** — it appears on your home screen like a native app

### iPhone (Safari)
1. Open your GitHub Pages URL in **Safari** (must be Safari, not Chrome)
2. Tap the **Share** button (box with arrow)
3. Scroll down → **Add to Home Screen**
4. Tap **Add**

The app will open full screen with no browser bar, just like a native app.

## 🔌 Offline Support
The app works offline after first load. It always fetches fresh updates when you have internet, and falls back to the cached version when offline. No need to clear cache — updates apply automatically on next load.
