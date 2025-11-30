import { useTranslation } from "react-i18next";
import { Button } from "./button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./dropdown-menu";
import { Globe } from "lucide-react";

export const LanguageSwitcher = () => {
  const { t, i18n } = useTranslation();
  const languages = [
    { code: "en", label: t("english"), flag: "🇺🇸" },
    { code: "pt", label: t("portuguese"), flag: "🇧🇷" },
    { code: "es", label: t("spanish"), flag: "🇪🇸" },
    { code: "de", label: t("german"), flag: "🇩🇪" },
    { code: "fr", label: t("french"), flag: "🇫🇷" },
    { code: "ja", label: t("japanese"), flag: "🇯🇵" },
    { code: "zh", label: t("chinese"), flag: "🇨🇳" },
  ];
  const current =
    languages.find((l) => l.code === i18n.language) || languages[0];
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="flex items-center gap-2">
          <Globe className="h-5 w-5" />
          <span className="hidden md:inline">
            {current.flag} {current.label}
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => i18n.changeLanguage(lang.code)}
          >
            {lang.flag} {lang.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
