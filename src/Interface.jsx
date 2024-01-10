import { cloneElement } from "react";
import { Flex } from "@radix-ui/themes";
import { motion } from "framer-motion";

export default function Interface({ htmlComponent, setShowDiv }) {
  const isMobile = window.innerWidth <= 768;

  return (
    <div
      className="example"
      style={{
        display: "flex",
        justifyContent: "center",
        position: "absolute",
        top: "10vh",
        left: "10vw",
        width: "80vw",
        height: "80vh",
        overflow: "auto",
        backgroundColor: setShowDiv ? "rgba(0, 0, 0, 0.8)" : "rgba(0, 0, 0, 0)",
        pointerEvents: setShowDiv ? "" : "none",
      }}
    >
      <div
        style={{
          width: "70%",
          marginTop: "5vh",
          marginBottom: isMobile ? "15vh" : "5vh",
        }}
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <Flex gap="6" direction="column" align="left">
            {cloneElement(htmlComponent, { setShowDiv })}
            <div
              style={{
                marginBottom: isMobile ? "10vh" : "0vh",
              }}
            ></div>
          </Flex>
        </motion.div>
      </div>
    </div>
  );
}
