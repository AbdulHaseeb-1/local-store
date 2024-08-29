// import {
//   Card,
//   CardHeader,
//   CardTitle,
//   CardDescription,
//   CardContent,
// } from "@/components/ui/card";
// import { getAttributes } from "@/actions/attributes";
// import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
// import EditShippingFee from "@/components/admin/Forms/Dialogs/EditShippingFee";
// import EditShippingInfo from "@/components/admin/Forms/Dialogs/EditShippingInfo";

// export default async function Component() {
//   const data: any = await getAttributes();

//   return (
//     <div className="container mx-auto px-4 md:px-6 pt-6 ">
//       <div className="mb-6 ">
//         <h1 className="text-2xl font-bold">Attributes</h1>
//         <p className="text-muted-foreground">
//           Manage attributes related to customer view
//         </p>
//       </div>
//       <div className="grid md:grid-cols-2 gap-3">
//         <Card className="dark:bg-neutral-800">
//           <CardHeader>
//             <div className="flex justify-between items-center">
//               <div>
//                 <CardTitle>Shipping Fees</CardTitle>
//                 <CardDescription>Manage your shipping fees</CardDescription>
//               </div>
//               <EditShippingFee shipping_fee={data?.shipping_fee.toString()} />
//             </div>
//           </CardHeader>
//           <CardContent>
//             <Table>
//               <TableBody>
//                 <TableRow>
//                   <TableCell className="text-key-foreground font-bold min-w-32">
//                     Shipping Fee:
//                   </TableCell>
//                   <TableCell>{data?.shipping_fee.toString()}</TableCell>
//                 </TableRow>
//               </TableBody>
//             </Table>
//           </CardContent>
//         </Card>
//         <Card className="dark:bg-neutral-800">
//           <CardHeader>
//             <div className="flex justify-between items-center">
//               <div>
//                 <CardTitle>Order Creation Setting</CardTitle>
//                 <CardDescription>
//                   Customize Your Customers Order Creation
//                 </CardDescription>
//               </div>
//               <EditShippingInfo return_policy={data?.return_policy} delivery_time={data?.delivery_time}/>
//             </div>
//           </CardHeader>
//           <CardContent>
//             <Table>
//               <TableBody>
//                 <TableRow>
//                   <TableCell className="text-key-foreground font-bold min-w-32">
//                     Delivery Time:
//                   </TableCell>
//                   <TableCell>{data?.delivery_time}</TableCell>
//                 </TableRow>
//                 <TableRow>
//                   <TableCell className="text-key-foreground font-bold">
//                     Return Policy:
//                   </TableCell>
//                   <TableCell>{data?.return_policy}</TableCell>
//                 </TableRow>
//               </TableBody>
//             </Table>
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   );
// }

import React from 'react'

export default function page() {
  return (
    <div>page</div>
  )
}
