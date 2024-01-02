import { WhiteText } from "./WhiteText";
import { ThreeD } from "../../../Info";
import Image from "./Image";

export default function Mask() {
  return (
    <>
      <Image src="images/3d/hand/hand.png" />
      <WhiteText text={ThreeD.hand} />
    </>
  );
}
