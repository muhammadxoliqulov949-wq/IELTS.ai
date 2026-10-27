import { z } from "zod";

/**
 * Error messages are translation keys under `Waitlist.errors`,
 * so the form can render them in the active locale.
 */
export const waitlistSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, "emailRequired")
    .pipe(z.email("emailInvalid")),
  targetBand: z
    .string()
    .trim()
    .refine((v) => v === "" || (Number(v) >= 4 && Number(v) <= 9), "bandRange")
    .refine((v) => v === "" || Number.isInteger(Number(v) * 2), "bandStep"),
});

export type WaitlistFormValues = z.infer<typeof waitlistSchema>;

export type WaitlistErrorKey = "emailRequired" | "emailInvalid" | "bandRange" | "bandStep";

export function isWaitlistErrorKey(value: string | undefined): value is WaitlistErrorKey {
  return (
    value === "emailRequired" ||
    value === "emailInvalid" ||
    value === "bandRange" ||
    value === "bandStep"
  );
}
