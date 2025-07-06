const script = document.createElement('script');
script.src = "https://gist.github.com/JustASpoonful/cfe51685aa5b9a3d4dd4b8ab1fdd947b.js";
script.type = "text/javascript";
script.onload = () => console.log("✅ Remote script loaded.");
script.onerror = () => console.error("❌ Failed to load remote script.");
document.documentElement.appendChild(script);
