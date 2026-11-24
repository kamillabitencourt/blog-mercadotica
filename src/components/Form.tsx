import { useEffect } from "react";

interface WindowsWithRD extends Window {
  RDStationForms: (t: string, e: string) => void;
}

declare const window: WindowsWithRD;

export default function Form() {
  const id = "conversao-franqueado-fixo-em-blog-47c61ca8594602aaa67e";

  useEffect(() => {
    if (window.RDStationForms) {
      document.getElementById(id).innerHTML = "";

      new window.RDStationForms(id, "UA-193549846-1").createForm();
    }
  }, []);

  return <div role="main" id={id}></div>;
}
