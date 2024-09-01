import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";

export default function AttributesSkeleton() {
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
                <Skeleton className="h-5 w-5 bg-neutral-200 dark:bg-neutral-800" />
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell className="text-key-foreground font-bold min-w-32">
                      Shipping Fee:
                    </TableCell>
                    <TableCell><Skeleton className="h-6 w-16 bg-neutral-200 dark:bg-neutral-800" /></TableCell>
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
                <Skeleton className="h-5 w-5 bg-neutral-200 dark:bg-neutral-800" />
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell className="text-key-foreground font-bold min-w-32">
                      Delivery Info:
                    </TableCell>
                    <TableCell><Skeleton className="h-5 w-24 bg-neutral-200 dark:bg-neutral-800" /></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="text-key-foreground font-bold">
                      Return Policy:
                    </TableCell>
                    <TableCell><Skeleton className="h-5 w-24 bg-neutral-200 dark:bg-neutral-800" /></TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>

      </div>
  );
}
