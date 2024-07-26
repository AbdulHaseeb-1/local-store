import { Button } from '@/components/ui/button';
import Link from 'next/link';
import React from 'react';

const SuccessPage = ({ params }: { params: { order_id: string } }) => {
    return (
        <div className="flex flex-col items-center h-96 justify-center ">
            <div className=" p-6 rounded-lg text-center">
                <div className="flex justify-center items-center mb-4">
                    <div className="h-16 w-16 rounded-full  flex items-center justify-center">
                        <svg className="animate-pulse h-12 w-12 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                </div>
                <h1 className="text-xl font-semibold mb-2">Your order has been placed successfully .</h1>
                <h1 className="text-xl font-semibold mb-2">Order ID: #{params.order_id}</h1>
                <p className="text-gray-600">We will contact you for confirmation.</p>
                <Link href={"/"} >
                    <Button variant={"secondary"} className='m-3'>Continue Shopping</Button>
                </Link>
            </div>
        </div>
    );
}

export default SuccessPage;
