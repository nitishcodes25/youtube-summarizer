import React,{createContext, useContext, useState} from "react"

interface ExtensionState {
    extensionContainer: any
    extensionIsOpen: boolean
    extensionTheme: string | null
    extensionLoading: boolean
    extensionPanel: ExtensionPanel
    extensionVideoId: string
    extensionData: any
}

enum ExtensionPanel {
    Summary =  "Summary",
    Transcript = "Transcript",
    Chat = "Chat"
}

const initialState: ExtensionState = {
    extensionContainer: null,
    extensionIsOpen: false,
    extensionTheme: null,
    extensionLoading: false,
    extensionPanel: ExtensionPanel.Summary,
    extensionVideoId: "",
    extensionData: null
}

interface ExtensionActions {
    setExtensionContainer: (container: any) => void
    setExtensionIsOpen: (isOpen: boolean) => void
    setExtensionTheme: (theme: string | null) => void
    setExtensionLoading: (loading: boolean) => void
    setExtensionPanel: (panel: ExtensionPanel) => void
    setExtensionVideoId: (videoId: string) => void
    setExtensionData: (data: any) => void
    resetExtension: () => void
}

interface ExtensionContext extends ExtensionState, ExtensionActions {}

const ExtensionContext = createContext<ExtensionContext | undefined> (undefined)

export const useExtension = () => {
    const ctx = useContext(ExtensionContext);

    if(!ctx){
        throw new Error("useExtension must be used within ExtensionProvider")
    }

    return ctx;
}

interface ExtensionProviderProps {
    children: React.ReactNode
}

export const ExtensionProvider = ({children}:ExtensionProviderProps) =>{
    const [extensionContainer,setExtensionContainer] = useState<any>(initialState.extensionContainer)
    const [extensionIsOpen,setExtensionIsOpen] = useState<boolean>(initialState.extensionIsOpen);
    const [extensionTheme,setExtensionTheme] = useState<string | null>(initialState.extensionTheme)
    const [extensionLoading,setExtensionLoading] = useState<boolean>(initialState.extensionLoading);
    const [extensionPanel,setExtensionPanel] = useState<ExtensionPanel>(initialState.extensionPanel)
    const [extensionVideoId,setExtensionVideoId] = useState<string>(initialState.extensionVideoId);
    const [extensionData,setExtensionData] = useState<any>(initialState.extensionData)

    const resetExtension = () => {
        setExtensionContainer(initialState.extensionContainer)
        setExtensionIsOpen(initialState.extensionIsOpen)
        setExtensionTheme(initialState.extensionTheme)
        setExtensionLoading(initialState.extensionLoading)
        setExtensionPanel(initialState.extensionPanel)
        setExtensionVideoId(initialState.extensionVideoId)
        setExtensionData(initialState.extensionData)
    }

    const value = {
        extensionContainer,
        extensionIsOpen,
        extensionTheme,
        extensionLoading,
        extensionPanel,
        extensionVideoId,
        extensionData,
        setExtensionContainer,
        setExtensionIsOpen,
        setExtensionTheme,
        setExtensionLoading,
        setExtensionPanel,
        setExtensionVideoId,
        setExtensionData,
        resetExtension
    }

    return(
        <ExtensionContext.Provider value={value}>
            {children}
        </ExtensionContext.Provider>
    )
}