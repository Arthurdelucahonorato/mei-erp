import React, { FC, ReactNode } from "react";
import { motion } from "framer-motion";

type MountTransitionProps = {
  children: ReactNode;
};

export const MountTransition = ({ children }: MountTransitionProps) => (
  <motion.div
    initial={{ x: 300, opacity: 0 }}
    animate={{ x: 0, opacity: 1 }}
    exit={{ x: 300, opacity: 0 }}
    transition={{
      type: "spring",
      stiffness: 260,
      damping: 20,
    }}
  >
    {children}
  </motion.div>
);
