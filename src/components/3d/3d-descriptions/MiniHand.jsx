import { WhiteText } from "./components/WhiteText";
import { ThreeD } from "../../../Info";
import Image from "./components/Image";

export default function MiniHand() {
  return (
    <>
      <Image src="images/3d/hand/hand.png" />
      <WhiteText>{ThreeD.hand}</WhiteText>
    </>
  );
}
