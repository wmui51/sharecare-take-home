import Image from 'next/image';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Button from '@mui/material/Button';
import ExpandMore from '@mui/icons-material/ExpandMore';

import styles from './page.module.css';
import SignUpForm from './components/SignUpForm';

export default function Home() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.leftColumn}>
        <div className={styles.heroWrapper}>
          <Image
            alt="Hero image"
            height={1080}
            src="/7575c952-b801-4b49-863e-3fa4ebb0cf99_d.png"
            width={960}
          />
        </div>
      </div>
      <div className={styles.rightColumn}>
        <header className={styles.header}>
          <Image alt="Hero image" height={30} src="/logo.png" width={130} />
          <Button
            size="small"
            variant="outlined"
            sx={{
              backgroundColor: '#fff',
              borderColor: '#00bfa5',
              color: '#000',
              textTransform: 'initial'
            }}
          >
            How it works
          </Button>
        </header>
        <h1 className={styles.rightColumnHeader}>Sign up</h1>
        <form className={styles.formWrapper} id="sign-up-form">
          <SignUpForm />
        </form>
        <div className={styles.termsWrapper}>
          <Accordion
            elevation={0}
            square
            sx={{
              backgroundColor: 'transparent',
              border: 0,
              margin: '0 auto',
              maxWidth: '320px'
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMore />}
              aria-controls="panel1-content"
              id="panel1-header"
            >
              <p className={styles.terms}>By signing up, I agree to the <a href="#" title="Offer terms">Offer Terms</a></p>
            </AccordionSummary>
            <AccordionDetails>
              <p className={styles.terms}>
              I agree to the Offer Terms and understand I am creating a Sharecare consumer account. I agree to the Sharecare Privacy Policy, Terms, Consumer Health Data Privacy Policy, and, if applicable to me, the Privacy Notice for California Residents. I consent to Sharecare’s collecting and sharing of any health information I may provide, for the purposes listed in the Consumer Health Data Privacy Policy and Privacy Policy. I agree to receive emails, offers, alerts, and other notices. I understand that I can opt-out of marketing communications at any time.
              </p>
            </AccordionDetails>
          </Accordion>
        </div>
      </div>
    </div>
  );
}
