import { FaceSmileIcon, ChartBarSquareIcon, CursorArrowRaysIcon, DevicePhoneMobileIcon, AdjustmentsHorizontalIcon, SunIcon } from "@heroicons/react/24/solid";
import { DoubleRightOutlined } from "@ant-design/icons";
import benefitOneImg from "../../public/img/benefit-one.png";
import benefitTwoImg from "../../public/img/benefit-two.png";

const benefitOne = {
  title: "Benefits using CONVE",
  desc: "",
  image: benefitOneImg,
  bullets: [
    {
      title: "Access to Exclusive Concerts",
      desc: "Enjoy live performances from your favorite artists, available exclusively on CONVE.",
      icon: <DoubleRightOutlined style={{ color: "white" }} />,
    },
    {
      title: "Convenience and Comfort:",
      desc: "Attend concerts from the comfort of your home. No need to worry about travel, parking, or crowds.",
      icon: <DoubleRightOutlined color="white" style={{ color: "white" }} />,
    },
    {
      title: "Diverse Music Genres",
      desc: "Whether you're into pop, rock, jazz, classical, or indie, CONVE has concerts to suit every taste.",
      icon: <DoubleRightOutlined color="white" style={{ color: "white" }} />,
    },
  ],
};

const benefitTwo = {
  title: "Offer more benefits here",
  desc: "You can use this same layout with a flip image to highlight your rest of the benefits of your product. It can also contain an image or Illustration as above section along with some bullet points.",
  image: benefitTwoImg,
  bullets: [
    {
      title: "Mobile Responsive Template",
      desc: "Nextly is designed as a mobile first responsive template.",
      icon: <DevicePhoneMobileIcon />,
    },
    {
      title: "Powered by Next.js & TailwindCSS",
      desc: "This template is powered by latest technologies and tools.",
      icon: <AdjustmentsHorizontalIcon />,
    },
    {
      title: "Dark & Light Mode",
      desc: "Nextly comes with a zero-config light & dark mode. ",
      icon: <SunIcon />,
    },
  ],
};

export { benefitOne, benefitTwo };
