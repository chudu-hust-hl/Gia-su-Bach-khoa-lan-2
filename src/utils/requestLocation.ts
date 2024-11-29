import { getConfig } from "./config";

// Get the API URL from the configuration
const API_URL = getConfig((config) => config.template.apiUrls.location);

// Use globEager to import mock JSON files directly as objects
const mockUrls: Record<string, { default: string }> = import.meta.globEager("../mock/*.json");

// Function to make API requests
export async function request<T>(
  path: string,
  options?: RequestInit
): Promise<T> {
  // Determine the URL to use: either the API URL or a mock URL
  const url = API_URL
    ? `${API_URL}${path}`
    : mockUrls[`../mock${path}.json`]?.default;

  // If no API URL is configured, wait for a short period
  if (!API_URL) {
    await new Promise((resolve) => setTimeout(resolve, 500));
  }

  // Perform the fetch request
  const response = await fetch(url, options);

  // Check if the response is OK; if not, throw an error
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  // Return the JSON response
  return response.json() as T;
}

// Function to make API requests with a fallback value
export async function requestWithFallback<T>(
  path: string,
  fallbackValue: T,
  options?: RequestInit
): Promise<T> {
  try {
    return await request<T>(path, options);
  } catch (error) {
    console.warn(
      "An error occurred while fetching data. Falling back to default value!"
    );
    console.warn({ path, error, fallbackValue });
    return fallbackValue;
  }
}