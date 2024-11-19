import { facebook, instagram, twitter } from "../assets/icons";

export const footerLinks = [
  {
    title: "Trợ giúp",
    links: [
      { name: "Về chúng tôi", link: "/" },
      { name: "FAQs", link: "/" },
      { name: "Chính sách bảo mật", link: "/" },
      { name: "Chính sách thanh toán", link: "/" },
    ],
  },
  {
    title: "Đối tác",
    links: [
      { name: "Shoppe Express", link: "/" },
      { name: "Giao hàng nhanh", link: "/" },
      { name: "Ninja Van", link: "/" },
      { name: "Momo", link: "/" },
    ],
  },
  {
    title: "Liên hệ",
    links: [
      { name: "customer@hcmut.edu.vn", link: "mailto:customer@hcmut.edu.vn" },
      { name: "+84554862354", link: "tel:+84554862354" },
    ],
  },
];

export const socialMedia = [
  { src: facebook, alt: "facebook logo", link: "https://www.facebook.com/truongdhbachkhoa" },
  { src: twitter, alt: "twitter logo", link: "https://x.com/" },
  { src: instagram, alt: "instagram logo", link: "https://www.instagram.com/" },
];
