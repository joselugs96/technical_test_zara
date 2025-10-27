export function formatDate(dateString: string | null | undefined): string {
  if (!dateString) return "";
  try {
    const date = new Date(dateString);

    if (isNaN(date.getTime())) {
      return dateString;
    }

    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  } catch (e) {
    console.error("Error al formatear la fecha:", e);
    return dateString;
  }
}

export function formatDuration(
  duration: string | number | null | undefined
): string {
  if (!duration) return "";

  if (typeof duration === "string" && duration.includes(":")) {
    const parts = duration.split(":");
    if (parts.length >= 2) return duration;
  }

  const seconds =
    typeof duration === "string" ? parseInt(duration, 10) : duration;

  if (isNaN(seconds) || seconds < 0) return "";

  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  const formattedMinutes = String(minutes).padStart(2, "0");
  const formattedSeconds = String(remainingSeconds).padStart(2, "0");

  if (hours > 0) {
    const formattedHours = String(hours).padStart(2, "0");
    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
  }

  return `${formattedMinutes}:${formattedSeconds}`;
}
