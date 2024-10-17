import logo1 from "../assets/logo1.png";
import { footerLinks, socialMedia } from "./constant.js";

const Footer = () => {
  return (
    <footer className="max-container bg-[#454545] text-white text-sm">
      <div className="flex justify-between items-start gap-10 flex-wrap max-lg:flex-col p-8">
        <div className="flex flex-col items-start">
          <a href="/">
            <img src={logo1} width={150} height={46} className="rounded-md	" />
          </a>
          <p className="mt-6 text-base leading-7 font-montserrat text-white-400 sm:max-w-sm">
            Tìm kiếm và mua sắm thật dễ dàng với chúng tôi. Hãy tham gia cùng
            BKmarket
          </p>
          <div className="flex items-center gap-5 mt-8">
            {socialMedia.map((item) => (
              <div
                key={item.alt}
                className="flex justify-center items-center w-12 h-12 bg-white rounded-full"
              >
                <img src={item.src} alt={item.alt} width={24} height={24} />
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-1 justify-between gap-10 flex-wrap">
          {footerLinks.map((item) => (
            <div key={item.title}>
              <h4 className="text-white font-montserrat text-2xl leading-normal font-medium mb-6">
                {item.title}
              </h4>
              <ul>
                {item.links.map((link) => (
                  <li
                    key={link.name}
                    className="mt-3 text-white-400 font-montserrat leading-normal hover:text-slate-gray cursor-pointer"
                  >
                    <a href={link.link}>{link.name}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <div className="flex px-10 h-10">
        <div className="flex flex-1 justify-start items-center gap-2 font-montserrat cursor-pointer">
          <p>© 2024-HCMUT Copyright. All rightsreserved.</p>
        </div>
        <p className="font-montserrat cursor-pointer ">Terms & Conditions</p>
      </div>
    </footer>
  );
};

export default Footer;
