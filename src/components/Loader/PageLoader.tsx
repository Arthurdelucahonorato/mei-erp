import { motion } from "framer-motion";

export function PageLoader() {
  const loadingContainerVariants = {
    start: {
      transition: {
        staggerChildren: 0.2,
      },
    },
    end: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const loadingCircleTransition = {
    duration: 0.5,
    yoyo: Infinity,
    ease: "easeInOut",
  };

  const loadingCircleVariants = {
    start: {
      y: "0%",
    },
    end: {
      y: "100%",
    },
  };

  const loadingCircle = {
    display: "block",
    width: "0.5rem",
    height: "0.5rem",
    backgroundColor: "black",
    borderRadius: "0.25rem",
  };

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 w-full h-screen z-50 overflow-hidden bg-gray-200/50 dark:bg-black/50 flex items-center justify-center">
      <div className="flex-center h-10">
        <div style={{ width: `70px`, height: `70px` }} className="animate-spin">
          <div
            className="h-full w-full border-4 border-white dark:border-b-secondary
       border-b-primary rounded-[50%]"
          ></div>
        </div>
      </div>
    </div>
  );
}
