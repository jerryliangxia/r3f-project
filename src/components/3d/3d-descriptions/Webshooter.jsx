import { WhiteText } from "./components/WhiteText";
import { ThreeD } from "../../../Info";
import Image from "./components/Image";

export default function Webshooter() {
  return (
    <>
      <Image src="images/3d/webshooter/0.png" />
      <WhiteText text={ThreeD.webshooterInit} />
      <Image src="images/3d/webshooter/rubber_mat.png" />
      <WhiteText text={ThreeD.webshooter} />
    </>
  );
}
