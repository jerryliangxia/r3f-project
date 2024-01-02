import { WhiteText } from "./WhiteText";
import { ThreeD } from "../../../Info";
import Image from "./Image";
import ImageRotation from "./ImageRotation";

export default function Venom() {
  return (
    <>
      <ImageRotation path="images/3d/venom/rotation/" />
      <WhiteText text={ThreeD.venom} />
      <Image src="images/3d/venom/venom_low_poly_scope.png" />
      <Image src="images/3d/venom/dual_180.png" />
    </>
  );
}
