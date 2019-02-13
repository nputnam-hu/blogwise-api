import { Organization, User, Model } from '../models'

const mockBlog = {
  name: 'Kaldi',
  title: 'The KALDI Blog',
  description:
    'We want to truly empower the communities that bring amazing coffee to you. That’s why we reinvest 20% of our profits into farms, local businesses and schools everywhere our coffee is grown.',
  siteUrl: 'https://nervous-ardinghelli-e6d896.netlify.com',
  logoUri:
    'https://megaphone-logo-uploads.s3.amazonaws.com/1549478496268_logo.svg',
  companyHexcode: '#fff',
  social: {
    mainSite: 'https://www.kaldi.io',
    twitter: 'noah_putnam',
    facebook: 'noah.putnam.1',
  },
  tags: {
    flavors: { name: 'Flavors', description: 'Our tastiest posts' },
    testing: {
      name: 'Testing',
      description: 'Just testing this one folks',
    },
    brewing: {
      name: 'Brewing',
      description: 'Our latest on how to brew shit',
    },
    chemex: {
      name: 'Chemex',
      description: 'The latest on our world class coffee maker',
    },
    hacking: {
      name: 'Hacking',
      description: 'Info on our technical stack',
    },
  },
}
