import GenericDB from './generic-api';

export default class UsersDB extends GenericDB {
    constructor() {
        super('users');
    }
}