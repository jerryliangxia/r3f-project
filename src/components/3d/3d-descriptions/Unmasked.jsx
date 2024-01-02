import { WhiteText } from "./WhiteText";
import { ThreeD } from "../../../Info";
import Image from "./Image";
import ImageRotation from "./ImageRotation";

export default function Webshooter() {
  return (
    <>
      <Image src="images/3d/unmasked/sample.png" />
      <WhiteText text={ThreeD.parkerHead} />
      <ImageRotation path="images/3d/unmasked/rotation/" mainImageIndex={1} />
      <WhiteText text={ThreeD.parkerHead2} />
    </>
  );
}
