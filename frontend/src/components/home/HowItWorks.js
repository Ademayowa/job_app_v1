import React, { useState } from 'react';
import { MdSearch, MdPeople, MdNotifications } from 'react-icons/md';
import Title from './Title';

const HowItworks = () => {
  const [works] = useState([
    {
      id: '1',
      icon: <MdSearch size={28} color='#ff6633' />,
      title: 'Search Jobs',
      info:
        'Lorem ipsum dolor sit amet, consectetur adipisicing elit.Dignissimos dolorum, nulla voluptatem iure beatae.',
    },
    {
      id: '2',
      icon: <MdPeople size={28} color='#ff6633' />,
      title: 'Apply for jobs',
      info:
        'Lorem ipsum dolor sit amet, consectetur adipisicing elit.Dignissimos dolorum, nulla voluptatem iure beatae.',
    },
    {
      id: '3',
      icon: <MdNotifications size={28} color='#ff6633' />,
      title: 'Get Contacted',
      info:
        'Lorem ipsum dolor sit amet, consectetur adipisicing elit.Dignissimos dolorum, nulla voluptatem iure beatae.',
    },
  ]);

  return (
    <div className='container text-center how-it-works'>
      <Title title='how it works' />
      <main style={grid}>
        {works.map((work) => (
          <article key={work.id}>
            <p>{work.icon}</p>
            <h4>{work.title}</h4>
            <p>{work.info}</p>
          </article>
        ))}
      </main>
    </div>
  );
};

const grid = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(255px, 1fr))',
  gridGap: '2rem',
};

export default HowItworks;
