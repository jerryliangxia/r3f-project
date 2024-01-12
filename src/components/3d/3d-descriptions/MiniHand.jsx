import { WhiteText } from "../../general/WhiteText";
import { ThreeD } from "../../../Info";
import Image from "../../general/Image";

export default function MiniHand() {
  return (
    <>
      <Image src="images/3d/hand/hand.png" />
      <WhiteText>{ThreeD.hand}</WhiteText>
    </>
  );
}
