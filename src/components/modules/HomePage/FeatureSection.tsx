import BaseSection from "@/components/layout/BaseSection";
import { FeatureCard } from "../common/FeatureCard";
import type { IFeatureCard } from "@/types";

const cardsInfo:IFeatureCard[]=[
    {
        "title": "Smart, Simple & Secure Finance for all use",
        "description": "Send and receive money instantly, recharge mobiles, pay utility bills, shop with QR payments, and save for the future — all from one easy-to-use app. Enjoy fast, safe, and convenient digital transactions anytime, anywhere.",
        "image":"https://i.ibb.co.com/WWFd0GFw/credit-cards.png",
        "isContent":true
    },
    {
        "title": "Grow Your Business as a Trusted Finance Agent",
        "description": "Provide cash-in and cash-out services, accept merchant payments, assist customers with recharges and bill payments, and earn commissions on every transaction. Build trust in your community while growing your income with our secure digital finance platform.",
        "image":"https://i.ibb.co.com/WWFd0GFw/credit-cards.png",
        "isContent":true
    }
] 


const FeatureSection = () => {
  return (
    <div className="bg-[#F8f8f8] py-[100px]">
      <BaseSection>
        <div className="flex flex-col lg:flex-row gap-10">
            {
                cardsInfo.map((elem, index)=><FeatureCard key={index} elem={elem} />)
            }
        </div>
      </BaseSection>
    </div>
  );
};

export default FeatureSection;
