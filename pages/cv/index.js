import styles from "./cv.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedinIn } from "@fortawesome/free-brands-svg-icons";
import {
  faCode,
  faEnvelope,
  faMapMarkerAlt,
} from "@fortawesome/free-solid-svg-icons";

function Job({ title, company, from, to, children }) {
  return (
    <div className={styles.experience}>
      <h3>{title}</h3>
      <span>
        {company} | {from} - {to}
      </span>
      {children}
    </div>
  );
}

function Page({ children }) {
  return <div className={styles.page}>{children}</div>;
}

function Sidebar({ children }) {
  return <div className={styles.sidebar}>{children}</div>;
}

function Content({ children }) {
  return <div className={styles.content}>{children}</div>;
}

function BarSection({ children, title }) {
  return (
    <div className={styles.barSection}>
      <h2>{title}</h2>
      {children}
    </div>
  );
}

function BarSectionItem({ title, location, description = "" }) {
  return (
    <div className={styles.barSectionItem}>
      <h3>{title}</h3>
      <span>{location}</span>
      <span>{description}</span>
    </div>
  );
}

function IconItem({ icon, text }) {
  return (
    <div className={styles.iconItem}>
      <FontAwesomeIcon icon={icon} />
      <span>{text}</span>
    </div>
  );
}

export default function CV() {
  return (
    <>
      <Page>
        <Sidebar>
          <img src="me.jpg" />

          <h1>
            <span>
              Giorgio <span>(He/Him)</span>
            </span>
            <span>Polvara</span>
            <span>Web Developer</span>
          </h1>

          <BarSection title="Key Points">
            <ul>
              <li>15+ years of experience</li>
              <li>7+ years working with React</li>
              <li>Strong knowledge of JS and the Web platform in general</li>
              <li>Experience both as a single contributor and as a manager</li>
              <li>Passionate about teaching and mentoring</li>
              <li>
                Interested in all the steps of building a successful product,
                especially defining the UX
              </li>
              <li>Advocate for good testing principles</li>
            </ul>
          </BarSection>
        </Sidebar>

        <Content>
          <h2>About me</h2>
          <p>
            I&rsquo;m Giorgio, a Frontend Engineer with over 15 years of
            experience. I led teams to build many different kinds of
            applications. I have worked with small and bigger companies and a
            vast spectrum of technologies, from DBs to CSS and everything in
            between. I have experience with agile methodologies and planning,
            delivering, and monitoring technical roadmaps. I always try to learn
            new things&mdash;and share my discoveries&mdash;to get the best tool
            for the job.
          </p>
          <p>
            I&rsquo;m looking for an ambitious company built on a strong culture
            where people behave as professionals but remember that we are
            <br />
            all humans.
          </p>

          <h2>Experience</h2>
          <Job
            title="Tech Lead"
            company="Wallapop"
            from="February 2023"
            to="Present"
          >
            <p>
              As Frontend Tech Lead at Wallapop, my role is empowering our
              developers, identifying and eliminating roadblocks, and enhancing
              our workflow to boost productivity. I have created a comprehensive
              roadmap for our Frontend team, encompassing our objectives for the
              next year&mdash;from technical improvements to implementing a more
              effective on-call rotation, post-mortem strategy, and more. This
              work aims to support our service in meeting the demands and
              expectations of our millions of monthly users.
            </p>
          </Job>
          <Job
            title="Staff engineer"
            company="Amenitiz"
            from="January 2022"
            to="February 2023"
          >
            <p>
              At Amenitiz, I took the lead on improving the whole frontend
              infrastructure while improving some of the core products and
              mentoring the team.
            </p>
            <ul>
              <li>Architecting the new frontend as a React application.</li>
              <li>
                Rebuilding the Website builder functionality to decrease server
                load and improve the overall experience for our users.
              </li>
              <li>Interviewing candidates for frontend positions.</li>
            </ul>
          </Job>

          <Job
            title="Engineering Manager"
            company="Toptal"
            from="November 2020"
            to="December 2021"
          >
            <p>
              At Toptal, I directly managed a team of nine developers with
              different backgrounds (BE, FE, and QA). I mentored each team
              member to make sure they can make the most out of their careers
              while making the team better. In addition, I collaborated with our
              Product Manager and all the other stakeholders (directors,
              managers, design, sales&hellip;) to ensure our delivery plans were
              aligned with the company&rsquo;s requirements. I&rsquo;ve also
              been active in the various phases of the interviewing process.
            </p>
          </Job>
        </Content>
      </Page>
      <Page>
        <Sidebar>
          <BarSection title="Contact">
            <IconItem icon={faEnvelope} text="polvara@gmail.com" />
            <IconItem icon={faLinkedinIn} text="linkedin.com/in/polvara" />
            <IconItem icon={faCode} text="polvara.me" />
            <IconItem icon={faMapMarkerAlt} text="Barcelona, Spain" />
          </BarSection>

          <BarSection title="Education">
            <BarSectionItem
              title="Bachelor&rsquo;s degree, Informatics"
              location="Università degli Studi di Milano-Bicocca"
            />

            <BarSectionItem
              title="High School Diploma, Informatic Specialization"
              location="I.T.I.S. S.Ten.Vasc. A. Badoni"
            />
          </BarSection>

          <BarSection title="Volunteer">
            <BarSectionItem
              title="Instructor"
              location="MigraCode"
              description="Teaching refugees and migrants how to code, and help them prepare for the job market."
            />
          </BarSection>
        </Sidebar>

        <Content>
          <Job
            title="Engineering manager / Squad Leader / Senior full stack developer"
            company="TravelPerk"
            from="August 2016"
            to="May 2020"
          >
            <p>
              I joined TravelPerk when there were only 15 employees and left
              when there were almost 500. My role changed and grew with the
              company. I set up and coordinated the whole frontend
              infrastructure, making it ready to scale to serve hundreds of
              users per day.
            </p>
            <p>
              I documented the best practices and shared them with the rest of
              the team, even by organizing internal workshops and overseeing new
              team members&rsquo; onboarding. As an Engineering Manager and
              Squad Leader, I guided my team in finding the best technical
              solutions to achieve our OKRs. At the same time, I communicated
              with Product Owners, Managers, other Squad Leaders, and various
              stakeholders to ensure everyone was aligned. During this period, I
              also interviewed candidates for different technical positions.
            </p>
          </Job>

          <Job
            title="Senior fullstack developer and frontend team coordinator"
            company="Fundbase"
            from="April 2014"
            to="July 2016"
          >
            <p>
              At Fundbase, I helped build a SPA to manage a database of more
              than 10,000 hedge funds. I coordinated the frontend team in
              developing our React, AngularJS, and Ruby on Rails applications.
            </p>
          </Job>

          <Job
            title="Junior developer and R&amp;D"
            company="Trizero"
            from="December 2006"
            to="June 2013"
          >
            <p>
              I was tasked with researching and experimenting with new
              technologies and applying them to live websites. As a result, I
              got the opportunity to learn various languages and platforms. I
              also shared discoveries with my colleagues via presentations or
              writing coding tutorials.
            </p>
          </Job>
        </Content>
      </Page>
    </>
  );
}
