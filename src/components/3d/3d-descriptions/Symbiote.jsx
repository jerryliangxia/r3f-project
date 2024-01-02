import { WhiteText } from "./WhiteText";
import { ThreeD } from "../../../Info";
import Image from "./Image";

export default function Symbiote() {
  return (
    <>
      <Image src="images/3d/symbiote/135.png" />
      <Image src="images/3d/symbiote/315.png" />
      <Image src="images/3d/symbiote/symbiote_mask.png" />
      <Image src="images/3d/symbiote/symbiote_mask_mat.png" />
      <WhiteText text={ThreeD.symbioteSuit} />
    </>
  );
}
