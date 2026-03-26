//src/app/[locale]/utils/api.js
export const getGallery = async () => {
  try {
    const url = process.env.NEXT_PUBLIC_GALLERY_URL || 'https://aj-ziad.github.io/gallery-api/gallery.json';
    const res = await fetch(url, { next: { revalidate: 3600 } });
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
    const url = process.env.NEXT_PUBLIC_SERVICES_URL || 'https://aj-ziad.github.io/services-api/services.json';
    const res = await fetch(url, {
      // Allow Next.js to statically generate and revalidate every hour
      next: { revalidate: 3600 },
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
