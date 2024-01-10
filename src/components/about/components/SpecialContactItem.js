import React from "react";
import { Flex, Link as RadixLink } from "@radix-ui/themes";
import { WhiteText } from "../../3d/3d-descriptions/components/WhiteText";

function SpecialContactItem({ href, src, title }) {
  return (
    <RadixLink
      target="_blank"
      rel="noopener noreferrer"
      href={href}
      size="2"
      style={{
        transition: "transform 0.3s ease-in-out",
      }}
      className="post-div"
    >
      <Flex gap="2" align="center" direction="row">
        <img src={src} style={{ width: "20%", objectFit: "contain" }} alt="" />
        <WhiteText>{title}</WhiteText>
      </Flex>
    </RadixLink>
  );
}

export default SpecialContactItem;
