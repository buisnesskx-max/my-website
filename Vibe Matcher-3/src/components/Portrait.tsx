import { useState } from "react";
import type { Person } from "@/data/people";
import { cn } from "@/lib/utils";

function initials(name: string) {
  return name
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0])
    .join("");
}

export function Portrait({
  person,
  className,
  eager = false,
}: {
  person: Person;
  className?: string;
  eager?: boolean;
}) {
  const [failed, setFailed] = useState(false);
  const showImage = person.image && !failed;

  return (
    <div
      className={cn("relative isolate overflow-hidden rounded-[inherit] bg-elevated", className)}
    >
      {showImage ? (
        <img
          src={person.image}
          alt={`Portrait of ${person.name}`}
          loading={eager ? "eager" : "lazy"}
          decoding="async"
          onError={() => setFailed(true)}
          className="h-full w-full object-cover object-[center_20%] transition-transform duration-700 ease-out will-change-transform group-hover:scale-[1.04]"
        />
      ) : (
        <div
          className="flex h-full w-full flex-col items-center justify-center gap-2 p-4 text-center"
          role="img"
          aria-label={`Placeholder portrait for ${person.name}`}
        >
          <div
            aria-hidden="true"
            className="absolute inset-0 opacity-70 animate-drift"
            style={{
              background:
                "radial-gradient(60% 50% at 30% 20%, oklch(0.83 0.085 84 / 22%), transparent 70%), radial-gradient(70% 60% at 80% 90%, oklch(0.6 0.03 285 / 40%), transparent 70%)",
            }}
          />
          <span className="relative font-display text-4xl text-accent-gradient sm:text-5xl">
            {initials(person.name)}
          </span>
          <span className="relative text-[0.65rem] uppercase tracking-[0.2em] text-muted-foreground">
            {person.name}
          </span>
        </div>
      )}
    </div>
  );
}
