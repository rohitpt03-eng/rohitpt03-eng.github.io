import fs from "fs";
import path from "path";

const htmlPath = path.resolve("standalone/index.html");
let html = fs.readFileSync(htmlPath, "utf-8");

const imagesToInline = [
  { url: "/rohit.jpg", file: "public/rohit.jpg", mime: "image/jpeg" },
  { url: "./rohit.jpg", file: "public/rohit.jpg", mime: "image/jpeg" },
  { url: "/projects/project1-web.jpg", file: "public/projects/project1-web.jpg", mime: "image/jpeg" },
  { url: "./projects/project1-web.jpg", file: "public/projects/project1-web.jpg", mime: "image/jpeg" },
  { url: "/projects/project2-cpp.jpg", file: "public/projects/project2-cpp.jpg", mime: "image/jpeg" },
  { url: "./projects/project2-cpp.jpg", file: "public/projects/project2-cpp.jpg", mime: "image/jpeg" },
  { url: "/projects/project3-embedded.jpg", file: "public/projects/project3-embedded.jpg", mime: "image/jpeg" },
  { url: "./projects/project3-embedded.jpg", file: "public/projects/project3-embedded.jpg", mime: "image/jpeg" },
];

for (const item of imagesToInline) {
  const fullPath = path.resolve(item.file);
  if (fs.existsSync(fullPath)) {
    const base64 = fs.readFileSync(fullPath).toString("base64");
    const dataUri = `data:${item.mime};base64,${base64}`;
    // Replace all occurrences of the url
    html = html.split(item.url).join(dataUri);
  }
}

const outputPath = path.resolve("rohit-portfolio-shareable.html");
fs.writeFileSync(outputPath, html, "utf-8");
console.log(`Successfully created single standalone shareable HTML: ${outputPath} (${(fs.statSync(outputPath).size / 1024 / 1024).toFixed(2)} MB)`);
