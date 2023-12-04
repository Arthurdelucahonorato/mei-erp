import { ReactNode } from "react";

type CardGridProps = {
  children: ReactNode;
  className?: string;
};

export function CardGrid({ children, className }: CardGridProps) {
  return (
    <section
      id="Projects"
      className="flex flex-row flex-wrap justify-center iten gap-10 mt-10 mb-5"
    >
      {children}
    </section>
  );
}
