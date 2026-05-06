/* ==========================================================================
   Brésil 2026 — Travel Book
   Logique partagée : chargement des données + helpers + mobile menu
   ========================================================================== */

const DATA_URL = "data/itineraire.json";

// --- Mobile nav toggle ---
document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.querySelector(".nav-toggle");
  const links = document.querySelector(".nav-links");
  if (toggle && links) {
    toggle.addEventListener("click", () => links.classList.toggle("open"));
    // Close menu when a link is clicked
    links.querySelectorAll("a").forEach(a => {
      a.addEventListener("click", () => links.classList.remove("open"));
    });
  }
  // Mark active link
  const path = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav-links a").forEach((a) => {
    if (a.getAttribute("href") === path) a.classList.add("active");
  });
});

// --- Data loader ---
// Tries fetch first (always fresh), falls back to embedded data.js (works in file://)
async function loadData() {
  if (window.TRAVEL_DATA) {
    return window.TRAVEL_DATA;
  }
  try {
    const res = await fetch(DATA_URL, { cache: "no-store" });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch (e) {
    console.error("Erreur chargement des données :", e);
    return null;
  }
}

// --- Helpers ---
function formatDate(iso) {
  if (!iso) return "";
  const [y, m, d] = iso.split("-");
  const months = ["jan", "fév", "mar", "avr", "mai", "juin", "juil", "août", "sept", "oct", "nov", "déc"];
  return `${parseInt(d, 10)} ${months[parseInt(m, 10) - 1]}`;
}

function formatDateLong(iso) {
  if (!iso) return "";
  const [y, m, d] = iso.split("-");
  const months = ["janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août", "septembre", "octobre", "novembre", "décembre"];
  return `${parseInt(d, 10)} ${months[parseInt(m, 10) - 1]}`;
}

function escapeHtml(str) {
  if (str == null) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
