import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";

export default function AdminAnalyticsLoader() {
  return (
    <div className="p-6 space-y-6 animate-pulse">
      {/* Top metrics cards skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, idx) => (
          <Card key={idx} className="shadow-lg">
            <CardHeader className="flex flex-row items-center space-x-3">
              <div className="h-6 w-6 bg-gray-300 rounded-full" />
              <CardTitle>
                <div className="h-4 w-20 bg-gray-300 rounded" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-6 w-16 bg-gray-300 rounded mb-2" />
              <div className="h-4 w-24 bg-gray-200 rounded" />
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {[...Array(2)].map((_, idx) => (
          <Card key={idx} className="shadow-lg">
            <CardHeader>
              <CardTitle>
                <div className="h-4 w-32 bg-gray-300 " />
              </CardTitle>
            </CardHeader>
            <CardContent className="flex justify-center items-center h-[250px]">
              <div className="h-full w-full bg-gray-200 " />
            </CardContent>
            <CardFooter className="flex-col gap-2 text-sm">
              <div className="h-3 w-32 bg-gray-300 rounded" />
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
