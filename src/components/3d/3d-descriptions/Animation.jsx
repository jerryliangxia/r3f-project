import { WhiteText } from "./WhiteText";
import { ThreeD } from "../../../Info";
import Image from "./Image";

export default function Animation() {
  return (
    <>
      <Image src="images/3d/animation/0.gif" />
      <WhiteText text={ThreeD.animation} />
    </>
  );
}
