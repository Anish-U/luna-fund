import { FC } from "react";

export interface FooterProps {}

const Footer: FC<FooterProps> = () => {
  return (
    <div className="flex px-12 justify-center items-center py-6 font-primary">
      <p className="text-center text-sm md:text-md">
        Built with ❤️ by Anish Ummenthala
      </p>
    </div>
  );
};

export default Footer;
