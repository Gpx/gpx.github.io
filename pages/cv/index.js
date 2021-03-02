import styles from "./cv.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChrome,
  faLinkedinIn,
  faStickerMule,
} from "@fortawesome/free-brands-svg-icons";
import {
  faEnvelope,
  faMapMarkerAlt,
  faPhone,
  faStar,
  faStarHalf,
} from "@fortawesome/free-solid-svg-icons";

export default function CV() {
  return (
    <article className={styles.cv}>
      <div className={styles.bar}>
        <div className={styles.pictureBox}>
          <img className={styles.pictureBelow} src="me.jpg" />
          <img className={styles.picture} src="me.jpg" />
        </div>

        <dl className={styles.contact}>
          <dt>
            <FontAwesomeIcon icon={faEnvelope} />
          </dt>
          <dd>
            <a href="mailto:polvara@gmail.com">polvara@gmail.com</a>
          </dd>
          <dt>
            <FontAwesomeIcon icon={faPhone} />
          </dt>
          <dd>+34 626 142 094</dd>
          <dt>
            <FontAwesomeIcon icon={faLinkedinIn} />
          </dt>
          <dd>
            <a href="https://www.linkedin.com/in/polvara/?locale=en_US">
              linkedin.com/in/polvara
            </a>
          </dd>
          <dt>
            <FontAwesomeIcon icon={faChrome} />
          </dt>
          <dd>
            <a href="https://www.polvara.me">polvara.me</a>
          </dd>
          <dt>
            <FontAwesomeIcon icon={faMapMarkerAlt} />
          </dt>
          <dd>Barcelona, Spain</dd>
        </dl>

        <ul className={styles.expertise}>
          <li>
            JavaScript
            <span className={styles.stars}>
              <FontAwesomeIcon icon={faStar} />
              <FontAwesomeIcon icon={faStar} />
              <FontAwesomeIcon icon={faStar} />
              <FontAwesomeIcon icon={faStar} />
              <FontAwesomeIcon icon={faStar} />
            </span>
          </li>
          <li>
            React
            <span className={styles.stars}>
              <FontAwesomeIcon icon={faStar} />
              <FontAwesomeIcon icon={faStar} />
              <FontAwesomeIcon icon={faStar} />
              <FontAwesomeIcon icon={faStar} />
              <FontAwesomeIcon icon={faStar} />
            </span>
          </li>
          <li>
            NodeJS
            <span className={styles.stars}>
              <FontAwesomeIcon icon={faStar} />
              <FontAwesomeIcon icon={faStar} />
              <FontAwesomeIcon icon={faStar} />
              <FontAwesomeIcon icon={faStar} />
              <FontAwesomeIcon icon={faStarHalf} />
            </span>
          </li>
        </ul>

        <ul className={styles.education}>
          <li>
            Bachelor's degree, Informatics
            <br />
            <em style={{ fontWeight: 100 }}>
              Università degli Studi di Milano-Bicocca
            </em>
          </li>
          <li>
            High School Diploma, Informatic Specialization
            <br />
            <em style={{ fontWeight: 100 }}>I.T.I.S. S.Ten.Vasc. A. Badoni</em>
          </li>
        </ul>
      </div>

      <div className={styles.content}>
        <h1 className={styles.title}>
          <FontAwesomeIcon style={{ color: "#fff" }} icon={faStickerMule} />
          <span className={styles.name}>giorgio</span>
          <span className={styles.surname}>polvara</span>
        </h1>

        <h2 className={styles.subtitle}>Profile</h2>
        <p className={styles.profile}>
          I'm a web developer and engineering manager with more than 15 years of
          experience building different kinds of applications and coordinating
          teams. I have worked with small and bigger companies and a vast
          spectrum of technologies from DBs to CSS and everything in between. I
          always try to learn new things—and share my discoveries—to get the
          best tool for the job.
        </p>
        <p className={styles.profile}>
          I'm looking for a company built on a strong culture where people
          behave as professionals but remember that we're all humans.
        </p>

        <h2 className={styles.subtitle}>Experience</h2>
        <div className={styles.experience}>
          <div className={styles.role}>Engineering Manager</div>
          <span className={styles.company}>Toptal</span>
          <span className={styles.dates}>November 2020 - Present</span>
          <p className={styles.description}>
            At Toptal, I manage the Core Tools team to provide reliable and
            useful tools to more than 700 hundred internal employees. I also
            mentor my team members helping them thrive in their careers.
          </p>
        </div>

        <div className={styles.experience}>
          <div className={styles.role}>
            Engineering Manager / Squad Leader / Senior Full Stack Developer
          </div>
          <span className={styles.company}>TravelPerk</span>
          <span className={styles.dates}>August 2016 - May 2020</span>
          <p className={styles.description}>
            I joined TravelPerk when there were only 15 employees and left when
            there were almost 500. My role changed and grew with the company. I
            set up and coordinated the whole front-end infrastructure, making it
            ready to scale to serve hundreds of users per day. I documented the
            best practices and shared them with the rest of the team, even by
            organizing internal workshops and overseeing new team members'
            onboarding. As a Squad Leader, I guided my team in finding the best
            technical solution to achieve our OKRs. At the same time, I
            communicated with Product Owners, Managers, other Squad Leaders, and
            various stakeholders to ensure everyone was aligned. During this
            period, I also started interviewing candidates for different
            technical positions.
          </p>
        </div>

        <div className={styles.experience}>
          <div className={styles.role}>
            Senior Fullstack Developer and Frontend Team Coordinator
          </div>
          <span className={styles.company}>Fundbase Inc.</span>
          <span className={styles.dates}>April 2014 - July 2016</span>
          <p className={styles.description}>
            At Fundbase, I helped build a SPA to manage a database of more than
            10.000 hedge funds. I coordinated the front-end team in developing
            our React, AngularJS, and Ruby on Rails applications.
          </p>
        </div>

        <div className={styles.experience}>
          <div className={styles.role}>Junior Developer and R&amp;D</div>
          <span className={styles.company}>Trizero S.r.l.</span>
          <span className={styles.dates}>December 2006 - June 2013</span>
          <p className={styles.description}>
            I was tasked with researching and experimenting with new
            technologies and apply them to live websites. As a result, I got the
            opportunity to learn various languages and platforms. I also shared
            discoveries with my colleagues, via presentations or by writing
            tutorials.
          </p>
        </div>
      </div>
    </article>
  );
}
