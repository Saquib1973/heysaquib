import { Github, Twitter, Linkedin, Code2, Instagram, FileText } from 'lucide-react'

// You can use standard Lucide icons, or your custom SVG components if you prefer.
// I've mapped them to Lucide for this example to ensure it runs immediately.

export const socialLinks = [
  { 
    name: 'github', 
    href: 'https://github.com/Saquib1973', 
    icon: <Github className="w-5 h-5" /> 
  },
  { 
    name: 'twitter', 
    href: 'https://x.com/sacubeli', 
    icon: <Twitter className="w-5 h-5" /> 
  },
  { 
    name: 'leetcode', 
    href: 'https://leetcode.com/u/sacube/', 
    icon: <Code2 className="w-5 h-5" /> 
  },
  { 
    name: 'linkedin', 
    href: 'https://www.linkedin.com/in/saquibali1973/', 
    icon: <Linkedin className="w-5 h-5" /> 
  },
  { 
    name: 'instagram', 
    href: 'https://www.instagram.com/sacubeli/#', 
    icon: <Instagram className="w-5 h-5" /> 
  },
  {
    name: 'resume',
    href: 'https://drive.google.com/file/d/1uy_pExXcnC35CJEACcN3DfigwJPFtd_o/view',
    icon: <FileText className="w-5 h-5" />
  }
]