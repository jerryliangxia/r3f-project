import { WhiteText } from "./components/WhiteText";
import { ThreeD } from "../../../Info";
import Image from "./components/Image";

export default function PizzaTime() {
  return (
    <>
      <Image src="images/3d/unmasked/sample.png" />
      <WhiteText text={ThreeD.parkerHead} />
      <Image src="images/3d/unmasked/onbody.png" />
      <WhiteText text={ThreeD.parkerHead2} />
    </>
  );
}
