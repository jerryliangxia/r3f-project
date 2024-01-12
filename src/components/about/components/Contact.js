import React from "react";
import { Flex, Link as RadixLink } from "@radix-ui/themes";
import { WhiteText } from "../../general/WhiteText";

function ContactInfo({ site, username, href }) {
  return (
    <Flex gap="3" direction="row">
      <WhiteText color="gray" style={{ width: "30%" }}>
        {site}
      </WhiteText>
      <WhiteText color="white" style={{ width: "70%" }}>
        <RadixLink>
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: "#fff",
              textDecoration: "none",
              marginTop: 0,
              marginBottom: 0,
            }}
          >
            {username}
          </a>
        </RadixLink>
      </WhiteText>
    </Flex>
  );
}
function Contact() {
  return (
    <Flex gap="4" direction="column">
      <WhiteText as="p">Contact</WhiteText>
      <ContactInfo
        site="GitHub"
        username="jerryliangxia"
        href="https://github.com/jerryliangxia"
      />
      <ContactInfo
        site="Email"
        username="jerrylxia@gmail.com"
        href="mailto:jerrylxia@gmail.com"
      />
      <ContactInfo
        site="Twitter"
        username="jerrylxia"
        href="https://twitter.com/jerrylxia"
      />
      <ContactInfo
        site="LinkedIn"
        username="Jerry Xia"
        href="https://www.linkedin.com/in/jerry-xia-901783178/"
      />
    </Flex>
  );
}

export default Contact;
