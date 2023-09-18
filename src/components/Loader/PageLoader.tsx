import { motion } from "framer-motion";

export function PageLoader() {
  const ContainerVariants = {
    initial: {
      transition: {
        staggerChildren: 0.2,
      },
    },
    animate: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const DotVariants = {
    initial: {
      y: "0%",
    },
    animate: {
      y: "100%",
    },
  };

  const DotTransition = {
    duration: 0.5,
    yoyo: Infinity,
    ease: "easeInOut",
  };

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 w-full h-screen z-50 overflow-hidden bg-gray-200/50 dark:bg-black/50 flex items-center justify-center">
      <div
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <motion.div
          className="flex gap-4"
          variants={ContainerVariants}
          initial="initial"
          animate="animate"
        >
          <motion.span
            className="block w-6 h-6 bg-primary rounded-[50%] dark:bg-secondary"
            variants={DotVariants}
            transition={DotTransition}
          />
          <motion.span
            className="block w-6 h-6 bg-primary rounded-[50%] dark:bg-secondary"
            variants={DotVariants}
            transition={DotTransition}
          />
          <motion.span
            className="block w-6 h-6 bg-primary rounded-[50%] dark:bg-secondary"
            variants={DotVariants}
            transition={DotTransition}
          />
        </motion.div>
      </div>
    </div>
  );
}
