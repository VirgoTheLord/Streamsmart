"use client";

import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";

export interface BentoItemProps {
  className?: string;
  children: React.ReactNode;
}

export const BentoItem = ({ className, children }: BentoItemProps) => (
  <Card
    className={cn(
      "relative overflow-hidden rounded-3xl border-0 shadow-sm hover:shadow-md transition-shadow duration-300 bento-item opacity-0 translate-y-8",
      className
    )}
  >
    <CardContent className="p-0 h-full">
      {children}
    </CardContent>
  </Card>
);
