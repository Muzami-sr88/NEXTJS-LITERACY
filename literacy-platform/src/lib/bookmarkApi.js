const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

async function readJsonResponse(res) {
  const contentType = res.headers.get("content-type") || "";
  if (!contentType.includes("application/json")) {
    const text = await res.text();
    throw new Error(text.startsWith("<!DOCTYPE") ? "Backend returned HTML instead of JSON. Check API URL." : "Invalid server response");
  }
  return res.json();
}

export const toggleBookmark = async (article) => {
  const token = localStorage.getItem("lp_token");

  const res = await fetch(`${API_URL}/bookmarks/toggle`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(article),
  });

  return readJsonResponse(res);
};

export const getMyBookmarks = async () => {
  const token = localStorage.getItem("lp_token");

  const res = await fetch(`${API_URL}/bookmarks/my-bookmarks`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return readJsonResponse(res);
};
