"use client";
import SpecialCard from "../Custom/specialCard";

export default function BestChoices() {
  return (
    <div className="mt-10">
      <div className="text-center text-4xl font-bold text-pretty mb-16">
        Best Choices
      </div>
      <div className="container grid md:grid-cols-8 md:grid-rows-2 gap-4 ">
        <div className="md:col-start-1 md:-ml-10 xl:ml-0 md:col-span-4">
          <SpecialCard
            imageUrl="/images/products/t1mouse.png"
            title="Best KeyBoard Ever"
            subTitle="Keep your fire up"
            price="3900"
            brandName="Bloody"
          />
        </div>
        <div className="lg:-mt-10 md:-ml-10 lg:-ml-20 xl:ml-0 md:row-start-2 md:col-start-2 lg:col-start-4  ">
          <SpecialCard     
            imageUrl="/images/products/smouse.png"
            title="Best Mouse Ever"
            subTitle="Keep your fire up"
            price="8900"
            brandName="Bloody" />
        </div>
      </div>
    </div>
  );
}
