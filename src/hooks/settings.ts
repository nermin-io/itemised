import { useContext } from "react";
import SettingsContext from "@/context/settings";

const useSettings = () => {
  const context = useContext(SettingsContext);
  const hasContextProperties = Object.keys(context).length > 0;

  if (context === undefined || !hasContextProperties)
    throw new Error("Cannot use useSettings() outside of SettingsProvider");

  return context;
};

export default useSettings;
