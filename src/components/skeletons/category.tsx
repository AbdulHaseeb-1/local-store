import { Card, CardContent } from "@/components/ui/card";

export default function CategorySkeleton() {
  return (
    <section className="w-full py-12">
      <div className="container px-4 md:px-6">
        <div className="h-8 bg-gray-200 dark:bg-neutral-800 rounded w-1/3 mx-auto mb-8 animate-pulse" />
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {[...Array(6)].map((_, index) => (
            <Card key={index} className="overflow-hidden dark:bg-neutral-900">
              <CardContent className="p-4">
                <div className="flex flex-col items-center space-y-3 ">
                  <div className="w-12 h-12 bg-gray-200 dark:bg-neutral-800 rounded-xl animate-pulse" />
                  <div className="h-4 bg-gray-200 dark:bg-neutral-800 rounded w-3/4 animate-pulse" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
