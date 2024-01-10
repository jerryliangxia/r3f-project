import React, { useState } from "react";
import { Flex, Link as RadixLink } from "@radix-ui/themes";
import { WhiteText } from "../../3d/3d-descriptions/components/WhiteText";

function InfoBlock({
  leftText,
  rightTitle,
  rightSubtitle,
  rightText,
  isLink = false,
  href = "",
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <>
      <Flex gap="3" direction="row">
        <WhiteText color="#888888" size="2" style={{ width: "30%" }}>
          {leftText}
        </WhiteText>
        <Flex gap="3" direction="column" style={{ width: "70%" }}>
          <Flex gap="1" direction="column">
            {isLink ? (
              <RadixLink href={href} target="_blank" rel="noopener noreferrer">
                <Flex gap="1" direction="row" align="center">
                  <WhiteText
                    as="p"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                  >
                    {rightTitle}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      width="16"
                      height="16"
                      style={{
                        marginLeft: "1px",
                        transition: "transform 0.3s ease-in-out", // Add transition here
                        position: "relative", // Add position here
                        top: "0px", // Adjust vertical position here
                        transform: isHovered ? "translateX(3px)" : "none",
                      }}
                      className="arrow-icon"
                    >
                      <path
                        d="M16.0037 9.41421L7.39712 18.0208L5.98291 16.6066L14.5895 8H7.00373V6H18.0037V17H16.0037V9.41421Z"
                        fill="rgba(255,255,255,1)"
                      ></path>
                    </svg>
                  </WhiteText>
                </Flex>
              </RadixLink>
            ) : (
              <WhiteText as="p">{rightTitle}</WhiteText>
            )}
            <WhiteText as="p" color="gray">
              {rightSubtitle}
            </WhiteText>
          </Flex>
          <WhiteText as="p" color="gray">
            {rightText}
          </WhiteText>
        </Flex>
      </Flex>
    </>
  );
}

export default InfoBlock;
