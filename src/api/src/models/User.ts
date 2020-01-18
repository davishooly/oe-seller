// tslint:disable
/**
 * OE API
 * Test description
 *
 * The version of the OpenAPI document: v1
 * Contact: contact@snippets.local
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { exists, mapValues } from '../runtime';
/**
 * 
 * @export
 * @interface User
 */
export interface User  {
    /**
     * 
     * @type {number}
     * @memberof User
     */
    readonly id?: number;
    /**
     * 
     * @type {string}
     * @memberof User
     */
    password: string;
    /**
     * 
     * @type {Date}
     * @memberof User
     */
    lastLogin?: Date;
    /**
     * Designates that this user has all permissions without explicitly assigning them.
     * @type {boolean}
     * @memberof User
     */
    isSuperuser?: boolean;
    /**
     * 
     * @type {string}
     * @memberof User
     */
    email: string;
    /**
     * 
     * @type {string}
     * @memberof User
     */
    firstName?: string;
    /**
     * 
     * @type {string}
     * @memberof User
     */
    lastName?: string;
    /**
     * 
     * @type {Date}
     * @memberof User
     */
    readonly dateJoined?: Date;
    /**
     * 
     * @type {boolean}
     * @memberof User
     */
    isActive?: boolean;
    /**
     * 
     * @type {string}
     * @memberof User
     */
    readonly avatar?: string;
    /**
     * 
     * @type {boolean}
     * @memberof User
     */
    isStaff?: boolean;
}

export function UserFromJSON(json: any): User {
    return {
        'id': !exists(json, 'id') ? undefined : json['id'],
        'password': json['password'],
        'lastLogin': !exists(json, 'last_login') ? undefined : new Date(json['last_login']),
        'isSuperuser': !exists(json, 'is_superuser') ? undefined : json['is_superuser'],
        'email': json['email'],
        'firstName': !exists(json, 'first_name') ? undefined : json['first_name'],
        'lastName': !exists(json, 'last_name') ? undefined : json['last_name'],
        'dateJoined': !exists(json, 'date_joined') ? undefined : new Date(json['date_joined']),
        'isActive': !exists(json, 'is_active') ? undefined : json['is_active'],
        'avatar': !exists(json, 'avatar') ? undefined : json['avatar'],
        'isStaff': !exists(json, 'is_staff') ? undefined : json['is_staff'],
    };
}

export function UserToJSON(value?: User): any {
    if (value === undefined) {
        return undefined;
    }
    return {
        'password': value.password,
        'last_login': value.lastLogin === undefined ? undefined : value.lastLogin.toISOString(),
        'is_superuser': value.isSuperuser,
        'email': value.email,
        'first_name': value.firstName,
        'last_name': value.lastName,
        'is_active': value.isActive,
        'is_staff': value.isStaff,
    };
}


