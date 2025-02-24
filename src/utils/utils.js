export function capitalizeWord (name) {
  return name.charAt(0).toUpperCase() + name.slice(1);
};

export async function copyToClipboard (text) {
  try {
    await navigator.clipboard.writeText(text);
  } catch (error) {
    console.error("Error copying to clipboard:", error);
  }
};