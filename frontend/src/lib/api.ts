const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1";

/**
 * A wrapper around the native fetch API designed to handle our
 * HTTP-only cookie JWT authentication automatically.
 */
export async function apiFetch(endpoint: string, options: RequestInit = {}) {
  // Always include credentials (cookies) in the request
  const fetchOptions: RequestInit = {
    ...options,
    credentials: "include", // Critical for HTTP-only cookies
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  };

  const response = await fetch(`${API_BASE_URL}${endpoint}`, fetchOptions);

  if (!response.ok) {
    // Attempt to extract the detail error message from FastAPI
    let errorMessage = "An error occurred";
    try {
      const errorData = await response.json();
      errorMessage = errorData.detail || errorMessage;
    } catch (e) {
      errorMessage = response.statusText;
    }
    throw new Error(errorMessage);
  }

  // Not all responses will have JSON (e.g., logout could be 204 No Content)
  if (response.status !== 204) {
      return await response.json();
  }
  return null;
}
