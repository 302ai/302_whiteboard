import { useSetAtom } from "jotai";
import React from "react";
import { useI18n, languages } from "../../packages/excalidraw/i18n";
import { appLangCodeAtom } from "./language-state";

export const LanguageList = ({ style }: { style?: React.CSSProperties }) => {
  const { t, langCode } = useI18n();
  const setLangCode = useSetAtom(appLangCodeAtom);

  return (
    <select
      className="dropdown-select dropdown-select__language"
      onChange={async ({ target }) => {
        await setLangCode(target.value)
      }}
      value={langCode}
      aria-label={t("buttons.selectLanguage")}
      style={style}
    >
      {languages.map((lang) => (
        <option key={lang.code} value={lang.code}>
          {lang.label}
        </option>
      ))}
    </select>
  );
};
