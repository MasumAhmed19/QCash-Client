import { Card, CardContent } from "@/components/ui/card";

export default function TableLoader() {
  return (
    <div className="md:p-6 space-y-6 animate-pulse">
      {/* Page Header Skeleton */}
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
        <div className="h-6 w-40 bg-gray-300 rounded mb-4 md:mb-0" />
        <div className="h-6 w-24 bg-gray-300 rounded" />
      </div>

      {/* Table Skeleton */}
      <Card>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full table-auto border-collapse">
              {/* Table Header */}
              <thead className="bg-gray-100">
                <tr>
                  {Array.from({ length: 7 }).map((_, idx) => (
                    <th key={idx} className="p-2">
                      <div className="h-4 w-16 bg-gray-300 rounded mx-auto" />
                    </th>
                  ))}
                </tr>
              </thead>

              {/* Table Body */}
              <tbody>
                {Array.from({ length: 6 }).map((_, rowIdx) => (
                  <tr key={rowIdx} className="border-b">
                    {Array.from({ length: 7 }).map((_, cellIdx) => (
                      <td key={cellIdx} className="p-2">
                        <div className="h-4 w-full bg-gray-200 rounded" />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
