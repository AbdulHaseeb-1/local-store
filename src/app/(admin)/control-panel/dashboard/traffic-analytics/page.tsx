
import { Button } from "@/components/ui/button"
import { CardDescription, CardTitle, CardHeader, CardContent, Card } from "@/components/ui/card"
import MyResponsiveLine from "@/components/admin/Charts/Line"
import { DownloadIcon } from "@radix-ui/react-icons"
import MyResponsivePie from "@/components/admin/Charts/Pie"

export default function Component() {
    return (
        <div className="flex flex-col w-full min-h-screen">
            <header className="flex items-center h-16 px-4 border-b shrink-0 md:px-6">
                <h1 className="text-2xl font-semibold  mr-4">Traffic Analytics</h1>
            </header>
            <main className="flex-1 flex flex-col py-4 md:p-6 space-y-6">
                <div className="grid gap-6 md:grid-cols-2">
                    <Card>
                        <CardHeader className="flex  flex-row items-start md:items-center ">
                            <div className="flex flex-col">
                                <CardDescription className="text-sm font-medium">Unique Visitors</CardDescription>
                                <CardTitle className="text-2xl font-bold">12,345</CardTitle>
                            </div>
                            <Button className="ml-auto" size="sm" variant="outline">
                                <DownloadIcon className="w-4 h-4 mr-2" />
                                Export
                            </Button>
                        </CardHeader>
                        <CardContent>
                            < MyResponsiveLine className="aspect-[2/1]" />
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-start md:items-center">
                            <div className="flex flex-col">
                                <CardDescription className="text-sm font-medium">Page Views</CardDescription>
                                <CardTitle className="text-2xl font-bold">23,456</CardTitle>
                            </div>
                            <Button className="ml-auto" size="sm" variant="outline">
                                <DownloadIcon className="w-4 h-4 mr-2" />
                                Export
                            </Button>
                        </CardHeader>
                        <CardContent>
                            <MyResponsivePie   />
                        </CardContent>
                    </Card>
                </div>
                <Card className="grid gap-4 md:grid-cols-2">
                    <div className="flex flex-col">
                        <CardHeader>
                            <CardDescription>Top Pages</CardDescription>
                        </CardHeader>
                        <CardContent className="grid gap-4 text-sm">
                            <div className="flex items-center">
                                <div>/</div>
                                <div className="font-semibold ml-auto">5.4K</div>
                            </div>
                            <div className="flex items-center">
                                <div>/about</div>
                                <div className="font-semibold ml-auto">2.2K</div>
                            </div>
                            <div className="flex items-center">
                                <div>/pricing</div>
                                <div className="font-semibold ml-auto">2K</div>
                            </div>
                            <div className="flex items-center">
                                <div>/about/contact</div>
                                <div className="font-semibold ml-auto">1.1K</div>
                            </div>
                            <div className="flex items-center">
                                <div>/pricing/enterprise</div>
                                <div className="font-semibold ml-auto">1K</div>
                            </div>
                        </CardContent>
                    </div>
                    <div className="flex flex-col">
                        <CardHeader>
                            <CardDescription>Top Referrers</CardDescription>
                        </CardHeader>
                        <CardContent className="grid gap-4 text-sm">
                            <div className="flex items-center">
                                <div>google.com</div>
                                <div className="font-semibold ml-auto">3K</div>
                            </div>
                            <div className="flex items-center">
                                <div>twitter.com</div>
                                <div className="font-semibold ml-auto">1.2K</div>
                            </div>
                            <div className="flex items-center">
                                <div>youtube.com</div>
                                <div className="font-semibold ml-auto">1.1K</div>
                            </div>
                            <div className="flex items-center">
                                <div>facebook.com</div>
                                <div className="font-semibold ml-auto">1K</div>
                            </div>
                            <div className="flex items-center">
                                <div>github.com</div>
                                <div className="font-semibold ml-auto">1K</div>
                            </div>
                        </CardContent>
                    </div>
                </Card>
            </main>
        </div>
    )
}


