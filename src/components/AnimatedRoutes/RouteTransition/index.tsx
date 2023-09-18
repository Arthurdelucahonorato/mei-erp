import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/router";
import { ReactNode } from "react";

type RouteTransitionProps = {
  children: ReactNode;
};

export const RouteTransition = ({ children }: RouteTransitionProps) => {
  const router = useRouter();

  return (
    <AnimatePresence>
      <motion.div
        key={router.route}
        initial="pageInitial"
        animate="pageAnimate"
        exit="pageExit"
        variants={{
          pageInitial: {
            opacity: 0,
          },
          pageAnimate: {
            opacity: 1,
          },
          pageExit: {
            opacity: 0,
          },
        }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};
