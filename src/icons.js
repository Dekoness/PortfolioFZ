import React from "react";
import {
    SiJavascript,
    SiTypescript,
    SiReact,
    SiNextdotjs,
    SiHtml5,
    SiCss3,
    SiTailwindcss,
    SiSass,
    SiPython,
    SiFlask,
    SiFastapi,
    SiNodedotjs,
    SiPostgresql,
    SiMongodb,
    SiOpenai,
    SiGithub,
    SiLinkedin,
    SiDocker,
    SiFirebase,
    SiVercel,
    SiNetlify,
} from "react-icons/si";
import {
    FiCode,
    FiDatabase,
    FiKey,
    FiCloud,
    FiServer,
    FiZap,
    FiBox,
    FiEdit3,
    FiUser,
    FiImage,
} from "react-icons/fi";

export function techIconFor(name) {
    const n = String(name || "").toLowerCase();
    if (n.includes("javascript")) return SiJavascript;
    if (n.includes("typescript")) return SiTypescript;
    if (n.includes("react")) return SiReact;
    if (n.includes("next")) return SiNextdotjs;
    if (n === "html" || n.includes("html5")) return SiHtml5;
    if (n === "css" || n.includes("css3")) return SiCss3;
    if (n.includes("tailwind")) return SiTailwindcss;
    if (n.includes("sass") || n.includes("scss")) return SiSass;
    if (n.includes("python")) return SiPython;
    if (n.includes("flask")) return SiFlask;
    if (n.includes("fastapi")) return SiFastapi;
    if (n.includes("node")) return SiNodedotjs;
    if (n.includes("postgres")) return SiPostgresql;
    if (n.includes("mongo")) return SiMongodb;
    if (n.includes("openai")) return SiOpenai;
    if (n.includes("docker")) return SiDocker;
    if (n.includes("firebase")) return SiFirebase;
    if (n.includes("vercel")) return SiVercel;
    if (n.includes("netlify")) return SiNetlify;
    // Azure icon not available in current react-icons version; fallback
    if (n.includes("azure")) return FiCloud;
    if (n.includes("github")) return SiGithub;
    if (n.includes("linkedin")) return SiLinkedin;

    if (n.includes("sql") || n.includes("database")) return FiDatabase;
    if (n.includes("jwt")) return FiKey;
    if (n.includes("api")) return FiCloud;
    if (n.includes("render") || n.includes("railway")) return FiServer;
    if (n.includes("rag")) return FiZap;
    if (n.includes("embedding")) return FiBox;
    if (n.includes("prompt")) return FiEdit3;
    return FiCode;
}

export function TechIcon({ name, size = 16, color = "currentColor", style }) {
    const Ico = techIconFor(name);
    return React.createElement(Ico, { size, color, style });
}

export const UIIcons = {
    user: FiUser,
    image: FiImage,
    github: SiGithub,
    linkedin: SiLinkedin,
};
