import Image from "next/image";
import { site } from "@/data/site";
import { publicAssetExists } from "@/lib/assets";
import { cn } from "@/lib/utils";

/**
 * Shows /public/profile/jinal-photo.webp when it exists.
 * Until then: a monogram, clearly labelled as a photo placeholder.
 */
export function ProfileAvatar({ className, priority = false }: { className?: string; priority?: boolean }) {
  const hasPhoto = publicAssetExists(site.assets.photo);
  return (
    <div className={cn("relative overflow-hidden rounded-[20px] bg-ink", className)}>
      {hasPhoto ? (
        <Image
          src={site.assets.photo}
          alt={`Portrait of ${site.name}`}
          fill
          sizes="(min-width: 1024px) 320px, 60vw"
          className="object-cover"
          priority={priority}
        />
      ) : (
        <div
          role="img"
          aria-label="Profile photo placeholder — photo not yet added"
          className="absolute inset-0 grid place-items-center bg-[radial-gradient(circle_at_30%_20%,#1e3a8a_0%,#111827_60%)]"
        >
          <span className="font-display text-5xl font-bold tracking-tight text-white/90">{site.initials}</span>
          <span className="absolute inset-x-3 bottom-3 rounded-full bg-white/10 px-3 py-1 text-center text-[0.68rem] font-medium text-white/80 backdrop-blur">
            Photo placeholder
          </span>
        </div>
      )}
    </div>
  );
}
