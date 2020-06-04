import React, {useCallback, useState} from "react";
import {renderCardContent} from "components/Card";
import TableSection from 'components/Table'
import styled from "styled-components";
import details from "components/Card/cardContent";
import {useMutation, useRequest} from "redux-query-react";
import {useSelector} from "react-redux";
import { getSellerProducts } from '../../../state/seller';
import moment from "moment";
import {ListingContainer, ProductContainer} from "../../../components/Table/styles";
import {Avatar, Checkbox, Icon, Switch} from "antd";
import {Link} from "react-router-dom";
import {deleteProduct} from "../../../state/product";

export const CardSection = styled.section`
 display: flex;
 justify-content: space-between;
 width: 97.09%;
`;

const ManageInventory = () => {

    const [{isFinished, isPending: productFetchPending, status}, refresh] = useRequest(getSellerProducts());
    const sellerProducts = useSelector((state: any) => state.entities.sellerProducts);
    const [selectedProduct, setSelectedProduct]: any = useState([]);


    const [{ isPending: deletePending}, deleteProducts] = useMutation((optimistic) => deleteProduct(selectedProduct[0].id, optimistic));

    const handleDeleteProduct = useCallback(optimistic => {
        deleteProducts(optimistic).then(( response: any) => {
            if(response.status ===  204){
                setSelectedProduct([])
                // refresh();
            }
        })
    }, [deleteProducts]);

    if (!isFinished && status !== 200 && !sellerProducts) {
        return (
            <>
                loading.......
            </>
        )
    }

    let productList: Array<any> = [];

    const confirm = (e:any) => {
        e.preventDefault();
        handleDeleteProduct(e)
    };


    const onChange = (e: any) => {
        const {value, checked} = e.target;
        const products = Object.assign([], selectedProduct);
        checked ?
            setSelectedProduct([...products, value])
            :
            setSelectedProduct(products.filter((product: any) => product.id !== value.id));
    };


    const renderListingContent = (checked: boolean, id: any) => (
        <ListingContainer>
            <Switch
                defaultChecked={checked}
                onChange={()=>{ console.log()}}
                checkedChildren="on"
                unCheckedChildren="off"
            />
            <Link to={`/dashboard/inventory/edit/${id}`}>
                <Icon type="edit"/>
            </Link>
            <Icon type="eye"/>
        </ListingContainer>
    );

    const renderProductContent = (product: any) => (
        <ProductContainer>
            <Checkbox value={product} onChange={onChange}/>
            <Avatar shape="square" size={44} icon="shopping"/>
            <span>{product.name} </span>
        </ProductContainer>
    );

    sellerProducts && sellerProducts.results.forEach(({ product }: any) => {
        if (product) {
            const {id, createdOn, name, variationVariables} = product;

            variationVariables.forEach((variable: any) => {
                const {values, pk} = variable;

                values.forEach((value: any) => {
                    const {selling_price, sku, in_stock,} = value;
                    productList.push({
                        key: pk,
                        date: moment(createdOn).format('Do MMMM YYYY'),
                        price: Number(selling_price),
                        stock: in_stock,
                        status: !product.deleted ? "Live" : 'Unlisted',
                        sale: Number(selling_price),
                        productName: name,
                        product: renderProductContent(product),
                        listing: !product.deleted
                            ? renderListingContent(false, id)
                            : renderListingContent(true, id)
                    })
                })
            });
        }
    });

    return (
        <div>
            <CardSection>
                {details.map((detail: any, i: { toString: () => any; }) => (
                    renderCardContent(detail, i.toString(), 340)
                ))}
            </CardSection>
            < TableSection { ...{productList,
                productFetchPending,
                deletePending,
                refresh ,
                count: sellerProducts && sellerProducts.count,
                selectedProduct,
                confirm }}
            />
        </div>
    )
};

export default ManageInventory;

