import React from "react";

const voidFn = () => {};

export interface Settings {
  showCompleted: boolean;
  newUser: boolean;
}

export interface SettingsContext {
  settings: Settings;
  setSetting: (key: keyof Settings, value: any) => void;
}

export const defaultSettings: Settings = {
  showCompleted: false,
  newUser: true,
};

const defaultContextVal: SettingsContext = {
  settings: defaultSettings,
  setSetting: voidFn,
};

const SettingsContext = React.createContext<SettingsContext>(defaultContextVal);

export default SettingsContext;
