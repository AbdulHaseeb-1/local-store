import { Skeleton } from "@/components/ui/skeleton";

export default function FeatureProductSkeleton() {
  return (
    <section className="w-full py-12">
      <div className="container px-4 md:px-6">
        <Skeleton className=" w-64 h-8 rounded-md m-auto mb-9 dark:bg-neutral-800 bg-neutral-200" />

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {[1, 2, 3, 4, 5].map((item) => (
            <div
              key={item}
              className="rounded-lg border dark:bg-neutral-900  bg-neutral-50 shadow-sm"
            >
              <div className="p-1 space-y-4">
                <Skeleton className="h-48 md:h-[200px] w-full rounded-md dark:bg-neutral-800 bg-neutral-200" />
                <div className="space-y-2 ">
                  <Skeleton className="h-4 w-3/4 dark:bg-neutral-800 bg-neutral-200" />
                  <Skeleton className="h-3 w-1/2 dark:bg-neutral-800 bg-neutral-200" />
                </div>
                <div className="flex justify-between items-center pb-4 ">
                  <Skeleton className="h-5 w-16 dark:bg-neutral-800 bg-neutral-200" />
                  {/* <Skeleton className="h-10 w-10 rounded-full dark:bg-neutral-800 bg-neutral-200" /> */}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
