import { SUPPORTED_LANGUAGES } from "../constants";
import { type FromLanguage, type Language, SectionType } from "../types.d";




type Props = 
| { type: SectionType.From; onChange: (language: FromLanguage) => void; value: FromLanguage }
| { type: SectionType.To; onChange: (language: Language) => void; value: Language };

export const LanguageSelector = ({ onChange, type, value }: Props) => {
    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        onChange(event.target.value as Language);
    };

    return (
        <select onChange={handleChange} className="mx-3 py-2 outline-none border-none bg-transparent font-semibold" value={value}>
            {type === SectionType.From && <option value="auto">Detect Language</option>}
            {Object.entries(SUPPORTED_LANGUAGES).map(([key, literal]) => (
                <option key={key} value={key}>
                    {literal}
                </option>
            ))}
        </select>
    );
};