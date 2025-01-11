
export const sanitizeString = (value: string) => {
    if (typeof value !== "string") return value;
    // Trim spaces and escape special characters to avoid XSS
    return value
      .trim()  // Remove leading/trailing spaces
      .replace(/<script.*?>.*?<\/script>/gi, "")  // Strip out any embedded scripts (for XSS protection)
      .replace(/[<>]/g, "")  // Remove < and > characters to prevent HTML injection
      .replace(/&/g, "&amp;") // Encode special characters to prevent HTML injection
      .replace(/'/g, "&#39;") // Encode single quotes
      .replace(/"/g, "&quot;"); // Encode double quotes
  };

  
