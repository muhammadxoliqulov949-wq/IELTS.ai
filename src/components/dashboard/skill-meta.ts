import { BookOpenIcon, HeadphonesIcon, MicIcon, PenLineIcon, type LucideIcon } from "lucide-react";
import type { Skill } from "@/types/ielts";

/**
 * Fixed identity per skill: icon and categorical chart colour. The order
 * matches --chart-1..4 so a skill keeps its colour everywhere.
 */
export const skillMeta: Record<Skill, { icon: LucideIcon; color: string }> = {
  listening: { icon: HeadphonesIcon, color: "var(--chart-1)" },
  reading: { icon: BookOpenIcon, color: "var(--chart-2)" },
  writing: { icon: PenLineIcon, color: "var(--chart-3)" },
  speaking: { icon: MicIcon, color: "var(--chart-4)" },
};

export const skillOrder: Skill[] = ["listening", "reading", "writing", "speaking"];
