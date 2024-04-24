import { motion } from "framer-motion";
import "./QuadrantCard.css";

function QuadrantCard({ title, content }) {
  return (
    <motion.div
      className="quadrant-card"
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.95 }}
    >
      <h2>{title}</h2>
      <p>{content}</p>
    </motion.div>
  );
}

export default QuadrantCard;
