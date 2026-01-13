
import { motion } from 'framer-motion'
export const Section = ({
    children,
    className = "",
    delay = 0,
    duration = 1,
    viewportAmount = 0.2
}: {
    children: React.ReactNode
    className?: string
    delay?: number
    duration?: number
    viewportAmount?: number
}) => {
    return (
        <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: viewportAmount }}
            variants={{
                hidden: {
                    opacity: 0,
                    filter: 'blur(8px)'
                },
                visible: {
                    opacity: 1,
                    filter: 'blur(0px)'
                }
            }}
            transition={{
                duration: duration,
                delay: delay,
                ease: "easeOut"
            }}
            className={className}
        >
            {children}
        </motion.div>
    )
}