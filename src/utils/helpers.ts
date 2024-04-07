import toast from "react-hot-toast";

export function filterUniqueUsers(
  data: Array<{ userId: string; stream: MediaStream }>
) {
  // Create a Set to store unique user IDs
  const seenUsers = new Set();
  // Initialize an empty array to store filtered data
  const filteredData = [];

  // Loop through the input data
  for (const item of data) {
    // Check if the user ID has already been seen
    if (!seenUsers.has(item.userId)) {
      // Add the user ID to the seenUsers set
      seenUsers.add(item.userId);
      // Add the object to the filtered data array
      filteredData.push(item);
    }
  }

  // Return the filtered data
  return filteredData;
}

export async function writeClipboardText(text: string) {
  try {
    await navigator.clipboard.writeText(text);
    toast.success(
      "Successfully copied room url. Now, You can invite peers to this room."
    );
  } catch (error: any) {
    console.error(error.message);
    toast.error("Failed to Copy. You can copy from address bar also");
  }
}

// export const debounce = (fn: Function, ms = 300) => {
//   let timeoutId: ReturnType<typeof setTimeout>;
//   return function (this: any, ...args: any[]) {
//     clearTimeout(timeoutId);
//     timeoutId = setTimeout(() => fn.apply(this, args), ms);
//   };
// };

export const debounce = <F extends (...args: any[]) => any>(
  func: F,
  waitFor: number
) => {
  let timeout: NodeJS.Timeout | null = null; // Store timeout reference

  return (...args: Parameters<F>): void => {
    // Return a function for direct calls
    clearTimeout(timeout); // Clear any existing timeout

    timeout = setTimeout(() => {
      func(...args); // Call the original function with arguments
    }, waitFor);
  };
};

export function getLocalStorage(key: string): string | null {
  try {
    const serializedCode = localStorage.getItem(key);
    if (serializedCode) {
      return JSON.parse(serializedCode); // Parse JSON if stored
    }
  } catch (error) {
    console.error("Error retrieving code from local storage:", error);
  }
  return null;
}

export function setLocalStorage(key: string, code: string): void {
  try {
    localStorage.setItem(key, JSON.stringify(code)); // Stringify before storing
  } catch (error) {
    console.error("Error storing code to local storage:", error);
  }
}

export function deleteLocalStorage(key: string): void {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error("Error deleting code from local storage:", error);
  }
}
