import { useState, useEffect, useCallback } from 'react';

interface SearchBarProps {
    value: string;
    onChange: (value: string) => void;
    disabled?: boolean;
}

export default function SearchBar({ value, onChange, disabled }: SearchBarProps) {
    const [localValue, setLocalValue] = useState(value);

    // Sync external changes
    useEffect(() => {
        setLocalValue(value);
    }, [value]);

    // Debounced callback
    const debouncedOnChange = useCallback(
        (() => {
            let timer: ReturnType<typeof setTimeout>;
            return (val: string) => {
                clearTimeout(timer);
                timer = setTimeout(() => onChange(val), 300);
            };
        })(),
        [onChange]
    );

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const sanitized = e.target.value.replace(/[<>{}]/g, '');
        setLocalValue(sanitized);
        debouncedOnChange(sanitized);
    };

    const handleClear = () => {
        setLocalValue('');
        onChange('');
    };

    return (
        <div className="relative flex-1 max-w-md">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                <svg className="w-4.5 h-4.5 text-surface-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
            </div>
            <input
                id="campaign-search"
                type="text"
                value={localValue}
                onChange={handleChange}
                disabled={disabled}
                placeholder="Search campaigns by title or tags..."
                className="w-full pl-10 pr-10 py-2.5 bg-white border border-surface-200 rounded-xl text-sm text-surface-900 placeholder-surface-400 
          focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-400 
          disabled:opacity-50 disabled:cursor-not-allowed
          transition-all duration-200 shadow-sm hover:shadow-md"
                aria-label="Search campaigns"
            />
            {localValue && (
                <button
                    onClick={handleClear}
                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-surface-400 hover:text-surface-600 transition-colors"
                    aria-label="Clear search"
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            )}
        </div>
    );
}
