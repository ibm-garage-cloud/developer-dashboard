import React from 'react';
import {
  Header,
  HeaderName,
  HeaderNavigation,
  HeaderMenuItem,
  SkipToContent

} from 'carbon-components-react/lib/components/UIShell';
import { Link } from 'react-router-dom';

export default class DashboardHeader extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            settings: {}
        };
    }

    // Load the Data into the Project
    componentDidMount() {

        fetch("/settings")
            .then(response => response.json())
            .then(data => {
                console.log('settings', data);
                this.setState(Object.assign(
                    {},
                    this.state,
                    {settings: data},
                ));
            });
    }

    render() {

        var dashboardPrefix = this.state.settings.DASHBOARD_PREFIX;
        var dashboardTitle = this.state.settings.DASHBOARD_TITLE;
        var cloudTitle = this.state.settings.CLOUD_TITLE;
        var cloudUrl = this.state.settings.CLOUD_URL;

        return (

        <Header aria-label="Tools View">
            <SkipToContent />
            <HeaderName element={Link} to="/" prefix={dashboardPrefix}>
                {dashboardTitle}
            </HeaderName>
            <HeaderNavigation aria-label="Repositories">
                <HeaderMenuItem href={cloudUrl} target="_blank">
                    {cloudTitle}
                </HeaderMenuItem>
            </HeaderNavigation>
            <HeaderNavigation aria-label="Developer Guide">
                <HeaderMenuItem href="https://cloudnativetoolkit.dev/" target="_blank">
                    Developer Guide
                </HeaderMenuItem>
            </HeaderNavigation>

            <HeaderNavigation aria-label="Repositories">
                <HeaderMenuItem href="https://github.com/ibm-garage-cloud" target="_blank">
                    Git Org
                </HeaderMenuItem>
            </HeaderNavigation>
            <div className = "toolkit-logo" >
                <img className = "landing-page__illo" src={`${process.env.PUBLIC_URL}/dashboard.svg`}
                     alt = "illustration"/>
            </div>
        </Header>

        )

    }
};
