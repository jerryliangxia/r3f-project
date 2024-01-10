import { WhiteText } from "./components/WhiteText";
import { ThreeD } from "../../../Info";
import Image from "./components/Image";

export default function MiniSpid() {
  return (
    <>
      <Image src="images/3d/advanced-suit/315.png" />
      <WhiteText>{ThreeD.fullSuit}</WhiteText>
      <Image src="images/3d/advanced-suit/135.png" />
      <Image src="images/3d/advanced-suit/dual_180.png" />
      <WhiteText>{ThreeD.fullSuit2}</WhiteText>
      <Image src="images/3d/advanced-suit/315_v1.png" />
      <Image src="images/3d/advanced-suit/spiderman_low_poly_scope.png" />
    </>
  );
}
