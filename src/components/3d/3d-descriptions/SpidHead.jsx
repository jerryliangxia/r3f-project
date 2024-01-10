import { WhiteText } from "./components/WhiteText";
import { ThreeD } from "../../../Info";
import Image from "./components/Image";

export default function SpidHead() {
  return (
    <>
      <Image src="images/3d/mask/mask.png" />
      <WhiteText>{ThreeD.mask}</WhiteText>
      <Image src="images/3d/mask/mask_mat.png" />
      <WhiteText>{ThreeD.maskShaderEditor}</WhiteText>
    </>
  );
}
