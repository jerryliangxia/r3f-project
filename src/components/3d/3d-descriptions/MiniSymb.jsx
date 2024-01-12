import { WhiteText } from "../../general/WhiteText";
import { ThreeD } from "../../../Info";
import Image from "../../general/Image";

export default function Symbiote() {
  return (
    <>
      <Image src="images/3d/symbiote/135.png" />
      <Image src="images/3d/symbiote/315.png" />
      <WhiteText>{ThreeD.symbioteSuit}</WhiteText>
    </>
  );
}
