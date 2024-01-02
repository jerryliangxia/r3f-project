import { WhiteText } from "./WhiteText";
import { ThreeD } from "../../../Info";
import Image from "./Image";

export default function AdvancedSuit() {
  return (
    <>
      <Image src="images/3d/advanced-suit/315.png" />
      <WhiteText text={ThreeD.fullSuit} />
      <Image src="images/3d/advanced-suit/135.png" />
      <WhiteText text={ThreeD.fullSuit2} />
      <Image src="images/3d/advanced-suit/315_v1.png" />
      <Image src="images/3d/advanced-suit/spiderman_low_poly_scope.png" />
    </>
  );
}
