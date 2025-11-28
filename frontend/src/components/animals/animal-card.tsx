import type { Animal } from "@/lib/types";
import { ANIMAL_CONFIG } from "@/lib/constants/animals";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Trash2, Edit2, MessageCircle, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export interface AnimalCardProps {
  animal: Animal;
  onEdit?: (animal: Animal) => void;
  onDelete?: (animal: Animal) => void;
}

export function AnimalCard({ animal, onEdit, onDelete }: AnimalCardProps) {
  const config = ANIMAL_CONFIG[animal.species] || ANIMAL_CONFIG.other;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
    >
      <Card
        className={cn(
          "relative overflow-hidden border-2 transition-all duration-300 hover:shadow-xl",
          config.borderClass,
          config.bgClass
        )}
      >
        {/* Decorative elements */}
        <div className="absolute top-2 right-2 text-3xl md:text-4xl opacity-20">
          {config.emoji}
        </div>
        <div className="absolute bottom-2 left-2 text-xl md:text-2xl opacity-30">
          {config.decoration}
        </div>
        <div className="absolute -bottom-4 -right-4 text-6xl md:text-8xl opacity-10 rotate-12">
          {config.emoji}
        </div>

        <CardHeader className="pb-2 relative z-10">
          <div className="flex items-start justify-between gap-2">
            <div className="flex items-center gap-2 md:gap-3 min-w-0">
              {animal.photo ? (
                <div className="h-12 w-12 md:h-16 md:w-16 rounded-xl md:rounded-2xl overflow-hidden border-2 border-white shadow-lg flex-shrink-0">
                  <img
                    src={animal.photo || "/placeholder.svg"}
                    alt={animal.name}
                    className="h-full w-full object-cover"
                  />
                </div>
              ) : (
                <div className="h-12 w-12 md:h-16 md:w-16 rounded-xl md:rounded-2xl flex items-center justify-center text-2xl md:text-3xl border-2 border-white shadow-lg bg-white/80 flex-shrink-0">
                  {config.emoji}
                </div>
              )}
              <div className="min-w-0">
                <h3 className="font-bold text-base md:text-lg text-foreground truncate">
                  {animal.name}
                </h3>
                <Badge
                  variant="secondary"
                  className={cn("text-xs", config.colorClass)}
                >
                  {config.emoji} {config.label}
                </Badge>
              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent className="relative z-10 space-y-2 md:space-y-3">
          <div className="grid grid-cols-2 gap-2 text-sm">
            {animal.breed && (
              <div className="bg-white/60 dark:bg-black/20 rounded-lg px-2 md:px-3 py-1.5 md:py-2">
                <span className="text-muted-foreground block text-xs">
                  Raca
                </span>
                <span className="font-medium text-sm truncate block">
                  {animal.breed}
                </span>
              </div>
            )}
            {animal.age !== null && (
              <div className="bg-white/60 dark:bg-black/20 rounded-lg px-2 md:px-3 py-1.5 md:py-2">
                <span className="text-muted-foreground block text-xs">
                  Idade
                </span>
                <span className="font-medium text-sm">
                  {animal.age} {animal.age === 1 ? "ano" : "anos"}
                </span>
              </div>
            )}
          </div>

          {animal.thought_of_the_day && (
            <div className="bg-white/80 dark:bg-black/30 rounded-lg md:rounded-xl p-2 md:p-3 border border-white/50 dark:border-white/10">
              <div className="flex items-center gap-2 mb-1">
                <MessageCircle className="h-3 w-3 md:h-4 md:w-4 text-primary flex-shrink-0" />
                <span className="text-xs font-medium text-primary flex items-center gap-1">
                  Pensamento do dia
                  <Sparkles className="h-3 w-3" />
                </span>
              </div>
              <p className="text-xs md:text-sm text-muted-foreground italic line-clamp-3">
                &ldquo;{animal.thought_of_the_day}&rdquo;
              </p>
            </div>
          )}

          <div className="flex gap-2 pt-1 md:pt-2">
            <Button
              variant="outline"
              size="sm"
              className="flex-1 bg-white/80 dark:bg-black/30 hover:bg-white dark:hover:bg-black/50 text-xs md:text-sm h-8 md:h-9"
              onClick={() => onEdit?.(animal)}
            >
              <Edit2 className="h-3 w-3 md:h-4 md:w-4 mr-1" />
              Editar
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="bg-white/80 dark:bg-black/30 hover:bg-destructive hover:text-destructive-foreground hover:border-destructive h-8 md:h-9 w-8 md:w-9 p-0"
              onClick={() => onDelete?.(animal)}
            >
              <Trash2 className="h-3 w-3 md:h-4 md:w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
