import { faker } from '@faker-js/faker';
import { set, sub } from 'date-fns';

export const CONTACTS = [
  {
    id: faker.datatype.uuid(),
    photoURL: '/assets/images/avatars/avatar_1.jpg',
    displayName: 'Jayvion Simon',
    activeStatus: 1,
  },
  {
    id: faker.datatype.uuid(),
    photoURL: '/assets/images/avatars/avatar_2.jpg',
    displayName: 'Lucian Obrien',
    activeStatus: 5,
    lastActive: sub(new Date(), { days: 1, hours: 3, minutes: 30 }),
  },
  {
    id: faker.datatype.uuid(),
    photoURL: '/assets/images/avatars/avatar_3.jpg',
    displayName: 'Deja Brady',
    activeStatus: 2,
  },
  {
    id: faker.datatype.uuid(),
    photoURL: '/assets/images/avatars/avatar_5.jpg',
    displayName: 'Harrison Stein',
    activeStatus: 1,
  },
  {
    id: faker.datatype.uuid(),
    photoURL: '/assets/images/avatars/avatar_6.jpg',
    displayName: 'Reece Chung',
    activeStatus: 3,
    lastActive: set(new Date(), { hours: 10, minutes: 30 }),
  },
  {
    id: faker.datatype.uuid(),
    photoURL: '/assets/images/avatars/avatar_7.jpg',
    displayName: 'Lainey Davidson',
    activeStatus: 5,
  },
  {
    id: faker.datatype.uuid(),
    photoURL: '/assets/images/avatars/avatar_8.jpg',
    displayName: 'Cristopher Cardenas',
    activeStatus: 5,
  },
  {
    id: faker.datatype.uuid(),
    photoURL: '/assets/images/avatars/avatar_9.jpg',
    displayName: 'Melanie Noble',
    activeStatus: 5,
  },
];
