export default function ResumePage() {
    return (
        <div className="w-full h-screen">
            <iframe
                src="/assets/resume.pdf"
                width="100%"
                height="100%"
                className="border-0"
                title="My Resume"
            />
        </div>
    );
}