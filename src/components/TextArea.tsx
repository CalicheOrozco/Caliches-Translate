import { SectionType } from "../types.d"

interface Props {
    loading?: boolean
    value: string
    type: SectionType
    onChange: (value: string) => void
}

const commonStyles = 'p-2 py-2 focus:outline-none rounded-t-md border-0 border-gray-300 h-[300px] w-full resize-none'

const getPlaceholder = ({ type, loading }: { type: SectionType, loading?: boolean }) => {
    if (type === SectionType.From) return 'Type text to translate'
    if (loading === true) return 'Loading...'
    return 'Translation'
  }

export const TextArea = ({loading, value, type, onChange}: Props) => {
    const styles = type === SectionType.From ? `${commonStyles} bg-white` 
    : `${commonStyles} bg-gray-200`

    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        onChange(event.target.value)
    }

    return (
    <form >
        <textarea 
        className={`${styles}`} 
        value={value} 
        placeholder={getPlaceholder({ type, loading })}
        autoFocus={type === SectionType.From}
        onChange={handleChange} 
        disabled={type === SectionType.To} />
        
    </form>
    )
}