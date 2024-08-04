'use client';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Image from 'next/image';
import React, { ChangeEventHandler, useState } from 'react';
import clsx from 'clsx';
import { BiPlus } from 'react-icons/bi';

export default function ImageUpload() {
    // const [image, setImage] = useState<File | null>(null);
    const [previewURL, setPreviewURL] = useState<string | null>(null);

    function handleUpload(event: any) {
        const file = event.target.files?.[0];
        
        // setImage(file);

        const reader = new FileReader();

        reader.onloadend = () => {
            setPreviewURL(reader.result as string | null);
        };

        if (file) {
            reader.readAsDataURL(file);
        } else {
            setPreviewURL(null);
        }
    }

    return (
        <div className=''>
            <Label htmlFor='upload_image'>
                <Input
                    onChange={handleUpload}
                    type='file'
                    id='upload_image'
                    className={"sr-only"}
                />
                {previewURL ? (
                    <Image
                        src={previewURL}
                        alt='Uploaded Preview'
                        width={100}
                        height={100}
                        style={{
                            aspectRatio: '100/100',
                            objectFit: 'cover',
                        }}
                        className='rounded-md'
                    />
                ) : <div className='flex items-center justify-center h-[100px] w-[100px] border rounded-md border-dotted '>
                    <BiPlus size={22} />
                </div>}
            </Label>
        </div>
    );
}