import { WhiteText } from "./WhiteText";
import { ThreeD } from "../../../Info";
import Image from "./Image";
import ImageRotation from "./ImageRotation";

export default function Webshooter() {
  return (
    <>
      <ImageRotation path="images/3d/webshooter/rotation/" />
      <WhiteText text={ThreeD.webshooterInit} />
      <Image src="images/3d/webshooter/rubber_mat.png" />
      <WhiteText text={ThreeD.webshooter} />
    </>
  );
}
