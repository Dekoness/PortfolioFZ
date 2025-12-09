export function resolveAsset(path) {
    if (!path) return "";
    if (/^(https?:)?\/\//.test(path) || path.startsWith("data:")) return path;
    const clean = path.replace(/^\//, "");
    return new URL(clean, import.meta.env.BASE_URL).toString();
}
