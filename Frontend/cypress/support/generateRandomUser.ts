import { faker } from '@faker-js/faker';

export const createRandomUser: () => {
    name: string;
    email: string;
    password: string;
} = () => {
    return {
        name: faker.name.fullName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
    };
};
