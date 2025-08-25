import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { IFeatureCard } from "@/types";

type Iprops = {
  elem: IFeatureCard;
};

export function FeatureCard({ elem }: Iprops) {
  return (
    <Card className="w-full border-none shadow-none bg-white md:p-10 rounded-4xl">
      {elem.isContent ? (
        <CardHeader className="space-y-4">
          <CardTitle className="text-4xl">{elem?.title}</CardTitle>
          <CardDescription>{elem?.description}</CardDescription>
        </CardHeader>
      ) : (
        <></>
      )}

      <CardContent className="overflow-hidden h-[30vh]">
        <img src="https://i.ibb.co.com/WWFd0GFw/credit-cards.png" alt="" className="" />
      </CardContent>
    </Card>
  );
}
