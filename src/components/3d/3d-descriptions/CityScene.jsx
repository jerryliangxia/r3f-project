import { WhiteText } from "./components/WhiteText";
import { ThreeD } from "../../../Info";
import Image from "./components/Image";

export default function CityScene() {
  return (
    <>
      <Image src="images/3d/animation/0.gif" />
      <WhiteText>{ThreeD.animation}</WhiteText>
    </>
  );
}
