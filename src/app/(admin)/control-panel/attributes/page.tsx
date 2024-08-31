"use client";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import EditShippingInfo from "@/components/admin/Forms/Dialogs/EditShippingInfo";
import EditShippingServices from "@/components/admin/Forms/Dialogs/EditShippingServices";
import { BiEdit } from "react-icons/bi";
import { useToast } from "@/Context/toast";
import { useEffect, useState } from "react";
import axios from "@/lib/axios";
import { Button } from "@/components/ui/button";
import AttributesSkeleton from "@/components/skeletons/attributes";

interface Attributes {
  shipping_fee: number;
  return_policy: string;
  delivery_info: string;
}

const initialStates = {
  shipping_fee: 0,
  return_policy: "",
  delivery_info: "",
};

export default function SpecialAttributes() {
  const [attributes, setAttributes] = useState<Attributes>(initialStates);
  const [isLoaded, setIsLoaded] = useState(false);
  const { showToast } = useToast();

  // States to control the visibility of modals
  const [isEditShippingInfoModalOpen, setEditShippingInfoModalOpen] =
    useState(false);
  const [isEditShippingServicesModalOpen, setEditShippingServicesModalOpen] =
    useState(false);

  // Handlers to show or hide modals
  const openEditShippingInfoModal = () => setEditShippingInfoModalOpen(true);
  const closeEditShippingInfoModal = () => setEditShippingInfoModalOpen(false);

  const openEditShippingServicesModal = () =>
    setEditShippingServicesModalOpen(true);
  const closeEditShippingServicesModal = () =>
    setEditShippingServicesModalOpen(false);

  useEffect(() => {
    async function getAttributes() {
      try {
        setIsLoaded(false);
        const response = await axios("/attributes");
        // if (!response.data.data) {
        //   setAttributes(initialStates);
        //   return;
        // }
        setAttributes(response.data.data);
        setIsLoaded(true);
      } catch (err: any) {
        showToast(err.message, "error", 5000);
      }
    }
    getAttributes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!isLoaded) {
    return <AttributesSkeleton />;
  } else
    return (
      <div className="container mx-auto px-4 md:px-6 pt-6 ">
        <div className="mb-6 ">
          <h1 className="text-2xl font-bold">Attributes</h1>
          <p className="text-muted-foreground">
            Manage attributes related to customer view
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-3">
          <Card className="dark:bg-neutral-900">
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Shipping Fees</CardTitle>
                  <CardDescription>Manage your shipping fees</CardDescription>
                </div>
                <Button
                  onClick={openEditShippingInfoModal}
                  size={"icon"}
                  variant={"ghost"}
                >
                  <BiEdit size={22} />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell className="text-key-foreground font-bold min-w-32">
                      Shipping Fee:
                    </TableCell>
                    <TableCell>{attributes?.shipping_fee}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
          <Card className="dark:bg-neutral-900">
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Order Creation Setting</CardTitle>
                  <CardDescription>
                    Customize Your Customers Order Creation
                  </CardDescription>
                </div>
                <Button
                  onClick={openEditShippingServicesModal}
                  size={"icon"}
                  variant={"ghost"}
                >
                  <BiEdit size={22} />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell className="text-key-foreground font-bold min-w-32">
                      Delivery Info:
                    </TableCell>
                    <TableCell>{attributes?.delivery_info}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="text-key-foreground font-bold">
                      Return Policy:
                    </TableCell>
                    <TableCell>{attributes?.return_policy}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>

        {/* Modals */}
        {isEditShippingInfoModalOpen && (
          <EditShippingInfo
            shippingFee={attributes.shipping_fee}
            onClose={closeEditShippingInfoModal} // Pass close handler to modal
            open={openEditShippingInfoModal}
            setAttributes={setAttributes}
          />
        )}

        {isEditShippingServicesModalOpen && (
          <EditShippingServices
            return_policy={attributes.return_policy}
            delivery_info={attributes.delivery_info}
            onClose={closeEditShippingServicesModal} // Pass close handler to modal
            open={openEditShippingServicesModal}
            setAttributes={setAttributes}
          />
        )}
      </div>
    );
}
