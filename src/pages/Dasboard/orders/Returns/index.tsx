import React, { useContext } from 'react';
import TableMobile from 'components/Table/tableMobile';
import { TableSection } from '../../../../components/Table/styles';
import { Icon, Table } from 'antd';
import { columns } from './tableColumn';
import ThemeContext from '../../../../providers/themes/ThemeContext';
import { useRequest } from 'redux-query-react';
import { getOrderReturns } from '../../../../state/orders';
import { useWindowSize } from 'react-use';

export default () => {
    const [{ isPending }, refresh] = useRequest(getOrderReturns());

    const { width } = useWindowSize();

    const { themes } = useContext(ThemeContext);

    return (
        <>
            {width > 768 ? (
                <TableSection {...themes}>
                    <div className="head">
                        <span> Order Returns </span>

                        <div className="reload" onClick={refresh}>
                            <Icon type="reload" />
                            Refresh
                        </div>
                    </div>
                    <Table loading={isPending} columns={columns} dataSource={[]} />
                </TableSection>
            ) : (
                <TableMobile {...{ productList: [], title: 'Order Returns', columns }} />
            )}
        </>
    );
};
