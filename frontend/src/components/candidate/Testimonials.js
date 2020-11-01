import React, { useState } from 'react';
import Slider from 'react-slick';
import Hero from '../home/Hero';

const Testimonials = () => {
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 3000,
  };

  const [testimonies] = useState([
    {
      id: '1',
      candidate: 'Mrs. Sarah Jane',
      testimony:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. A voluptate debitis, obcaecati cumque nostrum eveniet perspiciatis est distinctio inventore non, autem totam sapiente quod aliquid sequi neque repellat! Ab, hic.Lorem ipsum dolor sit amet consectetur adipisicing elit. A voluptate debitis, obcaecati cumque nostrum eveniet perspiciatis est distinctio inventore non, autem totam sapiente quod aliquid',
    },
    {
      id: '2',
      candidate: 'Mr. John Doe',
      testimony:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. A voluptate debitis, obcaecati cumque nostrum eveniet perspiciatis est distinctio inventore non, autem totam sapiente quod aliquid sequi neque repellat! Ab, hic.Lorem ipsum dolor sit amet consectetur adipisicing elit. A voluptate debitis, obcaecati cumque nostrum eveniet perspiciatis est distinctio inventore non, autem totam sapiente quod aliquid',
    },
    {
      id: '3',
      candidate: 'Mr. Sam Smith',
      testimony:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. A voluptate debitis, obcaecati cumque nostrum eveniet perspiciatis est distinctio inventore non, autem totam sapiente quod aliquid sequi neque repellat! Ab, hic.Lorem ipsum dolor sit amet consectetur adipisicing elit. A voluptate debitis, obcaecati cumque nostrum eveniet perspiciatis est distinctio inventore non, autem totam sapiente quod aliquid',
    },
  ]);

  return (
    <Hero>
      <div className='container text-white col-md-10 m-auto'>
        <Slider {...settings}>
          {testimonies.map((item) => (
            <div key={item.id}>
              <p className='mt-5'>{item.testimony}</p>
              <h5 className='mt-3 mb-4 text-center'>{item.candidate}</h5>
            </div>
          ))}
        </Slider>
      </div>
    </Hero>
  );
};

export default Testimonials;
