import { WhiteText } from "./WhiteText";
import { ThreeD } from "../../../Info";
import Image from "./Image";

export default function Unmasked() {
  return (
    <>
      <Image src="images/3d/unmasked/sample.png" />
      <WhiteText text={ThreeD.parkerHead} />
      <Image src="images/3d/unmasked/onbody.png" />
      <Image src="images/3d/unmasked/315.png" />
      <WhiteText text={ThreeD.parkerHead2} />
    </>
  );
}
