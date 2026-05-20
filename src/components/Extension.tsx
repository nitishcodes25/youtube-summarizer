import { useEffect } from "react"
import { useExtension } from "@/context/extension-context"
import { Collapsible } from "./ui/collapsible"

const Extension = () => {
  const {
    setExtensionContainer,
    setExtensionIsOpen,
    setExtensionTheme,
    setExtensionLoading,
    setExtensionPanel,
    setExtensionVideoId,
    setExtensionData,
    extensionIsOpen,
    extensionTheme,
    extensionVideoId
  } = useExtension()

  useEffect(()=>{
    const getCssVariable = (name: string) => {
      const root = getComputedStyle(document.documentElement);
      return root.getPropertyValue(name).trim()
    }
    const backgroundColor = getCssVariable('--yt-sys-color-baseline--base-background');
    if(backgroundColor === "#fff"){
      setExtensionTheme("light")
    }
    else{
       setExtensionTheme("dark")
    }
  },[])

  
  return (
    <main className={`antialiased w-full mb-3 z-10`}>
      <div className="w-full">
        <Collapsible className="space-y-3">
        <h1 className="white">Extension Actions</h1>
        </Collapsible>
      </div>
    </main>
  )
}

export default Extension
