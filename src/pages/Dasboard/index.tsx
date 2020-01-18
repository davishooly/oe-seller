import React from 'react';
// import { Link } from "react-router-dom";
import Menu from './menu';
import {Avatar, Table} from "antd";

import {columns} from "./dashboardFixtures/tableColumns";
import dataSources from "./dashboardFixtures/dataSources";
import Container from "../../components/common/container";

import {ProductContainer, TableSection} from "../../components/table/styles";
import {CardSection} from "./inventory/manageInventory";
import {details, orderSummary, fullFilledSummary } from "./dashboardFixtures/details";
import {renderCardContent, RenderCard } from "../../components/Card";
import { AnalyticsSection, Span, Div, DivCard } from './styles'
import {BarChart} from "components/charts";


// const user: any  = JSON.parse(localStorage.getItem('user'));

const Dashboard: React.FC<any> = () => {

  const renderProductContent = (data: any) => (
      <ProductContainer dashboard >
        <Avatar shape="square" size={44} icon="shopping"/>
        <div>
        <span>LG SK8Y Sound bar system for home theater</span>
          <div className="product__details">
            <span>SKU: LG2367</span>
            <span> Price: 51,423.56 </span>
          </div>
        </div>
      </ProductContainer>
  );

  const data = dataSources.map(data => {
    return {
      ...data,
      product: renderProductContent(data)
    }
  });

    return (
        <>
            <Menu>
                <li>Hey {user ? user.user.name: ''}!.Its great to see you again.</li>
            </Menu>
          <Container>
            <AnalyticsSection>
                <RenderCard style={{color: "#28A197", width:282, height: 479}}>
                  <Span>Your Orders </Span>
                  <div className="summary">
                    {
                      orderSummary.map(summary => (
                          <div className="summary__section">
                            <span> {summary.status}</span>
                            <span> {summary.amount} </span>
                          </div>
                      ))
                    }
                  </div>
                  <div>
                    {fullFilledSummary.map(summary =>  (
                        <div className="fulfilled">
                          <Span> { summary.fullFilled === "seller" ? "Seller fulfilled" : "Fulfilled by OE" }</Span>
                          <Div>
                            <span style={{paddingTop: 4, paddingBottom:4}}> in last day  </span>
                            <span>{summary.day }</span>
                          </Div>
                          <Div>
                            <span style={{paddingTop: 4, paddingBottom:4}}> in last 7 days </span>
                            <span>{summary.week }</span>
                          </Div>
                        </div>
                    ))}
                    <div className="link__orders">
                      <Link to="/d/orders">
                      <Span> View your orders </Span>
                      </Link>
                    </div>
                  </div>
                </RenderCard>
                <RenderCard style={{color: "#FFFFFF", width:510, height: 479}}>
                  <Span style={{color:"#203341"}}>Sales Summary </Span>
                   <BarChart/>
                </RenderCard>
              <div className="payments">
              <RenderCard style={{color: "#7073AF", width:354, height: 277}}>
                <Span> Payment Summary </Span>
                <div className="payments__summary">
                  <div>
                <Div>
                  <span style={{paddingTop: 4, paddingBottom:4}}> Most recent payment </span>
                  <span> KES 0 </span>
                </Div>
                    <p>Disbursed to your bank account ending in 8970 on August 10, 2019</p>
                  </div>

                <Div>
                  <span style={{paddingTop: 4, paddingBottom:4}}> Balance </span>
                  <span> KES 0 </span>
                </Div>
                </div>
                <div className="link__orders">
                  <Span> View Payment Summary </Span>
                </div>
              </RenderCard>

                <RenderCard style={{color: "#DB6E9B", width:354, height: 182}}>
                  <Span> Manage Disputes </Span>
                  <div className="disputes">
                  <Div>
                    <span style={{paddingTop: 4, paddingBottom:4}}> pending </span>
                    <span> 0 </span>
                  </Div>
                  <Div>
                    <span style={{paddingTop: 4, paddingBottom:4}}> resolve </span>
                    <span> 0 </span>
                  </Div>
                  </div>
                  <div className="link__orders">
                      <Span> View your dispute logs </Span>
                  </div>
                </RenderCard>

              </div>
            </AnalyticsSection>


            <CardSection>
              {details.map((detail, i) => (
                  <RenderCard key={i.toString()} style={{color: detail.backgroundColor, width:282, height:"auto"}}>
                    <Span> { detail.title } </Span>
                    { detail.percentage ?
                        <DivCard>
                          <span style={{paddingTop: 4, paddingBottom:4}}> {detail.percentage } </span>
                          <span> increase{ detail.increase }% </span>
                        </DivCard>
                        :
                        <div>
                        <Div>
                          <span style={{paddingTop: 4, paddingBottom:4}}> Cancellation rate </span>
                          <span> { detail.increase } </span>
                       </Div>
                        <Div>
                         <span style={{paddingTop: 4, paddingBottom:4}}> Created in Last 14 days </span>
                          <span> { detail.created } </span>
                      </Div>
                        </div>
                    }
                  </RenderCard>
              ))}
            </CardSection>
          <TableSection>
            <div className="head">
              <span> Best Selling Products </span>
            </div>
            <Table columns={columns} dataSource={[]}/>
          </TableSection>
          </Container>
        </>
    );
};

export default Dashboard;
