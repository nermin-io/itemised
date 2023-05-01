import React, { useState, useEffect } from "react";
import SettingsContext, {
  defaultSettings,
  type Settings,
} from "@/context/settings";
import { formatISO } from "date-fns";
import { get } from "lodash";

interface Props {
  children: React.ReactNode | React.ReactNode[];
}

const deserializer = (key: string, value: any) => {
  const dateKeys = ["date"];
  if (dateKeys.includes(key)) {
    return new Date(value);
  }

  return value;
};

const serializer = (key: string, value: any) => {
  const dateKeys = ["date"];
  if (dateKeys.includes(key) && value instanceof Date) {
    return formatISO(value);
  }

  return value;
};

const getInitialState = () => {
  if (typeof window === "undefined") return defaultSettings;

  const settings = localStorage.getItem("settings");
  return settings
    ? (JSON.parse(settings, deserializer) as Settings)
    : defaultSettings;
};

const SettingsProvider: React.FC<Props> = ({ children }) => {
  const [settings, setSettings] = useState(getInitialState);
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    setShouldRender(true);
  }, []);

  useEffect(() => {
    localStorage.setItem("settings", JSON.stringify(settings, serializer));
  }, [settings]);

  const setSetting = (key: keyof Settings, value: Settings[keyof Settings]) => {
    const newSettings = {
      ...settings,
      [key]: value,
    };

    setSettings(newSettings);
  };

  const context = {
    settings,
    setSetting,
  };

  return (
    <SettingsContext.Provider value={context}>
      {shouldRender && children}
    </SettingsContext.Provider>
  );
};

export default SettingsProvider;
