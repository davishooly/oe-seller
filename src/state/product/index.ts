import {
    productsCategoriesRoot,
    sellersProductsVariableDetails,
    sellersProductsVariablesDestroyDelete,
    sellersProductsDelete,
    sellersProductsDetailsRead
} from "api/src/apis";

import { useRequest } from "redux-query-react";
import { useSelector } from "react-redux";


const getProductsCategories = (categories: any) => {
    if (!categories) {
        const config = productsCategoriesRoot({
            offset: 1,
            limit:10
        }, {
            transform: (body: any) => ({rootCategories: body}),
            update: {
                rootCategories: (prev: any, next: any) => next
            }
        })
        return config
    }
    return

};

const deleteProduct = (productId: number, optimistic: any) => {

    const config =  sellersProductsDelete({
            id: productId
        },
        {
            transform: (body: any) => ({
                sellerProducts: body
            }),
            update: {
                sellerProducts: (prev: any, next: any) => {
                    const { results , count  }  = prev
                    const newState = {
                        count: count - 1,
                        results: results.filter((product: any) => product.id !== productId)
                    }
                    return newState
                }
            }
        })
        if (optimistic) {
            config.optimisticUpdate = {
                sellerProducts: (body: any) => body
            };
        }

        return config
};
// TODO - Ensure we can get this from sellersProduct to avoid re-fetch
const useSellerProduct = (id: any) => {
  const currentSellerProduct = useSelector(
    (state: any) => state.entities.currentSellerProduct
  );

  const QueryConfig = sellersProductsDetailsRead(
    {
      id
    },
    {
      transform: (body: any) => ({
        currentSellerProduct: body
      }),
      update: {
        currentSellerProduct: (prev: any, next: any) => next
      },
      force: true
    }
  );

  useRequest(QueryConfig);

  return currentSellerProduct;
};


export { getProductsCategories, deleteProduct, useSellerProduct };
