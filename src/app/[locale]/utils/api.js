//src/app/[locale]/utils/api.js
export const getGallery = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_GALLERY_URL}`);
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    const galleryData = await res.json();
    return galleryData;
  } catch (error) {
    console.error('Error fetching gallery data:', error);
    return [];
  }
};

export const getServices = async () => {
  try {
    const url = process.env.NEXT_PUBLIC_SERVICES_URL;

    if (!url) {
      throw new Error("NEXT_PUBLIC_SERVICES_URL is not defined in .env");
    }

    const res = await fetch(url, {
      // Force Next.js to always fetch fresh data instead of caching
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    return await res.json();
  } catch (error) {
    console.error("Error fetching services data:", error);
    return [];
  }
};
