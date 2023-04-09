import style from "./contact.module.scss";
import { Card } from "../../components/card/Card";
import { FaEnvelope, FaPhoneAlt, FaTwitter } from "react-icons/fa";
import {GoLocation} from 'react-icons/go'
import { useRef } from 'react';
import emailjs from '@emailjs/browser';
import { toast } from "react-toastify";



const Contact = () => {

  const form = useRef();

  const sendEmail = (e:any) => {
  e.preventDefault();

  emailjs.sendForm(import.meta.env.VITE_REACT_APP_EMAILJS_SERVICE_ID, 'template_q5oxrcm', form.current!, '2Z0mlE3kq0KetsF0-')
    .then((result) => {
      toast.success("Message sent successfully")
    }, (error) => {
      toast.error(error.text)
    });
    e.target.reset()
}

  return (
    <section>
      <div className={`container ${style.contact}`}>
        <h2>Contact Us</h2>
        <div className={style.section}>
          <form ref={form} onSubmit={sendEmail}>
            <Card cardClass={style.card}>
              <label>Name:</label>
              <input
                type="text"
                name="user_name"
                placeholder="Full Name"
                required
              />
              <label>Email:</label>
              <input
                type="email"
                name="user_email"
                placeholder="Active Email"
                required
              />
              <label>Subject:</label>
              <input
                type="text"
                name="subject"
                placeholder="Subject"
                required
              />
              <label>Your Message:</label>
              <textarea name="message" cols={30} rows={10} required></textarea>
              <button type="submit" className="--btn --btn-primary">Send Message</button>
            </Card>
          </form>
          <div className={style.details}>
              <Card cardClass={style.card2}>
                <h3>Our Contact Information</h3>
                <p>Fill the form or contact us via other channels listed below</p>
                <div className={style.icons}>
                  <span>
                    <FaPhoneAlt/>
                    <p>+92 333 3248521</p>
                  </span>
                  <span>
                    <FaEnvelope/>
                    <p>support@edukaan.com</p>
                  </span>
                  <span>
                    <GoLocation/>
                    <p>+92 333 3248521</p>
                  </span>
                  <span>
                    <FaTwitter/>
                    <p>@eDukaan</p>
                  </span>
                </div>
              </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
