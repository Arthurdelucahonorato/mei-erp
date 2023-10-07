import { Fragment, useState } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { BsCheck, BsChevronDown } from 'react-icons/bs'

type ComboBoxProps = {
    currentValue: string;
    values: { value: string, name: string }[];
    label?: string;
    htmlFor?: string;
    errorMessage?: string;
    required?: boolean;
    className?: string;
}


export default function ComboBox({ currentValue, values, htmlFor, label, errorMessage, required, className, ...props }: ComboBoxProps) {
    const [selected, setSelected] = useState(values[0])
    //Precisa ajustar para nao utilizar o useState aqui,e sim passando do pedido pra ca
    return (
        <div className={`flex flex-1 flex-col gap-1 ${className}`}>
            <div className="flex flex-row">
                <label
                    htmlFor={htmlFor}
                    className="block text-gray-700 dark:text-white text-sm font-semibold truncate">
                    {label}
                </label>
                {required && (
                    <p className="text-red-500 text-sm font-semibold pl-1">{"*"}</p>
                )}
            </div>
            <div className="">
                <Listbox value={selected} onChange={setSelected}>
                    <div className="relative mt-1">
                        <Listbox.Button className="relative w-full cursor-default pl-3 pr-10 text-left text-gray-700 dark:text-white bg-gray-200 dark:bg-gray-700 focus:outline-none font-medium rounded text-sm px-5 py-2.5 items-center">
                            <span className="block truncate">{selected.name}</span>
                            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                <BsChevronDown
                                    className="h-4 w-4 text-gray-400"
                                    aria-hidden="true"
                                />
                            </span>
                        </Listbox.Button>
                        <Transition
                            as={Fragment}
                            leave="transition ease-in duration-100"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white dark:bg-gray-600 py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                {values.map((person, personIdx) => (
                                    <Listbox.Option
                                        key={personIdx}
                                        className={({ active }) =>
                                            `relative cursor-default select-none py-2 pl-10 pr-4 text-gray-700 dark:text-white ${active ? 'bg-primary-fifth-tone dark:bg-secondary-third-tone ' : 'text-gray-900'
                                            }`
                                        }
                                        value={person}
                                    >
                                        {({ selected }) => (
                                            <>
                                                <span
                                                    className={`block truncate ${selected ? 'font-medium' : 'font-normal'
                                                        }`}
                                                >
                                                    {person.name}
                                                </span>
                                                {selected ? (
                                                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-primary dark:text-secondary">
                                                        <BsCheck className="h-5 w-5" aria-hidden="true" />
                                                    </span>
                                                ) : null}
                                            </>
                                        )}
                                    </Listbox.Option>
                                ))}
                            </Listbox.Options>
                        </Transition>
                    </div>
                </Listbox>
            </div>
            {errorMessage && (
                <p className="text-red-500 text-xs font-semibold">{errorMessage}</p>
            )}
        </div>
    )
}
