import React from "react";
import "./LanguageSelector.css";

interface LanguageSelectorProps {
  selectedLanguage: string;
  onLanguageChange: (language: string) => void;
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  selectedLanguage,
  onLanguageChange,
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onLanguageChange(event.target.value);
  };

  return (
    <div className="language-selector">
      <label htmlFor="language">Choose a language for audio description:</label>
      <select id="language" value={selectedLanguage} onChange={handleChange}>
        <option value="Greek">Greek</option>
        <option value="English">English</option>
        <option value="French">French</option>
        <option value="German">German</option>
        <option value="Spanish">Spanish</option>
      </select>
    </div>
  );
};

export default LanguageSelector;
