import { useState, useEffect, useMemo } from "react";
import "./../QuadrantCard";
import QuadrantContainer from "./../QuadrantContainer";
import { motion } from "framer-motion";
import { AaronTest } from "./AaronTest";
import { SolarBarChart } from "./../Components/SolarWidgets/SolarBarChart/SolarBarChart";
import { SolarWidgetPie } from "../Components/SolarWidgets/WidgetPie/SolarWidgetPie";
import { SolarPolarArea } from "../Components/SolarWidgets/WidgetPolarArea/SolarPolarArea";
import { SolarPolarAreaAttempt2 } from "../Components/SolarWidgets/WidgetPolarArea/SolarPolarAreaAttempt2";

export const BillyTest = () => {
  const topcards = useMemo(
    () => [
      { type: "component", component: <AaronTest key={1} /> },
      { type: "component", component: <SolarBarChart key={1} /> },
      { type: "component", component: <SolarPolarAreaAttempt2 key={1} /> },
      {
        type: "regular",
        title: "Card 4",
        content:
          "Main issues: These charts on the top row are all templates from chart.js and have no significant data within them",
      },
      // Add more instances of topcards as needed
    ],
    []
  );

  const bottomcards = useMemo(
    () => [
      {
        type: "component",
        component: <SolarPolarArea key={2} />,
      },
      {
        type: "component",
        component: <SolarWidgetPie key={1} />,
      },
      {
        type: "regular",
        title: "Card 3",
        content:
          "MAIN ISSUES: These graphs of UNLV Solar on the bottom row is hard coded and is not using API from Jimmy. These elements are sharing a canvas for some reason so it cannot render both graphs at the same time",
      },
      // Add more cards as needed
    ],
    []
  );
  //top
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  //bottom
  const [currentbottomCardIndex, setCurrentbottomCardIndex] = useState(0);

  //top two quadrants
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentCardIndex((prevIndex) => (prevIndex + 1) % topcards.length);
    }, 12000); // Rotate every 12 seconds

    return () => clearInterval(intervalId);
  }, [topcards.length]);

  const topquadrants = useMemo(() => {
    return Array.from({ length: 2 }, (_, index) => {
      const cardIndex = (currentCardIndex + index) % topcards.length;
      return topcards[cardIndex];
    });
  }, [currentCardIndex, topcards]);
  //end top two quadrants

  //bottom two quadrants
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentbottomCardIndex(
        (prevIndex) => (prevIndex + 1) % bottomcards.length
      );
    }, 12000); // Rotate every 12 seconds

    return () => clearInterval(intervalId);
  }, [bottomcards.length]);

  const bottomquadrants = useMemo(() => {
    return Array.from({ length: 2 }, (_, index) => {
      const cardIndex = (currentbottomCardIndex + index) % bottomcards.length;
      return bottomcards[cardIndex];
    });
  }, [currentbottomCardIndex, bottomcards]);
  // end bottom two quadrants

  return (
    <div>
      <QuadrantContainer>
        {topquadrants.map((quadrant, index) => (
          <motion.div
            className="quadrant-card"
            key={index}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
          >
            {quadrant.type === "component" ? (
              quadrant.component // Render custom component
            ) : (
              <>
                <h2>{quadrant.title}</h2>
                <p>{quadrant.content}</p>
              </>
            )}
          </motion.div>
        ))}
        {bottomquadrants.map((quadrant, index) => (
          <motion.div
            className="quadrant-card"
            key={index}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
          >
            {quadrant.type === "component" ? (
              quadrant.component // Render custom component
            ) : (
              <>
                <h2>{quadrant.title}</h2>
                <p>{quadrant.content}</p>
              </>
            )}
          </motion.div>
        ))}
      </QuadrantContainer>
    </div>
  );
};

export default BillyTest;
