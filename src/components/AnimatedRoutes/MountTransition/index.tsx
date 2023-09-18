import React, { FC, ReactNode } from "react";
import { motion } from "framer-motion";

type MountTransitionProps = {
  children: ReactNode;
  className?: string;
};

export const MountTransition = ({ children, className }: MountTransitionProps) => (
  <motion.div
    initial={{ x: 300, opacity: 0 }}
    animate={{ x: 0, opacity: 1 }}
    exit={{ x: 300, opacity: 0 }}
    transition={{
      type: "spring",
      stiffness: 260,
      damping: 20,
    }}
    className={className}
  >
    {children}
  </motion.div>
);
