import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { useUserInfoQuery } from "@/redux/features/auth/auth.api"

const AvailableBalance = () => {
    const {data: userInfo}= useUserInfoQuery(undefined);

  return (
    <div>
        <Card className="gap-3">
            <CardHeader className="text-muted-foreground flex items-cente">Available Balance <span className="border px-2 rounded-sm text-primary">BDT</span></CardHeader>
            <CardContent className="text-2xl md:text-5xl">৳{userInfo?.data?.wallet?.balance}</CardContent>
        </Card>
    </div>
  )
}

export default AvailableBalance