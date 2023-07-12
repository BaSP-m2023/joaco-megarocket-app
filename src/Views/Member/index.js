import Aside from 'Components/Shared/Aside';
import styles from './indexMember.module.css';
const MemberUser = () => {
  return (
    <div className={styles.supremeContainer}>
      <Aside page={'home'} />
      <div className={styles.mainContainer}>
        <main data-testid="home-page">
          <section className={styles.home}>
            <article>
              <h1>MEGA ROCKET WEB</h1>
              <p className={styles.welcome}>welcome</p>
              <p>
                Mega Rocket web is a monthly management system for members and trainers so that they
                can dynamically sign up for their activities in the gym.
              </p>
            </article>
            <img
              src={`${process.env.PUBLIC_URL}/assets/images/gym-home.png`}
              alt="Image of the gym"
            />
          </section>
          <section className={styles.features}>
            <h2>Features</h2>
            <div className={styles.featuresContainer}>
              <article>
                <div className={styles.featuresFlex}>
                  <img
                    src={`${process.env.PUBLIC_URL}/assets/images/i-reservation.svg`}
                    alt="shift reservations"
                  />
                  <h3>Shift Reservations</h3>
                </div>
                <p>
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit. Delectus dolorum,
                  corrupti perspiciatis quasi voluptatum quaerat cumque recusandae rem accusantium
                  sit excepturi vero? Facilis totam consequuntur et. Inventore iure quasi
                </p>
              </article>
              <article>
                <div className={styles.featuresFlex}>
                  <img
                    src={`${process.env.PUBLIC_URL}/assets/images/i-scheduling.svg`}
                    alt="membership management"
                  />
                  <h3>Scheduling y Opening Hours</h3>
                </div>
                <p>
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit. Delectus dolorum,
                  corrupti perspiciatis quasi voluptatum quaerat cumque recusandae rem accusantium
                  sit excepturi vero? Facilis totam consequuntur et. Inventore iure quasi
                </p>
              </article>
              <article>
                <div className={styles.featuresFlex}>
                  <img
                    src={`${process.env.PUBLIC_URL}/assets/images/i-management.svg`}
                    alt="scheduling y opening hours"
                  />
                  <h3>Membership Management</h3>
                </div>
                <p>
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit. Delectus dolorum,
                  corrupti perspiciatis quasi voluptatum quaerat cumque recusandae rem accusantium
                  sit excepturi vero? Facilis totam consequuntur et. Inventore iure quasi
                </p>
              </article>
              <article>
                <div className={styles.featuresFlex}>
                  <img
                    src={`${process.env.PUBLIC_URL}/assets/images/i-mail-features.svg`}
                    alt="contact form y suggestions"
                  />
                  <h3>Contact Form y Suggestions</h3>
                </div>
                <p>
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit. Delectus dolorum,
                  corrupti perspiciatis quasi voluptatum quaerat cumque recusandae rem accusantium
                  sit excepturi vero? Facilis totam consequuntur et. Inventore iure quasi
                </p>
              </article>
            </div>
          </section>
          <section className={styles.about}>
            <h2>About Mega Rocket</h2>
            <div className={styles.aboutContainer}>
              <article className={`${styles.aboutFlex} ${styles.flex1}`}>
                <img
                  src={`${process.env.PUBLIC_URL}/assets/images/gym-about.png`}
                  alt="Image of the gym"
                />
                <p>
                  MESSI ipsum dolor sit amet consectetur adipisicing elit. Modi dolorem voluptatum
                  temporibus illo expedita laudantium perferendis suscipit esse voluptate id
                  aspernatur pariatur maxime voluptates nam dolore, sunt doloribus eligendi
                  molestiae?
                </p>
                <button className={styles.button}>Learn more</button>
              </article>
              <article className={`${styles.aboutFlex} ${styles.flex2}`}>
                <img
                  src={`${process.env.PUBLIC_URL}/assets/images/gym-about2.png`}
                  alt="Image of the gym"
                />
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi dolorem voluptatum
                  temporibus illo expedita laudantium perferendis suscipit esse voluptate id
                  aspernatur pariatur maxime voluptates nam dolore, sunt doloribus eligendi
                  molestiae?
                </p>
                <button className={styles.button}>Learn more</button>
              </article>
            </div>
          </section>
          <section className={styles.memberships}></section>
        </main>
      </div>
    </div>
  );
};
export default MemberUser;
