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

    getDashboardImageHtml(dashboardImage, dashboardTitle) {
        if (dashboardImage) {
            return (<img style={{padding: "5px 0"}} height="50px" src={dashboardImage} alt={dashboardTitle} />)
        }

        return dashboardTitle;
    }

    getToolkitLogo(toolkitLogo) {
        if (toolkitLogo) {
            return (
                <div className = "toolkit-logo-custom" >
                    <img className = "landing-page__illo" src={toolkitLogo} alt = "illustration"/>
                </div>
            );
        }

        const imageUrl = `${process.env.PUBLIC_URL}/dashboard.svg`;

        return (
            <div className = "toolkit-logo" >
                <img className = "landing-page__illo" src={imageUrl} alt = "illustration"/>
            </div>
        );

    }

    render() {

        const dashboardPrefix = this.state.settings.DASHBOARD_PREFIX;
        const dashboardTitle = this.state.settings.DASHBOARD_TITLE;
        const cloudTitle = this.state.settings.CLOUD_TITLE;
        const cloudUrl = this.state.settings.CLOUD_URL;
        const dashboardImage = this.state.settings.DASHBOARD_IMAGE;

        const headerContent = this.getDashboardImageHtml(dashboardImage, dashboardTitle);
        const toolkitLogo = this.getToolkitLogo(this.state.settings.TOOLKIT_LOGO);

        return (

        <Header aria-label="Tools View">
            <SkipToContent />
            <HeaderName element={Link} to="/" prefix={dashboardPrefix}>
                {headerContent}
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
            {toolkitLogo}
        </Header>

        )

    }
};
