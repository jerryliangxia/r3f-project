import { WhiteText } from "../../general/WhiteText";
import { ThreeD } from "../../../Info";
import Image from "../../general/Image";

export default function SymbHead() {
  return (
    <>
      <Image src="images/3d/symbiote/symbiote_mask.png" />
      <WhiteText>{ThreeD.symbiote}</WhiteText>
      <Image src="images/3d/symbiote/symbiote_mask_mat.png" />
      <WhiteText>{ThreeD.symbioteShaderEditor}</WhiteText>
    </>
  );
}
