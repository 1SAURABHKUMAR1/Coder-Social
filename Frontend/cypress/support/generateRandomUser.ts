import { faker } from '@faker-js/faker';

export const createRandomUser = (): {
    name: string;
    email: string;
    password: string;
} => {
    return {
        name: faker.name.fullName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
    };
};

export const createRandomName = (): {
    name: string;
    bio: string;
    portfolio: string;
    work: string;
    education: string;
    location: string;
} => {
    return {
        name: faker.name.fullName(),
        bio: faker.lorem.sentence(10),
        portfolio: faker.image.abstract(),
        work: faker.word.adverb(),
        education: faker.word.adverb(),
        location: faker.address.cityName(),
    };
};

export const createPost = (): {
    title: string;
    tag: string;
    description: string;
} => {
    return {
        title: faker.lorem.sentence(5),
        tag: faker.lorem.word(),
        description: faker.lorem.sentences(1),
    };
};

export const generateComment = (): {
    comment: string;
} => {
    return {
        comment: faker.lorem.word(),
    };
};
