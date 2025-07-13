import { motion } from "framer-motion";

const pageVariants = {
  initial: { x: -1000, opacity: 0 },
  animate: { x: 0, opacity: 1 },
  exit: { x: 1000, opacity: 0 },
};

const CardInfoPage = () => {
  const handleClick = () => {
    window.location.href = "/";
  };

  return (
    <motion.div
      className="flex flex-col items-center justify-center h-screen bg-white"
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.8, ease: "easeInOut" }}
    >
      <h1 className="text-4xl font-bold">Word Info Page</h1>
      <p className="text-lg">This is the card info content.</p>
      <button
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded "
        onClick={handleClick}
      >
        Go Back
      </button>
    </motion.div>
  );
};

export default CardInfoPage;
