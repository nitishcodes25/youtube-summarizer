import { ExtensionProvider } from "./extension-context"

export const Providers = ({children}) => {
    return(
        <ExtensionProvider>
            {children}
        </ExtensionProvider>
    )
}