import { WhiteText } from "./components/WhiteText";
import { ThreeD } from "../../../Info";
import Image from "./components/Image";

export default function PizzaTime() {
  return (
    <>
      <Image src="images/3d/unmasked/sample.png" />
      <WhiteText>{ThreeD.parkerHead}</WhiteText>
      <Image src="images/3d/unmasked/onbody.png" />
      <WhiteText>{ThreeD.parkerHead2}</WhiteText>
    </>
  );
}
