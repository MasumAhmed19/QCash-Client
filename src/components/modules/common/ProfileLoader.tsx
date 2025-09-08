import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function ProfileLoader() {
  return (
    <div className="w-full mx-auto md:p-5 animate-pulse space-y-6">
      <Card className="rounded-2xl overflow-hidden">
        {/* Header */}
        <CardHeader className="relative p-0 -mt-8">
          <div className="relative h-48 bg-gray-200 rounded-t-lg">
            <div className="absolute inset-0 bg-gray-300/50"></div>
          </div>

          {/* Avatar and Name */}
          <div className="relative px-6 pb-6">
            <div className="flex flex-col sm:flex-row items-center sm:items-end gap-4 -mt-24 md:-mt-16">
              <div className="h-40 w-40 md:h-40 md:w-40 rounded-full bg-gray-200 border-4 border-white shadow-lg" />
              <div className="flex-1 text-center sm:text-left sm:mt-0 space-y-2">
                <div className="h-6 w-40 bg-gray-300 rounded mx-auto sm:mx-0" />
                <div className="h-4 w-32 bg-gray-200 rounded mx-auto sm:mx-0" />
                <div className="h-4 w-24 bg-gray-200 rounded mx-auto sm:mx-0 mt-2" />
              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-6 space-y-6">
          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {Array.from({ length: 3 }).map((_, idx) => (
              <div
                key={idx}
                className="h-20 bg-gray-200 rounded-lg flex flex-col items-center justify-center"
              >
                <div className="h-6 w-12 bg-gray-300 rounded mb-2" />
                <div className="h-3 w-16 bg-gray-200 rounded" />
              </div>
            ))}
          </div>

          {/* Personal Information */}
          <div className="space-y-4">
            <div className="h-6 w-32 bg-gray-300 rounded mb-2" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Array.from({ length: 4 }).map((_, idx) => (
                <div
                  key={idx}
                  className="h-10 bg-gray-200 rounded w-full"
                />
              ))}
            </div>
          </div>

          {/* Account Information */}
          <div className="space-y-4">
            <div className="h-6 w-36 bg-gray-300 rounded mb-2" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Array.from({ length: 3 }).map((_, idx) => (
                <div
                  key={idx}
                  className="h-10 bg-gray-200 rounded w-full"
                />
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
