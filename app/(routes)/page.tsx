import Spline from "@splinetool/react-spline/next";

import HomePageSection from "@/components/organisms/home";

export interface PageProps {}

export default function Page({}: PageProps) {
  return (
    <div className="px-20 p-2 flex-1 flex flex-col gap-4">
      <div className="grid items-center justify-center w-full grid-cols-1 md:grid-cols-2 h-full gap-4 flex-1">
        <div className="px-4">
          <HomePageSection />
        </div>
        <Spline
          scene="https://prod.spline.design/dQpl7NlioeeDXQOW/scene.splinecode"
          className="hidden md:block min-h-[50vh]"
        />
      </div>
    </div>
  );
}
