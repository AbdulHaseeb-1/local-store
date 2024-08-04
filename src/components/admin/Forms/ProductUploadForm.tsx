"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
    SelectValue,
    SelectTrigger,
    SelectItem,
    SelectContent,
    Select,
} from "@/components/ui/select";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ChangeEvent, Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import ProductValidator from "@/Validators/productForm";
import { clsx } from "clsx";
import axios from "@/lib/axios";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { useProductForm } from "@/Context/ProductForm";
import AddAttributeForm from "./components/addAttributeForm";
import { MdClose } from "react-icons/md";
import { FiDelete } from "react-icons/fi";
import { BiTrash } from "react-icons/bi";


export default function ProductUploadForm() {
    // ? ---------------- States ----------------------------
    const [categories, setCategories]: any = useState([]);
    const [success, setSuccess]: any = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    // ? ---------------- Context --------------------- 
    const { formData, setFormData, attributes, setAttributes, initialStates, error, setError } = useProductForm() as any;


    // ? ---------------- Refs ----------------------------
    const formRef = useRef<HTMLFormElement>(null);
    const buttonRef: any = useRef(null);

    // ! ---------------- Effects ----------------------------

    // ? fetching initial form data (category and size) ----------------------------
    useEffect(() => {
        async function getData() {
            const response = await axios.get(
                "http://localhost:3000/api/products/product-form-data"
            );
            if (response.data.status === 200) {
                setCategories(JSON.parse(response.data.categories));
            } else {
                setError({
                    path: "server",
                    message: "Something went wrong in fetching data",
                });
                buttonRef.current.disabled = true;
            }
        }
        getData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // ? ---------------- Resetting form ----------------------------
    useEffect(() => {
        if (success) {
            formRef?.current?.reset();
        }
    }, [success]);

    // ? ---------------- Handling Changes in form ----------------------------

    function handleChange(e: any) {
        setError({ path: "", message: "" });
        const { name, value, type } = e.target;

        if (type === "file") {
            let file = e.target.files[0];
            setFormData((prevState: any) => ({
                ...prevState,
                [name]: file,
            }));
        } else {
            setFormData((prevState: any) => ({
                ...prevState,
                [name]: value,
            }));
        }
    }

    // ? --------- Handling Submission -----------
    async function HandleSubmit(e: any) {
        e.preventDefault();

        setIsSubmitting(true);
        setSuccess(false);
        setError({
            path: "",
            message: "",
        });

        const { error: err } = ProductValidator.validate(formData);

        if (err) {
            setError({
                path: err.details[0].path,
                message: err.details[0].message,
            });
            setIsSubmitting(false);
            console.log(err);
            return;

        }
        if (
            !(
                formData.image1 ||
                formData.image2 ||
                formData.image3 ||
                formData.image4
            )
        ) {
            setError({
                path: "image",
                message: "One Image is Required",
            });
            setIsSubmitting(false);
            return;
        }

        try {
            const form: any = new FormData();
            // Append all form fields to the FormData object
            Object.entries(formData).forEach(([key, value]) => {
                form.append(key, value);
            });

            if (attributes.length > 0) {
                form.append("attributes", JSON.stringify(attributes));
            }


            const response = await axios.post(
                "http://localhost:3000/api/products/product-form-data",
                form
            );

            if (response.status === 201) {
                setSuccess(true);
                setFormData(initialStates);
                setIsSubmitting(false);
                setAttributes([])
            } else {
                setError({
                    path: "server",
                    message: "Something Went Wrong",
                });
                setIsSubmitting(false);
                return;
            }
        } catch (error) {
            setError({
                path: "server",
                message: "Something Went Wrong",
            });
            setIsSubmitting(false);
            return;
        }
    }


    function handleRemoveAttribute(name: any): void {
        setAttributes((attributes: any) => {
            return attributes.filter((attribute: any) => attribute.attributeName !== name);
        });
    }


    return (
        <div className="min-h-screen border rounded-md">
            <div className="grid ">
                {/* // * --------------------  */}
                <div className="p-5 lg:p-10">
                    <div className="flex justify-between items-center mb-6">
                        <h1 className="text-2xl font-bold">New Product</h1>
                    </div>

                    <div className="my-4">
                        {error && error.path === "server" && (
                            <Alert className="bg-red-500 bg-opacity-40">
                                <AlertTitle>Error</AlertTitle>
                                <AlertDescription>{error.message}</AlertDescription>
                            </Alert>
                        )}
                        {success && (
                            <Alert className="bg-green-500 bg-opacity-40">
                                <AlertTitle>Success</AlertTitle>
                                <AlertDescription>{"Uploaded Successfully"}</AlertDescription>
                            </Alert>
                        )}
                    </div>
                    <form
                        onSubmit={HandleSubmit}
                        ref={formRef}
                        encType="multipart/form-data"
                    >
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-y-6 lg:gap-6 ">
                            <div className="col-span-2 rounded-lg  space-y-2 ">

                                <div className="space-y-2">
                                    <div className="flex flex-col space-y-1">
                                        <label
                                            htmlFor="productName"
                                            className={clsx("font-medium", {
                                                "text-red-400": error && error.path[0] === "title",
                                            })}
                                        >
                                            Product Title
                                        </label>
                                        <Input
                                            onChange={handleChange}
                                            id="productName"
                                            placeholder="High quality Leather Jackets ..."
                                            name="title"
                                            className={clsx("", {
                                                "border border-red-400":
                                                    error && error.path[0] === "title",
                                            })}
                                        />
                                        {error && error.path[0] === "title" && (
                                            <span className="text-xs text-red-400">
                                                {error.message}
                                            </span>
                                        )}
                                    </div>
                                    <div className="flex flex-col space-y-1">
                                        <label
                                            htmlFor="businessDescription"
                                            className={clsx("font-medium", {
                                                "text-red-400":
                                                    error && error.path[0] === "description",
                                            })}
                                        >
                                            Product Description
                                        </label>
                                        <Textarea
                                            onChange={handleChange}
                                            id="businessDescription"
                                            placeholder="We have been doing jacket business for many years together with our partners s..."
                                            name="description"
                                            className={clsx("", {
                                                "border border-red-400":
                                                    error && error.path[0] === "description",
                                            })}
                                        />
                                        {error && error.path[0] === "description" && (
                                            <span className="text-xs text-red-400">
                                                {error.message}
                                            </span>
                                        )}
                                    </div>
                                </div>

                                <div className="space-y-2">




                                    <div className="grid grid-cols-2 ">
                                        <div className="flex flex-col space-y-1">
                                            <label
                                                htmlFor="price"
                                                className={clsx("font-medium", {
                                                    "text-red-400": error && error.path[0] === "price",
                                                })}
                                            >
                                                Price
                                            </label>
                                            <Input
                                                type="number"
                                                placeholder="Price of Product"
                                                name="price"
                                                onChange={handleChange}
                                                className={clsx("", {
                                                    "border border-red-400":
                                                        error && error.path[0] === "price",
                                                })}
                                            />
                                            {error && error.path[0] === "price" && (
                                                <span className="text-xs text-red-400">
                                                    {error.message}
                                                </span>
                                            )}
                                        </div>
                                        <div className="flex flex-col space-y-1">
                                            <label
                                                htmlFor="stock"
                                                className={clsx("font-medium", {
                                                    "text-red-400": error && error.path[0] === "stock",
                                                })}
                                            >
                                                In Stock
                                            </label>
                                            <Input
                                                type="number"
                                                placeholder="Stock of Product"
                                                name="stock"
                                                onChange={handleChange}
                                                className={clsx("", {
                                                    "border border-red-400":
                                                        error && error.path[0] === "stock",
                                                })}
                                            />
                                            {error && error.path[0] === "stock" && (
                                                <span className="text-xs text-red-400">
                                                    {error.message}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <br />
                                <Separator className="h-1" />
                                <div className="flex flex-wrap gap-2 justify-between py-4 items-center">
                                    <div>
                                        <Label className="text-2xl">Attributes</Label>
                                        <p className="text-xs dark:text-neutral-400 text-neutral-500">Attribute define specification of the product</p>
                                    </div>
                                    <AddAttributeForm />
                                </div>


                                <div className="grid md:grid-cols-2 gap-3">
                                    <div className="flex flex-col space-y-1">
                                        <label
                                            htmlFor="brand"
                                            className={clsx("font-medium", {
                                                "text-red-400": error && error.path[0] === "brand",
                                            })}
                                        >
                                            Brand Name
                                        </label>
                                        <Input
                                            type="text"
                                            placeholder="Brand of Product"
                                            name="brand"
                                            onChange={handleChange}
                                            className={clsx("", {
                                                "border border-red-400":
                                                    error && error.path[0] === "brand",
                                            })}
                                        />
                                        {error && error.path[0] === "brand" && (
                                            <span className="text-xs text-red-400">
                                                {error.message}
                                            </span>
                                        )}
                                    </div>
                                    <div className="flex flex-col  space-y-1">
                                        <label
                                            htmlFor="productType"
                                            className={clsx("font-medium", {
                                                "text-red-400": error && error.path[0] === "category",
                                            })}
                                        >
                                            Product Category
                                        </label>
                                        <Select
                                            name="category"
                                            value={formData.category}
                                            onValueChange={(value) => {
                                                setError({ path: "", message: "" });
                                                setFormData((prevState: any) => ({
                                                    ...prevState,
                                                    category: value,
                                                }));
                                            }}
                                        >
                                            <SelectTrigger
                                                id="category"
                                                className={clsx("", {
                                                    "border border-red-400":
                                                        error && error.path[0] === "category",
                                                })}
                                            >
                                                <SelectValue placeholder="Not Selected" />
                                            </SelectTrigger>
                                            <SelectContent position="popper">
                                                {categories.map((category: any) => (
                                                    <SelectItem
                                                        key={category.categoryId}
                                                        value={String(category.categoryId)}
                                                    >
                                                        {category.categoryName}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        {error && error.path[0] === "category" && (
                                            <span className="text-xs text-red-400">
                                                {error.message}
                                            </span>
                                        )}
                                    </div>
                                </div>
                                <div className="grid md:grid-cols-2 ">
                                    {attributes.map((attribute: Record<string, string>, index: number) => (<div key={index}>
                                        <Label>{attribute.attributeName}</Label>
                                        <div className="flex items-center pr-4">
                                            <Input disabled type="text" name={attribute.attributeName} value={attribute.attributeValue} />
                                            <span onClick={() => { handleRemoveAttribute(attribute.attributeName) }} className="px-3 text-red-500 cursor-pointer"><BiTrash size={16} /></span>
                                        </div>
                                    </div>))}
                                </div>
                            </div>

                            {/* //*  Right Section */}
                            <div className=" rounded-lg space-y-6 ">
                                <div className=" pt-2 ">
                                    <Label className="text-2xl">Flags</Label>
                                    {/* <p className="dark:text-neutral-400 text-neutral-500">Please input atleast one image </p> */}
                                </div>
                                <div className="flex gap-3 items-center">
                                    <Checkbox
                                        name="isFeatured"
                                        id="isFeatured"
                                        onCheckedChange={(value: boolean) => {
                                            setFormData((prevState: any) => ({
                                                ...prevState,
                                                isFeatured: value,
                                            }));
                                        }}
                                    />
                                    <Label htmlFor="isFeatured">Is Featured</Label>
                                </div>

                                <div className=" pt-2 ">
                                    <Label className="text-2xl">Images</Label>
                                    <p className=" text-xs dark:text-neutral-400 text-neutral-500">Please input atleast one image </p>
                                </div>

                                <div className="flex flex-wrap gap-2 ">
                                    <Input
                                        type="file"
                                        name="image1"
                                        accept=".png,.jpg,.jpeg"
                                        onChange={handleChange}
                                    />
                                    <Input
                                        type="file"
                                        name="image2"
                                        accept=".png,.jpg,.jpeg"
                                        onChange={handleChange}
                                    />
                                    <Input
                                        type="file"
                                        name="image3"
                                        accept=".png,.jpg,.jpeg"
                                        onChange={handleChange}
                                    />
                                    <Input
                                        type="file"
                                        name="image4"
                                        accept=".png,.jpg,.jpeg"
                                        onChange={handleChange}
                                    />
                                    {error && error.path === "image" && (
                                        <span className="text-xs text-red-400">
                                            {error.message}
                                        </span>
                                    )}
                                </div>

                                {/* // *  Buttons */}
                                <div className="flex flex-col gap-3 ">
                                    <Button
                                        type="submit"
                                        className=""
                                        ref={buttonRef}
                                        disabled={isSubmitting}
                                    >
                                        Add Product
                                    </Button>
                                    {/* <Button variant="outline">Save Product</Button> */}
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
