import { cloneElement } from "react";

export default function Interface({ htmlComponent, setShowDiv }) {
  return <> {cloneElement(htmlComponent, { setShowDiv })}</>;
}
