import {useState,useRef} from 'react';
import {motion} from 'framer-motion';
import emailjs from '@emailjs/browser';

import { styles } from '../style';
import { EarthCanvas } from './canvas';
import { SectionWrapper } from '../hoc';
import { slideIn } from '../utils/motion';



const Contact = () => {
  const formRef = useRef();
  const [form, setForm] = useState({
    name:'',
    email:'',
    message:'',
  })
  const [Loading, setLoading] = useState(false);
  const handleChange = (e) => {
    const {name, value} = e.target;

    setForm({...form, [name]:value})
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    emailjs.send('service_rgf517r', 'template_lk8p02k', {
      from_name: form.name,
      to_name: 'Jimmy',
      from_email: form.email,
      to_email: 'jimmychen760@gmail.com',
      message: form.message,
    },
    '9GjHw3NNZAjhY4vYU'
    )
    .then(()=>{
      setLoading(false);
      alert('Thanks, I will get back to you as soon as possible')
      setForm({
        name:'',
        email:'',
        message:'',
      })
    }, (error) => {
      setLoading(false);
      console.log(error);
      alert('Something went wrong.')
    })
  }

  return (
    <div className='xl:mt-12 xl:flex-row flex-col-reverse flex gap-10 overflow-hidden'>
      <motion.div
        variants={slideIn('left', 'tween', 0.2, 1)}
        className='flex-[0.75] bg-black-100/75 p-8 rounded-2xl'
      >
        <p className={styles.sectionSubText}>Get in touch</p>
        <h3 className={styles.sectionHeadText}>Contact.</h3>
        <p className="sm:text-[14px] text-[10px] text-secondary tracking-wider">Email: jimmychen760@gmail.com</p>
        <p className="sm:text-[14px] text-[10px] text-secondary tracking-wider">Github: JimmyChen760</p>

        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className='mt-12 flex flex-col gap-8'
        >
          <label
            className='flex flex-col'
          >
            <span className='text-white font-medium mb-4'>Your Name</span>
            <input
              type='text'
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Name"
              className='bg-black-100/25 py-4 px-6 placeholder:text-secondary text-white rounded-lg outlined-none border-none font-medium'
            />
          </label>
          <label
            className='flex flex-col'
          >
            <span className='text-white font-medium mb-4'>Your Email</span>
            <input
              type='email'
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Email"
              className='bg-black-100/25 py-4 px-6 placeholder:text-secondary text-white rounded-lg outlined-none border-none font-medium'
            />
          </label>
          <label
            className='flex flex-col'
          >
            <span className='text-white font-medium mb-4'>Your Message</span>
            <textarea
              rows="7"
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="Message"
              className='bg-black-100/25 py-4 px-6 placeholder:text-secondary text-white rounded-lg outlined-none border-none font-medium'
            />
          </label>
          <button
            type='submit'
            className='bg-black-100/25 py-3 px-8 outline-none w-fit text-white font-bold shadow-md shadow-primary rounded-xl'
          >
            {Loading ? 'Sending...' : 'Send'}
          </button>
        </form>
      </motion.div>
      <motion.div
        variants={slideIn('right', 'tween', 0.2, 1)}
        className='xl:flex-1 xl:height-auto md:h-[550px] h-[350px]'
      >
        <EarthCanvas/>
      </motion.div>
    </div>
  )
}

export default SectionWrapper(Contact, 'contact')