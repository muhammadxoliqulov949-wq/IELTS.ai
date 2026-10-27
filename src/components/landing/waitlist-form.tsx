"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2Icon, Loader2Icon } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { useForm, type FieldError } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { submitWaitlist } from "@/mocks/handlers";
import {
  isWaitlistErrorKey,
  waitlistSchema,
  type WaitlistFormValues,
} from "@/lib/validations/waitlist";

export function WaitlistForm() {
  const t = useTranslations("Waitlist");
  const [joinedEmail, setJoinedEmail] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<WaitlistFormValues>({
    resolver: zodResolver(waitlistSchema),
    defaultValues: { email: "", targetBand: "" },
  });

  const errorText = (error?: FieldError) =>
    isWaitlistErrorKey(error?.message) ? t(`errors.${error.message}`) : undefined;

  async function onSubmit(values: WaitlistFormValues) {
    await submitWaitlist({
      email: values.email,
      targetBand: values.targetBand ? Number(values.targetBand) : undefined,
    });
    setJoinedEmail(values.email);
    reset();
  }

  if (joinedEmail) {
    return (
      <div className="flex flex-col items-center gap-3 py-6 text-center" role="status">
        <CheckCircle2Icon className="size-12 text-emerald-500" />
        <p className="text-lg font-semibold">{t("successTitle")}</p>
        <p className="text-sm text-muted-foreground">{t("successText", { email: joinedEmail })}</p>
        <Button variant="outline" onClick={() => setJoinedEmail(null)} className="mt-2">
          {t("again")}
        </Button>
      </div>
    );
  }

  const emailError = errorText(errors.email);
  const bandError = errorText(errors.targetBand);

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="grid gap-4 sm:grid-cols-[2fr_1fr]">
      <div className="grid gap-2">
        <Label htmlFor="waitlist-email">{t("emailLabel")}</Label>
        <Input
          id="waitlist-email"
          type="email"
          autoComplete="email"
          inputMode="email"
          placeholder={t("emailPlaceholder")}
          aria-invalid={Boolean(emailError)}
          aria-describedby={emailError ? "waitlist-email-error" : undefined}
          className="h-11"
          {...register("email")}
        />
        {emailError && (
          <p id="waitlist-email-error" className="text-sm text-destructive">
            {emailError}
          </p>
        )}
      </div>

      <div className="grid gap-2">
        <Label htmlFor="waitlist-band">{t("targetLabel")}</Label>
        <Input
          id="waitlist-band"
          inputMode="decimal"
          placeholder={t("targetPlaceholder")}
          aria-invalid={Boolean(bandError)}
          aria-describedby={bandError ? "waitlist-band-error" : undefined}
          className="h-11"
          {...register("targetBand")}
        />
        {bandError && (
          <p id="waitlist-band-error" className="text-sm text-destructive">
            {bandError}
          </p>
        )}
      </div>

      <div className="sm:col-span-2">
        <Button type="submit" disabled={isSubmitting} className="h-11 w-full text-base">
          {isSubmitting && <Loader2Icon className="animate-spin" />}
          {isSubmitting ? t("submitting") : t("submit")}
        </Button>
        <p className="mt-3 text-center text-xs text-muted-foreground">{t("privacy")}</p>
      </div>
    </form>
  );
}
