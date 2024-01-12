import { WhiteText } from "../../general/WhiteText";
import { ThreeD } from "../../../Info";
import Image from "../../general/Image";

export default function Webshooter() {
  return (
    <>
      <Image src="images/3d/webshooter/0.png" />
      <WhiteText>{ThreeD.webshooterInit}</WhiteText>
      <Image src="images/3d/webshooter/rubber_mat.png" />
      <WhiteText>{ThreeD.webshooter}</WhiteText>
    </>
  );
}
