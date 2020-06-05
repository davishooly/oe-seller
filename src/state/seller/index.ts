import {sellersCreate, sellersProductsList, sellersRead, sellersUpdate } from "api/src/apis";


const createSeller = (customerDetails: any) => {
    return  sellersCreate({
        data: {
            owner: {
                password: customerDetails.password,
                email: customerDetails.email,
                firstName: customerDetails.firstname,
                lastName: customerDetails.lastname,
                username: customerDetails.username
            },
            bank: {
                name:customerDetails.bankName,
                accNumber: customerDetails.bankAccountNumber,
                location: customerDetails.bankLocation
            },
            address: {
                street:customerDetails.businessNameLocation,
                city:customerDetails.town,
                name: customerDetails.businessNameLocation
            },
            logo: '',
            businessName: customerDetails.businessName,
            phoneNumber: customerDetails.phone,
            name: customerDetails.displayName
        },
    }, {
        update: () => {
        },
    })
};


const updateSeller = ( id: any, customerDetails: any) => {

    console.log({customerDetails})
    const config = sellersUpdate({
        id,
        data: {
            owner: {
                email: customerDetails.owner.email,
                firstName: customerDetails.owner.firstName,
                lastName: customerDetails.owner.lastName,
                username: customerDetails.owner.username
            },
            bank: {
                name:customerDetails.bank.name,
                accNumber: customerDetails.bank.accNumber,
                location: customerDetails.bank.location
            },
            address: {
                street:customerDetails.address.street,
                city:customerDetails.address.city,
                name: customerDetails.address.name
            },
            logo: '',
            businessName: customerDetails.businessName,
            phoneNumber: customerDetails.phone,
            name: customerDetails.displayName
        },
    });
    return config;
};


const getSellerProducts = (param: any) => {
    const config = sellersProductsList({
        ...param,
    }, {
        transform: (body: any) => ({
            sellerProducts: body
        }),
        update: {
            sellerProducts: (prev: any, next: any) => next
        }
    })

    return config;
};



const readSeller = (id: any) => {
    const config = sellersRead ({
        id
    },{
        transform: (body: any) => ({
            sellerInfo: body
        }),
        update: {
            sellerInfo: (prev: any , next: any) => next
        }

    });
    return config;
};


export { createSeller, getSellerProducts, readSeller, updateSeller };