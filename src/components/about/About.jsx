import React from "react";
import { Flex, Heading } from "@radix-ui/themes";
import InfoBlock from "./components/InfoBlock";
import Contact from "./components/Contact";
import SpecialContact from "./components/SpecialContact";
import { basicData, jobExperience, work, flexGaps } from "../../Info";
import ImagePopup from "./components/ImagePopup";
import { WhiteText } from "../3d/3d-descriptions/components/WhiteText";

export default function About({ setShowDiv }) {
  return (
    <Flex gap="6" direction="column">
      <Heading color="white">Jerry Xia</Heading>
      <section>
        <Flex gap="1" direction="column">
          <WhiteText color="white">About</WhiteText>
          <WhiteText color="white">
            Hi! I'm a SWE student at McGill, passionate about games. Read about
            my journey with Hierarchical Task Networks in my latest blog!
          </WhiteText>
        </Flex>
      </section>
      <section>
        <Flex gap="4" direction="column">
          <div className="reel">
            <ImagePopup src="images/3d/webshooter/sample.png" />
            <ImagePopup src="images/3d/unmasked/sample.png" />
            <ImagePopup src="images/3d/mask/mask.png" />
            <ImagePopup src="images/3d/venom/head.png" />
          </div>
        </Flex>
      </section>
      <section>
        <Flex gap={flexGaps.sectionFlexGap} direction="column">
          <WhiteText>Work Experience</WhiteText>
          <InfoBlock
            leftText={jobExperience.unity.leftText}
            rightTitle={jobExperience.unity.rightTitle}
            rightSubtitle={jobExperience.unity.rightSubtitle}
            rightText={jobExperience.unity.rightText}
          />
          <InfoBlock
            leftText={jobExperience.gameloft.leftText}
            rightTitle={jobExperience.gameloft.rightTitle}
            rightSubtitle={jobExperience.gameloft.rightSubtitle}
            rightText={jobExperience.gameloft.rightText}
          />
        </Flex>
      </section>
      <section>
        <Flex gap={flexGaps.sectionFlexGap} direction="column">
          <WhiteText>Work</WhiteText>
          <InfoBlock
            leftText={work.lightspeed.leftText}
            rightTitle={work.lightspeed.rightTitle}
            rightText={work.lightspeed.rightText}
            isLink={true}
            href="https://jerrylxia.itch.io/lightspeed"
          />
          <InfoBlock
            leftText={work.blenderContest.leftText}
            rightTitle={work.blenderContest.rightTitle}
            rightText={work.blenderContest.rightText}
            isLink={true}
            href="https://www.youtube.com/watch?v=RK-2gIuRXNw"
          />
          <InfoBlock
            leftText={work.modeling.leftText}
            rightTitle={work.modeling.rightTitle}
            rightText={work.modeling.rightText}
            isLink={true}
            href="https://sketchfab.com/jerrylxia"
          />
        </Flex>
      </section>
      <section>
        <Flex
          gap={flexGaps.innerSectionFlexGap}
          align="start"
          direction="column"
        >
          <WhiteText>Technical Skills</WhiteText>
          <WhiteText color="white">{basicData.technicalSkills}</WhiteText>
        </Flex>
      </section>
      <section>
        <Flex
          gap={flexGaps.innerSectionFlexGap}
          align="start"
          direction="column"
        >
          <WhiteText>3D Tools I've used: </WhiteText>
          <Flex gap="4" align="start" direction="row">
            <img
              src="images/about/blender.png"
              style={{ width: "10%", objectFit: "contain" }}
              alt=""
              className="image-class-quick"
            />
            <img
              src="images/about/unity.png"
              style={{ width: "7.5%", objectFit: "contain" }}
              alt=""
              className="image-class-quick"
            />
            <img
              src="images/about/cascadeur.png"
              style={{ width: "8.5%", objectFit: "contain" }}
              alt=""
              className="image-class-quick"
            />
          </Flex>
        </Flex>
      </section>
      <section>
        <Contact />
      </section>
      <section>
        <SpecialContact />
      </section>
    </Flex>
  );
}
