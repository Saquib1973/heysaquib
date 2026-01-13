import { ArrowUpRight, Code2, FileText, Github, Instagram, Linkedin, Twitter } from 'lucide-react'
import Link from 'next/link'
import { StaggerItem } from './stagger-section'

export interface links {
    name: string
    href: string
    icon: React.ReactNode

}

export const links: links[] = [
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
const SocialLinks = ({ allowedLinks }: { allowedLinks?: string[] }) => {
    const updatedList = allowedLinks && allowedLinks.length ? links.filter(link => allowedLinks.includes(link.name.toLowerCase())) : links;
    return (
        <div className="flex max-md:justify-start flex-wrap gap-8 mb-12">
            {updatedList.map((link) => (
                <StaggerItem key={link.name}>
                    <Link href={link.href} target="_blank" className="text-[10px] uppercase tracking-[0.2em] font-bold text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors flex items-center gap-1">
                        {link.name} <ArrowUpRight size={10} className="opacity-30" />
                    </Link>
                </StaggerItem>
            ))}
        </div>
    )
}

export default SocialLinks