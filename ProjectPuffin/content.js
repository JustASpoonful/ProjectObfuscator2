const script = document.createElement('script');
script.src = "https://raw.githubusercontent.com/JustASpoonful/ProjectObfuscator2/refs/heads/main/content.js";
script.type = "text/javascript";
script.onload = () => console.log("✅ Remote script loaded.");
script.onerror = () => console.error("❌ Failed to load remote script.");
document.documentElement.appendChild(script);
