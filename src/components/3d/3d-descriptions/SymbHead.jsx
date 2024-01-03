import { WhiteText } from "./WhiteText";
import { ThreeD } from "../../../Info";
import Image from "./Image";

export default function SymbHead() {
  return (
    <>
      <Image src="images/3d/symbiote/symbiote_mask.png" />
      <WhiteText text={ThreeD.symbiote} />
      <Image src="images/3d/symbiote/symbiote_mask_mat.png" />
      <WhiteText text={ThreeD.symbioteShaderEditor} />
    </>
  );
}
