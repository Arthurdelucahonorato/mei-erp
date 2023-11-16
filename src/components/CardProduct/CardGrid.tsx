import { ReactNode } from "react";

type CardGridProps = {
  children: ReactNode;
  className?: string;
};

export function CardGrid({ children, className }: CardGridProps) {
  return (
    <section
      id="Projects"
      className="w-fit mx-auto grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 justify-items-center justify-center gap-10 mt-10 mb-5"
    >
      {children}
    </section>
  );
}
