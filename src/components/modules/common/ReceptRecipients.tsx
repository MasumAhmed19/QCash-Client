import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useGetEachTransactionsQuery } from "@/redux/features/user/user.api";
import type { ITransactions } from "@/types";
import { ArrowRight } from "lucide-react";
import TimeAgo from "timeago-react";

const ReceptRecipients = ({ type }: { type: string }) => {
  const { data: transactionsData } = useGetEachTransactionsQuery({
    limit: 3,
    type,
    sortBy: "createdAt",
    sortOrder: "desc",
  });
  console.log(transactionsData?.data);

  return (
    <Card className="w-full h-full shadow-none">
      <CardHeader className="font-semibold">Recent Recipients</CardHeader>
      <CardContent className="space-y-5">
        {transactionsData?.data.map((elem: ITransactions, index: number) => (
          <Card key={index} className="shadow-none">
            <CardContent className="flex items-center justify-between">
              <div className="flex  items-center gap-2">
                {type === "ADD" ? (
                  <div className="font-semibold capitalize items-start flex flex-col">
                    <h3>Bank Account</h3>
                  </div>
                ) : (
                  <div className="font-semibold capitalize items-start flex flex-col">
                    <h3>{elem?.from?.name}</h3>
                    <h3 className="text-xs text-muted-foreground/60">
                      {elem?.from?.phone}
                    </h3>
                  </div>
                )}

                <ArrowRight className="text-primary w-5 h-5" />
                <div className="font-semibold capitalize items-start flex flex-col">
                  <h3>{elem?.to?.name}</h3>
                  <h3 className="text-xs text-muted-foreground/60">
                    {elem?.to?.phone}
                  </h3>
                </div>
              </div>
              <div className=" text-sm">
                <h3 className="font-semibold text-muted-foreground/70">
                  {elem?.amount} Tk.
                </h3>

                <h4 className="text-muted-foreground/60">
                  <TimeAgo datetime={elem?.createdAt} locale="vi" />
                </h4>
              </div>
            </CardContent>
          </Card>
        ))}
      </CardContent>
    </Card>
  );
};

export default ReceptRecipients;
