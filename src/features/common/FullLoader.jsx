import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import "./FullScreenLoading.css";

const FullScreenLoading = () => {
  const [loadingText, setLoadingText] = useState("Loading...");
  const [textVariant, setTextVariant] = useState("variant1");
  const [dots, setDots] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prevDots) => (prevDots + 1) % 4); // Cycle through 0, 1, 2, 3
      setLoadingText((prevText) => {
        if (prevText === "Loading...") {
          return "Loading..";
        } else if (prevText === "Loading..") {
          return "Loading.";
        } else {
          return "Loading...";
        }
      });
      setTextVariant((prevVariant) =>
        prevVariant === "variant1" ? "variant2" : "variant1"
      );
    }, 500);

    return () => clearInterval(interval);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeInOut",
      },
    },
  };

  const lineVariants = {
    initial: { scaleX: 0, opacity: 0 },
    animate: {
      scaleX: 1,
      opacity: 0.8,
      transition: {
        duration: 0.8,
        ease: "easeInOut",
        repeat: Infinity,
        repeatType: "reverse",
        delay: 0.2,
      },
    },
  };

  const textVariants = {
    variant1: {
      opacity: 0.8,
      y: 0,
      color: "#f0f0f0",
    },
    variant2: {
      opacity: 1,
      y: -5,
      color: "#ffffff",
    },
  };

  return (
    <div className="fullscreen-loading-2">
      <motion.div
        className="loader-2"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div
          className="line-2"
          variants={lineVariants}
          initial="initial"
          animate="animate"
        />
        <div className="circle-container-2">
          <div className="circle-2 circle-1"></div>
          <div className="circle-2 circle-22"></div>
          <div className="circle-2 circle-3"></div>
          <div className="circle-2 circle-4"></div>
        </div>
      </motion.div>
      <motion.div
        className="loading-text-2"
        variants={textVariants}
        animate={textVariant}
      >
        {loadingText}
      </motion.div>
    </div>
  );
};

export default FullScreenLoading;
