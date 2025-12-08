const componentGroups = [
	{
		title: 'Layout & Shell',
		items: [
			{
				name: 'header-component',
				path: 'components/header-component.tsx',
				description: 'Top navigation and branding used across the site.',
				usedIn: ['(portfolio)/layout.tsx'],
			},
			{
				name: 'footer-component',
				path: 'components/footer-component.tsx',
				description: 'Global footer with links and contact info.',
				usedIn: ['(portfolio)/layout.tsx'],
			},
			{
				name: 'ParticleFlowBackground',
				path: 'components/ParticleFlowBackground.tsx',
				description: 'Animated particle background for hero/landing sections.',
				usedIn: ['(portfolio)/page.tsx'],
			},
			{
				name: 'Starfield',
				path: 'components/Starfield.tsx',
				description: 'Canvas starfield used on dark hero sections.',
				usedIn: ['(portfolio)/page.tsx'],
			},
		],
	},
	{
		title: 'Home Sections',
		items: [
			{
				name: 'about-home-section',
				path: 'components/about-home-section.tsx',
				description: 'About me strip on the landing page.',
				usedIn: ['(portfolio)/page.tsx'],
			},
			{
				name: 'experience-home-section',
				path: 'components/experience-home-section.tsx',
				description: 'Experience timeline preview.',
				usedIn: ['(portfolio)/page.tsx'],
			},
			{
				name: 'techstack-home-section',
				path: 'components/techstack-home-section.tsx',
				description: 'Tools & technologies grid.',
				usedIn: ['(portfolio)/page.tsx'],
			},
			{
				name: 'projects-home-section',
				path: 'components/projects-home-section.tsx',
				description: 'Highlighted projects carousel/list.',
				usedIn: ['(portfolio)/page.tsx'],
			},
			{
				name: 'blogs-home-section',
				path: 'components/blogs-home-section.tsx',
				description: 'Latest blogs teaser list.',
				usedIn: ['(portfolio)/page.tsx'],
			},
			{
				name: 'moments-home-section',
				path: 'components/moments-home-section.tsx',
				description: 'Moments / gallery preview section.',
				usedIn: ['(portfolio)/page.tsx'],
			},
			{
				name: 'quick-links-section',
				path: 'components/quick-links-section.tsx',
				description: 'CTA tiles linking to key routes.',
				usedIn: ['(portfolio)/page.tsx'],
			},
			{
				name: 'certificates-section',
				path: 'components/certificates-section.tsx',
				description: 'Certifications showcase.',
				usedIn: ['(portfolio)/page.tsx'],
			},
			{
				name: 'contact-home-section',
				path: 'components/contact-home-section.tsx',
				description: 'Contact/CTA panel on home.',
				usedIn: ['(portfolio)/page.tsx'],
			},
		],
	},
	{
		title: 'Detail Pages & Blocks',
		items: [
			{
				name: 'timeline-about',
				path: 'components/timeline-about.tsx',
				description: 'Detailed about timeline used on About page.',
				usedIn: ['(portfolio)/about/page.tsx'],
			},
			{
				name: 'location-map-client',
				path: 'components/location-map-client.tsx',
				description: 'Client map wrapper for Leaflet.',
				usedIn: ['(portfolio)/about/page.tsx'],
			},
			{
				name: 'location-map',
				path: 'components/location-map.tsx',
				description: 'Server component map shell.',
				usedIn: ['(portfolio)/about/page.tsx'],
			},
			{
				name: 'on-this-page',
				path: 'components/on-this-page.tsx',
				description: 'Scrollspy / table of contents for blog posts.',
				usedIn: ['(portfolio)/blogs/[slug]/page.tsx'],
			},
			{
				name: 'BlogTimeComponent',
				path: 'components/BlogTimeComponent.tsx',
				description: 'Published date & reading time badge.',
				usedIn: ['(portfolio)/blogs/[slug]/page.tsx'],
			},
			{
				name: 'github-pr-component',
				path: 'components/github-pr-component.tsx',
				description: 'GitHub PR widget (Projects detail).',
				usedIn: ['(portfolio)/projects/[slug]/page.tsx'],
			},
			{
				name: 'PenUnderline',
				path: 'components/PenUnderline.tsx',
				description: 'Hand-drawn underline accent for headings.',
				usedIn: ['(portfolio)/projects/[slug]/page.tsx'],
			},
		],
	},
	{
		title: 'Animations & Effects',
		items: [
			{
				name: 'FadeInAnimation',
				path: 'components/FadeInAnimation.tsx',
				description: 'Intersection observer fade/slide wrapper.',
				usedIn: ['Shared across home sections'],
			},
			{
				name: 'StaggerAnimation',
				path: 'components/StaggerAnimation.tsx',
				description: 'Parent/child staggered motion wrapper.',
				usedIn: ['Shared across home sections'],
			},
			{
				name: 'text-reveal-wrapper',
				path: 'components/text-reveal-wrapper.tsx',
				description: 'Mask-based text reveal animation.',
				usedIn: ['Hero & headings'],
			},
			{
				name: 'animation/text-wrapper',
				path: 'components/animation/text-wrapper.tsx',
				description: 'Reusable animated text wrapper.',
				usedIn: ['Hero & headings'],
			},
		],
	},
	{
		title: 'Utilities & UI',
		items: [
			{
				name: 'select',
				path: 'components/select.tsx',
				description: 'Custom select built on Radix UI.',
				usedIn: ['Filters / dropdowns'],
			},
			{
				name: 'ui/badge',
				path: 'components/ui/badge.tsx',
				description: 'Styled badge component.',
				usedIn: ['Tags, pills, status chips'],
			},
			{
				name: 'blogs-home-section',
				path: 'components/blogs-home-section.tsx',
				description: 'Blog list cards with avatars.',
				usedIn: ['Home'],
			},
			{
				name: 'projects-home-section',
				path: 'components/projects-home-section.tsx',
				description: 'Project cards grid.',
				usedIn: ['Home'],
			},
			{
				name: 'quick-links-section',
				path: 'components/quick-links-section.tsx',
				description: 'Set of CTA link tiles.',
				usedIn: ['Home'],
			},
		],
	},
	{
		title: 'Icons (SVG)',
		items: [
			{
				name: 'icons pack',
				path: 'components/svg/*.tsx',
				description: 'Custom SVG icons (Arrow, Github, Linkedin, etc.).',
				usedIn: ['Buttons, links, cards'],
			},
		],
	},
]

type ComponentItem = (typeof componentGroups)[number]['items'][number]

export const metadata = {
	title: 'UI Components | Saquib',
	description: 'Gallery of reusable UI components used across the site.',
}

function ComponentCard({ item }: { item: ComponentItem }) {
	return (
		<div className="rounded-2xl border border-black/10 bg-white/60 p-4 shadow-sm backdrop-blur dark:border-white/10 dark:bg-white/5">
			<div className="flex items-center justify-between gap-3">
				<h3 className="text-lg font-semibold text-black dark:text-white">{item.name}</h3>
				<span className="rounded-full bg-black/5 px-3 py-1 text-xs font-medium text-black/70 dark:bg-white/10 dark:text-white/80">
					{item.path}
				</span>
			</div>
			<p className="mt-2 text-sm text-black/70 dark:text-white/70">{item.description}</p>
			<div className="mt-3 flex flex-wrap gap-2 text-xs text-black/60 dark:text-white/60">
				{item.usedIn.map((loc) => (
					<span
						key={loc}
						className="rounded-full border border-black/10 bg-white px-2 py-1 dark:border-white/15 dark:bg-white/5"
					>
						{loc}
					</span>
				))}
			</div>
		</div>
	)
}

export default function UIShowcasePage() {
	return (
		<main className="mx-auto flex max-w-6xl flex-col gap-10 px-4 py-12 sm:px-6 lg:px-8">
			<header className="space-y-2">
				<p className="text-sm uppercase tracking-[0.3em] text-black/60 dark:text-white/60">Design System</p>
				<h1 className="text-4xl font-bold leading-tight text-black dark:text-white">UI Component Gallery</h1>
				<p className="max-w-3xl text-base text-black/70 dark:text-white/70">
					A quick catalog of the reusable components currently used across the site. Use this page
					to spot what exists before adding new UI or to jump into the source files.
				</p>
			</header>

			<div className="grid gap-8">
				{componentGroups.map((group) => (
					<section key={group.title} className="space-y-4">
						<div className="flex items-center justify-between">
							<h2 className="text-2xl font-semibold text-black dark:text-white">{group.title}</h2>
							<span className="text-sm text-black/60 dark:text-white/60">{group.items.length} components</span>
						</div>
						<div className="grid gap-4 md:grid-cols-2">
							{group.items.map((item) => (
								<ComponentCard key={item.name} item={item} />
							))}
						</div>
					</section>
				))}
			</div>
		</main>
	)
}
