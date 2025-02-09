import React from 'react'
import Link from 'next/link'
import StaggerAnimation from '@/components/StaggerAnimation'
import FadeInAnimation from './FadeInAnimation'

const Timeline = () => {
  return (
    <div className="text-base py-10">
      <FadeInAnimation>
        <h1 className="amiko-h1 my-4">Timeline</h1>
      </FadeInAnimation>
      <div className="timeline-container">
        <FadeInAnimation>
          <div>
            Here's a brief timeline of my life events. If you'd like to know
            more about me professionally , check out {'my '}
            <Link
              href={
                'https://drive.google.com/file/d/1a5tBPdkgfUi3My75upcW69VVQD8RPjwD/view?usp=drive_link'
              }
              className="link-text"
            >
              resume
            </Link>
            , or take a sneak peak into my {`life `}
            <Link
              href={'/moments'}
              className="link-text"
            >
              here
            </Link>
            .
          </div>
        </FadeInAnimation>

        <StaggerAnimation delay={0.2}>
          {/* 2021–2025 */}
          <div className="timeline -block py-6 my-4 border-b border-gray-300 dark:border-gray-700">
            <h1 className="timeline-heading">2021–2025</h1>
            <ul className="list-disc txt-light pl-6">
              <li>
                🎓 B.Tech in Electronics and Communication Engineering
              </li>
              <ul className="list-disc pl-6 text-light-2 text-sm">
                <li>
                  {'Student '}
                  <Link href={'https://iiitranchi.ac.in/'} className="link-text">
                    @IIIT Ranchi
                  </Link>
                </li>
                <li>Overall CGPA: 8.97</li>

              </ul>
            </ul>
          </div>

          {/* 2020–2021 */}
          <div className="timeline-block py-6 mb-4 border-b border-gray-300 dark:border-gray-700">
            <h1 className="timeline-heading">2020–2021</h1>
            <ul className="list-disc txt-light pl-6">
              <li>📚 Took a year drop to prepare for JEE</li>
              <ul className="list-disc pl-6 text-light-2 text-sm">
                <li >
                  With a good score I manage to secure a seat in IIIT Ranchi.
                </li>
              </ul>
            </ul>
          </div>

          {/* 2018–2020 */}
          <div className="timeline-block py-6 mb-4 border-b border-gray-300 dark:border-gray-700">
            <h1 className="timeline-heading">2018–2020</h1>
            <ul className="list-disc txt-light pl-6">
              <li>🏫 Completed Post-Matriculation (Class XII)</li>
              <ul className="list-disc pl-6 text-light-2 text-sm">
                <li>Student at Park Mount High School, Patna</li>
                <li>Secured 82% (12th CLass)</li>
              </ul>
            </ul>
          </div>

          {/* 2015–2018 */}
          <div className="timeline-block py-6 mb-4 border-b border-gray-300 dark:border-gray-700">
            <h1 className="timeline-heading">2015–2018</h1>
            <ul className="list-disc txt-light pl-6">
              <li>🌍 Moved to Tanzania</li>
              <ul className="list-disc pl-6 text-light-2 text-sm" >
                <li>Student at Indian School Dar es Salaam</li>
                <li>
                  Achieved Matriculation (Class X) with an aggregate of 87%.
                </li>
              </ul>
            </ul>
          </div>

          {/* 2003–2015 */}
          <div className="timeline-block py-6 mb-4">
            <h1 className="timeline-heading">2003–2015</h1>
            <ul className="list-disc txt-light pl-6">
              <li>👶 Born and Raised in India</li>
            </ul>
          </div>
        </StaggerAnimation>
      </div>
    </div>
  )
}

export default Timeline
