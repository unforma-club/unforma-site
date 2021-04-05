import { createContext, FC, useContext } from "react";
import { ProviderTheme } from "@pulipola/ui";
import { useScrollDirection } from "lib/hooks";

type ContextAppProps = {
    isScroll: boolean;
};

const init: ContextAppProps = {
    isScroll: false,
};

const ContextApp = createContext<ContextAppProps>(init);
export const useApp = () => useContext(ContextApp);

export const ProviderApp: FC = ({ children }) => {
    const { scrollCount } = useScrollDirection({
        init: "no",
        treshold: 40,
    });
    const tresholds = 40;
    const isScroll = scrollCount >= tresholds;
    return (
        <ContextApp.Provider value={{ isScroll }}>
            <ProviderTheme disableTransitionOnChange={true}>
                {children}
            </ProviderTheme>
        </ContextApp.Provider>
    );
};
