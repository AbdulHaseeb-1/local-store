import { Input } from '@/components/ui/input'
import { useProductForm } from '@/Context/ProductForm';
import AttributeValidator from '@/Validators/AttributeFormValidator';
import React, { ChangeEvent, useState } from 'react'

export default function AddAttributeForm() {

    const { error, setError, setAttributes } = useProductForm() as any;
    const [attribute, setAttribute] = useState({ attributeName: "", attributeValue: "" })

    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        setError({ path: "", message: "" })
        const { name, value } = e.target;
        setAttribute((prev: any) => ({ ...prev, [name]: value }))
    }

    function handleSubmit(e: any) {
        setError({ path: "", message: "" })
        const { error } = AttributeValidator.validate(attribute);
        if (error) {
            setError({ path: error.details[0].path, message: error.message })
            return;
        }
        setAttributes((prev: any) => ([...prev, attribute]))
        setAttribute({ attributeName: "", attributeValue: "" })
    }


    return (
        <div>
            <div className="flex gap-2">
                <div>
                    <Input onChange={handleChange} value={attribute.attributeName} type="text" placeholder="Attribute Name" name="attributeName" />
                    {error && error.path[0] === "attributeName" && (
                        <span className="text-xs text-red-400">
                            {error.message}
                        </span>
                    )}
                </div>
                <div>
                    <Input onChange={handleChange} value={attribute.attributeValue} type="text" placeholder="Attribute Value" name="attributeValue" />
                    {error && error.path[0] === "attributeValue" && (
                        <span className="text-xs text-red-400">
                            {error.message}
                        </span>
                    )}
                </div>
                <span onClick={handleSubmit} className="h-8 gap-1 bg-primary-gradient border font-semibold cursor-pointer rounded-lg bg-primary text-primary-foreground text-xs flex items-center justify-center px-3 "> Add </span>
            </div>
        </div>
    )
}
