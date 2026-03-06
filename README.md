# Safa Sarfraz — Personal Website

A clean, animated personal website built with plain HTML, CSS, and JavaScript.

## 📁 File Structure

```
safa-website/
├── index.html        ← Main HTML (all pages live here)
├── css/
│   └── style.css     ← All styling, colors, animations
├── js/
│   └── main.js       ← All interactivity (cursor, page switching, etc.)
└── README.md         ← This file
```

---

## 🚀 Running Locally in VS Code

1. Open the `safa-website` folder in VS Code
2. Install the **Live Server** extension (by Ritwick Dey)
3. Right-click `index.html` → **"Open with Live Server"**
4. Your site opens at `http://127.0.0.1:5500`

---

## 🌐 Deploying with a Custom Domain (e.g. safasarfraz.com)

### Step 1 — Buy your domain
Go to one of these registrars and buy your domain:
- [Namecheap](https://namecheap.com) — affordable, easy
- [Google Domains / Squarespace Domains](https://domains.squarespace.com)
- [Cloudflare Registrar](https://cloudflare.com) — cheapest renewal prices

Suggested: `safasarfraz.com` or `safasarfraz.dev`

---

### Step 2 — Host on GitHub Pages (free)

1. Create a free account at [github.com](https://github.com)
2. Create a new repository named **exactly**: `yourusername.github.io`
   - e.g. `safasarfraz.github.io`
3. Upload all your files (index.html, css/, js/) to the repo
4. Go to **Settings → Pages → Source → Deploy from branch → main**
5. Your site is now live at `https://safasarfraz.github.io`

---

### Step 3 — Connect your custom domain

**In GitHub:**
1. Go to your repo → Settings → Pages
2. Under "Custom domain", type your domain: `safasarfraz.com`
3. Click Save. GitHub will create a `CNAME` file automatically.

**In your domain registrar (DNS settings):**
Add these DNS records:

| Type  | Name | Value                  |
|-------|------|------------------------|
| A     | @    | 185.199.108.153        |
| A     | @    | 185.199.109.153        |
| A     | @    | 185.199.110.153        |
| A     | @    | 185.199.111.153        |
| CNAME | www  | yourusername.github.io |

4. Wait 10–30 minutes for DNS to propagate
5. Back in GitHub Pages, tick **"Enforce HTTPS"**

✅ Your site is now live at `https://safasarfraz.com` — no company name in the URL!

---

### Alternative: Netlify (even easier)

1. Go to [netlify.com](https://netlify.com) and sign up free
2. Drag your entire `safa-website` folder onto the Netlify dashboard
3. It gives you a URL like `random-name.netlify.app`
4. Go to **Site Settings → Domain Management → Add custom domain**
5. Type your domain and follow the DNS instructions they give you

---

## ✏️ Customizing the Site

| What to change | Where |
|---|---|
| Colors | `css/style.css` → top `:root { }` section |
| Your name / bio text | `index.html` |
| Add a project | `index.html` → Projects section, copy a `.proj-card` block |
| Animation speeds | `css/style.css` → animation `duration` values |
| Typing speed | `js/main.js` → `typeText(tagline, originalText, 22)` — lower = faster |

---

## 🛠 Built With

- **HTML5** — structure
- **CSS3** — styling, animations, glassmorphism, blobs
- **Vanilla JavaScript** — interactivity (no frameworks needed!)
- **Google Fonts** — Cormorant Garamond + Outfit
