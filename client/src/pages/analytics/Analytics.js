import React, { useEffect, useContext } from 'react';
import styled from 'styled-components';

import LinePlot from '../../components/charts/line-plot';

import { WorkspaceContext, createWorkspace } from '../../util/workspace-util';

const Chart = styled.div`
    position: absolute;
    top: 10%;
    left: 10%;
`;

const Analytics = ({ workspace }) => {
    const dispatch = useContext(WorkspaceContext);

    useEffect(() => {
        const reloadWorkspace = async () => {
            if (!workspace)
                if (localStorage.workspaceMetadata) {
                    const res = await createWorkspace(JSON.parse(localStorage.workspaceMetadata));
                    dispatch({ type: 'CREATE', workspace: res });
                } else
                    window.location.replace('http://localhost:3000/dashboard/search');
        };
        reloadWorkspace();
    }, [dispatch, workspace]);

    return (
        <Chart>
            {workspace && <LinePlot workspace={workspace} />}
        </Chart>
    );
};

export default Analytics;