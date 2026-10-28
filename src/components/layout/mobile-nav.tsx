"use client";

import { MenuIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { useRef, useState, type MouseEvent } from "react";
import { Link } from "@/i18n/navigation";
import { Button, buttonVariants } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Logo } from "@/components/shared/logo";
import { cn } from "@/lib/utils";
import { navLinks } from "./nav-links";

export function MobileNav() {
  const t = useTranslations("Nav");
  const [open, setOpen] = useState(false);
  const pendingSection = useRef<HTMLElement | null>(null);

  // The sheet's scroll lock restores the old scroll position on close, which
  // cancels in-page anchor jumps. If the target section is on this page,
  // close first and scroll once the close animation has finished.
  function handleNavigate(event: MouseEvent<HTMLAnchorElement>, href: string) {
    const target = document.getElementById(href.split("#")[1] ?? "");
    if (target) {
      event.preventDefault();
      pendingSection.current = target;
    }
    setOpen(false);
  }

  function handleOpenChangeComplete(isOpen: boolean) {
    const target = pendingSection.current;
    if (isOpen || !target) return;
    pendingSection.current = null;
    target.scrollIntoView({ behavior: "smooth" });
    window.history.replaceState(null, "", `#${target.id}`);
  }

  return (
    <Sheet open={open} onOpenChange={setOpen} onOpenChangeComplete={handleOpenChangeComplete}>
      <SheetTrigger
        render={<Button variant="ghost" size="icon" className="lg:hidden" aria-label={t("openMenu")} />}
      >
        <MenuIcon className="size-5" />
      </SheetTrigger>
      <SheetContent side="right" className="w-72">
        <SheetHeader>
          <SheetTitle>
            <Logo />
          </SheetTitle>
        </SheetHeader>
        <nav className="flex flex-col gap-1 px-4" aria-label="Mobile">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={(e) => handleNavigate(e, link.href)}
              className="rounded-md px-3 py-2.5 text-base font-medium hover:bg-muted"
            >
              {t(link.labelKey)}
            </Link>
          ))}
          <Link
            href="/#waitlist"
            onClick={(e) => handleNavigate(e, "/#waitlist")}
            className={cn(buttonVariants(), "mt-4 h-11 text-base")}
          >
            {t("joinWaitlist")}
          </Link>
        </nav>
      </SheetContent>
    </Sheet>
  );
}
