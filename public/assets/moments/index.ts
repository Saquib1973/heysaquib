import image01 from "./image01.jpg"
import image02 from "./image02.jpg"
import image03 from "./image03.jpg"
import image04 from "./image04.jpg"
import image05 from "./image05.jpg"
import image06 from "./image06.jpg"
import image07 from "./image07.webp"
import image08 from "./image08.jpg"
import image09 from "./image09.png"
import image10 from "./image10.jpg"
import image11 from "./image11.jpg"
import image12 from "./image12.png"
import image13 from "./image13.jpeg"
import image14 from "./image14.jpeg"
import image15 from "./image15.jpg"
import image16 from "./image16.jpg"
import image17 from "./image17.jpeg"
import image18 from "./image18.jpg"

import { StaticImageData } from 'next/image'

type MomentType = "image" | "video";

interface Moment {
  src: string | StaticImageData;
  data: {
    description: string;
    date: string;
    type: MomentType;
  };
}

export const moments: Moment[] = [
  {src:image01,data:{description:"",date:"",type:"image"}},
  {src:image02,data:{description:"",date:"",type:"image"}},
  {src:image03,data:{description:"",date:"",type:"image"}},
  {src:image04,data:{description:"",date:"",type:"image"}},
  {src:image05,data:{description:"",date:"",type:"image"}},
  {src:image06,data:{description:"",date:"",type:"image"}},
  {src:image07,data:{description:"",date:"",type:"image"}},
  { src: image08, data: { description: "", date: "", type: "image" } },
  { src: image09, data: { description: "", date: "", type: "image" } },
  { src: image10, data: { description: "", date: "", type: "image" } },
  { src: image11, data: { description: "", date: "", type: "image" } },
  { src: image12, data: { description: "", date: "", type: "image" } },
  { src: image13, data: { description: "", date: "", type: "image" } },
  { src: image14, data: { description: "", date: "", type: "image" } },
  { src: image15, data: { description: "", date: "", type: "image" } },
  { src: image16, data: { description: "", date: "", type: "image" } },
  { src: image17, data: { description: "", date: "", type: "image" } },
  { src: image18, data: { description: "", date: "", type: "image" } },
  { src: "video01.mp4", data: { description: "", date: "", type: "video" } },
]