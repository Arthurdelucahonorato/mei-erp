import { useState } from "react"

type ComboBoxProps = {
    currentValue: string;
    values: { value: string, name: string }[];
    label?: string;
    htmlFor?: string;
    errorMessage?: string;
    required?: boolean;
}



export default function ComboBox({ currentValue, values, htmlFor, label, errorMessage, required, ...props }: ComboBoxProps) {
    const [isOpen, setIsOpen] = useState(false)
    const [selectedValue, setSelectedValue] = useState({ value: "", name: "" })

    const toogleDropdown = () => {
        setTimeout(() => {
            setIsOpen(false)
        }, 100)
    }
    return (

        <div className="flex">
            <div className="flex flex-col w-full gap-2" onBlur={() => toogleDropdown()} >
                <div className="flex flex-row">
                    <label
                        htmlFor={htmlFor}
                        className="block text-gray-700 dark:text-white text-sm font-semibold truncate"
                    >
                        {label}
                    </label>
                    {required && (
                        <p className="text-red-500 text-sm font-semibold pl-1">{"*"}</p>
                    )}
                </div>
                <button onClick={() => setIsOpen(!isOpen)} className="flex flex-row justify-between text-gray-700 dark:text-white bg-gray-200 dark:bg-gray-700 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 items-center " type="button">
                    {selectedValue.name != "" ? selectedValue.name : (<div className="text-gray-400">Seleciona um valor</div>)}
                    <svg className="w-2.5 h-2.5 ml-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4" />
                    </svg>
                </button>

                <div className={`w-full z-100 ${isOpen ? "block" : "hidden"} bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-800`}>
                    <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
                        {values.map((value) => (
                            <li key={value.value} onClick={() => setSelectedValue(value)}>
                                <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">{value.name}</a>
                            </li>
                        ))}
                    </ul>
                </div>
                {errorMessage && (
                    <p className="text-red-500 text-xs font-semibold">{errorMessage}</p>
                )}
            </div>
        </div>

    )
}