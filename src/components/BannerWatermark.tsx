import Image from 'next/image';

/**
 * Small, low-opacity logo mark for the bottom-right corner of every photo
 * banner site-wide — both a subtle brand touch and a lightweight deterrent
 * against a photo being lifted and reused elsewhere without attribution.
 * Drop this as the last child inside any `relative overflow-hidden` banner
 * container, after the image and its gradient scrim.
 */
export default function BannerWatermark() {
  return (
    <Image
      src="/logo-transparent.png"
      alt=""
      width={200}
      height={200}
      aria-hidden="true"
      className="pointer-events-none absolute bottom-3 right-3 z-10 h-10 w-10 select-none opacity-40 sm:h-12 sm:w-12"
    />
  );
}
