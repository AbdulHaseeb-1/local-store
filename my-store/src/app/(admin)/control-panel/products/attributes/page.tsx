// /**
//  * v0 by Vercel.
//  * @see https://v0.dev/t/qm0q3YxuoUh
//  * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
//  */
// "use client"

// import { useState } from "react"
// import { Button } from "@/components/ui/button"
// import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
// import { Label } from "@/components/ui/label"
// import { Badge } from "@/components/ui/badge"
// import { Input } from "@/components/ui/input"
// import { Select } from "@/components/ui/select"
// import { Textarea } from "@/components/ui/textarea"

// export default function Component() {
//   const [attributes, setAttributes] = useState([
//     {
//       id: 1,
//       name: "Color",
//       type: "dropdown",
//       options: ["Red", "Green", "Blue"],
//     },
//     {
//       id: 2,
//       name: "Size",
//       type: "dropdown",
//       options: ["S", "M", "L", "XL"],
//     },
//     {
//       id: 3,
//       name: "Price",
//       type: "number",
//       options: [],
//     },
//     {
//       id: 4,
//       name: "Description",
//       type: "text",
//       options: [],
//     },
//   ])
//   const [newAttribute, setNewAttribute] = useState({
//     name: "",
//     type: "text",
//     options: "",
//   })
//   const handleAddAttribute = () => {
//     const newId = attributes.length > 0 ? Math.max(...attributes.map((a) => a.id)) + 1 : 1
//     const newAttr = {
//       id: newId,
//       name: newAttribute.name,
//       type: newAttribute.type,
//       options: newAttribute.type === "dropdown" ? newAttribute.options.split(",").map((o) => o.trim()) : [],
//     }
//     setAttributes([...attributes, newAttr])
//     setNewAttribute({ name: "", type: "text", options: "" })
//   }
//   const handleEditAttribute = (id, updates) => {
//     setAttributes(attributes.map((a) => (a.id === id ? { ...a, ...updates } : a)))
//   }
//   const handleDeleteAttribute = (id) => {
//     setAttributes(attributes.filter((a) => a.id !== id))
//   }
//   return (
//     <div className="flex flex-col gap-6">
//       <div className="flex items-center justify-between">
//         <h1 className="text-2xl font-bold">Product Attributes</h1>
//         <Button onClick={handleAddAttribute}>Add Attribute</Button>
//       </div>
//       <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
//         {attributes.map((attribute) => (
//           <Card key={attribute.id}>
//             <CardHeader>
//               <CardTitle>{attribute.name}</CardTitle>
//               <CardDescription>{attribute.type}</CardDescription>
//             </CardHeader>
//             <CardContent>
//               {attribute.type === "dropdown" && (
//                 <div className="grid gap-2">
//                   <Label>Options</Label>
//                   <div className="flex flex-wrap gap-2">
//                     {attribute.options.map((option, i) => (
//                       <Badge key={i}>{option}</Badge>
//                     ))}
//                   </div>
//                 </div>
//               )}
//             </CardContent>
//             <CardFooter className="flex justify-between">
//               <Button
//                 variant="outline"
//                 size="sm"
//                 onClick={() =>
//                   handleEditAttribute(attribute.id, {
//                     name: prompt("New attribute name", attribute.name),
//                     type: prompt("New attribute type", attribute.type),
//                     options:
//                       attribute.type === "dropdown"
//                         ? prompt("New options (comma-separated)", attribute.options.join(", "))
//                         : "",
//                   })
//                 }
//               >
//                 Edit
//               </Button>
//               <Button
//                 variant="outline"
//                 size="sm"
//                 color="destructive"
//                 onClick={() => handleDeleteAttribute(attribute.id)}
//               >
//                 Delete
//               </Button>
//             </CardFooter>
//           </Card>
//         ))}
//         <Card>
//           <CardHeader>
//             <CardTitle>Add New Attribute</CardTitle>
//           </CardHeader>
//           <CardContent className="grid gap-4">
//             <div className="grid gap-2">
//               <Label htmlFor="name">Name</Label>
//               <Input
//                 id="name"
//                 value={newAttribute.name}
//                 onChange={(e) => setNewAttribute({ ...newAttribute, name: e.target.value })}
//               />
//             </div>
//             <div className="grid gap-2">
//               <Label htmlFor="type">Type</Label>
//               <Select
//                 id="type"
//                 value={newAttribute.type}
//                 onValueChange={(e) => setNewAttribute({ ...newAttribute, type: e.target.value })}
//               >
//                 <option value="text">Text</option>
//                 <option value="number">Number</option>
//                 <option value="dropdown">Dropdown</option>
//               </Select>
//             </div>
//             {newAttribute.type === "dropdown" && (
//               <div className="grid gap-2">
//                 <Label htmlFor="options">Options (comma-separated)</Label>
//                 <Textarea
//                   id="options"
//                   value={newAttribute.options}
//                   onChange={(e) => setNewAttribute({ ...newAttribute, options: e.target.value })}
//                 />
//               </div>
//             )}
//           </CardContent>
//           <CardFooter>
//             <Button onClick={handleAddAttribute}>Add Attribute</Button>
//           </CardFooter>
//         </Card>
//       </div>
//     </div>
//   )
// }

import React from 'react'

export default function page() {
    return (
        <div>page</div>
    )
}
