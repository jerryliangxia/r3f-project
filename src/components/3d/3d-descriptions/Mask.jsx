import { WhiteText } from "./WhiteText";
import { ThreeD } from "../../../Info";
import Image from "./Image";
import ImageRotation from "./ImageRotation";

export default function Mask() {
  return (
    <>
      <Image src="images/3d/mask/mask.png" />
      <WhiteText text={ThreeD.mask} />
      <Image src="images/3d/mask/mask_mat.png" />
      <WhiteText text={ThreeD.maskShaderEditor} />
    </>
  );
}
