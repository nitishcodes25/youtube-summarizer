import type { PlasmoCSConfig, PlasmoGetInlineAnchor, PlasmoGetShadowHostId } from "plasmo"
import Extension from "@/components/Extension"
import cssText from "data-text:~/style.css"
import { Providers } from "@/context/provider"

const INJECTED_ELEMENT_ID = "#secondary.style-scope.ytd-watch-flexy"

export const getStyle = () => {
  const baseSize = 12;
  let updatedCssText = cssText.replaceAll(":root", ":host(plasmo-csui)")
  const remRegex = /([\d.]+)rem/g;
  updatedCssText = updatedCssText.replace(remRegex,(_,remValue)=>{
    let pixels = parseFloat(remValue) * baseSize;
    return `${pixels}px`;
  })
  const style = document.createElement('style');
  style.textContent = updatedCssText;
  return style
}

export const config: PlasmoCSConfig = {
  matches: ["https://www.youtube.com/*"]
}

export const getInlineAnchor: PlasmoGetInlineAnchor = async () => ({
      element: document.querySelector(INJECTED_ELEMENT_ID),
      insertPosition: "afterbegin"
})

export const getShadowHostId: PlasmoGetShadowHostId = () => "plasmo-inline"

const PlasmoMainUI = () => {
  return(
    <Providers>
      <Extension/>
    </Providers>
  )
}

export default PlasmoMainUI